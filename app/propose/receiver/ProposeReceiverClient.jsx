"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";
import { useRef } from "react";


export default function ProposalReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);
const [duration, setDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
  const params = useSearchParams();
  const code = params.get("code");

const toggleAudio = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    setIsPlaying(true);

    // 🔥 force updates smoothly
    const interval = setInterval(() => {
      if (audio.ended) {
  clearInterval(interval);
  setIsPlaying(false); // 🔥 FIX
  setCurrentTime(0);
} else if (audio.paused) {
  clearInterval(interval);
} else {
        setCurrentTime(audio.currentTime);
      }
    }, 200);

  } else {
    audio.pause();
    setIsPlaying(false);
  }
};


useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !data?.audio) return;

  const handleLoaded = () => {
    setDuration(audio.duration || 0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime || 0);
  };

const handleEnded = () => {
  setIsPlaying(false);
  setCurrentTime(0);
  audio.currentTime = 0; // 🔥 ensures reset
};

  audio.addEventListener("loadedmetadata", handleLoaded);
  audio.addEventListener("timeupdate", handleTimeUpdate);
  audio.addEventListener("ended", handleEnded);

  audio.load(); // force reload

  return () => {
    audio.removeEventListener("loadedmetadata", handleLoaded);
    audio.removeEventListener("timeupdate", handleTimeUpdate);
    audio.removeEventListener("ended", handleEnded);
  };
}, [data?.audio]);

const formatTime = (time) => {
  if (!time) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  useEffect(() => {
    if (!code) {
      setError("Proposal code not found");
      return;
    }

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!apiData) {
          setError("No proposal found");
          return;
        }

        setData({
  receiverName: apiData.receiverName || "Love",
  sender: apiData.senderName || "Someone special",
  message: apiData.messageText,
  image: apiData.imageUrl,
  audio: apiData.audioUrl, // ✅ ADD THIS
});
      })
      .catch(() => setError("Server error"));
  }, [code]);

  if (!data && !error) {
    return <div className="state-screen">Crafting your proposal...</div>;
  }

  if (error) {
    return <div className="state-screen error">{error}</div>;
  }

  return (
    <div className={opened ? "proposal-container open" : "proposal-container"}>
      {/* Romantic rose particles */}
      <div className="rose-float r1">🌹</div>
      <div className="rose-float r2">🌹</div>
      <div className="rose-float r3">🌹</div>
      <div className="rose-float r4">🌹</div>
      
      {/* Heart glow particles */}
      <div className="heart-glow h1" />
      <div className="heart-glow h2" />
      <div className="heart-glow h3" />

      <div className="proposal-box">
        {!opened ? (
          <div className="ring-box" onClick={() => setOpened(true)}>
            <BrandHeader />
            <div className="ring-gift">💝</div>
            <h2 className="ring-title">Something Precious Awaits</h2>
            <p className="ring-subtitle">
              A life-changing question from {data.sender || "your love"}
            </p>
            <div className="open-prompt">Open the ring box</div>
          </div>
        ) : (
          <div className="proposal-reveal">
            <div className="proposal-header">
              <BrandHeader />
              <div className="diamond-crown">💖</div>
              <h1 className="proposal-question">Will You Be Mine?</h1>
            </div>

            {/* Scrollable proposal letter */}
            <div className="proposal-letter">
              <div className="letter-content">
                <p className="proposal-text">"{data.message}"</p>
                <div className="letter-signoff">
                  <span>Your forever,</span>
                  <span className="sender-name">{data.sender}</span>
                </div>
              </div>
            </div>

            <div className="voice-note-label">
   {data.sender || "Someone special"} left you a voice full of love…
</div>

<div className="voice-player">
  <button onClick={toggleAudio} className="play-btn">
    {isPlaying ? "⏸" : "▶"}
  </button>

  <div className="wave-bar">
<div
  className="progress"
  style={{
    width:
  duration > 0
    ? `${Math.min((currentTime / duration) * 100, 100)}%`
    : "0%",
  }}
></div>  </div>

<span className="time-text">
  {formatTime(currentTime)} / {formatTime(duration)}
</span>
<audio
  ref={audioRef}
  src={data.audio}
  preload="auto"
  onLoadedMetadata={() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }}
/></div>

            {data.image && (
              <div className="memory-vault">
                <div className="vault-label">💍 Our Memory</div>
                <div 
                  className={`vault-image ${revealMedia ? "unlocked" : ""}`}
                  onClick={() => setRevealMedia(true)}
                >
                  <img src={data.image} alt="Shared memory" />
                  {!revealMedia && (
                    <div className="vault-lock">
                      <span>Unlock memory</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="eternal-note">
              A proposal changes everything... or waits patiently.
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;900&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(html), :global(body) {
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
          background: linear-gradient(135deg, #3a0d2e 0%, #7b1e3b 50%, #c72c41 100%);
          color: white;
          font-size: 18px;
          font-family: "Cinzel", serif;
          padding: 20px;
          text-align: center;
          letter-spacing: 1px;
        }

        .state-screen.error {
          background: linear-gradient(135deg, #7b1e3b 0%, #3a0d2e 100%);
        }

        .proposal-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1a0a1a 0%, #3a0d2e 30%, #7b1e3b 70%, #c72c41 100%);
          background-size: 300% 300%;
          animation: proposalBgShift 15s ease infinite;
          padding: 20px;
          font-family: "Poppins", sans-serif;
        }

        @keyframes proposalBgShift {
          0%, 100% { background-position: 0% 50%; }
          33% { background-position: 100% 50%; }
          66% { background-position: 100% 100%; }
        }

        .proposal-container.open {
          background: linear-gradient(135deg, #c72c41 0%, #7b1e3b 40%, #3a0d2e 80%);
          animation-duration: 20s;
        }

        .rose-float {
          position: absolute;
          font-size: 22px;
          opacity: 0.1;
          animation: roseFloat 14s infinite ease-in-out;
          filter: drop-shadow(0 4px 15px rgba(255, 107, 180, 0.6));
          pointer-events: none;
          z-index: 1;
        }

        .r1 { top: 15%; left: 18%; animation-delay: 0s; }
        .r2 { top: 55%; right: 22%; animation-delay: 5s; }
        .r3 { bottom: 28%; left: 28%; animation-delay: 9s; }
        .r4 { top: 65%; right: 32%; animation-delay: 3s; }

        @keyframes roseFloat {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-25px) rotate(180deg) scale(1.15); }
          66% { transform: translateY(-12px) rotate(360deg) scale(0.95); }
        }

        .heart-glow {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(255, 107, 180, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          animation: heartPulse 8s infinite ease-in-out;
          box-shadow: 0 0 20px rgba(255, 107, 180, 0.7);
          pointer-events: none;
        }

        .h1 { top: 25%; left: 25%; animation-delay: 1s; }
        .h2 { top: 60%; right: 28%; animation-delay: 4s; }
        .h3 { bottom: 30%; left: 15%; animation-delay: 6s; }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1) opacity: 0.6; }
          50% { transform: scale(1.4) opacity: 1; }
        }

        .proposal-box {
          width: min(440px, 95%);
          min-height: 680px; /* Increased height */
          background: linear-gradient(145deg, rgba(58, 13, 46, 0.95), rgba(123, 30, 59, 0.9));
          backdrop-filter: blur(35px);
          border-radius: 35px;
          border: 2px solid rgba(255, 182, 193, 0.5);
          box-shadow: 
            0 40px 100px rgba(199, 44, 65, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 0 60px rgba(255, 107, 180, 0.4);
          position: relative;
          /* REMOVED: overflow: hidden; */
          display: flex;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: proposalBoxReveal 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes proposalBoxReveal {
          0% { 
            transform: scale(0.6) rotate(-5deg); 
            opacity: 0; 
            box-shadow: 0 20px 50px rgba(199, 44, 65, 0.3);
          }
          50% { transform: scale(1.05) rotate(2deg); }
          100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 1; 
          }
        }

        .proposal-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.15) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .ring-box, .proposal-reveal {
          position: relative;
          z-index: 2;
          height: 100%;
          width: 100%;
        }

        .ring-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 50px 40px 80px 40px; /* Added bottom padding */
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          text-align: center;
        }

        .ring-box:hover {
          transform: scale(1.02) rotate(1deg); /* Changed from translateY to scale */
          box-shadow: 0 50px 120px rgba(199, 44, 65, 0.6);
        }

        .ring-gift {
          font-size: 90px;
          animation: giftBounce 2.5s infinite;
          margin-bottom: 25px;
          filter: drop-shadow(0 12px 30px rgba(255, 182, 193, 0.7));
        }

        @keyframes giftBounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }

        .ring-title {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 12px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
          background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ring-subtitle {
          font-size: 16px;
          opacity: 0.95;
          line-height: 1.6;
          font-weight: 400;
          max-width: 280px;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.95);
        }

        .open-prompt {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1.5px;
          background: linear-gradient(135deg, #ff6b9d, #ff9ff3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          padding: 12px 24px;
          border: 2px solid rgba(255, 107, 180, 0.6);
          border-radius: 30px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 180, 0.4);
        }

        .open-prompt:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 107, 180, 0.6);
        }

        .proposal-reveal {
          padding: 50px 35px;
          display: flex;
          flex-direction: column;
          color: white;
          overflow-y: auto;
          gap: 25px;
          animation: revealSlide 0.8s ease-out 0.2s both;
        }

        @keyframes revealSlide {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .proposal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          text-align: center;
        }

        .diamond-crown {
          font-size: 40px;
          animation: crownGlow 3s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 25px rgba(255, 107, 180, 0.9));
        }

        @keyframes crownGlow {
          from { filter: drop-shadow(0 0 20px rgba(255, 107, 180, 0.7)); transform: scale(1); }
          to { filter: drop-shadow(0 0 35px rgba(255, 107, 180, 1)); transform: scale(1.08); }
        }

        .proposal-question {
          font-family: 'Cinzel', serif;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.1;
          background: linear-gradient(135deg, #ff9ff3 0%, #ff6b9d 50%, #c72c41 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 8px 30px rgba(255, 107, 180, 0.6);
          margin: 0;
          max-width: 90%;
        }

        .proposal-letter {
          flex: 1;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.97), rgba(255, 248, 247, 0.92));
          border-radius: 25px;
          padding: 35px;
          position: relative;
          box-shadow: 
            0 35px 90px rgba(0, 0, 0, 0.45),
            inset 0 2px 0 rgba(255, 182, 193, 0.3);
          overflow: hidden;
          border: 3px solid rgba(255, 182, 193, 0.5);
        }

        .proposal-letter::before {
          content: '';
          position: absolute;
          top: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255, 107, 180, 0.25), transparent);
          border-radius: 50%;
          z-index: 0;
        }

        .letter-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .proposal-text {
          font-family: 'Great Vibes', cursive;
          font-size: 26px;
          line-height: 1.6;
          color: #3a0d2e;
          font-weight: 400;
          flex: 1;
          margin-bottom: 25px;
          text-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
        }

        .letter-signoff {
          margin-top: auto;
          text-align: right;
          padding-top: 10px;
          margin-bottom: 0px;
          border-top: 2px dashed rgba(199, 44, 65, 0.4);
        }

        .letter-signoff span:first-child {
          font-size: 14px;
          color: #ff6b9d;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.95;
          display: block;
          margin-bottom: 1px;
        }

        .sender-name {
          font-family: 'Cinzel', serif;
          font-size: 28px;
          background: linear-gradient(135deg, #ff6b9d, #c72c41);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .memory-vault {
          margin-top: 20px;
        }

        .vault-label {
          font-family: 'Cinzel', serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .vault-image {
          position: relative;
          height: 85px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 3px solid rgba(255, 182, 193, 0.7);
          background: linear-gradient(145deg, #2a0a1a, #4a1a2a);
        }

        .vault-image:hover {
          transform: translateY(-8px) rotate(1deg);
        }

        .vault-image.unlocked {
          height: 300px;
          border-color: rgba(255, 107, 180, 1);
          box-shadow: 0 35px 80px rgba(255, 107, 180, 0.5);
        }

        .vault-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          filter: blur(20px) sepia(0.2) brightness(0.65);
          transition: all 1s ease;
        }

        .vault-image.unlocked img {
          filter: blur(0) sepia(0) brightness(1.15);
          transform: scale(1.05);
        }

        .vault-lock {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(58, 13, 46, 0.97);
          backdrop-filter: blur(8px);
        }

        .vault-lock span {
          background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
          color: #2a0a1a;
          padding: 16px 32px;
          border-radius: 40px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 
            0 15px 40px rgba(255, 107, 180, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .eternal-note {
          font-family: 'Cinzel', serif;
          font-size: 15px;
          font-weight: 500;
          text-align: center;
          opacity: 0.9;
          letter-spacing: 1px;
          margin-top: auto;
          padding-top: 25px;
          background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .proposal-container { padding: 16px; }
          .proposal-box { 
            width: 95%;
            min-height: 650px;
            border-radius: 30px;
          }
          .proposal-reveal { padding: 40px 30px; gap: 20px; }
          .proposal-question { font-size: 36px; }
          .proposal-text { font-size: 24px; }
        }

        @media (max-width: 480px) {
          .proposal-container { padding: 12px; }
          .proposal-box { min-height: 630px; border-radius: 25px; }
          .proposal-reveal { padding: 35px 25px; gap: 18px; }
          .proposal-question { font-size: 32px; }
          .proposal-text { font-size: 22px; line-height: 1.5; }
          .sender-name { font-size: 26px; }
          .ring-gift { font-size: 80px; }
        }
          .voice-message {
  margin-top: 20px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(255, 107, 180, 0.3);
  text-align: center;
}

.voice-label {
  font-size: 13px;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: 600;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.audio-player {
  width: 100%;
  outline: none;
  border-radius: 10px;
}
  .voice-player {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  box-shadow: 0 10px 30px rgba(255, 107, 180, 0.4);
}

.play-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #c44569;
  font-size: 16px;
  cursor: pointer;
}

.wave-bar {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.4);
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  width: 0%;
  background: white;
}

.progress.animate {
  animation: progressAnim 6s linear forwards;
}

@keyframes progressAnim {
  from { width: 0%; }
  to { width: 100%; }
}

.time-text {
  font-size: 12px;
  color: white;
}
  .voice-note-label {
  font-family: 'Dancing Script', cursive;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInSoft 1s ease;
  letter-spacing: 0.5px;
}

@keyframes fadeInSoft {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
      `}</style>
    </div>
  );
}