"use client";

import { useRouter } from "next/navigation";

export default function LoveGreet() {
  const router = useRouter();

  return (
    <div className="body">
      <div className="page-wrap">
        {["💌", "🕊", "✨", "🌧"].map((sticker, idx) => (
          <div
            key={idx}
            className={`sticker sticker-${idx + 1}`}
          >
            {sticker}
          </div>
        ))}

        <div className="card">
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>💖</div>
          <h2>
            Your Message Has Been Sent! 💌
          </h2>
          <p>
            Your heartfelt message has been delivered. You can now give it to your loved one or let it brighten their day. 🕊✨
          </p>

          <button
            onClick={() => router.push("/apology/home")}
            className="back-btn"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe0ec")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            Back to Your Messages ✨
          </button>
        </div>

        <div className="toast">
          💌 Your message has been delivered with care.
        </div>
      </div>

      <style jsx>{`
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

        .body {
          min-height: 100vh;
          width: 100vw;
          font-family: "Inter", sans-serif;
          background: linear-gradient(180deg, #3b0d2e, #7b1e5c, #ff758f);
          color: #fff;
          padding: 25px 20px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .page-wrap {
          width: 100%;
          max-width: 520px;
          min-height: calc(100vh - 50px);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sticker {
          position: absolute;
          font-size: 36px;
          opacity: 0.2;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .sticker-1 {
          left: 10%;
          top: 18%;
          animation-delay: 0s;
        }

        .sticker-2 {
          left: 30%;
          top: 70%;
          animation-delay: 1.5s;
        }

        .sticker-3 {
          left: 60%;
          top: 22%;
          animation-delay: 3s;
        }

        .sticker-4 {
          left: 80%;
          top: 62%;
          animation-delay: 4.5s;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 40px 35px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          z-index: 2;
        }

        .card h2 {
          font-size: 26px;
          margin-bottom: 12px;
          font-family: "Playfair Display", serif;
          line-height: 1.25;
        }

        .card p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .back-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 600;
          background: #ffffff;
          color: #7b1e5c;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          color: #7b1e5c;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px;
          }

          .page-wrap {
            min-height: calc(100vh - 36px);
          }

          .card {
            padding: 34px 24px;
            border-radius: 20px;
          }

          .card h2 {
            font-size: 24px;
          }

          .card p {
            font-size: 13px;
          }

          .sticker {
            font-size: 30px;
            opacity: 0.16;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 18px;
          }

          .card h2 {
            font-size: 22px;
          }

          .card p {
            font-size: 12px;
          }

          .back-btn {
            padding: 14px;
            font-size: 14px;
          }

          .sticker {
            font-size: 26px;
          }

          .sticker-1 {
            left: 4%;
            top: 10%;
          }

          .sticker-2 {
            left: 8%;
            top: 78%;
          }

          .sticker-3 {
            left: 70%;
            top: 12%;
          }

          .sticker-4 {
            left: 78%;
            top: 70%;
          }
        }
      `}</style>
    </div>
  );
}