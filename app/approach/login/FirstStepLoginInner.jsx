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

      localStorage.setItem("sender_name", `${firstName} ${lastName}`);
      router.push(`/approach/home?code=${code}`);
    };

    return (
      <div className="auth-shell">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />

        <div className="spark spark-1" />
        <div className="spark spark-2" />
        <div className="spark spark-3" />
        <div className="spark spark-4" />
        <div className="spark spark-5" />

        <div className="login-card">
          <div className="card-glow" />
          <BrandHeader />

          <div className="badge-wrap">
            <div className="avatar-ring">
              <div className="avatar">✨</div>
            </div>
          </div>

          <p className="eyebrow">
            {step === "mobile" && "Begin your journey"}
            {step === "otp" && "Secure verification"}
            {step === "profile" && "Almost there"}
          </p>

          <h1 className="title">
            {step === "mobile" && "Take the First Step"}
            {step === "otp" && "Enter Your OTP"}
            {step === "profile" && "Complete Your Profile"}
          </h1>

          <p className="subtitle">
            {step === "mobile" &&
              "Start with your mobile number and continue into your Approach experience."}
            {step === "otp" &&
              "We sent a 6 digit verification code to your mobile number."}
            {step === "profile" &&
              "Add your name so we can personalize your experience."}
          </p>

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
                  placeholder="Enter 4 digit OTP"
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
            <span>
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
            </span>
          </button>

          <div className="footer-note">Powered by Emotion Bite</div>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap");

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

          .auth-shell {
            min-height: 100vh;
            width: 100vw;
            position: relative;
            display: flex;
            align-items: flex-start; /* Changed from center to flex-start */
            justify-content: center;
            padding: 40px 16px 20px; /* Reduced top padding from default browser spacing */
            overflow: hidden;
            font-family: "Manrope", sans-serif;
            background:
              radial-gradient(circle at top left, rgba(255,255,255,0.22), transparent 30%),
              radial-gradient(circle at bottom right, rgba(255,255,255,0.16), transparent 28%),
              linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #2d6a8e 100%);
          }

          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(8px);
            opacity: 0.22;
            animation: floatOrb 10s ease-in-out infinite;
          }

          .orb-one {
            width: 220px;
            height: 220px;
            background: #7dd3fc;
            top: -40px;
            left: -50px;
          }

          .orb-two {
            width: 180px;
            height: 180px;
            background: #c4b5fd;
            bottom: -40px;
            right: -20px;
            animation-delay: 1.5s;
          }

          .orb-three {
            width: 120px;
            height: 120px;
            background: #f9a8d4;
            top: 55%;
            left: 8%;
            animation-delay: 3s;
          }

          .spark {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 18px rgba(255, 255, 255, 0.55);
            animation: rise 12s linear infinite;
          }

          .spark-1 { left: 12%; bottom: -20px; animation-delay: 0s; }
          .spark-2 { left: 28%; bottom: -40px; animation-delay: 2s; }
          .spark-3 { left: 52%; bottom: -30px; animation-delay: 4s; }
          .spark-4 { left: 72%; bottom: -25px; animation-delay: 1s; }
          .spark-5 { left: 88%; bottom: -35px; animation-delay: 3s; }

          .login-card {
            width: 100%;
            max-width: 430px;
            position: relative;
            z-index: 2;
            border-radius: 30px;
            padding: 34px 26px 22px;
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(22px);
            -webkit-backdrop-filter: blur(22px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow:
              0 20px 60px rgba(6, 18, 39, 0.35),
              inset 0 1px 0 rgba(255, 255, 255, 0.24);
            color: #fff;
            animation: cardEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            margin-top: 20px; /* Added explicit top margin control */
          }

          .card-glow {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.12),
              rgba(255, 255, 255, 0.02)
            );
          }

          .badge-wrap {
            display: flex;
            justify-content: center;
            margin: 10px 0 16px;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .avatar-ring {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08));
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
            animation: pulseRing 3.2s ease-in-out infinite;
          }

          .avatar {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            background: linear-gradient(135deg, #f8fafc, #dbeafe);
            color: #123;
            box-shadow: inset 0 1px 3px rgba(255,255,255,0.8);
          }

          .eyebrow {
            text-align: center;
            font-size: 12px;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.78);
            margin-bottom: 8px;
            animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .title {
            text-align: center;
            font-family: "Cormorant Garamond", serif;
            font-size: 38px;
            line-height: 1.04;
            font-weight: 600;
            margin-bottom: 10px;
            color: #ffffff;
            text-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
            animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .subtitle {
            text-align: center;
            font-size: 14px;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.88);
            max-width: 320px;
            margin: 0 auto 18px;
            animation: fadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .progress-row {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 22px;
            animation: fadeUp 1.15s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.28);
            transition: width 180ms cubic-bezier(0.16, 1, 0.3, 1),
              background 180ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .dot.active {
            width: 28px;
            background: linear-gradient(90deg, #f8fafc, #cbd5e1);
          }

          .form-area {
            animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .input-box {
            margin-bottom: 14px;
          }

          .input-box label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.94);
          }

          .input-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 0 14px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.94);
            box-shadow: 0 8px 24px rgba(6, 18, 39, 0.14);
            transition: box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .input-wrap:focus-within {
            transform: translateY(-1px);
            box-shadow:
              0 10px 28px rgba(6, 18, 39, 0.18),
              0 0 0 3px rgba(191, 219, 254, 0.35);
          }

          .prefix {
            color: #334155;
            font-size: 14px;
            font-weight: 700;
          }

          .input-box input {
            width: 100%;
            border: none;
            outline: none;
            padding: 15px 16px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.94);
            color: #0f172a;
            font-size: 14px;
            font-weight: 500;
            font-family: "Manrope", sans-serif;
            box-shadow: 0 8px 24px rgba(6, 18, 39, 0.14);
            transition: box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              background 180ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .input-box input:focus {
            transform: translateY(-1px);
            background: rgba(255, 255, 255, 1);
            box-shadow:
              0 10px 28px rgba(6, 18, 39, 0.18),
              0 0 0 3px rgba(191, 219, 254, 0.35);
          }

          .input-box input::placeholder {
            color: #64748b;
            font-weight: 500;
          }

          .input-wrap input {
            box-shadow: none;
            background: transparent;
            padding-left: 0;
          }

          .input-wrap input:focus {
            box-shadow: none;
            transform: none;
            background: transparent;
          }

          .otp-input {
            text-align: center;
            letter-spacing: 8px;
            font-size: 18px !important;
            font-weight: 700 !important;
          }

          .btn-login {
            width: 100%;
            margin-top: 8px;
            padding: 15px 20px;
            border: none;
            border-radius: 999px;
            background: linear-gradient(135deg, #ffffff, #dbeafe, #bfdbfe);
            color: #0f172a;
            font-family: "Manrope", sans-serif;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 0.4px;
            cursor: pointer;
            box-shadow: 0 14px 30px rgba(8, 47, 73, 0.24);
            transition:
              transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 180ms cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeUp 1.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .btn-login:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 18px 34px rgba(8, 47, 73, 0.3);
          }

          .btn-login:active:not(:disabled) {
            transform: translateY(0);
          }

          .btn-login:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .footer-note {
            margin-top: 16px;
            text-align: center;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.76);
            animation: fadeUp 1.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes cardEnter {
            from {
              opacity: 0;
              transform: translateY(22px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseRing {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
            }
            50% {
              transform: scale(1.04);
              box-shadow: 0 16px 36px rgba(125, 211, 252, 0.22);
            }
          }

          @keyframes floatOrb {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-16px) translateX(10px);
            }
          }

          @keyframes rise {
            0% {
              transform: translateY(0) scale(0.7);
              opacity: 0;
            }
            10% {
              opacity: 0.75;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-115vh) scale(1.1);
              opacity: 0;
            }
          }

          @media (max-width: 480px) {
            .auth-shell {
              padding: 30px 14px 20px; /* Reduced top padding for mobile */
            }

            .login-card {
              max-width: 100%;
              padding: 28px 20px 20px;
              border-radius: 24px;
              margin-top: 10px; /* Reduced top margin on mobile */
            }

            .avatar-ring {
              width: 82px;
              height: 82px;
            }

            .avatar {
              width: 66px;
              height: 66px;
              font-size: 28px;
            }

            .title {
              font-size: 32px;
            }

            .subtitle {
              font-size: 13px;
              margin-bottom: 16px;
            }

            .input-box input,
            .input-wrap {
              border-radius: 16px;
            }

            .input-box input {
              padding: 14px 15px;
              font-size: 14px;
            }

            .otp-input {
              letter-spacing: 6px;
              font-size: 17px !important;
            }

            .btn-login {
              padding: 14px 18px;
              font-size: 13px;
            }
          }
        `}</style>
      </div>
    );
  }