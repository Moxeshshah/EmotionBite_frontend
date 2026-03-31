"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function CongratsConnect() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/congrats/login?code=${code}`);
    }
  }, [router, code]);

  const suggestions = [
    "From the moment I met you, I knew you were my forever.",
    "Will you make me the happiest person by saying YES? 💍",
    "Every love story is special, but ours is my favorite.",
    "You make every day brighter just by being you. ✨"
  ];

  const fill = (text) => {
    setMessage(text);
  };

  const sendWish = async () => {
    if (message.trim() === "") {
      alert("Please write a message 🎉");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName || "Receiver",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);

      setMessage("");
      router.push(`/congrats/greet?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const floatingIcons = [
    { className: "one", emoji: "🎉", style: { top: "10%", left: "15%" } },
    { className: "two", emoji: "✨", style: { bottom: "20%", right: "10%" } },
    { className: "three", emoji: "🎊", style: { top: "60%", left: "10%" } },
  ];

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Floating celebration icons */}
      {floatingIcons.map((icon, idx) => (
        <div
          key={idx}
          className={`congrats-float ${icon.className}`}
          style={{
            animationDelay: `${idx * 2}s`,
            ...icon.style,
          }}
        >
          {icon.emoji}
        </div>
      ))}

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <h1>Send Joyful Wishes 🎉</h1>
            <p>Create magical moments they&apos;ll cherish forever.</p>
          </div>

          {/* Recipient Name Field */}
          <div className="field">
            <label>Recipient&apos;s Name 🎈</label>
            <input
              type="text"
              placeholder="Enter recipient&apos;s name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="name-input"
            />
          </div>

          {/* Congratulation Message */}
          <div className="field">
            <label>Write Your Celebration Message 💌</label>
            <textarea
              placeholder="You totally deserve this! Keep shining bright..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              rows={4}
            />
          </div>

          {/* Suggestions Toggle */}
          <div 
            className="suggestions-title toggle"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <span>Need celebration inspiration? ✨</span>
            <span className={`dropdown-icon ${showSuggestions ? "open" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          
          <div className={`suggestions-wrapper ${showSuggestions ? "open" : ""}`}>
            <div className="suggestions">
              {suggestions.map((sugg, idx) => (
                <div
                  key={idx}
                  className="suggestion-box"
                  onClick={() => fill(sugg)}
                >
                  {sugg}
                </div>
              ))}
            </div>
          </div>

          <button onClick={sendWish} className="send-btn">
            Send Celebration Cheers 🎊
          </button>

          {toastVisible && (
            <div className="toast">
              🎉 Your congratulation has been sent!
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
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
          background: linear-gradient(135deg, #4a00e0, #8e2de2, #ff6a00, #ffeb3b);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
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
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 10s infinite linear;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }

        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ffeb3b, #ff6a00); }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #8e2de2, #4a00e0); animation-duration: 12s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #ff6a00, #ffeb3b); animation-duration: 9s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #4a00e0, #8e2de2); animation-duration: 11s; }
        .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #ffeb3b, #ff6a00); animation-duration: 13s; }

        .congrats-float {
          position: absolute;
          font-size: 32px;
          opacity: 0.15;
          animation: float 12s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.4));
          pointer-events: none;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(4px);
          animation: floatShape 16s infinite ease-in-out;
        }
        .shape-one { width: 120px; height: 120px; background: rgba(255, 255, 255, 0.4); top: 12%; left: 8%; }
        .shape-two { width: 90px; height: 90px; background: rgba(255, 235, 59, 0.3); bottom: 18%; right: 12%; animation-direction: reverse; }
        .shape-three { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.3); top: 70%; left: 18%; }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        .card {
          width: min(580px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 32px 28px;
          box-shadow: 
            0 25px 60px rgba(74, 0, 224, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(25px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .content { position: relative; z-index: 2; }

        .hero-section {
          text-align: center;
          margin-bottom: 28px;
        }
        .hero-section h1 {
          font-family: "Dancing Script", cursive;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #ffeb3b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          line-height: 1.1;
          text-shadow: 0 4px 15px rgba(255, 235, 59, 0.3);
        }
        .hero-section p {
          font-size: 15px;
          opacity: 0.95;
          line-height: 1.7;
          font-weight: 300;
        }

        .field {
          margin-bottom: 10px;
        }
        .field label {
          display: block;
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.95;
          font-weight: 500;
        }

        .name-input {
          width: 100%;
          padding: 16px 20px;
          border-radius: 24px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.92);
          color: #333;
          font-size: 15px;
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          font-family: "Poppins", sans-serif;
        }
        .name-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 12px 35px rgba(255, 235, 59, 0.35);
          transform: translateY(-2px);
        }

        .message-input {
          width: 100%;
          height: 120px;
          padding: 20px;
          border-radius: 24px;
          border: none;
          resize: none;
          outline: none;
          font-size: 15px;
          color: #333;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          font-family: "Poppins", sans-serif;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          margin-bottom: 0px;
        }
        .message-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 12px 35px rgba(255, 235, 59, 0.35);
          transform: translateY(-2px);
        }
        .message-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        .suggestions-title.toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          margin: 16px 0 12px;
          opacity: 0.95;
          font-weight: 500;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .suggestions-title.toggle:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }
        .dropdown-icon {
          transition: transform 0.3s ease;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }
        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 0px;
        }
        .suggestions-wrapper.open {
          max-height: 450px;
        }
        .suggestions { margin-top: 8px; }
        .suggestion-box {
          background: rgba(255, 255, 255, 0.22);
          padding: 16px;
          border-radius: 22px;
          font-size: 14px;
          margin-bottom: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          line-height: 1.6;
          font-weight: 400;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateX(8px) scale(1.01);
          box-shadow: 0 10px 30px rgba(255, 235, 59, 0.3);
        }

        .send-btn {
          width: 100%;
          padding: 18px 24px;
          border: none;
          border-radius: 32px;
          background: linear-gradient(135deg, #ff6a00, #ffeb3b, #4a00e0);
          background-size: 300% 300%;
          color: #fff;
          font-weight: 400;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(74, 0, 224, 0.5);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Poppins", sans-serif;
          position: relative;
          overflow: hidden;
        }
        .send-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 45px rgba(74, 0, 224, 0.65);
          background-position: 100% 0;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #ff6a00;
          padding: 16px 28px;
          border-radius: 35px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
          max-width: calc(100vw - 48px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px);
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .body { padding: 14px; }
          .card { padding: 28px 24px; border-radius: 24px; }
          .hero-section h1 { font-size: 28px; }
        }

        @media (max-width: 480px) {
          .body { padding: 12px; }
          .card { padding: 24px 20px; border-radius: 22px; }
          .hero-section h1 { font-size: 26px; }
          .message-input { height: 110px; padding: 18px; }
        }
      `}</style>
    </div>
  );
}