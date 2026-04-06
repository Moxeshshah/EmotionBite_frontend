"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BrandHeader from "../BrandHeader";

export default function ApologyLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [step, setStep] = useState("mobile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid mobile number");
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

    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("sender_mobile", mobile);

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

    router.push(`/apology/home?code=${code}`);
  };

  return (
    <div className="body">
      {/* Floating particles with rain/sadness theme */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      <div className="login-card">
        <BrandHeader />
        <div className="avatar">
          <span className="emoji">🕊️</span>
        </div>
        <h2 className="title-anim">Let Me Make This Right</h2>
        <div className="subtitle subtitle-anim">
          Sometimes a sincere "I'm sorry" 🤍<br/>
          can begin the journey of healing 🕊️<br/>
          Share your heartfelt message.
        </div>

        <form className="form-anim">
          {step === "mobile" && (
            <div className="input-box input-anim">
              <label className="label-anim">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {step === "otp" && (
            <div className="input-box input-anim">
              <label className="label-anim">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {step === "profile" && (
            <>
              <div className="input-box input-anim">
                <label className="label-anim">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="input-box input-anim">
                <label className="label-anim">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
              </div>
            </>
          )}

          {step === "mobile" && (
            <button type="button" className="login-btn btn-anim" onClick={handleSendOtp}>
              {loading ? "Please wait..." : "Send OTP"}
            </button>
          )}

          {step === "otp" && (
            <button type="button" className="login-btn btn-anim" onClick={handleVerifyOtp}>
              {loading ? "Please wait..." : "Verify OTP"}
            </button>
          )}

          {step === "profile" && (
            <button type="button" className="login-btn btn-anim" onClick={handleCompleteProfile}>
              {loading ? "Please wait..." : "Submit"}
            </button>
          )}
        </form>
      </div>

      <div className="quote-container">
        <div className="quote quote-anim">
          "An apology is the superglue of life. It can repair just about anything."
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b, #667eea);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          overflow: hidden;
          position: relative;
          font-family: "Poppins", sans-serif;
          padding: 16px;
          gap: 20px;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-30vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 12s infinite linear;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          z-index: 1;
        }

        .particle-1 {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #d76d77, #ffaf7b);
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #3a1c71, #667eea);
          animation-duration: 14s;
        }

        .particle-3 {
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #ffaf7b, #d76d77);
          animation-duration: 11s;
        }

        .particle-4 {
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #667eea, #3a1c71);
          animation-duration: 13s;
        }

        .particle-5 {
          width: 9px;
          height: 9px;
          background: linear-gradient(45deg, #d76d77, #ffaf7b);
          animation-duration: 15s;
        }

        .login-card {
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 55px 45px;
          text-align: center;
          box-shadow: 
            0 25px 60px rgba(58, 28, 113, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
          animation: fadeInUp 1s ease-out;
        }

        .avatar {
          font-size: 75px;
          margin-bottom: 25px;
          animation: gentlePulse 3s ease-in-out infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80px;
        }

        .emoji {
  font-size: 75px;
  filter: drop-shadow(0 8px 20px rgba(215, 109, 119, 0.6));
  display: block !important;
  line-height: 1;
  text-shadow: none; /* Emojis don't need text-shadow */
}

        .title-anim {
          font-family: "Playfair Display", serif;
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #f8e8e8, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 18px;
          line-height: 1.2;
          animation: bounceIn 1.2s ease-out, shimmer 4s infinite;
          background-size: 200% 100%;
          text-shadow: none;
        }

        .subtitle-anim {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          font-weight: 300;
          margin-bottom: 40px;
          line-height: 1.7;
          font-family: "Poppins", sans-serif;
          animation: fadeInUp 1s ease-out 0.3s both;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .form-anim {
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .input-anim {
          animation: fadeInUp 0.8s ease-out both;
          animation-fill-mode: forwards;
        }

        .input-anim:nth-child(1) { animation-delay: 0.6s; }
        .input-anim:nth-child(2) { animation-delay: 0.7s; }
        .input-anim:nth-child(3) { animation-delay: 0.8s; }

        .label-anim {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.98);
          display: block;
          margin-bottom: 12px;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          letter-spacing: 0.5px;
          animation: fadeInUp 0.6s ease-out both;
        }

        .input-field {
          width: 100%;
          padding: 16px 20px;
          border-radius: 20px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.92);
          font-size: 16px;
          font-weight: 400;
          color: #333;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: "Poppins", sans-serif;
        }

        .input-field:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 12px 35px rgba(215, 109, 119, 0.4),
            0 0 0 4px rgba(58, 28, 113, 0.2);
          transform: translateY(-2px);
          color: #2d1b69;
        }

        .input-field::placeholder {
          color: rgba(100, 100, 100, 0.7);
          font-weight: 400;
        }

        .login-btn.btn-anim {
          width: 100%;
          padding: 16px 24px;
          border: none;
          border-radius: 35px;
          background: linear-gradient(135deg, #d76d77, #3a1c71, #ffaf7b);
          background-size: 300% 300%;
          color: #fff;
          cursor: pointer;
          margin-top: 18px;
          font-size: 16px;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 12px 35px rgba(215, 109, 119, 0.5);
          animation: fadeInUp 1s ease-out 0.9s both;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-btn.btn-anim:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 45px rgba(215, 109, 119, 0.7);
          background-position: 100% 0;
        }

        .login-btn.btn-anim:active {
          transform: translateY(-1px) scale(0.98);
        }

        .quote-container {
          position: absolute;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 420px;
          z-index: 2;
          pointer-events: none;
        }

        .quote-anim {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
          padding: 0 20px;
          font-style: italic;
          font-family: "Dancing Script", cursive;
          font-weight: 400;
          animation: fadeInUp 1.2s ease-out 1.1s both;
          text-shadow: 0 2px 15px rgba(58, 28, 113, 0.3);
          line-height: 1.4;
          display: block;
        }

        @media (max-width: 768px) {
          .body { 
            padding: 14px;
            gap: 16px;
          }
          .login-card { 
            padding: 45px 35px; 
            border-radius: 24px; 
          }
          .avatar { 
            font-size: 68px;
            height: 72px;
          }
          .emoji { font-size: 68px; }
          .title-anim { font-size: 32px; }
          .subtitle-anim { font-size: 15px; margin-bottom: 32px; }
          .quote-container { bottom: 28px; width: 95%; }
          .quote-anim { font-size: 14px; }
        }

        @media (max-width: 480px) {
          .body { 
            padding: 12px;
            gap: 12px;
          }
          .login-card { 
            padding: 35px 25px; 
            border-radius: 22px; 
          }
          .avatar { 
            font-size: 62px; 
            margin-bottom: 20px;
            height: 65px;
          }
          .emoji { font-size: 62px; }
          .title-anim { font-size: 28px; }
          .subtitle-anim { font-size: 14px; margin-bottom: 26px; }
          .input-field { padding: 14px 18px; font-size: 15px; }
          .login-btn.btn-anim { padding: 15px 20px; font-size: 15px; }
          .quote-container { bottom: 22px; width: 98%; }
          .quote-anim { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}