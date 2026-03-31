"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function MessageSent() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const floatingMoons = [
    { emoji: "🌙", top: "15%", left: "10%" },
    { emoji: "✨", bottom: "25%", right: "15%" },
    { emoji: "🌟", top: "35%", right: "20%" },
    { emoji: "⭐", top: "55%", left: "75%" },
    { emoji: "🌜", bottom: "10%", left: "25%" },
  ];

  const goBackHome = () => {
    router.push(`/clouser/home?code=${code}`);
  };

  return (
    <div className="body">
      {floatingMoons.map((moon, idx) => (
        <div
          key={idx}
          className="moon-float"
          style={{
            animationDelay: `${idx * 0.8}s`,
            top: moon.top || "auto",
            left: moon.left || "auto",
            right: moon.right || "auto",
            bottom: moon.bottom || "auto",
          }}
        >
          {moon.emoji}
        </div>
      ))}

      <div className="card">
        <BrandHeader />
        <div className="main-moon">🌙</div>

        <h2>Message Sent Successfully!!🌌</h2>

        <p>
          Your heartfelt closure message has been delivered under the moonlight ✨.
          Give the chocolate to the receiver and let the stars align their path.
        </p>

       
      </div>

      <div className="toast">
        ✨ Your closure message has been sent under the moonlight!
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,300..900;1,300..900&family=Crimson+Text:ital@0;1&display=swap');
        
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
          color: white;
          padding: 25px 20px 40px 20px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 50%, #6a11cb 100%);
          overflow: hidden;
          box-sizing: border-box;
        }

        .moon-float {
          position: absolute;
          font-size: 32px;
          opacity: 0.18;
          animation: gentleFloat 12s infinite ease-in-out;
          pointer-events: none;
          z-index: 1;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
        }

        .card {
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 45px 35px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.25);
          position: relative;
          z-index: 2;
          animation: cardGlow 2s ease-out 0.5s both;
        }

        .main-moon {
          font-size: 65px;
          margin-bottom: 20px;
          animation: moonPulse 3s ease-in-out infinite;
          display: block;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-style: italic;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 5vw, 32px);
          font-weight: 700;
          font-style: italic;
          margin-bottom: 15px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1s both;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0ff 50%, #e6e6ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        p {
          font-family: 'Crimson Text', serif;
          font-size: clamp(14px, 3.2vw, 15px);
          font-style: italic;
          font-weight: 400;
          opacity: 0.95;
          margin-bottom: 30px;
          line-height: 1.7;
          letter-spacing: 0.02em;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.3s both;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }

        .back-btn {
          width: 100%;
          padding: 18px 20px;
          border: none;
          border-radius: 35px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 255, 1) 100%);
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 3.5vw, 16px);
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUpBtn 0.8s ease-out 1.6s both;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .back-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }

        .back-btn:hover::before {
          left: 100%;
        }

        .back-btn:hover {
          background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
          color: #5a0ea0;
        }

        .toast {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.97);
          color: #6a11cb;
          padding: 16px 28px;
          border-radius: 40px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: clamp(13px, 3vw, 14px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 50;
          animation: toastSlide 0.6s ease-out 2s both;
          letter-spacing: 0.3px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.18;
          }
          33% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.25;
          }
          66% {
            transform: translateY(-15px) rotate(-3deg);
            opacity: 0.22;
          }
        }

        @keyframes moonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes cardGlow {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpBtn {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes toastSlide {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 20px 16px 35px 16px;
          }
          .card {
            padding: 38px 28px;
            border-radius: 22px;
          }
          .main-moon {
            font-size: 58px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 16px 12px 30px 12px;
          }
          .card {
            padding: 32px 22px;
            border-radius: 20px;
          }
          .main-moon {
            font-size: 54px !important;
            margin-bottom: 18px;
          }
          .moon-float {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}