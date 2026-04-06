"use client";

import BrandHeader from "../BrandHeader";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FirstMessage() {
  const [message, setMessage] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [senderName, setSenderName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
  const suggestions = [
    "Hey 😊 I saw your profile and felt like saying hi. How's your day going?",
    "Hi! You seem interesting… what's something that always makes you smile?",
    "Hey 👋 If we met randomly, what would be the first thing you'd say to me?",
    "Hello! What's one thing you absolutely love doing in your free time?",
    "Hey 😊 I don't usually do this, but you seem worth a conversation.",
  ];

  const fillText = (text) => {
    setMessage(text);
  };

  const setMood = (mood) => {
    setMessage(`Mood: ${mood}\n\n`);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Write your message");
      return;
    }

    if (senderName.trim() === "") {
      alert("Please enter your name");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const instagramUrl = instagramUsername.trim()
        ? `https://www.instagram.com/${instagramUsername.trim()}`
        : "";

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: "Stranger",
          receiverMobile: "",
          senderName: senderName,
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
          instagramUrl: instagramUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
      router.push(`/approach/greet?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    setMounted(true);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [code, router]);

  // if (!mounted) {
  //   return (
  //     <div className="loading-screen">
  //       <div className="loader" />
  //       <h2 className="loading-title">Loading Emotion Bite...</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="body">
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <h1>Say Hello 👋</h1>
            <p>
              Your first message sets the tone. Make it warm, real, and
              memorable.
            </p>
          </div>

          {/* Compact Name Input */}
          <div className="name-input-compact">
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="👤 Enter your name"
              className="name-input"
            />
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your first message here..."
            className="message-input"
          />

<div
  className="suggestions-title toggle"
  onClick={() => setShowSuggestions(!showSuggestions)}
>
  <span>Need ideas? ✨</span>
  <span className={`dropdown-icon ${showSuggestions ? "open" : ""}`}>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</span>
</div>         
 <div className={`suggestions-wrapper ${showSuggestions ? "open" : ""}`}>
  <div className="suggestions">
    {suggestions.map((sugg, idx) => (
      <div
        key={idx}
        className="suggestion-box"
        onClick={() => fillText(sugg)}
      >
        {sugg}
      </div>
    ))}
  </div>
</div>
          <div className="instagram-section">
            <div className="insta-header">
              <div className="insta-icon">
                <img src="/image1.png" alt="Instagram" />
              </div>
              <div>
                <h3>Stay Connected</h3>
                <p>Let them find you beyond this moment</p>
              </div>
            </div>

            <div className="insta-input-box">
              <span>@</span>
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                placeholder="your_username"
              />
            </div>

            {/* {instagramUsername && (
              <div className="insta-preview">
                🔗 instagram.com/{instagramUsername}
              </div>
            )} */}
          </div>

          <button onClick={sendMessage} className="send-btn">
            Send First Step 🚀
          </button>

          {toastVisible && (
            <div className="toast">🎉 Your first message has been sent!</div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
          position: relative;
          overflow-x: hidden;
          padding: 8px 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .card {
          width: 100%;
          max-width: 600px;
          padding: 16px 20px 16px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 0.8s ease-out;
        }

        .content {
          position: relative;
          z-index: 2;
        }

        /* Compact Name Input Styles */
       .name-input-compact {
  margin: 14px 0 12px 0;
}

        .name-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 18px;
          border: none;
          outline: none;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #333;
          font-weight: 500;
        }

        .name-input::placeholder {
          color: rgba(51, 51, 51, 0.6);
        }

        .name-input:focus {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .name-preview-compact {
          margin-top: 8px;
          font-size: 13px;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
        }

        .suggestions-title {
          font-size: 14px;
          margin: 8px 0 10px; /* Reduced from 18px 0 10px */
          opacity: 0.9;
          font-weight: 500;
        }

        .suggestion-box {
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .suggestion-box:active {
          transform: scale(0.97);
        }

        .hero-section {
          text-align: center;
          margin-bottom: 16px;
        }

        .hero-section h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .hero-section p {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.6;
        }
/* Toggle Header */
.suggestions-title.toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/* Dropdown icon animation */
.dropdown-icon {
  transition: transform 0.3s ease;
  font-size: 14px;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

/* Wrapper animation */
.suggestions-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
  .suggestions-wrapper {
  margin-bottom: 4px;
}

.suggestions-wrapper.open {
  max-height: 500px; /* enough to fit content */
}
        .mood-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          margin-bottom: 24px;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .mood-row::-webkit-scrollbar {
          display: none;
        }

        .mood-pill {
          min-width: 120px;
          padding: 12px 16px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .mood-pill:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .message-input {
          width: 100%;
          height: 100px;
          padding: 18px;
          border-radius: 20px;
          border: none;
          resize: none;
          outline: none;
          font-size: 15px;
          color: #333;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          line-height: 1.5;
          font-family: inherit;
          margin-bottom: 0; /* Reduced from 24px */
        }

        .message-input::placeholder {
          color: rgba(51, 51, 51, 0.6);
        }

        .message-input:focus {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .instagram-section {
          margin: 10px 0;
          padding: 12px;
          border-radius: 22px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25),
            rgba(255, 255, 255, 0.1)
          );
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .insta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .insta-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .insta-icon img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .insta-header h3 {
          font-size: 15px;
          font-weight: 600;
        }

        .insta-header p {
          font-size: 12px;
          opacity: 0.85;
        }

        .insta-input-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 14px;
  padding: 6px 14px;
  gap: 8px;
  width: 100%;
  overflow: hidden;   /* prevents any edge bleed */
}

        .insta-input-box span {
          color: #888;
          font-weight: 600;
        }

        .insta-input-box input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  min-width: 0;        /* 🔥 THIS FIXES MOBILE */
}

        .insta-preview {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.9;
        }

        .suggestions {
          margin-top: 8px;
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.2);
          padding: 14px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          line-height: 1.5;
        }

        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .send-btn {
          width: 100%;
          margin-top: 2px;
          padding: 10px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 154, 158, 0.4);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .send-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(255, 154, 158, 0.5);
        }

        .toast {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #66a6ff;
          padding: 14px 24px;
          border-radius: 35px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

        .loading-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          padding: 20px;
          font-family: "Poppins", sans-serif;
          color: white;
        }

        .loader {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        .loading-title {
          font-size: 20px;
          font-weight: 600;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.03);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
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

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px 28px;
          }
          .hero-section h1 {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 16px 12px 24px;
          }
          .hero-section h1 {
            font-size: 22px;
          }
          .mood-pill {
            min-width: 100px;
            padding: 10px 12px;
            font-size: 12.5px;
          }
          .message-input {
            height: 90px;
            padding: 16px;
          }
          .name-input {
            font-size: 14px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
}