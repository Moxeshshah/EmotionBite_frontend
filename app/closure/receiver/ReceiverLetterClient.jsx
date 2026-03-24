
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReceiverLetter() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const code = params.get("code");   // same pattern as other categories

  // Fetch message
useEffect(() => {
  if (!code) {
    setError("Message code not found");
    return;
  }

  fetch(`/api/messages?code=${code}`)
    .then(res => res.json())
    .then(apiData => {
      if (!apiData) {
        setError("No message found");
        return;
      }

      setData({
        receiverName: apiData.receiverName || "For You",
        sender: apiData.senderName || "Someone who cared",
        message: apiData.messageText,
        image: apiData.imageUrl,   // ✅ fixed key
      });
    })
    .catch(() => setError("Server error"));
}, [code]);

  // Loading
  if (!data && !error) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#3a1c71",
        color: "white",
        fontSize: "18px"
      }}>
        Loading your message...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#3a1c71",
        color: "white",
        fontSize: "18px"
      }}>
        {error}
      </div>
    );
  }

  return (
    <div className={opened ? "container open" : "container"}>
      {/* Floating particles */}
      <div className="particle" style={{ left: "20%" }} />
      <div className="particle" style={{ left: "45%", animationDelay: "3s" }} />
      <div className="particle" style={{ left: "70%", animationDelay: "6s" }} />
      <div className="particle" style={{ left: "85%", animationDelay: "2s" }} />

      {!opened ? (
        /* Closed */
        <div className="closed" onClick={() => setOpened(true)}>
          <div className="emoji">📩</div>
          <div className="title">A message awaits ✨</div>
          <div className="hint">Tap to open 💫</div>
        </div>
      ) : (
        /* Opened */
        <div className="letter-wrapper">
          <div className="moon">🌙</div>

          <h2 className="receiver">{data.receiverName}</h2>

          <div className="letter-paper">
            <p className="message">“{data.message}”</p>

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

          <div className="sender">— {data.sender}</div>
          <div className="note">
            🌿 Some messages are meant to bring peace, not replies.
          </div>
        </div>
      )}

      {/* DESIGN (unchanged) */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top, #6a11cb, #3a1c71);
          transition: background 0.6s ease;
          padding: 20px;
        }

        .container.open {
          background: radial-gradient(circle at top, #141e30, #000010);
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: float 10s infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }

        .closed { cursor: pointer; }

        .emoji {
          font-size: 72px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .title { margin-top: 16px; font-size: 20px; }
        .hint { margin-top: 6px; font-size: 13px; opacity: 0.75; }

        .letter-wrapper { width: 420px; max-width: 100%; }
        .moon { font-size: 36px; margin-bottom: 8px; }

        .receiver { font-size: 30px; margin-bottom: 18px; }

        .letter-paper {
          background: linear-gradient(180deg, #fff7ed, #ffe8d6);
          color: #3b2f2f;
          padding: 28px;
          border-radius: 22px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          text-align: left;
        }

        .message {
          font-size: 18px;
          line-height: 1.9;
          font-style: italic;
        }

        .memory-section { margin-top: 22px; }
        .memory-label { font-size: 12px; opacity: 0.75; margin-bottom: 8px; }

        .memory-card {
          position: relative;
          height: 60px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          transition: all 0.5s ease;
        }

        .memory-card.revealed { height: 260px; }

        .memory-card img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          filter: blur(14px) brightness(0.7);
          transform: scale(1.1);
          transition: all 0.7s ease;
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
          background: rgba(0,0,0,0.35);
        }

        .memory-text {
          background: rgba(255,255,255,0.95);
          color: #333;
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 12px;
        }

        .sender { margin-top: 18px; font-size: 14px; opacity: 0.85; }
        .note { margin-top: 8px; font-size: 12px; opacity: 0.6; }
      `}</style>
    </div>
  );
}