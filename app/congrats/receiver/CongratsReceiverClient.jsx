"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function CongratsReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [data, setData] = useState(null);

  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        setData({
          sender: apiData.senderName,
          message: apiData.messageText,
          image: apiData.imageUrl,
          video: apiData.videoUrl,
          audio: apiData.audioUrl,
        });
      })
      .catch(console.error);
  }, [code]);

  if (!data) {
    return <div className="state-screen">Loading celebration...</div>;
  }

  return (
    <div className="container">
      <div className="confetti" style={{ top: "10%", left: "15%" }} />
      <div className="confetti pink" style={{ top: "60%", right: "10%" }} />
      <div className="confetti blue" style={{ top: "30%", left: "70%" }} />
      <div className="confetti green" style={{ bottom: "15%", right: "25%" }} />

      {!opened ? (
        <div className="gift-card" onClick={() => setOpened(true)}>
          <BrandHeader />
          <div className="gift">🎁</div>
          <h2 className="gift-title">A Special Celebration Awaits!</h2>
          <p className="gift-subtitle">
            {data.sender || "Someone special"} has sent you an amazing congratulatory message
          </p>
          <div className="tap">Tap to open your celebration ✨</div>
        </div>
      ) : (
        <div className="celebration-card">
          <BrandHeader />
          <div className="header">
            <div className="emoji">🎉</div>
            <div className="title">Congratulations!</div>
            <div className="subtitle">You've earned this moment of joy</div>
            <div className="from">With love from {data.sender}</div>
          </div>

          <div className="message-card">{data.message}</div>

          {data.image && (
            <div className="media-section">
              <div className="media-label">📸 A cherished memory was shared</div>
              <div
                className={`media-card ${revealMedia ? "show" : ""}`}
                onClick={() => setRevealMedia(true)}
              >
                <img src={data.image} alt="celebration" />
                {!revealMedia && <div className="overlay">Tap to reveal the memory</div>}
              </div>
            </div>
          )}

          <div className="footer-note">
            Keep shining bright and celebrating every milestone on your incredible journey! ✨
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

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
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .state-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
          color: white;
          font-size: 18px;
          font-weight: 500;
          padding: 20px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
          font-family: 'Poppins', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .confetti {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffeb3b;
          opacity: 0.6;
          animation: float 8s infinite ease-in-out;
          pointer-events: none;
        }

        .confetti.pink {
          background: #ff4081;
        }

        .confetti.blue {
          background: #00e5ff;
        }

        .confetti.green {
          background: #69f0ae;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-35px);
          }
        }

        .gift-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 40px;
          width: min(360px, 100%);
          text-align: center;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
          position: relative;
          z-index: 2;
        }

        .gift {
          font-size: 70px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        .gift-title {
          font-size: 22px;
          font-weight: 600;
          margin: 12px 0 8px 0;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .gift-subtitle {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
          opacity: 0.95;
          margin-bottom: 16px;
        }

        .tap {
          margin-top: 12px;
          font-size: 13px;
          font-weight: 500;
          opacity: 0.9;
          letter-spacing: 0.5px;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .celebration-card {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 28px;
          width: min(380px, 100%);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.5s ease;
          position: relative;
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 24px;
        }

        .emoji {
          font-size: 40px;
          margin-bottom: 8px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
          line-height: 1.2;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 14px;
          font-weight: 400;
          opacity: 0.9;
          margin-bottom: 6px;
          font-style: italic;
        }

        .from {
          font-size: 13px;
          font-weight: 500;
          opacity: 0.85;
          letter-spacing: 0.3px;
        }

        .message-card {
          background: white;
          color: #333;
          padding: 22px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.7;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          border-left: 5px solid #ff9800;
          word-break: break-word;
          font-weight: 400;
          font-family: 'Poppins', sans-serif;
        }

        .media-section {
          margin-top: 24px;
        }

        .media-label {
          font-size: 12px;
          font-weight: 500;
          opacity: 0.85;
          margin-bottom: 8px;
          letter-spacing: 0.3px;
        }

        .media-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.5s;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .media-card.show {
          height: 220px;
        }

        .media-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .media-card.show img {
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
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .footer-note {
          margin-top: 24px;
          font-size: 13px;
          font-weight: 400;
          opacity: 0.9;
          text-align: center;
          line-height: 1.5;
          letter-spacing: 0.2px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 16px;
          }

          .gift-card {
            padding: 34px 24px;
            border-radius: 24px;
          }

          .celebration-card {
            padding: 24px;
            border-radius: 24px;
          }

          .gift {
            font-size: 64px;
          }

          .title {
            font-size: 26px;
          }

          .message-card {
            font-size: 14px;
            padding: 18px;
          }

          .media-card.show {
            height: 200px;
          }

          .media-card img {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px;
          }

          .gift-card {
            padding: 28px 18px;
            border-radius: 20px;
          }

          .celebration-card {
            padding: 18px;
            border-radius: 20px;
          }

          .gift {
            font-size: 56px;
          }

          .gift-title {
            font-size: 20px;
          }

          .title {
            font-size: 24px;
          }

          .message-card {
            font-size: 13px;
            padding: 16px;
            line-height: 1.6;
          }

          .media-card.show {
            height: 180px;
          }

          .media-card img {
            height: 180px;
          }

          .footer-note {
            font-size: 12px;
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