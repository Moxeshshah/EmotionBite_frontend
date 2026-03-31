"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ClosureSpace() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const closureSuggestions = [
    "I wish you peace and happiness in your journey.",
    "Thank you for the memories we shared.",
    "This is my goodbye, with gratitude in my heart.",
    "I'm letting go with peace and understanding.",
    "May your path ahead be filled with light.",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/closure/login?code=${code}`);
    }
  }, [router, code]);

  const fill = (text) => {
    setMessage(text);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Write your final words before sending 🌙");
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
          receiverMobile: "",
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

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/closure/greet?code=${code}`);
      }, 2000);

      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const moons = [
    { className: "one", emoji: "🌙", style: { top: "15%", left: "20%" } },
    { className: "two", emoji: "🌒", style: { bottom: "25%", right: "15%" } },
    { className: "three", emoji: "🌓", style: { top: "60%", left: "10%" } },
  ];

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "35%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "55%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "75%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "90%", animationDelay: "3s" }} />

      {/* Floating moon elements */}
      {moons.map((m, idx) => (
        <div
          key={idx}
          className="moon-float"
          style={{
            fontSize: "28px",
            opacity: 0.12,
            ...m.style,
          }}
        >
          {m.emoji}
        </div>
      ))}

      {/* Background shapes */}
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <div className="avatar">🌙</div>
            <h1>Write Your Closure</h1>
            <p>Some endings bring the deepest peace. Let go gently.</p>
          </div>

          {/* Receiver Name Input */}
          <div className="name-input-compact">
            <input
              type="text"
              placeholder="Enter their name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="name-input"
            />
          </div>

          <div
            className="suggestions-title toggle"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <span>Need gentle words? 🌌</span>
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
              {closureSuggestions.map((sugg, idx) => (
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

          <div className="input-box">
            <label>Your Final Message</label>
            <textarea
              placeholder="Write your closure message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="message-input"
            />
          </div>

          <button type="button" className="send-btn" onClick={sendMessage}>
            Send & Release 🕊
          </button>
        </div>
      </div>

      {toastVisible && (
        <div className="toast">
          🌙 Your message has been released peacefully.
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #6a11cb 50%, #4a0e7a 75%, #2d1b69 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
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
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 12s infinite linear;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        }

        .particle-1 {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #a8bfff, #8c9eff);
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #b19cd9, #9b8ed9);
          animation-duration: 14s;
        }

        .particle-3 {
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #764ba2, #6a11cb);
          animation-duration: 11s;
        }

        .particle-4 {
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #4a0e7a, #667eea);
          animation-duration: 13s;
        }

        .particle-5 {
          width: 9px;
          height: 9px;
          background: linear-gradient(45deg, #2d1b69, #764ba2);
          animation-duration: 15s;
        }

        .moon-float {
          position: absolute;
          pointer-events: none;
          animation: gentleFloat 16s infinite ease-in-out;
          filter: drop-shadow(0 4px 16px rgba(138, 158, 255, 0.3));
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(-8px) rotate(-3deg); }
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(6px);
          animation: floatShape 20s infinite ease-in-out;
        }

        .shape-one {
          width: 140px;
          height: 140px;
          background: rgba(255, 255, 255, 0.15);
          top: 10%;
          left: 5%;
        }

        .shape-two {
          width: 100px;
          height: 100px;
          background: rgba(138, 158, 255, 0.2);
          bottom: 15%;
          right: 10%;
          animation-direction: reverse;
        }

        .shape-three {
          width: 80px;
          height: 80px;
          background: rgba(178, 190, 255, 0.15);
          top: 65%;
          left: 15%;
        }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.08); }
        }

        .card {
          width: min(580px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(28px);
          border-radius: 30px;
          padding: 36px 32px;
          box-shadow: 
            0 30px 70px rgba(106, 17, 203, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 28px;
        }

        .avatar {
          font-size: 56px;
          margin-bottom: 16px;
          animation: gentlePulse 4s infinite ease-in-out;
        }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero-section h1 {
          font-family: "Cormorant Garamond", serif;
          font-size: 34px;
          font-weight: 500;
          background: linear-gradient(135deg, #fff, #e0e6ff, #b8c0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(138, 158, 255, 0.3);
        }

        .hero-section p {
          font-size: 15.5px;
          opacity: 0.92;
          line-height: 1.7;
          font-weight: 300;
          max-width: 320px;
          margin: 0 auto;
        }

        .name-input-compact {
          margin: 24px 0 20px 0;
        }

        .name-input {
          width: 100%;
          padding: 18px 22px;
          border-radius: 25px;
          border: none;
          outline: none;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #333;
          font-weight: 500;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
        }

        .name-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        .name-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 15px 40px rgba(138, 158, 255, 0.3),
            0 0 0 4px rgba(106, 17, 203, 0.2);
          transform: translateY(-3px);
        }

        .suggestions-title.toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 14.5px;
          margin: 20px 0 16px;
          opacity: 0.95;
          font-weight: 500;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          backdrop-filter: blur(14px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.22);
        }

        .suggestions-title.toggle:hover {
          background: rgba(255, 255, 255, 0.26);
          transform: translateY(-2px);
        }

        .dropdown-icon {
          transition: transform 0.3s ease;
          color: rgba(255, 255, 255, 0.9);
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 12px;
        }

        .suggestions-wrapper.open {
          max-height: 500px;
        }

        .suggestions {
          margin-top: 12px;
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.22);
          padding: 18px 20px;
          border-radius: 24px;
          font-size: 14.5px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          line-height: 1.65;
          font-weight: 400;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
        }

        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.36);
          transform: translateX(10px) scale(1.02);
          box-shadow: 0 14px 40px rgba(138, 158, 255, 0.3);
        }

        .input-box {
          margin-bottom: 20px;
          text-align: left;
        }

        .input-box label {
          font-size: 13px;
          color: #fff;
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          opacity: 0.95;
        }

        .message-input {
          width: 100%;
          padding: 20px 22px;
          border-radius: 26px;
          border: none;
          resize: vertical;
          outline: none;
          font-size: 15px;
          color: #333;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          line-height: 1.65;
          font-family: "Inter", sans-serif;
          min-height: 130px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.22);
        }

        .message-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 18px 45px rgba(138, 158, 255, 0.35),
            0 0 0 4px rgba(106, 17, 203, 0.25);
          transform: translateY(-3px);
        }

        .message-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        .send-btn {
          width: 100%;
          padding: 20px 28px;
          border: none;
          border-radius: 34px;
          background: linear-gradient(135deg, #667eea, #764ba2, #6a11cb);
          background-size: 300% 300%;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 15px 45px rgba(106, 17, 203, 0.45);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: "Inter", sans-serif;
          position: relative;
          overflow: hidden;
          margin-top: 0px;
        }

        .send-btn:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 25px 60px rgba(106, 17, 203, 0.6);
          background-position: 100% 0;
        }

        .toast {
          position: fixed;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.96);
          color: #6a11cb;
          padding: 18px 32px;
          border-radius: 38px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 60px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(106, 17, 203, 0.25);
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .body { padding: 18px 20px; }
          .card { padding: 32px 28px; border-radius: 26px; }
          .hero-section h1 { font-size: 30px; }
          .hero-section p { font-size: 14.5px; }
          .avatar { font-size: 52px; }
        }

        @media (max-width: 480px) {
          .body { padding: 16px 18px; }
          .card { padding: 28px 24px; border-radius: 24px; }
          .hero-section h1 { font-size: 28px; }
          .hero-section p { font-size: 14px; }
          .avatar { font-size: 48px; }
          .message-input { min-height: 120px; padding: 18px 20px; font-size: 14.5px; }
          .name-input { padding: 16px 20px; font-size: 14.5px; }
          .moon-float { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
}