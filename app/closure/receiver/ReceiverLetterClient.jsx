"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ReceiverLetter() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) {
      setError("Message code not found");
      return;
    }

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!apiData) {
          setError("No message found");
          return;
        }

        setData({
          receiverName: apiData.receiverName || "For You",
          sender: apiData.senderName || "Someone who cared",
          message: apiData.messageText,
          image: apiData.imageUrl,
        });
      })
      .catch(() => setError("Server error"));
  }, [code]);

  if (!data && !error) {
    return <div className="state-screen">Loading your message...</div>;
  }

  if (error) {
    return <div className="state-screen">{error}</div>;
  }

  return (
    <div className={opened ? "main-container open" : "main-container"}>
      {/* Floating Particles */}
      <div className="particle" style={{ left: "20%" }} />
      <div className="particle" style={{ left: "45%", animationDelay: "3s" }} />
      <div className="particle" style={{ left: "70%", animationDelay: "6s" }} />
      <div className="particle" style={{ left: "85%", animationDelay: "2s" }} />

      {/* Main Card Container */}
      <div className={`letter-card ${opened ? "opened" : ""}`}>
        {!opened ? (
          <div className="closed-envelope" onClick={() => setOpened(true)}>
            <div className="envelope-icon">📩</div>
            <div className="envelope-title">A message awaits ✨</div>
            <div className="envelope-hint">Tap to open 💫</div>
          </div>
        ) : (
          <div className="letter-content">
            <BrandHeader />
            
            <div className="header-section">
              <div className="moon">🌙</div>
              <h2 className="receiver-name">{data.receiverName}</h2>
            </div>

            <div className="letter-paper">
              <p className="message-text">"{data.message}"</p>

              {data.image && (
                <div className="memory-section">
                  <div className="memory-label">✨ A memory was shared</div>
                  <div
                    className={`memory-card ${revealImage ? "revealed" : ""}`}
                    onClick={() => setRevealImage(true)}
                  >
                    <img src={data.image} alt="memory" />
                    {!revealImage && (
                      <div className="memory-overlay">
                        <span className="memory-text">Tap to reveal</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="sender-name">— {data.sender}</div>
            <div className="peace-note">
              🌿 Some messages are meant to bring peace, not replies.
            </div>
          </div>
        )}
      </div>

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

        .state-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3a1c71;
          color: white;
          font-size: 18px;
          padding: 20px;
          text-align: center;
        }

        .main-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top, #6a11cb, #3a1c71);
          transition: background 0.6s ease;
          padding: 20px;
        }

        .main-container.open {
          background: radial-gradient(circle at top, #141e30, #000010);
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float 10s infinite linear;
          pointer-events: none;
          top: 0;
          z-index: 1;
        }

        /* RESTORED ORIGINAL HEADER */
        .header-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .moon {
          font-size: 40px;
          animation: glow 3s ease-in-out infinite alternate;
        }

        /* SAME ELEGANT FONT + GLITCH FIX */
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Parisienne&display=swap');

        .receiver-name {
          font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.8px;
          text-align: center;
          margin: 0;
          color: white;
          text-shadow: 
            0 4px 12px rgba(0,0,0,0.4),
            0 0 30px rgba(255,255,255,0.2);
          max-width: 90%;
          word-break: break-word;
          overflow-wrap: break-word;
          padding: 0 10px;
        }

        .receiver-name:hover {
          transform: scale(1.02);
          text-shadow: 
            0 5px 16px rgba(0,0,0,0.5),
            0 0 40px rgba(255,255,255,0.4);
        }

        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }

        /* ORIGINAL CARD LAYOUT RESTORED */
        .letter-card {
          width: min(450px, 95%);
          min-height: 500px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.95);
          animation: cardEntrance 0.8s ease-out;
        }

        .letter-card.opened {
          transform: scale(1);
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        @keyframes cardEntrance {
          0% { opacity: 0; transform: scale(0.7) rotateX(20deg); }
          100% { opacity: 1; transform: scale(0.95) rotateX(0deg); }
        }

        .closed-envelope {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .closed-envelope:hover {
          transform: translateY(-5px);
        }

        .envelope-icon {
          font-size: 80px;
          animation: bounce 2s infinite;
          margin-bottom: 20px;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .envelope-title {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .envelope-hint {
          font-size: 15px;
          opacity: 0.8;
          letter-spacing: 0.5px;
        }

        .letter-content {
          height: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          color: white;
          overflow-y: auto;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
          to { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
        }

        .letter-paper {
          background: linear-gradient(180deg, rgba(255,247,237,0.95), rgba(255,232,214,0.9));
          color: #3b2f2f;
          padding: 35px;
          border-radius: 25px;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          text-align: left;
          backdrop-filter: blur(10px);
          margin-bottom: 25px;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }

        .letter-paper:hover {
          transform: translateY(0);
        }

        .message-text {
          font-size: 19px;
          line-height: 1.85;
          font-style: italic;
          word-break: break-word;
          margin-bottom: 0;
        }

        .memory-section {
          margin-top: 30px;
        }

        .memory-label {
          font-size: 13px;
          opacity: 0.8;
          margin-bottom: 12px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .memory-card {
          position: relative;
          height: 70px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .memory-card:hover {
          transform: translateY(-3px);
        }

        .memory-card.revealed {
          height: 280px;
        }

        .memory-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          filter: blur(15px) brightness(0.65);
          transform: scale(1.1);
          transition: all 0.8s ease;
        }

        .memory-card.revealed img {
          filter: blur(0) brightness(1);
          transform: scale(1);
        }

        .memory-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
        }

        .memory-text {
          background: rgba(255, 255, 255, 0.98);
          color: #333;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .sender-name {
          margin-top: 20px;
          font-size: 16px;
          opacity: 0.9;
          font-style: italic;
          letter-spacing: 0.3px;
        }

        .peace-note {
          margin-top: 15px;
          font-size: 13px;
          opacity: 0.75;
          font-style: italic;
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .letter-card {
            width: 95%;
            min-height: 450px;
            border-radius: 25px;
          }
          
          .letter-content {
            padding: 30px 25px;
          }
          
          .letter-paper {
            padding: 28px;
          }
          
          .envelope-icon {
            font-size: 70px;
          }
          
          .receiver-name {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 15px;
          }
          
          .letter-card {
            min-height: 420px;
            border-radius: 20px;
          }
          
          .letter-content {
            padding: 25px 20px;
          }
          
          .letter-paper {
            padding: 22px;
          }
          
          .envelope-icon {
            font-size: 65px;
          }
          
          .receiver-name {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}