"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ProposalGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const floatingIcons = [
    { emoji: "💖", top: "10%", left: "15%" },
    { emoji: "💕", bottom: "20%", right: "10%" },
    { emoji: "💌", top: "30%", right: "25%" },
    { emoji: "💍", top: "50%", left: "70%" },
    { emoji: "🌹", bottom: "15%", left: "20%" },
  ];

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Floating proposal icons */}
      {floatingIcons.map((icon, idx) => (
        <div
          key={idx}
          className="proposal-float"
          style={{
            animationDelay: `${idx * 0.7}s`,
            top: icon.top || "auto",
            left: icon.left || "auto",
            right: icon.right || "auto",
            bottom: icon.bottom || "auto",
          }}
        >
          {icon.emoji}
        </div>
      ))}

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="avatar">💍</div>
        <h2 className="title-anim">Proposal Ready! ✨</h2>
        <p className="subtitle">
          Your magical moment has been planned! Make it unforgettable and share your love forever. 🌹
        </p>
        
        {/* <button
          onClick={() => router.push(`/propose/home?code=${code}`)}
          className="back-btn"
        >
          Plan Another 💕
        </button> */}
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

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #3a0d2e, #7b1e3b, #c72c41, #ff6b9d);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 25px 20px;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
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

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 10s infinite linear;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }

        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff69b4, #ff1493); }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff9ff3, #f368e0); animation-duration: 12s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #c44569, #ff6b9d); animation-duration: 9s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff1493, #ff69b4); animation-duration: 11s; }
        .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f368e0, #ff9ff3); animation-duration: 13s; }

        .proposal-float {
          position: absolute;
          font-size: 28px;
          opacity: 0.15;
          animation: floatGentle 10s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
          pointer-events: none;
          z-index: 1;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(4px);
          animation: floatShape 16s infinite ease-in-out;
        }
        .shape-one { width: 120px; height: 120px; background: rgba(255, 255, 255, 0.4); top: 12%; left: 8%; }
        .shape-two { width: 90px; height: 90px; background: rgba(255, 182, 193, 0.3); bottom: 18%; right: 12%; animation-direction: reverse; }
        .shape-three { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.3); top: 70%; left: 18%; }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        .card {
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 50px 40px;
          box-shadow: 
            0 25px 60px rgba(255, 107, 180, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
          position: relative;
          animation: fadeInUp 1s ease-out;
        }

        .avatar {
          font-size: 70px;
          margin-bottom: 20px;
          animation: heartbeat 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 25px rgba(255, 182, 193, 0.6));
          background: linear-gradient(45deg, #ff69b4, #ff1493, #ff9ff3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-anim {
          font-family: "Dancing Script", cursive;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #ffe4e1, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          line-height: 1.1;
          animation: bounceIn 1.2s ease-out;
          background-size: 200% 100%;
        }

        .subtitle {
          font-size: 16px;
          line-height: 1.7;
          opacity: 0.95;
          margin-bottom: 35px;
          font-weight: 300;
          font-family: "Poppins", sans-serif;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .back-btn {
          width: 100%;
          padding: 18px 24px;
          border: none;
          border-radius: 35px;
          background: linear-gradient(135deg, #ffffff, #f8f9ff);
          color: #c72c41;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 107, 180, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: "Poppins", sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .back-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 18px 45px rgba(255, 107, 180, 0.5);
          background: linear-gradient(135deg, #fbe6ee, #ffffff);
        }

        .back-btn:active {
          transform: translateY(-1px) scale(0.98);
        }

        @media (max-width: 768px) {
          .body { padding: 20px 16px; }
          .card { 
            padding: 40px 30px; 
            border-radius: 24px; 
            width: min(380px, 100%);
          }
          .avatar { font-size: 65px; }
          .title-anim { font-size: 28px; }
          .subtitle { font-size: 15px; }
        }

        @media (max-width: 480px) {
          .body { padding: 16px 12px; }
          .card { 
            padding: 32px 24px; 
            border-radius: 22px;
            width: min(360px, 100%);
          }
          .avatar { 
            font-size: 60px; 
            margin-bottom: 16px; 
          }
          .title-anim { font-size: 26px; }
          .subtitle { font-size: 14px; }
          .back-btn { 
            padding: 16px 20px; 
            font-size: 15px; 
          }
          .proposal-float { font-size: 24px; }
        }
      `}</style>
    </div>
  );
}