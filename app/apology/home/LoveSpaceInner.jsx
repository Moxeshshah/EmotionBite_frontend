"use client";

import { useState, useRouter, useSearchParams, useEffect } from "react";
import { useRouter as useNextRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ApologySpace() {
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const router = useNextRouter();
  const [receiverName, setReceiverName] = useState("");
  const params = useNextSearchParams();
  const code = params.get("code");

  const suggestions = [
    "I'm truly sorry for hurting you 💔",
    "Please forgive me, I messed up 🙏",
    "I never meant to cause you pain 😔",
    "Let me make this right again 🤍",
  ];

  const fill = (text) => {
    setMessage(text);
  };

  useEffect(() => {
    if (!code) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(`/apology/login?code=${code}`);
    }
  }, [code, router]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Please write your apology message 💌");
      return;
    }

    if (receiverName.trim() === "") {
      alert("Enter receiver name");
      return;
    }

    try {
      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName,
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

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/apology/greet?code=${code}`);
      }, 1500);

      setMessage("");
      setReceiverName("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="body">
      <div className="sticker s1">🕊</div>
      <div className="sticker s2">🌧</div>
      <div className="sticker s3">✨</div>

      <div className="apology-card">
        <BrandHeader />
        <h2>Let Me Make This Right 💌</h2>

        <div className="subtitle">
          Sometimes a sincere "I'm sorry" 🤍 <br />
          can begin the journey of healing 🕊 <br />
          Share your heartfelt apology.
        </div>

        <div className="input-group">
          <label>Who You're Apologizing To</label>
          <input
            type="text"
            placeholder="Enter their name 🕊"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>

        <div className="suggestion-container">
          {suggestions.map((sugg, idx) => (
            <div key={idx} onClick={() => fill(sugg)} className="suggestion-chip">
              {sugg}
            </div>
          ))}
        </div>

        <div className="input-group">
          <label>Your Apology Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your sincere apology here..."
            rows={4}
          />
        </div>

        <button onClick={sendMessage} className="apology-btn">
          Send My Apology 💝
        </button>
      </div>

      {toastVisible && (
        <div className="toast">
          💌 Your apology has been sent.
        </div>
      )}

      <style jsx>{`
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);
          overflow: hidden;
          position: relative;
          color: #fff;
          padding: 12px;
        }

        .sticker {
          position: absolute;
          font-size: clamp(28px, 6vw, 42px);
          opacity: 0.18;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .s1 {
          top: 8%;
          left: 12%;
        }

        .s2 {
          bottom: 12%;
          right: 15%;
        }

        .s3 {
          top: 18%;
          right: 20%;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .apology-card {
          width: min(420px, 100%);
          max-height: 90vh;
          padding: clamp(25px, 8vw, 55px) clamp(18px, 5vw, 45px);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.35);
          text-align: center;
          position: relative;
          z-index: 2;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        h2 {
          font-family: "Playfair Display", serif;
          font-size: clamp(24px, 7vw, 32px);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: clamp(13px, 3.5vw, 15px);
          margin-bottom: 0;
          line-height: 1.6;
          opacity: 0.95;
        }

        .input-group {
          margin-bottom: 0;
          text-align: left;
        }

        .input-group label {
          font-size: clamp(12px, 3vw, 13px);
          display: block;
          margin-bottom: 6px;
          opacity: 0.9;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: clamp(10px, 3vw, 13px);
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          font-size: clamp(13px, 3.5vw, 14px);
          font-family: inherit;
          resize: none;
        }

        .input-group textarea {
          min-height: clamp(100px, 25vw, 130px);
        }

        .suggestion-container {
          display: flex;
          gap: 8px;
          margin-bottom: 0;
          overflow-x: auto;
          padding-bottom: 8px;
          WebkitOverflowScrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .suggestion-container::-webkit-scrollbar {
          display: none;
        }

        .suggestion-chip {
          min-width: clamp(140px, 35vw, 160px);
          padding: clamp(8px, 2.5vw, 10px) clamp(12px, 3vw, 14px);
          border-radius: 20px;
          font-size: clamp(11px, 3vw, 12px);
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: 0.3s;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .suggestion-chip:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .apology-btn {
          width: 100%;
          padding: clamp(14px, 4vw, 16px);
          border: none;
          border-radius: 30px;
          background: #ffffff;
          color: #3a1c71;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: clamp(15px, 4vw, 17px);
          cursor: pointer;
          transition: 0.3s;
          margin-top: auto;
        }

        .apology-btn:hover {
          background: #ffe5ec;
          transform: translateY(-3px);
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #3a1c71;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: clamp(13px, 3.5vw, 14px);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          z-index: 100;
          animation: slideUp 0.3s ease;
          max-width: 90vw;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 10px;
          }

          .apology-card {
            padding: clamp(20px, 8vw, 40px) clamp(15px, 6vw, 28px);
            border-radius: 20px;
            gap: 14px;
          }

          .sticker {
            opacity: 0.14;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 8px;
          }

          .apology-card {
            padding: clamp(18px, 7vw, 30px) clamp(12px, 5vw, 18px);
            border-radius: 18px;
            gap: 12px;
          }

          .sticker {
            font-size: clamp(24px, 8vw, 28px);
          }

          .s1 {
            top: 5%;
            left: 6%;
          }

          .s2 {
            bottom: 8%;
            right: 8%;
          }

          .s3 {
            top: 12%;
            right: 8%;
          }
        }
      `}</style>
    </div>
  );
}