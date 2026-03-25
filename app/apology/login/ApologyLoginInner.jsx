
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ApologyLogin() {
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

  // Step 1: Send OTP (UI demo)
const handleSendOtp = async () => {
  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter valid mobile number");
    return;
  }

  setLoading(true);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mobile: "+91" + mobile }),
});

  if (!res.ok) {
    alert("Failed to send OTP");
    setLoading(false);
    return;
  }

  setStep("otp");
  setLoading(false);
};

  // Step 2: Verify OTP and Login
const handleVerifyOtp = async () => {
  if (!otp) return alert("Enter OTP");

  setLoading(true);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/otp/verify`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mobile: "+91" + mobile, otp }),
});

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    setLoading(false);
    return;
  }

  // ✅ Save token
  setToken(data.token);
  localStorage.setItem("token", data.token);
  localStorage.setItem("sender_mobile", mobile);

  // ✅ Next step
  if (data.profileComplete) {
    router.push(`/apology/home?code=${code}`);
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

const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/complete-profile`, {
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

  router.push(`/apology/home?code=${code}`);
};

  return (
    <div className="body">

      {/* Decorative Stickers */}
      <div className="sticker s1">🕊</div>
      <div className="sticker s2">🌧</div>
      <div className="sticker s3">✨</div>

      <div className="login-card">

        <h2>Let Me Make This Right 💌</h2>

        <div className="subtitle">
          Sometimes a sincere “I’m sorry” 🤍 <br/>
          can begin the journey of healing 🕊 <br/>
          Share your heartfelt message.
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

        {/* OTP field appears after Send OTP */}
       {step === "mobile" && (
  <button className="login-btn" onClick={handleSendOtp}>
    Send OTP
  </button>
)}

{step === "otp" && (
  <button className="login-btn" onClick={handleVerifyOtp}>
    {loading ? "Please wait..." : "Verify OTP"}
  </button>
)}

{step === "profile" && (
  <button className="login-btn" onClick={handleCompleteProfile}>
    Submit
  </button>
)}

      </div>

      <style jsx>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Inter',sans-serif;
        }

        .body{
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#3a1c71,#d76d77,#ffaf7b);
          overflow:hidden;
          position:relative;
          color:#fff;
        }

        .sticker{
          position:absolute;
          font-size:42px;
          opacity:0.18;
          animation: float 10s infinite ease-in-out;
        }

        .s1{ top:8%; left:12%; }
        .s2{ bottom:12%; right:15%; }
        .s3{ top:18%; right:20%; }

        @keyframes float{
          0%{ transform:translateY(0px);}
          50%{ transform:translateY(-20px);}
          100%{ transform:translateY(0px);}
        }

        .login-card{
          width:420px;
          padding:55px 45px;
          border-radius:22px;
          background:rgba(255,255,255,0.08);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.15);
          box-shadow:0 15px 45px rgba(0,0,0,0.35);
          text-align:center;
        }

        h2{
          font-family:'Playfair Display',serif;
          font-size:32px;
          margin-bottom:15px;
        }

        .subtitle{
          font-size:15px;
          margin-bottom:35px;
          line-height:1.7;
        }

        .input-group{
          margin-bottom:22px;
          text-align:left;
        }

        .input-group label{
          font-size:13px;
          display:block;
          margin-bottom:6px;
        }

        .input-group input{
          width:100%;
          padding:13px;
          border-radius:12px;
          border:none;
          outline:none;
          background:rgba(255,255,255,0.9);
          color:#333;
          font-size:14px;
        }

        .login-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:30px;
          background:#ffffff;
          color:#3a1c71;
          font-weight:600;
          cursor:pointer;
          transition:0.3s;
          margin-top:10px;
        }

        .login-btn:hover{
          background:#ffe5ec;
          transform:translateY(-3px);
        }

        .footer-text{
          margin-top:25px;
          font-size:14px;
          opacity:0.9;
        }
      `}</style>
    </div>
  );
}