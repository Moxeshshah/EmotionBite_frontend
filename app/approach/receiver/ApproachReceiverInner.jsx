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

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <h2 className="loading-title">Loading Emotion Bite...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <h2 className="loading-title">Loading message...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <BrandHeader />

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      {/* {opened && <div className="sparkle">✨</div>} */}

      {!opened ? (
        <div className="invite-card" onClick={() => setOpened(true)}>
          <div className="preview">
            <div className="preview-avatar">😊</div>
            <div>
              <div className="preview-name">{data.sender || "New Connection"}</div>
              <div className="preview-sub">sent you a message</div>
            </div>
          </div>

          <div className="big-emoji">✉️</div>

          <h2>You've got a message</h2>
          <p>Someone reached out to start a conversation.</p>

          <div className="tap-hint">Tap to open ✨</div>
        </div>
      ) : (
        <div className="chat-card">
          <div className="chat-header">
            <div className="avatar">😊</div>
            <div>
              <div className="name">{data.sender || "New Connection"}</div>
              {/* <div className="status">Active now</div> */}
            </div>
          </div>

          <div className="message-label">A stranger just reach out to you...</div>

          <div className="bubble">{typedMessage}</div>

          {data.image && (
            <div className="memory-section">
              <div className="memory-label">📷 Photo shared</div>

              <div
                className={`memory-card ${revealImage ? "revealed" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="shared" />
                {!revealImage && <div className="overlay">Tap to reveal</div>}
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

          {/* <button className="reply-btn">Reply & Start Chat 💬</button> */}
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          font-family: "Poppins", sans-serif;
        }


        .container {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
          position: relative;
          overflow: hidden;
          padding: 80px 20px 60px;
          margin: 0;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.16;
          filter: blur(2px);
        }

        .shape-one {
          width: 110px;
          height: 110px;
          background: white;
          top: 10%;
          left: 8%;
          animation: float 12s infinite ease-in-out;
        }

        .shape-two {
          width: 80px;
          height: 80px;
          background: #ffd6e7;
          bottom: 14%;
          right: 10%;
          animation: float 14s infinite ease-in-out reverse;
        }

        .shape-three {
          width: 62px;
          height: 62px;
          background: #ffffff;
          top: 65%;
          left: 20%;
          animation: float 10s infinite ease-in-out;
        }

        .invite-card,
        .chat-card {
          width: 100%;
          max-width: 600px;
          padding: 32px 28px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.25);
          animation: fadeIn 0.7s ease-out;
          position: relative;
          z-index: 2;
        }

        .preview {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .preview-avatar,
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff9a9e, #fecfef, #fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .preview-name,
        .name {
          font-size: 18px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
        }

        .preview-sub,
        .status {
          font-size: 13px;
          opacity: 0.9;
          font-weight: 500;
        }

        .big-emoji {
          font-size: 64px;
          text-align: center;
          margin: 24px 0;
        }

        .invite-card h2 {
          font-size: 28px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 12px;
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        .invite-card p {
          font-size: 16px;
          opacity: 0.95;
          text-align: center;
          line-height: 1.7;
          max-width: 320px;
          margin: 0 auto;
        }

        .tap-hint {
          margin-top: 24px;
          text-align: center;
          font-size: 15px;
          opacity: 1;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .message-label,
        .memory-label,
        .insta-label {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
        }

        .bubble {
          background: rgba(255, 255, 255, 0.95);
          color: #1a1a2e;
          padding: 24px;
          border-radius: 24px 24px 24px 12px;
          margin-top: 12px;
          line-height: 1.7;
          min-height: 80px;
          white-space: pre-wrap;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          font-weight: 500;
        }

        .memory-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          margin-top: 12px;
          transition: all 0.3s ease;
        }

        .memory-card:hover {
          transform: scale(1.02);
        }

        .memory-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          color: white;
          font-size: 15px;
          font-weight: 700;
          backdrop-filter: blur(4px);
        }

        .insta-section {
          margin-top: 24px;
        }

        .insta-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border-radius: 20px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(16px);
          margin-top: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .insta-card:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .insta-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .insta-text {
          font-size: 15px;
          line-height: 1.5;
          font-weight: 500;
        }

        .insta-text span {
          display: block;
          font-size: 13px;
          opacity: 0.9;
          margin-top: 4px;
          font-weight: 600;
        }

        .reply-btn {
          margin-top: 28px;
          width: 100%;
          padding: 18px 24px;
          border-radius: 32px;
          border: none;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          color: white;
          font-weight: 700;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 12px 35px rgba(255, 107, 157, 0.4);
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .reply-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 45px rgba(255, 107, 157, 0.5);
        }

        .loading-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
          padding: 20px;
        }

        .loader {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        }

        .loading-title {
          font-size: 22px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive for mobile and web */
        @media (max-width: 768px) {
          .container {
            padding: 70px 14px 50px;
            gap: 20px;
          }
          .invite-card,
          .chat-card {
            width: 100%;
            max-width: none;
            padding: 28px 20px;
            border-radius: 20px;
          }
          .invite-card h2 {
            font-size: 26px;
          }
          .big-emoji {
            font-size: 56px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 60px 12px 40px;
          }
          .invite-card,
          .chat-card {
            padding: 24px 16px;
            border-radius: 18px;
          }
          .bubble {
            padding: 18px 16px;
            font-size: 15px;
          }
          .reply-btn {
            padding: 16px 20px;
            font-size: 15px;
          }
          .preview-avatar,
          .avatar {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }
        }

        @media (max-width: 360px) {
          .container {
            padding: 55px 8px 30px;
          }
        }`}</style>
    </div>
  );
}