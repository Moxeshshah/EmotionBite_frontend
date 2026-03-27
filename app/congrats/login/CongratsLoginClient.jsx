"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BrandHeader from "../BrandHeader";

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
      <div className="confetti" />
      <div className="confetti" />
      <div className="confetti" />
      <div className="confetti" />

      <div className="card">
        <BrandHeader />
        <div className="avatar-section">
          <div className="avatar">😊</div>
          <div className="avatar">🎉</div>
        </div>

        <div className="title">Celebrate Someone Today!</div>
        <div className="subtitle">
          Log in to send warm congratulations and share joyful moments.
        </div>

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

        {step === "mobile" && (
          <button className="btn-login" onClick={handleSendOtp}>
            {loading ? "Please wait..." : "Send OTP"}
          </button>
        )}

        {step === "otp" && (
          <button className="btn-login" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Verify OTP"}
          </button>
        )}

        {step === "profile" && (
          <button className="btn-login" onClick={handleCompleteProfile}>
            {loading ? "Please wait..." : "Submit"}
          </button>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
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
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4a00e0, #8e2de2, #ff6a00);
          overflow: hidden;
          position: relative;
          padding: 16px;
          box-sizing: border-box;
        }

        .confetti {
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 8s infinite ease-in-out;
          pointer-events: none;
        }

        .confetti:nth-child(1) {
          background: #ffeb3b;
          top: 10%;
          left: 20%;
        }

        .confetti:nth-child(2) {
          background: #ff4081;
          top: 70%;
          left: 10%;
        }

        .confetti:nth-child(3) {
          background: #00e5ff;
          top: 30%;
          right: 15%;
        }

        .confetti:nth-child(4) {
          background: #69f0ae;
          bottom: 20%;
          right: 25%;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .card {
          width: min(420px, 100%);
          padding: 45px 40px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          color: white;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .card::before {
          content: "🎈";
          position: absolute;
          font-size: 60px;
          top: -30px;
          left: -20px;
        }

        .card::after {
          content: "🎊";
          position: absolute;
          font-size: 60px;
          bottom: -30px;
          right: -20px;
        }

        .avatar-section {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-bottom: 25px;
        }

        .avatar {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .avatar:nth-child(2) {
          background: linear-gradient(135deg, #03a9f4, #00e5ff);
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .input-group {
          margin-bottom: 18px;
          text-align: left;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          margin-top: 6px;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          outline: none;
          font-size: 14px;
        }

        .input-group input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .btn-login {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(90deg, #ff9800, #ff5722);
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          font-size: 14px;
        }

        .btn-login:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .card {
            padding: 36px 24px;
            border-radius: 24px;
          }

          .avatar {
            width: 74px;
            height: 74px;
            font-size: 30px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 24px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 20px;
          }

          .card::before,
          .card::after {
            font-size: 46px;
          }

          .avatar-section {
            gap: 16px;
            margin-bottom: 20px;
          }

          .avatar {
            width: 64px;
            height: 64px;
            font-size: 26px;
          }

          .title {
            font-size: 22px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 20px;
          }

          .input-group input {
            padding: 12px;
            font-size: 13px;
          }

          .btn-login {
            padding: 13px;
            font-size: 13px;
          }

          .confetti {
            width: 11px;
            height: 11px;
          }
        }
      `}</style>
    </div>
  );
}