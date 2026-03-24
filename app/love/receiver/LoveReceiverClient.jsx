"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoveReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
const params = useSearchParams();
const code = params.get("code");

const [data, setData] = useState(null);

useEffect(() => {
  if (!code) return;

  fetch(`/api/messages?code=${code}`)
    .then(res => res.json())
    .then(apiData => {
      setData({
        sender: apiData.senderName,
        message: apiData.messageText,
        image: apiData.imageUrl,
      });
    })
    .catch(console.error);
}, [code]);

if (!data) {
  return <div style={{padding:40}}>Loading love message...</div>;
}

  return (
    <div className="container">
      {/* Floating hearts */}
      <div className="heart h1">❤️</div>
      <div className="heart h2">💕</div>
      <div className="heart h3">💖</div>
      <div className="heart h4">💗</div>

      {!opened ? (
        /* Closed Envelope */
        <div className="envelope-card" onClick={() => setOpened(true)}>
          <div className="envelope">💌</div>
          <h2>A love message for you</h2>
          <p>Someone shared their feelings</p>
          <div className="tap">Tap to open ❤️</div>
        </div>
      ) : (
        /* Opened Letter */
        <div className="letter-wrapper">
          <div className="title">For You</div>

          <div className="letter">
            <p className="message">“{data.message}”</p>
            <div className="from">— {data.sender}</div>
          </div>

          {/* Media reveal */}
          {data.image && (
            <div className="media-section">
              <div className="media-label">📸 A memory was shared</div>

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

          <div className="note">
            Some feelings are meant to be felt, not replied.
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg,#ff758c,#ff7eb3,#ffb199);
          font-family: 'Poppins', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        /* Floating hearts */
        .heart {
          position: absolute;
          font-size: 28px;
          opacity: 0.15;
          animation: float 10s infinite ease-in-out;
        }
        .h1 { top: 10%; left: 15%; }
        .h2 { bottom: 20%; right: 10%; }
        .h3 { top: 35%; right: 25%; }
        .h4 { bottom: 15%; left: 20%; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        /* Envelope screen */
        .envelope-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 40px;
          width: 360px;
          text-align: center;
          box-shadow: 0 30px 70px rgba(0,0,0,0.35);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
        }

        .envelope {
          font-size: 70px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        .tap {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.8;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Letter */
        .letter-wrapper {
          width: 380px;
          max-width: 100%;
          text-align: center;
          animation: fadeIn 0.6s ease;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          margin-bottom: 15px;
        }

        .letter {
          background: linear-gradient(180deg,#fff7f9,#ffeef2);
          color: #4a2c2c;
          padding: 28px;
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
          text-align: left;
          position: relative;
        }

        .letter:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(to right,#ff4f81,#ff758c);
        }

        .message {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          line-height: 1.9;
          font-style: italic;
        }

        .from {
          margin-top: 18px;
          font-size: 14px;
          opacity: 0.8;
        }

        /* Media */
        .media-section {
          margin-top: 18px;
          text-align: left;
        }

        .media-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .media-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.5s;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
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
          background: rgba(0,0,0,0.3);
          font-size: 12px;
        }

        .note {
          margin-top: 15px;
          font-size: 12px;
          opacity: 0.7;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}