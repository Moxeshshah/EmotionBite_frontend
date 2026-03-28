"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function Anniversary() {
  const [loveNote, setLoveNote] = useState("");
  const [partnerName, setPartnerName] = useState(""); // new: partner name field
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false); // suggestions dropdown

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

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
    if (!code) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/anniversary/login?code=${code}`);
    }
  }, [code, router]);

  const celebrateLove = async () => {
    if (loveNote.trim() === "") {
      alert("Write something special before celebrating 💖");
      return;
    }
    if (!partnerName.trim()) {
      alert("Please enter your partner’s name");
      return;
    }

    try {
      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: partnerName, // now dynamic
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: loveNote,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save message");
        return;
      }

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/anniversary/greet?code=${code}`);
      }, 1500);

      setLoveNote("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const fillText = (text) => {
    setLoveNote(text);
  };

  const suggestions = [
    "Happy anniversary, my love. You’re the reason every day feels like a gift. 💌",
    "Another year with you feels like a dream I never want to wake up from. I love you endlessly. 💕",
    "To the person who makes my heart skip a beat every single day—happy anniversary, my forever. 💖",
    "You’re my favorite place to come home to. Happy anniversary to my soulmate and best friend. 🤍",
    "Every moment with you is a chapter I’d relive a thousand times. Happy anniversary, my everything. 💞",
  ];

  const floatingHearts = [
    { emoji: "💖", left: "15%", delay: "0s" },
    { emoji: "💕", left: "35%", delay: "3s" },
    { emoji: "💞", left: "60%", delay: "5s" },
    { emoji: "💘", left: "80%", delay: "2s" },
  ];

  const moments = [
    "💍 The day we said yes to forever.",
    "🌍 Our first trip together.",
    "🏡 Building dreams side by side.",
  ];

  const songs = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "A Thousand Years - Christina Perri",
  ];

  return (
    <div className="page">
      {/* Floating Hearts */}
      {floatingHearts.map((heart, idx) => (
        <div
          key={idx}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Main Card */}
      <div className="anniversary-card">
        <BrandHeader />
        <div className="avatar">💑</div>
        <h1>Our Special Day</h1>
        <p className="subtitle">
          Another year of love, laughter, and unforgettable memories.
        </p>

        {/* Partner Name Input */}
        <div className="input-box">
          <label>Partner’s Name 👩‍❤️‍👨</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your partner’s name"
          />
        </div>

        {/* Love Note */}
        <div className="input-box">
          <label>Write Your Love Note 💌</label>
          <textarea
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            placeholder="Write a heartfelt anniversary message to your partner..."
          />
        </div>

        {/* Message Suggestions dropdown */}
        <div
          className="suggestions-title toggle"
          onClick={() => setShowSuggestions(!showSuggestions)}
        >
          <h3>Need ideas? ✨</h3>
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

        {/* Beautiful Moments */}
        {/* <div className="moments-section">
          <h3>Beautiful Moments Together ✨</h3>
          {moments.map((moment, idx) => (
            <div key={idx} className="moment">
              {moment}
            </div>
          ))}
        </div> */}

        <button className="celebrate-btn" onClick={celebrateLove}>
          Celebrate Love 🎊
        </button>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="toast">
          💖 Your anniversary celebration has been saved!
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@300;400;500&display=swap");

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
          overflow: hidden;
          position: relative;
          font-family: "Poppins", sans-serif;
          padding: 16px;
        }

        .heart {
          position: absolute;
          font-size: 18px;
          animation: float 6s infinite ease-in;
          pointer-events: none;
          opacity: 0.85;
          z-index: 1;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0.6);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }

        .anniversary-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          padding: 40px 28px;
          text-align: center;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 2;
          position: relative;
        }

        .avatar {
          font-size: 64px;
          margin-bottom: 0px;
        }

        h1 {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .subtitle {
          color: #fff;
          font-size: 15px;
          margin-bottom: 15px;
          opacity: 0.95;
          line-height: 1.6;
        }

        h3 {
          font-size: 16px;
          color: #fff;
          margin-bottom: 2px;
          font-weight: 500;
        }

        .input-box {
          margin-bottom: 10px;
          text-align: left;
        }

        .input-box label {
          font-size: 13px;
          color: #fff;
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .input-box input,
        .input-box select,
        .input-box textarea {
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          color: #333;
          font-family: "Poppins", sans-serif;
          box-sizing: border-box;
          transition: 0.3s;
        }

        .input-box input:focus,
        .input-box select:focus,
        .input-box textarea:focus {
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.95);
        }

        .input-box textarea {
          height: 120px;
          resize: none;
          font-family: "Poppins", sans-serif;
        }

        /* Suggestions header */
        .suggestions-title.toggle {
          font-size: 14px;
          margin: 8px 0 10px;
          opacity: 0.9;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .dropdown-icon {
          transition: transform 0.3s ease;
          font-size: 14px;
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          margin-bottom: 4px;
        }

        .suggestions-wrapper.open {
          max-height: 500px;
        }

        .suggestions {
          margin-top: 8px;
          color: #fff;
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

        .moments-section {
          margin-bottom: 20px;
        }

        .moment {
          background: rgba(255, 255, 255, 0.25);
          padding: 14px;
          border-radius: 16px;
          margin-bottom: 12px;
          font-size: 13px;
          color: #fff;
          line-height: 1.5;
          backdrop-filter: blur(10px);
        }

        .celebrate-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(to right, #ff758c, #ff7eb3);
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          transition: 0.3s;
          box-shadow: 0 8px 25px rgba(255, 118, 136, 0.4);
          margin-top: 0px;
        }

        .celebrate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 118, 136, 0.5);
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #ff4d6d;
          padding: 14px 24px;
          border-radius: 30px;
          font-size: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 100;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .page {
            padding: 12px;
          }

          .anniversary-card {
            padding: 32px 20px;
            border-radius: 20px;
            max-width: 360px;
          }

          .avatar {
            font-size: 40px;
          }

          h1 {
            font-size: 24px;
          }

          .subtitle {
            font-size: 14px;
          }

          .input-box input,
          .input-box select,
          .input-box textarea {
            padding: 12px;
            font-size: 14px;
          }

          .input-box textarea {
            height: 110px;
          }

          .celebrate-btn {
            padding: 14px;
            font-size: 15px;
          }

          .heart {
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .anniversary-card {
            max-width: 440px;
            padding: 48px 32px;
          }

          .avatar {
            font-size: 70px;
          }

          h1 {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}