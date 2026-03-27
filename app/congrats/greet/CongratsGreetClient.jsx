
"use client";
import BrandHeader from "../BrandHeader";
import { useRouter, useSearchParams } from "next/navigation";

export default function CongratsGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const confettiPieces = [
    { top: "10%", left: "15%", bg: "#ffeb3b" },
    { top: "60%", left: "25%", bg: "#00e5ff" },
    { top: "35%", right: "20%", bg: "#ff4081" },
    { bottom: "15%", right: "25%", bg: "#69f0ae" },
    { top: "20%", left: "70%", bg: "#ff9800" },
  ];

  return (
    <div className="body">
      {confettiPieces.map((c, idx) => (
        <div
          key={idx}
          className="confetti"
          style={{
            background: c.bg,
            top: c.top || "auto",
            left: c.left || "auto",
            right: c.right || "auto",
            bottom: c.bottom || "auto",
            animationDelay: `${idx * 0.5}s`,
          }}
        />
      ))}

      <div className="card">
        <BrandHeader />
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
<h2>Cheers Sent Successfully!</h2>
<p>
  Your congratulations are on their way, bringing happiness and celebration along 🎊
</p>

        {/* <button
          onClick={() => router.push(`/congrats/home?code=${code}`)}
          className="home-btn"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f3e5ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Back to Home 🏡
        </button> */}
      </div>

      <div className="toast">
        🎊 Your congratulations have been sent successfully!
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
          font-family: "Poppins", sans-serif;
          background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 25px 20px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .confetti {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 8s infinite ease-in-out;
          pointer-events: none;
        }

        .card {
          width: min(400px, 100%);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 45px 35px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
          position: relative;
        }

        h2 {
          font-size: 26px;
          font-family: "Playfair Display", serif;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .home-btn {
          width: 100%;
          padding: 16px;
          border-radius: 30px;
          border: none;
          background: #ffffff;
          color: #8e2de2;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #8e2de2;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px 30px 14px;
          }

          .card {
            padding: 36px 24px;
            border-radius: 22px;
          }

          h2 {
            font-size: 24px;
          }

          p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px 24px 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 18px;
          }

          h2 {
            font-size: 22px;
          }

          p {
            font-size: 12.5px;
          }

          .home-btn {
            padding: 14px;
            font-size: 14px;
          }

          .confetti {
            width: 11px;
            height: 11px;
          }
        }
      `}</style>
    </div>
  );
}