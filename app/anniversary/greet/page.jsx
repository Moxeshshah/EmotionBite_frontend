"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export const dynamic = "force-dynamic";

export default function AnniversaryGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Romantic particle canvas (same as anniversary home)
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    const hearts = ["💖", "💕", "💞", "💗", "💝", "✨", "💫", "🌸", "🌹"];

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.3 + 0.1,
        heart: hearts[Math.floor(Math.random() * hearts.length)],
        scale: Math.random() * 0.7 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        hue: Math.random() * 25 + 305
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.0007;
        p.scale -= 0.0007;

        if (p.y > canvas.height || p.opacity <= 0 || p.scale <= 0) {
          p.y = -80;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.6 + 0.2;
          p.scale = Math.random() * 0.7 + 0.3;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = `hsl(${p.hue}, 70%, 65%)`;
        ctx.shadowBlur = 25;
        ctx.font = `${28 * p.scale}px Arial`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(p.heart, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="body">
        <div className="loading-card">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            Preparing your celebration... 💕
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        aria-hidden="true"
      />

      {/* CSS particles from anniversary theme */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Background shapes */}
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="greet-card">
        <BrandHeader />
        
        <div className="success-icon">💝</div>
        
        <h1 className="title-glow">Love Delivered! 💖</h1>
        
        <p className="subtitle romantic-fade">
          Your anniversary celebration has been beautifully preserved. 
          A moment of love to cherish forever. ✨
        </p>

        {/* <div className="message-preview">
          <div className="preview-heart">💌</div>
          <p className="preview-text">
            "Your heartfelt message is now part of your love story..."
          </p>
        </div> */}

        {/* <button 
          className="back-btn magic-btn"
          onClick={() => router.push(`/anniversary/home?code=${code}`)}
        >
          <span className="btn-content">Create More Memories ✨</span>
          <div className="btn-glow"></div>
        </button> */}
      </div>

      {/* <div className="celebration-toast">
        🎉 Anniversary magic created with love!
      </div> */}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Dancing+Script:wght@400;500;600;700&family=Sacramento&family=Poppins:ital,wght@0,300..800;1,300..800&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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
          background: linear-gradient(135deg,
            #6a0c6a 0%,
            #9b59b6 20%,
            #d63384 40%,
            #e84393 60%,
            #fd79a8 80%,
            #fdeaea 100%);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite, bgShift 8s ease-in-out infinite;
          position: relative;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes bgShift {
          0%, 100% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(10deg) brightness(1.05); }
        }

        /* Canvas particles */
        .particles-canvas {
          display: block;
        }

        /* CSS particles */
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 10s infinite linear;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          z-index: 1;
        }

        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff69b4, #ff1493); }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff9ff3, #f368e0); animation-duration: 12s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #c44569, #ff6b9d); animation-duration: 9s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff1493, #ff69b4); animation-duration: 11s; }
        .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f368e0, #ff9ff3); animation-duration: 13s; }

        /* Background shapes */
        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(4px);
          animation: floatShape 16s infinite ease-in-out;
          z-index: 1;
        }

        .shape-one { width: 120px; height: 120px; background: rgba(255, 255, 255, 0.4); top: 12%; left: 8%; }
        .shape-two { width: 90px; height: 90px; background: rgba(255, 182, 193, 0.3); bottom: 18%; right: 12%; animation-direction: reverse; }
        .shape-three { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.3); top: 70%; left: 18%; }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        .greet-card {
          width: 100%;
          max-width: 460px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(35px);
          -webkit-backdrop-filter: blur(35px);
          border-radius: 35px;
          padding: 70px 45px;
          text-align: center;
          box-shadow: 
            0 35px 70px rgba(106, 12, 106, 0.45),
            0 0 0 1px rgba(253, 234, 234, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(253, 234, 234, 0.45);
          z-index: 10;
          position: relative;
          animation: cardFloat 6s ease-in-out infinite;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-15px) rotateX(1deg); }
        }

        .success-icon {
  font-size: 110px;
  margin-bottom: 25px;
  animation: successBounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  filter: drop-shadow(0 25px 50px rgba(232, 67, 147, 0.7));
  /* Remove these three lines: */
  /* background: linear-gradient(135deg, #fdeaea, #e84393, #fd79a8); */
  /* -webkit-background-clip: text; */
  /* -webkit-text-fill-color: transparent; */
  /* background-clip: text; */
}

        @keyframes successBounce {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.15); }
          40% { transform: scale(1.05); }
          60% { transform: scale(1.12); }
          80% { transform: scale(1.02); }
        }

        .title-glow {
          font-family: 'Dancing Script', cursive;
          font-size: 48px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #fdeaea, #e84393);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          line-height: 1.1;
          letter-spacing: -1px;
          text-shadow: 
            0 0 45px rgba(255, 255, 255, 0.95),
            0 8px 35px rgba(106, 12, 106, 0.7);
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          from { 
            filter: drop-shadow(0 0 30px rgba(253, 234, 234, 0.95));
            transform: scale(1);
          }
          to { 
            filter: drop-shadow(0 0 55px rgba(232, 67, 147, 1));
            transform: scale(1.04);
          }
        }

        .subtitle.romantic-fade {
          color: rgba(255, 255, 255, 0.95);
          font-size: 20px;
          font-weight: 400;
          line-height: 1.6;
          font-style: italic;
          font-family: 'Sacramento', cursive;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.65);
          margin-bottom: 35px;
          animation: fadeInUp 1.5s ease-out 0.3s both;
          max-width: 380px;
          margin-left: auto;
          margin-right: auto;
        }

        .message-preview {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 25px 30px;
          margin-bottom: 35px;
          border: 1px solid rgba(253, 234, 234, 0.4);
          position: relative;
          overflow: hidden;
          animation: slideInUp 1s ease-out 0.6s both;
        }

        .message-preview::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .message-preview:hover::before {
          opacity: 1;
        }

        .preview-heart {
          font-size: 45px;
          margin-bottom: 12px;
          animation: gentleFloat 3s ease-in-out infinite;
          display: block;
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .preview-text {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          line-height: 1.5;
          font-family: 'Poppins', sans-serif;
        }

        .magic-btn {
          position: relative;
          overflow: hidden;
        }

        .back-btn {
          width: 100%;
          padding: 22px;
          border: none;
          border-radius: 32px;
          background: linear-gradient(135deg,
            #e84393 0%,
            #fd79a8 25%,
            #9b59b6 50%,
            #6a0c6a 75%,
            #e84393 100%);
          background-size: 300% 300%;
          color: #ffffff;
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 18px 50px rgba(232, 67, 147, 0.75);
          animation: shimmer 4s infinite;
          border: 1px solid rgba(253, 234, 234, 0.4);
          position: relative;
          z-index: 2;
          animation-delay: 1s;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .btn-content {
          position: relative;
          z-index: 3;
        }

        .btn-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 70%);
          transform: scale(0) rotate(0deg);
          transition: all 0.8s;
          z-index: 2;
        }

        .back-btn:hover .btn-glow {
          transform: scale(1) rotate(180deg);
        }

        .back-btn:hover {
          transform: translateY(-10px) scale(1.06);
          box-shadow: 0 35px 70px rgba(232, 67, 147, 0.95);
        }

        .back-btn:active {
          transform: translateY(-4px) scale(1.03);
        }

        .celebration-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(25px);
          color: #e84393;
          padding: 20px 35px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 25px 65px rgba(232, 67, 147, 0.45);
          border: 1px solid rgba(253, 234, 234, 0.7);
          animation: toastSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s both;
          z-index: 1000;
          max-width: calc(100vw - 80px);
          font-family: 'Poppins', sans-serif;
        }

        @keyframes toastSlide {
          from {
            transform: translateX(-50%) translateY(120px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 1;
          }
        }

        .loading-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(35px);
          border-radius: 35px;
          padding: 70px 45px;
          text-align: center;
          box-shadow: 
            0 30px 60px rgba(106, 12, 106, 0.4),
            0 0 0 1px rgba(253, 234, 234, 0.3);
          border: 1px solid rgba(253, 234, 234, 0.4);
        }

        @media (max-width: 480px) {
          .greet-card {
            padding: 50px 35px;
            border-radius: 28px;
            margin: 10px;
          }

          .title-glow {
            font-size: 40px;
          }

          .subtitle {
            font-size: 18px;
          }

          .success-icon {
            font-size: 90px;
          }

          .back-btn {
            padding: 20px;
            font-size: 17px;
          }

          .music-row {
            flex-direction: column;
          }

          .music-btn {
            width: 100%;
          }
        }

        @media (min-width: 768px) {
          .greet-card {
            padding: 80px 55px;
          }
        }
      `}</style>
    </div>
  );
}