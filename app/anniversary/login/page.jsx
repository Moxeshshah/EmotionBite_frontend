
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AnniversaryLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
const [step, setStep] = useState("mobile");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1 → Send OTP (Demo)
const handleSendOtp = async () => {
  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/otp/generate", {
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

  // Step 2 → Verify OTP & Login
const handleVerifyOtp = async () => {
  if (!otp) return alert("Enter OTP");

  setLoading(true);

  const res = await fetch("/api/otp/verify", {
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
    router.push(`/anniversary/home?code=${code}`);
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

  router.push(`/anniversary/home?code=${code}`);
};

  return (
    <div className="body">
      <div className="heart" style={{ left: "10%", animationDelay: "0s" }}>❤️</div>
      <div className="heart" style={{ left: "25%", animationDelay: "2s" }}>💖</div>
      <div className="heart" style={{ left: "50%", animationDelay: "4s" }}>💞</div>
      <div className="heart" style={{ left: "70%", animationDelay: "1s" }}>💕</div>
      <div className="heart" style={{ left: "85%", animationDelay: "3s" }}>💘</div>

      <div className="login-card">
        <div className="avatar">💑</div>
        <h2>Happy Anniversary 💖</h2>
        <div className="subtitle">
          Celebrate love & create beautiful memories
        </div>

        {/* Name */}
       {/* STEP 1 → MOBILE */}
{step === "mobile" && (
  <div className="input-box">
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
  <div className="input-box">
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
    <div className="input-box">
      <label>First Name</label>
      <input
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="input-box">
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400;500&display=swap');

  /* 🔥 GLOBAL FIX */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb);
    overflow: hidden;
    position: relative;
    font-family: 'Poppins', sans-serif;
    padding: 16px;
  }

  /* floating hearts */
  .heart {
    position: absolute;
    font-size: 16px;
    animation: float 6s infinite ease-in;
  }

  @media (min-width: 768px) {
    .heart {
      font-size: 20px;
    }
  }

  @keyframes float {
    0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
  }

  /* card */
  .login-card {
    width: 100%;
    max-width: 380px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.3);
  }

  .avatar {
    font-size: 60px;
    margin-bottom: 10px;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: #fff;
    margin-bottom: 8px;
  }

  .subtitle {
    color: #fff;
    font-size: 14px;
    margin-bottom: 22px;
  }

  /* 🔥 INPUT FIX */
  .input-box {
    margin-bottom: 16px;
    text-align: left;
  }

  .input-box label {
    font-size: 13px;
    color: #fff;
    display: block;
    margin-bottom: 6px;
  }

  .input-box input {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: none;
    outline: none;
    background: rgba(255,255,255,0.9);
    font-size: 14px;

    box-sizing: border-box; /* 🔥 critical */
  }

  .input-box input:focus {
    box-shadow: 0 0 0 2px rgba(255,255,255,0.4);
  }

  /* button */
  .login-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 25px;
    background: linear-gradient(to right,#ff758c,#ff7eb3);
    color: #fff;
    cursor: pointer;
    margin-top: 10px;
    font-size: 15px;
  }

  /* 🔥 MOBILE FIX */
  @media (max-width: 480px) {
    .login-card {
      padding: 28px 18px;
      border-radius: 16px;
    }

    h2 {
      font-size: 22px;
    }

    .subtitle {
      font-size: 13px;
    }

    .avatar {
      font-size: 50px;
    }

    .input-box input {
      padding: 10px;
      font-size: 14px;
    }

    .login-btn {
      padding: 11px;
      font-size: 14px;
    }
  }
`}</style>
    </div>
  );
}