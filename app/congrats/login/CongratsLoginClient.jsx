
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CongratsLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);
const [step, setStep] = useState("mobile");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [mobile, setMobile] = useState("");
const [otp, setOtp] = useState("");
const [token, setToken] = useState("");
const [loading, setLoading] = useState(false);
  // Step 1 → Send OTP
const handleSendOtp = async () => {
  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/otp/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: "+91" +mobile }),
  });

  if (!res.ok) {
    alert("Failed to send OTP");
    setLoading(false);
    return;
  }

  setStep("otp");
  setLoading(false);
};

  // Step 2 → Verify OTP & Login
const handleVerifyOtp = async () => {
  if (!otp) return alert("Enter OTP");

  setLoading(true);

  const res = await fetch("/api/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: "+91" +mobile, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    setLoading(false);
    return;
  }

  // ✅ store token
  setToken(data.token);
  localStorage.setItem("token", data.token);
  localStorage.setItem("sender_mobile", mobile);

  // ✅ next step
  if (data.profileComplete) {
    router.push(`/congrats/home?code=${code}`);
  } else {
    setStep("profile");
  }

  setLoading(false);
};
const handleCompleteProfile = async () => {
  if (!firstName || !lastName) {
    alert("Enter full name");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/complete-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName,
      lastName,
    }),
  });

  if (!res.ok) {
    alert("Profile update failed");
    setLoading(false);
    return;
  }

  router.push(`/congrats/home?code=${code}`);
};

  return (
    <div className="body">

      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>

      <div className="card">

        <div className="avatar-section">
          <div className="avatar">😊</div>
          <div className="avatar">🎉</div>
        </div>

        <div className="title">Celebrate Someone Today!</div>
        <div className="subtitle">
          Log in to send warm congratulations and share joyful moments.
        </div>

        {/* Name */}
        {/* STEP 1 → MOBILE */}
{step === "mobile" && (
  <div className="input-group">
    <label>Mobile Number</label>
    <input
      type="text"
      placeholder="Enter mobile number"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
    />
  </div>
)}

{/* STEP 2 → OTP */}
{step === "otp" && (
  <div className="input-group">
    <label>Enter OTP</label>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
  </div>
)}

{/* STEP 3 → PROFILE */}
{step === "profile" && (
  <>
    <div className="input-group">
      <label>First Name</label>
      <input
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="input-group">
      <label>Last Name</label>
      <input
        type="text"
        placeholder="Enter last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  </>
)}

        {/* OTP Dropdown */}
        {showOtp && (
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {step === "mobile" && (
  <button className="btn-login" onClick={handleSendOtp}>
    Send OTP
  </button>
)}

{step === "otp" && (
  <button className="btn-login" onClick={handleVerifyOtp}>
    {loading ? "Please wait..." : "Verify OTP"}
  </button>
)}

{step === "profile" && (
  <button className="btn-login" onClick={handleCompleteProfile}>
    Submit
  </button>
)}

      </div>

      <style jsx>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        .body{
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#4a00e0,#8e2de2,#ff6a00);
          overflow:hidden;
          position:relative;
        }

        .confetti{
          position:absolute;
          width:15px;
          height:15px;
          border-radius:50%;
          opacity:0.6;
          animation:float 8s infinite ease-in-out;
        }

        .confetti:nth-child(1){ background:#ffeb3b; top:10%; left:20%; }
        .confetti:nth-child(2){ background:#ff4081; top:70%; left:10%; }
        .confetti:nth-child(3){ background:#00e5ff; top:30%; right:15%; }
        .confetti:nth-child(4){ background:#69f0ae; bottom:20%; right:25%; }

        @keyframes float{
          0%{ transform:translateY(0);}
          50%{ transform:translateY(-40px);}
          100%{ transform:translateY(0);}
        }

        .card{
          width:420px;
          padding:45px 40px;
          border-radius:30px;
          background:rgba(255,255,255,0.15);
          backdrop-filter:blur(20px);
          box-shadow:0 30px 80px rgba(0,0,0,0.4);
          color:white;
          text-align:center;
          position:relative;
        }

        .card::before{
          content:"🎈";
          position:absolute;
          font-size:60px;
          top:-30px;
          left:-20px;
        }

        .card::after{
          content:"🎊";
          position:absolute;
          font-size:60px;
          bottom:-30px;
          right:-20px;
        }

        .avatar-section{
          display:flex;
          justify-content:center;
          gap:25px;
          margin-bottom:25px;
        }

        .avatar{
          width:85px;
          height:85px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:34px;
          background:linear-gradient(135deg,#ff9800,#ff5722);
          box-shadow:0 10px 25px rgba(0,0,0,0.4);
        }

        .avatar:nth-child(2){
          background:linear-gradient(135deg,#03a9f4,#00e5ff);
        }

        .title{
          font-size:26px;
          font-weight:700;
          margin-bottom:8px;
        }

        .subtitle{
          font-size:14px;
          opacity:0.9;
          margin-bottom:30px;
        }

        .input-group{
          margin-bottom:18px;
          text-align:left;
        }

        .input-group label{
          font-size:13px;
          font-weight:500;
        }

        .input-group input{
          width:100%;
          margin-top:6px;
          padding:14px;
          border-radius:14px;
          border:none;
          background:rgba(255,255,255,0.2);
          color:white;
          outline:none;
        }

        .input-group input::placeholder{
          color:rgba(255,255,255,0.7);
        }

        .btn-login{
          width:100%;
          padding:15px;
          border:none;
          border-radius:18px;
          background:linear-gradient(90deg,#ff9800,#ff5722);
          color:white;
          font-weight:600;
          cursor:pointer;
          margin-top:10px;
          transition:0.3s;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
        }

        .btn-login:hover{
          transform:translateY(-3px);
        }

        .footer{
          margin-top:25px;
          font-size:13px;
          opacity:0.9;
        }

        .footer span{
          text-decoration:underline;
          cursor:pointer;
        }
      `}</style>

    </div>
  );
}