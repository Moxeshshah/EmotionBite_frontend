"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import BrandHeader from "../BrandHeader";

export default function ApologyReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  
  // Audio player states
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

      const interval = setInterval(() => {
        if (audio.ended) {
          clearInterval(interval);
          setIsPlaying(false);
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
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    audio.load();

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
      setError("Apology code not found");
      return;
    }

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!apiData) {
          setError("No apology found");
          return;
        }

        setData({
          sender: apiData.senderName,
          receiver: apiData.receiverName,
          message: apiData.messageText,
          image: apiData.imageUrl,
          video: apiData.videoUrl,
          audio: apiData.audioUrl,
        });
      })
      .catch(() => setError("Server error"));
  }, [code]);

  if (!data && !error) {
    return <div className="state-screen">Preparing your apology...</div>;
  }

  if (error) {
    return <div className="state-screen error">{error}</div>;
  }

  return (
    <div className={opened ? "apology-container open" : "apology-container"}>
      {/* Floating particles matching home page */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      <div className="apology-box">
        {!opened ? (
          <div className="apology-envelope" onClick={() => setOpened(true)}>
            <BrandHeader />
            <div className="peace-heart">🕊️💔</div>
            <h2 className="envelope-title">A Heartfelt Apology Awaits</h2>
            <p className="envelope-subtitle">
              {data.sender || "Someone"} has something important to say to you, {data.receiver}
            </p>
            <div className="open-prompt">Open the letter</div>
          </div>
        ) : (
          <div className="apology-reveal">
            <div className="apology-header">
              <BrandHeader />
              <div className="peace-dove">🕊️</div>
              <h1 className="apology-title">
                I'm So Sorry, {data.receiver} 💔
              </h1>
            </div>

            {/* Apology letter */}
            <div className="apology-letter">
              <div className="letter-content">
                <p className="apology-text">"{data.message}"</p>
                <div className="letter-signoff">
                  <span>With deepest regrets,</span>
                  <span className="sender-name">{data.sender}</span>
                </div>
              </div>
            </div>

            {/* Voice apology */}
            {data.audio && (
              <>
                <div className="voice-note-label">
                  {data.sender} recorded a voice apology for you…
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
                    />
                  </div>
                  <span className="time-text">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <audio
                    ref={audioRef}
                    src={data.audio}
                    preload="auto"
                  />
                </div>
              </>
            )}

            {/* Memory section */}
            {data.image && (
              <div className="memory-vault">
                <div className="vault-label">A Shared Memory</div>
                <div 
                  className={`vault-image ${revealImage ? "unlocked" : ""}`}
                  onClick={() => setRevealImage(true)}
                >
                  <img src={data.image} alt="Shared memory" />
                  {!revealImage && (
                    <div className="vault-lock">
                      <span>Reveal memory</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="forgiveness-note">
              Forgiveness heals both hearts... 🕊️
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap");

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
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b, #667eea);
          color: white;
          font-size: 18px;
          font-family: "Playfair Display", serif;
          padding: 20px;
          text-align: center;
          letter-spacing: 1px;
          animation: gradientShift 15s ease infinite;
        }

        .state-screen.error {
          animation-duration: 8s;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        .apology-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b, #667eea);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          padding: 20px;
          font-family: "Poppins", sans-serif;
        }

        .apology-container.open {
          animation-duration: 20s;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-30vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 12s infinite linear;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          z-index: 1;
        }

        .particle-1 {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #d76d77, #ffaf7b);
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #3a1c71, #667eea);
          animation-duration: 14s;
        }

        .particle-3 {
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #ffaf7b, #d76d77);
          animation-duration: 11s;
        }

        .particle-4 {
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #667eea, #3a1c71);
          animation-duration: 13s;
        }

        .particle-5 {
          width: 9px;
          height: 9px;
          background: linear-gradient(45deg, #d76d77, #ffaf7b);
          animation-duration: 15s;
        }

        .apology-box {
          width: min(440px, 95%);
          min-height: 680px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 25px 60px rgba(58, 28, 113, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          display: flex;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: fadeInUp 1.2s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .apology-envelope, .apology-reveal {
          position: relative;
          z-index: 2;
          height: 100%;
          width: 100%;
        }

        .apology-envelope {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 50px 40px 80px 40px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          text-align: center;
        }

        .apology-envelope:hover {
          transform: scale(1.02) rotate(-1deg);
          box-shadow: 0 35px 80px rgba(58, 28, 113, 0.4);
        }

        .peace-heart {
          font-size: 90px;
          animation: gentlePulse 3s ease-in-out infinite;
          margin-bottom: 25px;
          filter: drop-shadow(0 8px 20px rgba(215, 109, 119, 0.6));
          background: linear-gradient(45deg, #d76d77, #ffaf7b, #3a1c71);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .envelope-title {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff, #f8e8e8, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: shimmer 4s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .envelope-subtitle {
          font-size: 16px;
          opacity: 0.95;
          line-height: 1.6;
          font-weight: 400;
          max-width: 280px;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.95);
          font-family: "Poppins", sans-serif;
        }

        .open-prompt {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1.5px;
          background: linear-gradient(135deg, #d76d77, #3a1c71, #ffaf7b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          padding: 12px 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(215, 109, 119, 0.4);
          font-family: "Poppins", sans-serif;
        }

        .open-prompt:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(215, 109, 119, 0.6);
        }

        .apology-reveal {
          padding: 50px 35px;
          display: flex;
          flex-direction: column;
          color: white;
          overflow-y: auto;
          gap: 25px;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .apology-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-align: center;
        }

        .peace-dove {
          font-size: 40px;
          animation: gentlePulse 3s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(215, 109, 119, 0.9));
          background: linear-gradient(45deg, #d76d77, #ffaf7b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .apology-title {
          font-family: "Playfair Display", serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.1;
          background: linear-gradient(135deg, #fff, #f8e8e8, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: shimmer 4s infinite;
          margin: 0;
          max-width: 90%;
        }

        .apology-letter {
          flex: 1;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 25px;
          padding: 35px;
          position: relative;
          box-shadow: 
            0 35px 90px rgba(0, 0, 0, 0.25),
            inset 0 2px 0 rgba(255, 255, 255, 0.6);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .apology-letter::before {
          content: '';
          position: absolute;
          top: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(215, 109, 119, 0.2), transparent);
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

        .apology-text {
          font-family: 'Dancing Script', cursive;
          font-size: 26px;
          line-height: 1.6;
          color: #2d1b69;
          font-weight: 400;
          flex: 1;
          margin-bottom: 25px;
          text-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
        }

        .letter-signoff {
          margin-top: auto;
          text-align: right;
          padding-top: 10px;
          border-top: 2px dashed rgba(58, 28, 113, 0.3);
        }

        .letter-signoff span:first-child {
          font-size: 14px;
          color: #d76d77;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.95;
          display: block;
          margin-bottom: 1px;
          font-family: "Poppins", sans-serif;
        }

        .sender-name {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          background: linear-gradient(135deg, #d76d77, #3a1c71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .voice-note-label {
          font-family: 'Dancing Script', cursive;
          font-size: 18px;
          text-align: center;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #fff, #f8e8e8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 1s ease;
          letter-spacing: 0.5px;
        }

        .voice-player {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 30px;
          background: linear-gradient(135deg, #d76d77, #3a1c71, #ffaf7b);
          box-shadow: 0 10px 30px rgba(215, 109, 119, 0.4);
        }

        .play-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #3a1c71;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .play-btn:hover {
          transform: scale(1.05);
        }

        .play-btn:active {
          transform: scale(0.95);
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
          border-radius: 10px;
          transition: width 0.1s ease;
        }

        .time-text {
          font-size: 12px;
          color: white;
          font-weight: 500;
          min-width: 50px;
          text-align: right;
          font-family: "Poppins", sans-serif;
        }

        .memory-vault {
          margin-top: 20px;
        }

        .vault-label {
          font-family: "Playfair Display", serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #fff, #f8e8e8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .vault-image {
          position: relative;
          height: 85px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .vault-image:hover {
          transform: translateY(-8px) rotate(-1deg);
        }

        .vault-image.unlocked {
          height: 300px;
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 35px 80px rgba(215, 109, 119, 0.4);
        }

        .vault-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          filter: blur(20px) sepia(0.3) brightness(0.6);
          transition: all 1s ease;
        }

        .vault-image.unlocked img {
          filter: blur(0) sepia(0) brightness(1.1);
          transform: scale(1.05);
        }

        .vault-lock {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
        }

        .vault-lock span {
          background: linear-gradient(135deg, #d76d77, #3a1c71);
          color: white;
          padding: 16px 32px;
          border-radius: 40px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 
            0 15px 40px rgba(215, 109, 119, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          font-family: "Poppins", sans-serif;
        }

        .forgiveness-note {
          font-family: "Playfair Display", serif;
          font-size: 15px;
          font-weight: 500;
          text-align: center;
          opacity: 0.9;
          letter-spacing: 1px;
          margin-top: auto;
          background: linear-gradient(135deg, #fff, #f8e8e8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          font-family: "Poppins", sans-serif;
        }

        @media (max-width: 768px) {
          .apology-container { padding: 16px; }
          .apology-box { 
            width: 95%;
            min-height: 650px;
            border-radius: 24px;
          }
          .apology-reveal { padding: 40px 30px; gap: 20px; }
          .apology-title { font-size: 32px; }
          .apology-text { font-size: 24px; }
        }

        @media (max-width: 480px) {
          .apology-container { padding: 12px; }
          .apology-box { min-height: 630px; border-radius: 22px; }
          .apology-reveal { padding: 35px 25px; gap: 18px; }
          .apology-title { font-size: 28px; }
          .apology-text { font-size: 22px; line-height: 1.5; }
          .sender-name { font-size: 26px; }
          .peace-heart { font-size: 80px; }
        }
      `}</style>
    </div>
  );
}