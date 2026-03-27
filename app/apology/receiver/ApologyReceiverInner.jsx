"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrandHeader from "../BrandHeader";

export default function ApologyReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const params = useSearchParams();
  const code = params.get("code");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        console.log("API DATA:", apiData);

        setData({
          sender: apiData.senderName,
          receiver: apiData.receiverName,
          message: apiData.messageText,
          image: apiData.image_url,
          video: apiData.video_url,
          audio: apiData.audio_url,
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [code]);

  if (!data) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div className="container">
      <div className="float f1">🕊</div>
      <div className="float f2">✨</div>
      <div className="float f3">🌧</div>

      {!opened ? (
        <div className="closed-card" onClick={() => setOpened(true)}>
          <BrandHeader />
          <div className="emoji">💌</div>
          <h2 className="hero-title">A message for you</h2>
          <p>Someone wants to say something important</p>
          <div className="hint">Tap to open</div>
        </div>
      ) : (
        <div className="letter-card">
          <BrandHeader />
          <div className="title">
            Someone Truly Regrets… and This Is for You, {data.receiver} 💔
          </div>
          <div className="paper">
            <p className="text">"{data.message}"</p>
            <div className="from">— {data.sender}</div>
          </div>

          {data.image && (
            <div className="memory-section">
              <div className="memory-label">A memory was shared</div>
              <div
                className={`memory-card ${revealImage ? "show" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="memory" />
                {!revealImage && <div className="overlay">Tap to reveal</div>}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
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

        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #3a1c71, #d76d77, #ffaf7b);
          font-family: "Inter", sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .float {
          position: absolute;
          font-size: 30px;
          opacity: 0.12;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .f1 { top: 15%; left: 10%; }
        .f2 { top: 30%; right: 20%; }
        .f3 { bottom: 20%; left: 25%; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .closed-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          border-radius: 26px;
          padding: 40px;
          width: min(360px, 100%);
          text-align: center;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          animation: fadeIn 0.5s ease;
          z-index: 2;
          position: relative;
          overflow: hidden;
        }

        .closed-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #ff9a9e, #fecfef, #ff9a9e, transparent);
          border-radius: 26px 26px 0 0;
        }

        .emoji {
          font-size: 64px;
          margin-bottom: 16px;
          animation: bounce 2s infinite;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
        }

        /* NEW HERO TITLE STYLING */
        .hero-title {
          font-family: "Playfair Display", serif;
          font-size: clamp(28px, 8vw, 36px);
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #f8f7ff 50%, #e8d5e8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 12px rgba(0,0,0,0.3);
          margin-bottom: 12px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          position: relative;
        }

        .hero-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ff9a9e, #fecfef);
          border-radius: 2px;
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 8px #ff9a9e; }
          50% { box-shadow: 0 0 16px #fecfef, 0 0 24px #ff9a9e; }
        }

        .hint {
          margin-top: 16px;
          font-size: 14px;
          opacity: 0.85;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .letter-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 26px;
          padding: 28px;
          width: min(380px, 100%);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.5s ease;
          z-index: 2;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: clamp(20px, 5.5vw, 24px);
          text-align: center;
          margin-bottom: 20px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.95);
        }

        .paper {
          background: linear-gradient(180deg, #ffffff, #f8f8f8);
          color: #444;
          padding: 26px;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          margin-bottom: 16px;
        }

        .text {
          font-family: "Playfair Display", serif;
          font-size: 17px;
          line-height: 1.9;
          font-style: italic;
          margin-bottom: 14px;
        }

        .from {
          margin-top: 14px;
          font-size: 14px;
          opacity: 0.7;
          font-style: italic;
          text-align: right;
        }

        .memory-section { margin-top: 16px; }
        .memory-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }
        .memory-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: 0.5s;
        }
        .memory-card.show { height: 220px; }
        .memory-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }
        .memory-card.show img {
          filter: blur(0);
          transform: scale(1.05);
        }
        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          font-size: 12px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .container { padding: 16px; }
          .closed-card { padding: 32px 24px; width: 100%; }
          .letter-card { padding: 22px; width: 100%; }
          .hero-title { font-size: clamp(24px, 8vw, 32px); }
          .paper { padding: 22px; }
          .text { font-size: 16px; line-height: 1.8; }
          .float { font-size: 26px; opacity: 0.1; }
        }

        @media (max-width: 480px) {
          .container { padding: 12px; }
          .closed-card { padding: 28px 18px; border-radius: 22px; }
          .letter-card { padding: 18px; border-radius: 22px; }
          .emoji { font-size: 54px; }
          .hero-title { 
            font-size: clamp(22px, 9vw, 28px);
            margin-bottom: 10px;
          }
          .hint { font-size: 13px; }
          .paper { padding: 18px; border-radius: 16px; }
          .text { font-size: 15px; }
          .float { font-size: 22px; }
          .f1 { top: 8%; left: 4%; }
          .f2 { top: 20%; right: 8%; }
          .f3 { bottom: 10%; left: 8%; }
        }
      `}</style>
    </div>
  );
}