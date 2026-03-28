"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";
export const dynamic = "force-dynamic";

export default function AnniversaryGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  return (
    <div className="page">
      {["💖", "💕", "💞", "💘"].map((heart, idx) => (
        <div
          key={idx}
          className="heart"
          style={{
            left: `${15 + idx * 20}%`,
            animationDelay: `${idx * 1.5}s`,
          }}
        >
          {heart}
        </div>
      ))}

      <div className="card">
        <BrandHeader />
        <div className="icon">💌</div>

        <h2 className="heading">A Celebration of Love 💍</h2>

<p className="subtext">
  Your heartfelt anniversary message has been beautifully delivered. 💌  
  May your love continue to grow stronger with every passing day, filled with
  endless happiness, memories, and togetherness. ✨
</p>

        {/* <button
          className="cta-btn"
          onClick={() => router.push(`/anniversary/home?code=${code}`)}
        >
          Back to Memories ✨
        </button> */}
      </div>

      <div className="toast">💖 Message delivered with love!</div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;500&display=swap");

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .page {
          background: linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb);
          min-height: 100vh;
          width: 100vw;
          padding: 25px 16px;
          color: white;
          position: relative;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          padding: 48px 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.35);
          z-index: 2;
          position: relative;
        }

        .icon {
          font-size: 66px;
          margin-bottom: 22px;
        }

        .heading {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 14px;
          line-height: 1.25;
          letter-spacing: -0.2px;
          color: #fff;
        }

        .subtext {
          font-size: 15px;
          opacity: 0.95;
          margin-bottom: 30px;
          line-height: 1.7;
          color: #fff;
        }

        .cta-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(135deg, #ff758c, #ff7eb3);
          color: white;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(255, 118, 136, 0.45);
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: none;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px rgba(255, 118, 136, 0.55);
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #ff4d6d;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        .heart {
          position: absolute;
          font-size: 18px;
          opacity: 0.6;
          animation: float 8s infinite ease-in;
          pointer-events: none;
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

        @media (max-width: 480px) {
          .page {
            padding: 20px 12px;
          }

          .card {
            padding: 28px 20px;
            border-radius: 18px;
          }

          .heading {
            font-size: 24px;
          }

          .subtext {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .icon {
            font-size: 54px;
            margin-bottom: 18px;
          }

          .heart {
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .page {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}