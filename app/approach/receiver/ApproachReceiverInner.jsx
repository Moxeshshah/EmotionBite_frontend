"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ApproachReceiver() {
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [tapRipple, setTapRipple] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!code || !mounted) return;
    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        setData({
          sender: apiData.senderName,
          receiver: apiData.receiverName,
          message: apiData.messageText,
          image: apiData.imageUrl,
          video: apiData.videoUrl,
          audio: apiData.audioUrl,
          instagram: apiData.instagramUrl,
        });
      })
      .catch(console.error);
  }, [code, mounted]);

  useEffect(() => {
    if (!opened || !data?.message) return;
    setTypedMessage("");
    let i = 0;
    const text = data.message;
    const interval = setInterval(() => {
      setTypedMessage(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [opened, data]);

  const handleOpen = () => {
    setTapRipple(true);
    setTimeout(() => { setTapRipple(false); setOpened(true); }, 420);
  };

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loader-ring"><div /><div /><div /><div /></div>
        <h2 className="loading-title">Loading Emotion Bite...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loader-ring"><div /><div /><div /><div /></div>
        <h2 className="loading-title">Loading message...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {/* bg shapes */}
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      {/* rising particles */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${8 + i * 13}%`,
          animationDelay: `${i * 1.4}s`,
          width: `${5 + (i % 3) * 2}px`,
          height: `${5 + (i % 3) * 2}px`,
        }} />
      ))}

      {!opened ? (
        <div className={`invite-card ${tapRipple ? "tapped" : ""}`} onClick={handleOpen}>
          <BrandHeader />

          <div className="big-emoji">✉️</div>

          <h2>You've got a message</h2>
          <p>Someone reached out to start a conversation.</p>

          <div className="tap-hint">
            <span className="tap-dot" />
            Tap to open
            <span className="tap-dot" />
          </div>
        </div>
      ) : (
        <div className="chat-card">
          <BrandHeader />

          <div className="chat-header">
            <div className="avatar-wrap">
              <div className="avatar-ring" />
              <div className="avatar">😊</div>
            </div>
            <div>
              <div className="name">{data.sender || "New Connection"}</div>
              <div className="status-badge">
                <span className="status-dot" />
                Just reached out
              </div>
            </div>
          </div>

          <div className="message-label">A stranger just reached out to you...</div>

          <div className="bubble">
            {typedMessage}
            {typedMessage.length < (data?.message?.length || 0) && (
              <span className="cursor-blink">|</span>
            )}
          </div>

          {data.image && (
            <div className="memory-section">
              <div className="memory-label">📷 Photo shared</div>
              <div
                className={`memory-card ${revealImage ? "revealed" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="shared" />
                {!revealImage && (
                  <div className="overlay">
                    <span className="overlay-icon">👁</span>
                    Tap to reveal
                  </div>
                )}
              </div>
            </div>
          )}

          {data.instagram && (
            <div className="insta-section">
              <div className="insta-label">💜 Connect on Instagram</div>
              <div
                className="insta-card"
                onClick={() => window.open(data.instagram, "_blank")}
              >
                <img src="/image1.png" alt="insta" className="insta-icon" />
                <div className="insta-text">
                  Interested? Check their Instagram 👀
                  <span>Tap to open</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap");

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
          margin: 0; padding: 0;
          width: 100%; height: 100%;
          overflow-x: hidden;
        }

        body { font-family: "Nunito", sans-serif; }

        /* ── CONTAINER ── */
        .container {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          background-size: 300% 300%;
          animation: bgShift 18s ease infinite;
          color: #333;
          position: relative;
          overflow: hidden;
          padding: 80px 20px 60px;
        }

        @keyframes bgShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }

        /* ── BG SHAPES ── */
        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.16;
          filter: blur(2px);
        }
        .shape-one {
          width: 110px; height: 110px;
          background: white;
          top: 10%; left: 8%;
          animation: floatShape 12s infinite ease-in-out;
        }
        .shape-two {
          width: 80px; height: 80px;
          background: #ffd6e7;
          bottom: 14%; right: 10%;
          animation: floatShape 14s infinite ease-in-out reverse;
        }
        .shape-three {
          width: 62px; height: 62px;
          background: #ffffff;
          top: 65%; left: 20%;
          animation: floatShape 10s infinite ease-in-out;
        }
        @keyframes floatShape {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-25px) rotate(180deg); }
        }

        /* ── PARTICLES ── */
        .particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.6);
          animation: riseParticle 10s ease-in infinite;
          opacity: 0;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        @keyframes riseParticle {
          0%   { transform: translateY(0) scale(0.8); opacity: 0; }
          15%  { opacity: 0.65; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
        }

        /* ── CARDS ── */
        .invite-card,
        .chat-card {
          width: 100%;
          max-width: 600px;
          padding: 36px 30px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.28);
          position: relative;
          z-index: 2;
          animation: cardBounce 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          overflow: hidden;
        }

        /* shimmer stripe on card top */
        .invite-card::before,
        .chat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: shimmerLine 3s ease infinite;
        }
        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .invite-card.tapped {
          animation: tapFlash 0.42s ease both;
        }
        @keyframes tapFlash {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.97); filter: brightness(1.15); }
          100% { transform: scale(1); filter: brightness(1); }
        }

        @keyframes cardBounce {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── INVITE CARD CONTENT ── */
        .big-emoji {
          font-size: 80px;
          text-align: center;
          margin: 24px 0 16px;
          display: block;
          animation: jello 2s infinite ease-in-out;
          filter: drop-shadow(0 8px 18px rgba(102, 166, 255, 0.5));
        }
        @keyframes jello {
          0%, 100% { transform: scale(1) rotate(0deg); }
          20%       { transform: scale(0.92) rotate(-3deg); }
          60%       { transform: scale(1.06) rotate(3deg); }
        }

        .invite-card h2 {
          font-family: "Caveat", cursive;
          font-size: 38px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff, #d4f1ff, #fff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleShimmer 4s linear infinite, bounceInTitle 0.9s ease-out both;
          letter-spacing: -0.3px;
        }
        @keyframes titleShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounceInTitle {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { transform: scale(1.08); }
          80%  { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        .invite-card p {
          font-size: 16px;
          opacity: 0.88;
          text-align: center;
          line-height: 1.7;
          max-width: 340px;
          margin: 0 auto;
          font-style: italic;
          font-weight: 400;
          font-family: "Nunito", sans-serif;
          animation: fadeSlideUp 0.8s ease 0.3s both;
        }

        .tap-hint {
          margin-top: 28px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: "Nunito", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          animation: tapPulse 1.6s ease-in-out infinite, fadeSlideUp 0.8s ease 0.5s both;
        }
        .tap-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: dotBlink 1.6s ease-in-out infinite;
        }
        .tap-dot:last-child { animation-delay: 0.3s; }
        @keyframes tapPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }

        /* ── CHAT CARD ── */
        .chat-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          animation: fadeSlideUp 0.6s ease both;
        }

        .avatar-wrap {
          position: relative;
          width: 54px; height: 54px;
          flex-shrink: 0;
        }
        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          animation: ringPulse 2.4s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.18); opacity: 0.15; }
        }
        .avatar {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #89f7fe, #66a6ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 22px rgba(102, 166, 255, 0.45);
          animation: avatarBob 2.8s ease-in-out infinite;
        }
        @keyframes avatarBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .name {
          font-family: "Caveat", cursive;
          font-size: 24px;
          font-weight: 700;
          color: #1a2a4a;
          line-height: 1.1;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(26, 42, 74, 0.7);
          font-family: "Nunito", sans-serif;
          letter-spacing: 0.3px;
        }
        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #0ebe7e;
          box-shadow: 0 0 6px rgba(14, 190, 126, 0.7);
          animation: dotGlow 2s ease-in-out infinite;
        }
        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 4px rgba(14,190,126,0.5); }
          50%       { box-shadow: 0 0 10px rgba(14,190,126,0.9); }
        }

        /* ── LABELS ── */
        .message-label,
        .memory-label,
        .insta-label {
          font-family: "Caveat", cursive;
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 0.4px;
          color: #1a2a4a;
          opacity: 0.85;
          animation: fadeSlideUp 0.6s ease 0.2s both;
        }

        /* ── BUBBLE ── */
        .bubble {
          background: rgba(255, 255, 255, 0.95);
          color: #1a1a2e;
          padding: 22px 24px;
          border-radius: 24px 24px 24px 10px;
          margin-top: 10px;
          line-height: 1.75;
          min-height: 80px;
          white-space: pre-wrap;
          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255,255,255,0.8);
          font-size: 16px;
          font-weight: 500;
          font-family: "Nunito", sans-serif;
          border: 1px solid rgba(102, 166, 255, 0.18);
          animation: bubbleIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
          position: relative;
        }
        .bubble::before {
          content: '';
          position: absolute;
          bottom: -10px; left: 20px;
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 0 solid transparent;
          border-top: 10px solid rgba(255,255,255,0.95);
          filter: drop-shadow(0 3px 3px rgba(0,0,0,0.08));
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cursor-blink {
          display: inline-block;
          font-weight: 300;
          color: #66a6ff;
          animation: blink 0.9s step-end infinite;
          margin-left: 1px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── MEMORY ── */
        .memory-section { margin-top: 24px; animation: fadeSlideUp 0.6s ease 0.5s both; }

        .memory-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.25);
          margin-top: 10px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .memory-card:hover { transform: scale(1.025); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .memory-card img {
          width: 100%; height: 280px;
          object-fit: cover; display: block;
          transition: filter 0.4s ease;
        }
        .memory-card:not(.revealed) img { filter: blur(0px); }
        .overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.42);
          color: white;
          font-size: 15px;
          font-weight: 700;
          font-family: "Nunito", sans-serif;
          backdrop-filter: blur(6px);
          letter-spacing: 0.5px;
        }
        .overlay-icon { font-size: 28px; animation: overlayPulse 1.8s ease-in-out infinite; }
        @keyframes overlayPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.15); }
        }

        /* ── INSTAGRAM ── */
        .insta-section { margin-top: 24px; animation: fadeSlideUp 0.6s ease 0.65s both; }

        .insta-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border-radius: 20px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(16px);
          margin-top: 10px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }
        .insta-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 12px 28px rgba(0,0,0,0.16);
        }
        .insta-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .insta-text {
          font-size: 15px;
          line-height: 1.5;
          font-weight: 600;
          font-family: "Nunito", sans-serif;
          color: #1a2a4a;
        }
        .insta-text span {
          display: block;
          font-size: 12.5px;
          opacity: 0.75;
          margin-top: 3px;
          font-weight: 500;
          font-style: italic;
        }

        /* ── LOADING ── */
        .loading-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: #333;
          padding: 20px;
          gap: 24px;
        }

        .loader-ring {
          display: inline-block;
          position: relative;
          width: 64px; height: 64px;
        }
        .loader-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: 52px; height: 52px;
          margin: 6px;
          border: 5px solid white;
          border-radius: 50%;
          animation: loaderSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: white transparent transparent transparent;
        }
        .loader-ring div:nth-child(1) { animation-delay: -0.45s; }
        .loader-ring div:nth-child(2) { animation-delay: -0.3s; }
        .loader-ring div:nth-child(3) { animation-delay: -0.15s; }
        @keyframes loaderSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-title {
          font-family: "Caveat", cursive;
          font-size: 26px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 12px rgba(0,0,0,0.15);
          animation: loadingPulse 1.8s ease-in-out infinite;
        }
        @keyframes loadingPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }

        /* ── SHARED KEYFRAMES ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .container { padding: 70px 14px 50px; }
          .invite-card, .chat-card { padding: 28px 20px; border-radius: 22px; }
          .invite-card h2 { font-size: 32px; }
          .big-emoji { font-size: 60px; }
          .name { font-size: 21px; }
        }

        @media (max-width: 480px) {
          .container { padding: 60px 12px 40px; }
          .invite-card, .chat-card { padding: 24px 16px; border-radius: 18px; }
          .invite-card h2 { font-size: 28px; }
          .big-emoji { font-size: 54px; }
          .bubble { padding: 18px 16px; font-size: 15px; }
          .avatar-wrap, .avatar { width: 46px; height: 46px; font-size: 18px; }
        }

        @media (max-width: 360px) {
          .container { padding: 55px 8px 30px; }
        }
      `}</style>
    </div>
  );
}
