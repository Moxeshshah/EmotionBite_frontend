
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function LoveReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [playMusic, setPlayMusic] = useState(false);

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
  receiverName: apiData.receiverName || "You",
  sender: apiData.senderName || "Someone special",
  message: apiData.messageText,
  image: apiData.imageUrl,
  audio: apiData.audioUrl, // ✅ ADD THIS
});
      })
      .catch(() => setError("Server error"));
  }, [code]);

  // if (!data && !error) {
  //   return <div className="state-screen">Loading your love message...</div>;
  // }

  if (error) {
    return <div className="state-screen">{error}</div>;
  }
const getYouTubeEmbedUrl = (url) => {
  try {
    if (!url) return "";

    // If already embed → return as it is
    if (url.includes("/embed/")) {
      return url;
    }

    let videoId = "";

    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop();
    } else if (url.includes("youtube.com/watch")) {
      const params = new URL(url).searchParams;
      videoId = params.get("v");
    }

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } catch {
    return "";
  }
};
  return (
    <div className={opened ? "main-container open" : "main-container"}>
      {/* Floating Particles & Hearts */}
      <div className="particle" style={{ left: "15%" }} />
      <div className="particle" style={{ left: "35%", animationDelay: "2s" }} />
      <div className="particle" style={{ left: "55%", animationDelay: "4s" }} />
      <div className="particle" style={{ left: "75%", animationDelay: "1s" }} />
      <div className="particle" style={{ left: "90%", animationDelay: "3s" }} />
      
      <div className="heart-float h1">💖</div>
      <div className="heart-float h2">💕</div>
      <div className="heart-float h3">❤️</div>

      {/* Main Card Container */}
      <div className={`letter-card ${opened ? "opened" : ""}`}>
        {!opened ? (
          <div className="closed-envelope" onClick={() => {
  setOpened(true);
  setPlayMusic(true); // 🎵 trigger music
}}>
            <BrandHeader />
            <div className="envelope-icon">💌</div>
            <div className="envelope-title">A love message awaits ✨</div>
            <div className="envelope-hint">Tap to open your heart 💖</div>
          </div>
        ) : (
          <div className="letter-content">
            <div className="header-section">
              <BrandHeader />
              <div className="heart-icon">💝</div>
              <h2 className="receiver-name">Dear, {data.receiverName}</h2>
            </div>

            {/* Completely Redesigned Message Display */}
            <div className="love-message-container">
              <div className="message-header">
                <div className="ribbon">💌 Love Letter</div>
              </div>
              
              <div className="message-scroll-wrapper">
                <div className="message-content">
                  <p className="love-message">"{data.message}"</p>
                </div>
              </div>
              
              <div className="message-footer">
                <div className="signature">
                  <span className="signature-line">With all my love,</span>
                  <span className="sender-signature">{data.sender}</span>
                </div>
              </div>
            </div>
{data.audio && (
  <div className="music-section">
    {/* <div className="music-label">🎵 Tap to play your song</div> */}

   {playMusic && (
  <iframe
    width="0"
    height="0"
    src={getYouTubeEmbedUrl(data.audio)}
    title="audio player"
    allow="autoplay"
    style={{ display: "none" }}
  />
)}
  </div>
)}
            {/* {data.image && (
              <div className="memory-section">
                <div className="memory-label">📸 A memory was shared</div>
                <div
                  className={`memory-card ${revealMedia ? "revealed" : ""}`}
                  onClick={() => setRevealMedia(true)}
                >
                  <img src={data.image} alt="Shared memory" />
                  {!revealMedia && (
                    <div className="memory-overlay">
                      <span className="memory-text">Tap to reveal</span>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            <div className="love-note">
              💕 Some feelings are meant to be cherished, not replied to.
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Parisienne&family=Poppins:wght@300;400;500;600;700&display=swap');

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
          background: radial-gradient(circle at top, #ff6b9d, #c44569);
          color: white;
          font-size: 18px;
          padding: 20px;
          text-align: center;
          font-family: "Poppins", sans-serif;
        }

        .main-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top, #ff6b9d, #c44569, #ff9ff3);
          transition: background 0.6s ease;
          padding: 20px;
          font-family: "Poppins", sans-serif;
        }

        .main-container.open {
          background: radial-gradient(circle at top, #ff1493, #c44569, #8b5cf6);
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: floatParticle 12s infinite linear;
          pointer-events: none;
          top: 0;
          z-index: 1;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }

        .heart-float {
          position: absolute;
          font-size: 26px;
          opacity: 0.12;
          animation: floatHeart 15s infinite ease-in-out;
          pointer-events: none;
          filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
          z-index: 1;
        }

        .h1 { top: 15%; left: 20%; }
        .h2 { top: 60%; right: 15%; animation-delay: 3s; }
        .h3 { bottom: 25%; left: 10%; animation-delay: 7s; }

        @keyframes floatParticle {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { 
            transform: translateY(-15vh) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(15deg); }
        }

        .letter-card {
          width: min(450px, 95%);
          min-height: 580px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 30px 70px rgba(255, 105, 180, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          overflow: hidden;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.95);
          animation: cardEntrance 0.9s ease-out;
        }

        .letter-card.opened {
          transform: scale(1);
          box-shadow: 
            0 45px 100px rgba(255, 105, 180, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          min-height: 620px;
        }

        @keyframes cardEntrance {
          0% { 
            opacity: 0; 
            transform: scale(0.7) rotateX(25deg) translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: scale(0.95) rotateX(0deg) translateY(0); 
          }
        }

        .closed-envelope {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding: 45px;
          transition: all 0.4s ease;
          text-align: center;
        }

        .closed-envelope:hover {
          transform: translateY(-8px);
        }

        .envelope-icon {
          font-size: 85px;
          animation: bounce 2.2s infinite;
          margin-bottom: 25px;
          filter: drop-shadow(0 8px 25px rgba(255, 182, 193, 0.5));
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .envelope-title {
  font-family: 'Parisienne', 'Dancing Script', cursive;
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 60px;
  letter-spacing: -0.2px;
  text-align: center;
  color: #ffffff; /* Solid white - guaranteed visibility */
  text-shadow: 
    0 3px 12px rgba(255, 105, 180, 0.6),  /* Pink glow */
    0 1px 3px rgba(0, 0, 0, 0.4);          /* Depth */
  filter: drop-shadow(0 2px 8px rgba(255, 182, 193, 0.5));
}

        .envelope-hint {
          font-size: 16px;
          opacity: 0.85;
          letter-spacing: 0.8px;
          font-weight: 400;
        }

        .letter-content {
          height: 100%;
          padding: 45px 35px;
          display: flex;
          flex-direction: column;
          color: white;
          overflow-y: auto;
          position: relative;
          gap: 15px;
        }

        .header-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0px;
        }

        .heart-icon {
          font-size: 30px;
          animation: glowHeart 3s ease-in-out infinite alternate;
        }

        @keyframes glowHeart {
          from { 
            filter: drop-shadow(0 0 12px rgba(255, 182, 193, 0.6)); 
            transform: scale(1);
          }
          to { 
            filter: drop-shadow(0 0 25px rgba(255, 182, 193, 0.9)); 
            transform: scale(1.05);
          }
        }

        .receiver-name {
          font-family: 'Dancing Script', 'Great Vibes', cursive;
          font-size: 38px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -1px;
          text-align: center;
          margin: 0;
          color: white;
          text-shadow: 
            0 5px 15px rgba(0,0,0,0.4),
            0 0 35px rgba(255,255,255,0.25);
          max-width: 90%;
          word-break: break-word;
          padding: 0 12px;
        }

        /* COMPLETELY NEW MESSAGE DISPLAY DESIGN */
        .love-message-container {
          flex: 1;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          backdrop-filter: blur(15px);
        }

        .message-header {
          background: linear-gradient(135deg, #ff69b4, #ff1493, #ff9ff3);
          padding: 20px 25px;
          text-align: center;
        }

        .ribbon {
          font-family: 'Dancing Script', cursive;
          font-size: 22px;
          color: white;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .message-scroll-wrapper {
          height: 220px;
          overflow-y: auto;
          padding: 30px 28px;
          display: flex;
          align-items: flex-start;
        }

        .message-scroll-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .message-scroll-wrapper::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .message-scroll-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          border-radius: 10px;
        }

        .message-content {
          width: 100%;
        }

        .love-message {
          font-family: 'Dancing Script', serif;
          font-size: 22px;
          line-height: 1.75;
          color: #2d1b69;
          font-style: italic;
          font-weight: 400;
          margin: 0;
          word-break: break-word;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          letter-spacing: -0.3px;
        }

        .message-footer {
          background: rgba(255, 248, 247, 0.9);
          padding: 2px 22px;
          text-align: right;
          border-top: 1px solid rgba(255, 182, 193, 0.4);
        }

        .signature {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .signature-line {
          font-size: 13px;
          color: #ff69b4;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .sender-signature {
          font-family: 'Great Vibes', cursive;
          font-size: 24px;
          color: #c44569;
          font-weight: 400;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        .memory-section {
          margin-top: 20px;
        }

        .memory-label {
          font-size: 14px;
          opacity: 0.85;
          margin-bottom: 15px;
          font-weight: 500;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .memory-card {
          position: relative;
          height: 75px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.4);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.25);
        }

        .memory-card:hover {
          transform: translateY(-5px);
        }

        .memory-card.revealed {
          height: 290px;
        }

        .memory-card img {
          width: 100%;
          height: 290px;
          object-fit: cover;
          filter: blur(16px) brightness(0.7);
          transform: scale(1.12);
          transition: all 0.9s ease;
        }

        .memory-card.revealed img {
          filter: blur(0) brightness(1.05);
          transform: scale(1);
        }

        .memory-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
        }

        .memory-text {
          background: rgba(255, 255, 255, 0.98);
          color: #ff1493;
          padding: 14px 28px;
          border-radius: 35px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .love-note {
          font-size: 14px;
          opacity: 0.8;
          font-style: italic;
          text-align: center;
            margin-top: 5px;
          padding-top: 0px;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          font-family: "Poppins", sans-serif;
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .main-container {
            padding: 16px;
          }
          
          .letter-card {
            width: 95%;
            min-height: 550px;
          }
          
          .letter-card.opened {
            min-height: 600px;
          }
          
          .letter-content {
            padding: 35px 28px;
            gap: 20px;
          }
          
          .love-message-container {
            border-radius: 25px;
              margin-bottom: 1px; /* add this */
          }
          
          .message-scroll-wrapper {
            height: 200px;
            padding: 25px 24px;
          }
          
          .love-message {
            font-size: 20px;
          }
          
          .envelope-icon {
            font-size: 75px;
          }
          
          .receiver-name {
            font-size: 34px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 12px;
          }
          
          .letter-card {
            min-height: 520px;
          }
          
          .letter-card.opened {
            min-height: 580px;
          }
          
          .letter-content {
            padding: 28px 22px;
            gap: 18px;
          }
          
          .message-scroll-wrapper {
            height: 180px;
            padding: 22px 20px;
          }
          
          .love-message {
            font-size: 18px;
            line-height: 1.7;
          }
          
          .sender-signature {
            font-size: 22px;
          }
          
          .envelope-icon {
            font-size: 70px;
          }
          
          .receiver-name {
            font-size: 30px;
          }
        }
          .music-section {
  margin-top: 20px;
  animation: fadeIn 0.6s ease;
}

.music-label {
  font-size: 13px;
  margin-bottom: 6px;
  opacity: 0.85;
}
  .music-section {
  margin-top: 20px;
  text-align: center;
  animation: fadeIn 0.6s ease;
}

.music-label {
  font-size: 13px;
  margin-bottom: 10px;
  opacity: 0.85;
}

.play-btn {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
  transition: all 0.3s ease;
}

.play-btn:hover {
  transform: scale(1.05);
}

.play-btn:active {
  transform: scale(0.95);
}
      `}</style>
    </div>
  );
}