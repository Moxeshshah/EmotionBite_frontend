"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandHeader from "../BrandHeader";

export default function LoveGreet() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />
      
      <div className="page-wrap">
        {["💌", "🕊️", "✨", "🌧️"].map((sticker, idx) => (
          <div key={idx} className={`sticker sticker-${idx + 1}`}>
            {sticker}
          </div>
        ))}

        <div className={`card ${isVisible ? 'visible' : ''}`}>
          <BrandHeader />
          <div className="heart-emoji">💖</div>
          <h2 className="title">Your Message Has Been Sent! 💌</h2>
          <p className="subtitle">
            Your heartfelt message has been delivered. You can now give it to your loved one or let it brighten their day. 🕊️✨
          </p>
        </div>

        <div className="toast">💌 Your message has been delivered with care.</div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :global(html), :global(body) {
          margin: 0; padding: 0; width: 100%; overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          font-family: 'Poppins', sans-serif;
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

        /* Floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: particleFloat 15s infinite linear;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
        }
        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff758f, #ffb6c1); top: 10%; left: 10%; animation-delay: 0s; }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #7b1e5c, #ff758f); top: 80%; right: 20%; animation-delay: 3s; animation-duration: 18s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #ffb6c1, #3b0d2e); bottom: 20%; left: 70%; animation-delay: 6s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff758f, #7b1e5c); top: 60%; right: 10%; animation-delay: 9s; }

        @keyframes particleFloat {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
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
          opacity: 0.25;
          animation: float 12s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px rgba(255, 117, 143, 0.4));
          pointer-events: none;
        }

        .sticker-1 { left: 10%; top: 18%; animation-delay: 0s; }
        .sticker-2 { left: 30%; top: 70%; animation-delay: 2s; }
        .sticker-3 { left: 60%; top: 22%; animation-delay: 4s; }
        .sticker-4 { left: 80%; top: 62%; animation-delay: 6s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-8px) rotate(240deg) scale(0.95); }
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 50px 40px;
          width: 100%;
          max-width: 420px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
          z-index: 2;
          position: relative;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .heart-emoji {
          font-size: 80px;
          margin: 0 0 25px 0;
          display: block;
          animation: heartPulse 2s infinite ease-in-out;
          filter: drop-shadow(0 8px 25px rgba(255, 117, 143, 0.6));
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .title {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(28px, 6vw, 36px);
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.2;
          background: linear-gradient(135deg, #fff, #ffe4e6, #ffb6c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleShimmer 3s infinite;
          text-shadow: 0 4px 20px rgba(255, 117, 143, 0.4);
        }

        @keyframes titleShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(16px, 3.5vw, 18px);
          line-height: 1.7;
          opacity: 0.95;
          margin-bottom: 30px;
          font-weight: 400;
          animation: fadeInUp 1.2s ease-out 0.3s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .toast {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #7b1e5c;
          padding: 16px 28px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 50;
          animation: toastSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px);
        }

        @keyframes toastSlide {
          from { transform: translateX(-50%) translateY(60px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .body { padding: 20px 16px; }
          .card { padding: 40px 30px; border-radius: 24px; }
          .heart-emoji { font-size: 70px; margin-bottom: 20px; }
          .sticker { font-size: 32px; opacity: 0.2; }
        }

        @media (max-width: 480px) {
          .body { padding: 16px 12px; }
          .card { padding: 32px 24px; border-radius: 20px; }
          .heart-emoji { font-size: 65px; }
          .title { font-size: 28px !important; }
          .subtitle { font-size: 15px; }
          .sticker { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}