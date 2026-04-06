
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import BrandHeader from "../BrandHeader";

export default function AnniversaryLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const canvasRef = useRef(null);

  const [step, setStep] = useState("mobile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    const hearts = ["💖", "💕", "💞", "💗", "✨", "💫", "🌸"];

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: Math.random() * 0.35 + 0.12,
        heart: hearts[Math.floor(Math.random() * hearts.length)],
        scale: Math.random() * 0.6 + 0.4,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        hue: Math.random() * 20 + 310
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.0008;
        p.scale -= 0.0008;

        if (p.y > canvas.height || p.opacity <= 0 || p.scale <= 0) {
          p.y = -60;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.5 + 0.3;
          p.scale = Math.random() * 0.6 + 0.4;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = `hsl(${p.hue}, 65%, 65%)`;
        ctx.shadowBlur = 18;
        ctx.font = `${24 * p.scale}px Arial`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(p.heart, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    setLoading(true);

    try {
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
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+91" + mobile, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Verification failed");
        return;
      }

      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("sender_mobile", mobile);

      if (data.profileComplete) {
        router.push(`/anniversary/home?code=${code}`);
      } else {
        setStep("profile");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    if (!firstName || !lastName) {
      alert("Enter full name");
      return;
    }

    setLoading(true);

    try {
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
        return;
      }

      localStorage.setItem("sender_name", firstName + " " + lastName);
      router.push(`/anniversary/home?code=${code}`);
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="body">
        <div className="login-card">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            Loading your romantic surprise... 💕
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        aria-hidden="true"
      />
      
      <div className="login-card">
        <BrandHeader />
        <div className="avatar">💕</div>
        <h2>Happy Anniversary 💖</h2>
        <div className="subtitle">Love wrapped in eternal beauty</div>

        {step === "mobile" && (
          <div className="input-box">
            <label htmlFor="mobile-input">Mobile Number</label>
            <input
              id="mobile-input"
              type="tel"
              inputMode="numeric"
              maxLength="10"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        )}

        {step === "otp" && (
          <div className="input-box">
            <label htmlFor="otp-input">Enter OTP</label>
            <input
              id="otp-input"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        )}

        {step === "profile" && (
          <>
            <div className="input-box">
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                type="text"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

        {step === "mobile" && (
          <button 
            className="login-btn" 
            onClick={handleSendOtp} 
            disabled={loading}
            aria-label="Send OTP"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {step === "otp" && (
          <button 
            className="login-btn" 
            onClick={handleVerifyOtp} 
            disabled={loading}
            aria-label="Verify OTP"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        )}

        {step === "profile" && (
          <button 
            className="login-btn" 
            onClick={handleCompleteProfile} 
            disabled={loading}
            aria-label="Complete Profile"
          >
            {loading ? "Completing..." : "Complete Profile"}
          </button>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sacramento&family=Poppins:ital,wght@0,300..800;1,300..800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :global(html), :global(body) {
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
          background: linear-gradient(135deg, 
            #6a0c6a 0%, 
            #9b59b6 20%, 
            #d63384 40%, 
            #e84393 60%, 
            #fd79a8 80%, 
            #fdeaea 100%);
          position: relative;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          overflow: hidden;
        }

        .particles-canvas {
          display: block;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 30px;
          padding: 50px 35px;
          text-align: center;
          box-shadow: 
            0 25px 50px rgba(106, 12, 106, 0.4),
            0 0 0 1px rgba(253, 234, 234, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(253, 234, 234, 0.3);
          z-index: 2;
          position: relative;
          animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }

        .avatar {
  font-size: 80px;
  margin-bottom: 15px;
  animation: pulse 2.2s infinite;
  filter: drop-shadow(0 10px 25px rgba(232, 67, 147, 0.6));
  /* Remove these three lines: */
  /* background: linear-gradient(135deg, #fdeaea, #e84393); */
  /* -webkit-background-clip: text; */
  /* -webkit-text-fill-color: transparent; */
  /* background-clip: text; */
}

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.07); 
          }
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 4px 20px rgba(106, 12, 106, 0.6);
          margin-bottom: 10px;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.92);
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 30px;
          line-height: 1.6;
          font-style: italic;
          font-family: 'Sacramento', cursive;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .input-box {
          margin-bottom: 20px;
          text-align: left;
          position: relative;
        }

        .input-box label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.88);
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .input-box input {
          width: 100%;
          padding: 16px 20px;
          border-radius: 16px;
          border: 1px solid rgba(253, 234, 234, 0.4);
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          font-size: 16px;
          color: #ffffff;
          font-weight: 400;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(106, 12, 106, 0.35);
        }

        .input-box input::placeholder {
          color: rgba(255, 255, 255, 0.55);
        }

        .input-box input:focus {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(232, 67, 147, 0.6);
          transform: translateY(-2px);
          box-shadow: 
            0 12px 35px rgba(232, 67, 147, 0.5),
            0 0 0 4px rgba(253, 234, 234, 0.25);
        }

        .login-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(135deg,
            #e84393 0%,
            #fd79a8 30%,
            #9b59b6 60%,
            #6a0c6a 100%);
          color: #ffffff;
          cursor: pointer;
          margin-top: 10px;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(232, 67, 147, 0.5);
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transition: left 0.6s;
        }

        .login-btn:hover::before {
          left: 100%;
        }

        .login-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 45px rgba(232, 67, 147, 0.6);
        }

        .login-btn:active {
          transform: translateY(-2px) scale(1);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 35px 25px;
            border-radius: 24px;
            margin: 10px;
          }

          h2 {
            font-size: 28px;
          }

          .subtitle {
            font-size: 20px;
          }

          .avatar {
            font-size: 70px;
          }

          .input-box input {
            padding: 14px 18px;
            font-size: 16px;
          }

          .login-btn {
            padding: 14px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .login-card {
            padding: 60px 40px;
          }
        }
      `}</style>
    </div>
  );
}