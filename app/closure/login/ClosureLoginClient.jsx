"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BrandHeader from "../BrandHeader";

export default function ClosureLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [step, setStep] = useState("mobile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);
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
      router.push(`/closure/home?code=${code}`);
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

    router.push(`/closure/home?code=${code}`);
  };

  return (
    <div className="body">
      
      <div className="particle" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle" style={{ left: "85%", animationDelay: "3s" }} />

      <div className="login-card">
        <BrandHeader /> 
        <div className="avatar">🌙</div>
        <h2>Find Your Closure</h2>
        <div className="subtitle">
          Some endings bring peace. Sign in to send your final message.
        </div>

        <form>
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

          {step === "mobile" && (
            <button type="button" className="login-btn" onClick={handleSendOtp}>
              {loading ? "Please wait..." : "Send OTP"}
            </button>
          )}

          {step === "otp" && (
            <button type="button" className="login-btn" onClick={handleVerifyOtp}>
              {loading ? "Please wait..." : "Verify OTP"}
            </button>
          )}

          {step === "profile" && (
            <button type="button" className="login-btn" onClick={handleCompleteProfile}>
              {loading ? "Please wait..." : "Submit"}
            </button>
          )}
        </form>
      </div>

      <div className="quote">
        “Sometimes letting go is the most powerful closure.”
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap");

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
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2, #6a11cb);
          overflow: hidden;
          position: relative;
          font-family: "Inter", sans-serif;
          padding: 16px;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: float 8s infinite linear;
          pointer-events: none;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }

        .login-card {
          width: min(390px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 45px 35px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
        }

        .avatar {
          font-size: 55px;
          margin-bottom: 15px;
        }

        h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: 30px;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .subtitle {
          color: #e0e0e0;
          font-size: 14px;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .input-box {
          margin-bottom: 18px;
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
          border-radius: 14px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.85);
          font-size: 14px;
        }

        .login-btn {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(to right, #4e73df, #9b59b6);
          color: #fff;
          cursor: pointer;
          margin-top: 10px;
          font-size: 14px;
          font-weight: 600;
          transition: 0.3s;
        }

        .quote {
          position: absolute;
          bottom: 30px;
          left: 0;
          width: 100%;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          padding: 0 16px;
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .login-card {
            padding: 36px 24px;
            border-radius: 20px;
          }

          .avatar {
            font-size: 50px;
          }

          h2 {
            font-size: 28px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 22px;
          }

          .quote {
            bottom: 18px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
            align-items: center;
          }

          .login-card {
            padding: 28px 18px;
            border-radius: 18px;
          }

          .avatar {
            font-size: 46px;
            margin-bottom: 12px;
          }

          h2 {
            font-size: 24px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 18px;
          }

          .input-box input {
            padding: 11px;
            font-size: 13px;
          }

          .login-btn {
            padding: 12px;
            font-size: 13px;
          }

          .particle {
            width: 5px;
            height: 5px;
          }

          .quote {
            bottom: 14px;
            font-size: 11px;
            line-height: 1.4;
          }
        }
      `}</style>
    </div>
  );
}