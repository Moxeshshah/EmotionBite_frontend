"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function CongratsConnect() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/congrats/login?code=${code}`);
    }
  }, [router, code]);

  const suggestions = [
    "So proud of you! 🎊",
    "You totally deserve this! 🌟",
    "Cheers to your success! 🥂",
    "Keep shining bright! ✨",
  ];

  const fill = (text) => {
    setMessage(text);
  };

  const sendWish = async () => {
    if (message.trim() === "") {
      alert("Please write a message 🎉");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName || "Receiver",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);

      setMessage("");
      router.push(`/congrats/greet?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="body">
      <div className="confetti" />
      <div className="confetti" />
      <div className="confetti" />
      <div className="confetti" />

      <div className="card">
        <BrandHeader />
        
        <div className="avatar-section">
          <div className="avatar">🎉</div>
          <div className="avatar">✨</div>
        </div>

        <div className="title">Send Joyful Wishes..</div>
        <div className="subtitle">
          Celebrate milestones and spread happiness instantly.
        </div>

        <div className="input-group">
          <label>Recipient&apos;s Name</label>
          <input
            type="text"
            placeholder="Enter recipient's name 🎈"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>

        <div className="suggestion-row">
          {suggestions.map((s, idx) => (
            <div key={idx} onClick={() => fill(s)} className="suggestion-pill">
              {s}
            </div>
          ))}
        </div>

        <div className="input-group">
          <label>Message</label>
          <textarea
            placeholder="Write your congratulation message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />
        </div>

        <button onClick={sendWish} className="btn-login">
          Send Cheers 🎊
        </button>
      </div>

      {toastVisible && (
        <div className="toast">
          🎉 Your congratulation has been sent!
        </div>
      )}

      <style jsx>{`
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
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4a00e0, #8e2de2, #ff6a00);
          overflow: hidden;
          position: relative;
          padding: 16px;
          box-sizing: border-box;
        }

        .confetti {
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 8s infinite ease-in-out;
          pointer-events: none;
        }

        .confetti:nth-child(1) {
          background: #ffeb3b;
          top: 10%;
          left: 20%;
        }

        .confetti:nth-child(2) {
          background: #ff4081;
          top: 70%;
          left: 10%;
        }

        .confetti:nth-child(3) {
          background: #00e5ff;
          top: 30%;
          right: 15%;
        }

        .confetti:nth-child(4) {
          background: #69f0ae;
          bottom: 20%;
          right: 25%;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .card {
          width: min(360px, 95%);
          padding: 32px 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          color: white;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        /* Balloons and celebration emojis stay EXACTLY the same */
        // .card::before {
        //   content: "🎈";
        //   position: absolute;
        //   font-size: 60px;
        //   top: -30px;
        //   left: -20px;
        // }

        // .card::after {
        //   content: "🎊";
        //   position: absolute;
        //   font-size: 60px;
        //   bottom: -30px;
        //   right: -20px;
        // }

        .avatar-section {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .avatar:nth-child(2) {
          background: linear-gradient(135deg, #03a9f4, #00e5ff);
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .input-group {
          margin-bottom: 16px;
          text-align: left;
        }

        .input-group label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 6px;
          display: block;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          outline: none;
          font-size: 14px;
          font-family: "Poppins", sans-serif;
          resize: none;
        }

        .input-group input::placeholder,
        .input-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .suggestion-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 16px;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }

        .suggestion-pill {
          min-width: 140px;
          padding: 8px 12px;
          border-radius: 18px;
          font-size: 11px;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: 0.3s;
        }

        .suggestion-pill:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(90deg, #ff9800, #ff5722);
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: 0.3s;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          font-size: 14px;
          font-family: "Poppins", sans-serif;
        }

        .btn-login:hover {
          transform: translateY(-3px);
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #ff5722;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
          font-family: "Poppins", sans-serif;
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .card {
            width: min(340px, 95%);
            padding: 28px 24px;
            border-radius: 20px;
          }

          .avatar {
            width: 65px;
            height: 65px;
            font-size: 26px;
          }

          .title {
            font-size: 22px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 20px;
          }

          .suggestion-pill {
            min-width: 130px;
            font-size: 11px;
            padding: 7px 11px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          .card {
            width: min(320px, 95%);
            padding: 24px 20px;
            border-radius: 18px;
          }

          /* Balloons still unchanged on mobile */
          .card::before,
          .card::after {
            font-size: 60px;
            top: -30px;
            left: -20px;
          }
          .card::after {
            bottom: -30px;
            right: -20px;
          }

          .avatar-section {
            gap: 14px;
            margin-bottom: 16px;
          }

          .avatar {
            width: 58px;
            height: 58px;
            font-size: 24px;
          }

          .title {
            font-size: 20px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 18px;
          }

          .suggestion-pill {
            min-width: 120px;
            font-size: 10.5px;
            padding: 6px 10px;
          }
        }
      `}</style>
    </div>
  );
}