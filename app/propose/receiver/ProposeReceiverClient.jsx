
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProposalReceiver() {
  const params = useSearchParams();
  const code = params.get("code");

  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);

  // Fetch message from API (same as approach)
useEffect(() => {
  if (!code) return;

  fetch(`/api/messages?code=${code}`)
    .then(res => res.json())
    .then(apiData => {
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

  // Loading state
  if (!data) {
    return <div style={{ padding: 40 }}>Loading proposal...</div>;
  }

  return (
    <div className="container">
      {/* Floating icons */}
      <div className="float h1">💖</div>
      <div className="float h2">🌹</div>
      <div className="float h3">💍</div>

      {!opened ? (
        /* Closed Ring Box */
        <div className="box-card" onClick={() => setOpened(true)}>
          <div className="ring">💍</div>
          <h2>A special moment awaits</h2>
          <p>{data.sender || "Someone special"} has something important to ask you</p>
          <div className="tap">Tap to open</div>
        </div>
      ) : (
        /* Proposal Content */
        <div className="proposal-card">
          <div className="title">A Question From The Heart</div>

          {/* Proposal Letter */}
          <div className="letter">
            <p className="message">“{data.message}”</p>
            <div className="from">— {data.sender}</div>
          </div>

          {/* Image Reveal */}
          {data.image && (
            <div className="media-section">
              <div className="label">📸 A memory was shared</div>

              <div
                className={`media-card ${revealMedia ? "show" : ""}`}
                onClick={() => setRevealMedia(true)}
              >
                <img src={data.image} alt="memory" />
                {!revealMedia && (
                  <div className="overlay">Tap to reveal</div>
                )}
              </div>
            </div>
          )}

          {/* Response Section */}
          {!response && (
            <div className="actions">
              <button className="yes" onClick={() => setResponse("yes")}>
                Yes 💖
              </button>

              <button className="maybe" onClick={() => setResponse("maybe")}>
                Need Time
              </button>

              <button className="no" onClick={() => setResponse("no")}>
                No
              </button>
            </div>
          )}

          {response === "yes" && (
            <div className="result success">🎉 She said YES!</div>
          )}

          {response === "maybe" && (
            <div className="result">
              Take your time. Love is patient.
            </div>
          )}

          {response === "no" && (
            <div className="result">
              Thank you for your honesty.
            </div>
          )}
        </div>
      )}

      {/* ----- DESIGN CSS (unchanged) ----- */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg,#3a0d2e,#7b1e3b,#c72c41);
          font-family: 'Poppins', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .float {
          position: absolute;
          font-size: 30px;
          opacity: 0.1;
          animation: float 10s infinite ease-in-out;
        }
        .h1 { top: 15%; left: 10%; }
        .h2 { bottom: 20%; right: 15%; }
        .h3 { top: 45%; right: 25%; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        .box-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 40px;
          width: 360px;
          text-align: center;
          box-shadow: 0 35px 80px rgba(0,0,0,0.4);
          cursor: pointer;
        }

        .ring {
          font-size: 70px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .tap {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.8;
        }

        .proposal-card {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 28px;
          width: 380px;
          box-shadow: 0 40px 90px rgba(0,0,0,0.45);
          animation: fadeIn 0.6s ease;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          text-align: center;
          margin-bottom: 15px;
        }

        .letter {
          background: linear-gradient(180deg,#fff7f9,#ffeef2);
          color: #4a2c2c;
          padding: 26px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .message {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          line-height: 1.9;
          font-style: italic;
        }

        .from {
          margin-top: 16px;
          font-size: 14px;
          opacity: 0.8;
        }

        .media-section { margin-top: 16px; }
        .label { font-size: 12px; opacity: 0.8; margin-bottom: 6px; }

        .media-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.5s;
          position: relative;
        }

        .media-card.show { height: 220px; }

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
          background: rgba(0,0,0,0.3);
          font-size: 12px;
        }

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .actions button {
          flex: 1;
          padding: 12px;
          border-radius: 20px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .yes { background: linear-gradient(90deg,#ff758c,#ff7eb3); color: white; }
        .maybe { background: #ffffff; color: #7b1e3b; }
        .no { background: #eee; color: #444; }

        .result { margin-top: 18px; text-align: center; font-size: 14px; }
        .success { font-size: 18px; font-weight: 600; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}