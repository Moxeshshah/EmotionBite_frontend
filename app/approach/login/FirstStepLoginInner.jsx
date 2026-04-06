"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BrandHeader from "../BrandHeader";

export default function FirstStepLogin() {
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

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }
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
      router.push(`/approach/home?code=${code}`);
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
      body: JSON.stringify({ firstName, lastName }),
    });
    if (!res.ok) {
      alert("Profile update failed");
      setLoading(false);
      return;
    }
    localStorage.setItem("sender_name", `${firstName} ${lastName}`);
    router.push(`/approach/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">

          <div className="hero-section">
            <div className="avatar">✨</div>
            <p className="eyebrow">
              {step === "mobile" && "Begin your journey"}
              {step === "otp" && "Secure verification"}
              {step === "profile" && "Almost there"}
            </p>
            <h1>
              {step === "mobile" && "Take the First Step"}
              {step === "otp" && "Enter Your OTP"}
              {step === "profile" && "Complete Your Profile"}
            </h1>
            <p className="subtitle">
              {step === "mobile" && "Start with your mobile number and continue into your Approach experience."}
              {step === "otp" && "We sent a 6 digit verification code to your mobile number."}
              {step === "profile" && "Add your name so we can personalize your experience."}
            </p>
          </div>

          <div className="progress-row">
            <span className={step === "mobile" ? "dot active" : "dot"} />
            <span className={step === "otp" ? "dot active" : "dot"} />
            <span className={step === "profile" ? "dot active" : "dot"} />
          </div>

          <div className="form-area">
            {step === "mobile" && (
              <div className="input-box">
                <label>Mobile Number</label>
                <div className="input-wrap">
                  <span className="prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10 digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                  />
                </div>
              </div>
            )}

            {step === "otp" && (
              <div className="input-box">
                <label>Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="otp-input"
                />
              </div>
            )}

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
          </div>

          <button
            className="send-btn"
            onClick={
              step === "mobile"
                ? handleSendOtp
                : step === "otp"
                ? handleVerifyOtp
                : handleCompleteProfile
            }
            disabled={loading}
          >
            {loading
              ? step === "mobile" ? "Sending..." : step === "otp" ? "Verifying..." : "Saving..."
              : step === "mobile" ? "Send OTP 🚀"
              : step === "otp" ? "Verify OTP ✅"
              : "Complete Profile 👤"}
          </button>

          <div className="footer-note">Powered by Emotion Bite</div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
          position: relative;
          overflow-x: hidden;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.16;
          filter: blur(2px);
        }

        .shape-one {
          width: 110px;
          height: 110px;
          background: white;
          top: 10%;
          left: 8%;
          animation: float 12s infinite ease-in-out;
        }

        .shape-two {
          width: 80px;
          height: 80px;
          background: #ffd6e7;
          bottom: 14%;
          right: 10%;
          animation: float 14s infinite ease-in-out reverse;
        }

        .shape-three {
          width: 62px;
          height: 62px;
          background: #ffffff;
          top: 65%;
          left: 20%;
          animation: float 10s infinite ease-in-out;
        }

        .card {
          width: 100%;
          max-width: 600px;
          padding: 16px 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 0.8s ease-out;
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 16px;
        }

        .avatar {
          font-size: 44px;
          margin-bottom: 8px;
          animation: pulseRing 3.2s ease-in-out infinite;
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 6px;
        }

        .hero-section h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 13px;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 320px;
          margin: 0 auto;
        }

        .progress-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 14px 0;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.3);
          transition: width 180ms ease, background 180ms ease;
        }

        .dot.active {
          width: 28px;
          background: rgba(255, 255, 255, 0.9);
        }

        .form-area {
          margin-bottom: 4px;
        }

        .input-box {
          margin-bottom: 12px;
        }

        .input-box label {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.94);
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 0 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .input-wrap:focus-within {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .prefix {
          color: #333;
          font-size: 14px;
          font-weight: 600;
        }

        .input-box input {
          width: 100%;
          border: none;
          outline: none;
          padding: 14px 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #333;
          font-size: 14px;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          transition: all 0.3s ease;
        }

        .input-box input::placeholder {
          color: rgba(51, 51, 51, 0.6);
        }

        .input-box input:focus {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .input-wrap input {
          background: transparent;
          border: none;
          box-shadow: none;
          padding-left: 0;
        }

        .input-wrap input:focus {
          background: transparent;
          box-shadow: none;
        }

        .otp-input {
          text-align: center;
          letter-spacing: 8px;
          font-size: 18px !important;
          font-weight: 700 !important;
        }

        .send-btn {
          width: 100%;
          margin-top: 8px;
          padding: 12px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 154, 158, 0.4);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: "Poppins", sans-serif;
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(255, 154, 158, 0.5);
        }

        .send-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .footer-note {
          margin-top: 14px;
          text-align: center;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.76);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulseRing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @media (max-width: 480px) {
          .body { padding: 16px 12px; }
          .card { padding: 14px 16px; border-radius: 22px; }
          .hero-section h1 { font-size: 22px; }
          .avatar { font-size: 38px; }
          .input-box input { padding: 12px 16px; font-size: 13px; }
          .send-btn { font-size: 14px; padding: 11px; }
          .otp-input { letter-spacing: 6px; font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
}