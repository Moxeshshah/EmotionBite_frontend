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

    localStorage.setItem("sender_name", firstName + " " + lastName);
    router.push(`/approach/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <BrandHeader />

      <div className="card">
        <div className="avatar">😊</div>

        <h1 className="title">
          {step === "mobile" && "Take Your First Step"}
          {step === "otp" && "Enter OTP"}
          {step === "profile" && "Complete Profile"}
        </h1>

        <p className="subtitle">
          {step === "mobile" &&
            "Enter your mobile number to get started."}
          {step === "otp" &&
            "We have sent a 6 digit OTP to your mobile."}
          {step === "profile" &&
            "Add your name to continue."}
        </p>

        {step === "mobile" && (
          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
              }
              maxLength={10}
            />
          </div>
        )}

        {step === "otp" && (
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              className="otp-input"
            />
          </div>
        )}

        {step === "profile" && (
          <>
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="profile-input"
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="profile-input"
              />
            </div>
          </>
        )}

        <button
          className="btn-login"
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
            ? step === "mobile"
              ? "Sending..."
              : step === "otp"
              ? "Verifying..."
              : "Saving..."
            : step === "mobile"
            ? "Send OTP"
            : step === "otp"
            ? "Verify OTP"
            : "Complete Profile"}
        </button>

        <div className="footer-note">
          Powered by Emotion Bite
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap');

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
          font-family: 'Poppins', sans-serif;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 18px 14px;
        }

        .brand-wrap {
          width: 100%;
          max-width: 410px;
          margin: 0 auto 14px;
          color: white;
          z-index: 2;
          animation: fadeDown 0.7s ease-out;
        }

        .brand-top {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          box-shadow: 0 10px 20px rgba(255, 154, 158, 0.22);
          animation: pulse 2.6s ease-in-out infinite;
          flex-shrink: 0;
          overflow: hidden;
        }

        .qr-logo {
          width: 70px;
          height: 70px;
          object-fit: contain;
          display: block;
        }

        .brand-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          color: white;
          line-height: 1.1;
          letter-spacing: 0.2px;
        }

        .logo span {
          color: #ffd6e7;
        }

        .brand-tag {
          margin-top: 4px;
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.8px;
          background: linear-gradient(135deg, #ffd6e7, #ffffff, #ffe3ec);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          opacity: 0.95;
        }

        .brand-line {
          width: min(240px, 72vw);
          height: 1px;
          margin: 12px auto 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
        }

        .card {
          width: 100%;
          max-width: 410px;
          padding: 30px 24px;
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

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin: 0 auto 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          box-shadow: 0 10px 22px rgba(255, 154, 158, 0.28);
          animation: pulse 2.6s ease-in-out infinite;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.25;
          text-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
        }

        .subtitle {
          font-size: 13px;
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          line-height: 1.6;
          font-weight: 400;
        }

        .input-group {
          margin-bottom: 14px;
          animation: fadeUp 0.35s ease;
        }

        .input-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.96);
          letter-spacing: 0.2px;
        }

        .input-group input {
          width: 100%;
          padding: 13px 14px;
          border: none;
          outline: none;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.95);
          color: #1d1d1d;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          transition: all 0.25s ease;
        }

        .input-group input::placeholder {
          color: #787878;
        }

        .input-group input:focus {
          transform: translateY(-1px);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.22);
        }

        .otp-input {
          letter-spacing: 5px;
          font-weight: 500;
          text-align: center;
          background: rgba(255, 255, 255, 1) !important;
          color: #111 !important;
        }

        .profile-input {
          font-weight: 400;
          background: rgba(255, 255, 255, 0.97) !important;
          color: #111 !important;
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #2a2a2a;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 8px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
          transition: all 0.25s ease;
          letter-spacing: 0.2px;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
        }

        .btn-login:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none;
        }

        .footer-note {
          margin-top: 14px;
          text-align: center;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.82);
          font-weight: 400;
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

        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
        }

        .loading-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          margin-top: 6px;
        }

        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.25);
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 16px 12px;
          }

          .brand-wrap,
          .card {
            max-width: 100%;
          }

          .logo {
            font-size: 22px;
          }

          .title {
            font-size: 20px;
          }

          .subtitle {
            font-size: 12px;
          }

          .input-group input {
            font-size: 14px;
          }

          .otp-input {
            letter-spacing: 4px;
          }

          .btn-login {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}