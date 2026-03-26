"use client";

export default function BrandHeader() {
  return (
    <div className="brand-wrap">
      <div className="brand-top">

        <div className="logo-wrap">
          <img src="/qr-logo.png" alt="Emotion Bite" className="qr-logo" />
        </div>

        <div className="brand-text-block">
          <div className="logo">
            Emotion<span>Bite</span>
          </div>
          <div className="brand-tag">Unwrap Emotions</div>
        </div>

      </div>

      <div className="brand-line" />

      <style jsx>{`
        .brand-wrap {
          width: 100%;
          max-width: 410px;
          margin: 0 auto 14px;
          color: white;
        }

        /* 🔥 FIXED ALIGNMENT */
        .brand-top {
          display: flex;
          align-items: center;
          justify-content: center;
          // gap: 4px; /* balanced spacing */
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-logo {
          width: 60px;   /* 🔥 slightly smaller for better alignment */
          height: 60px;
          object-fit: contain;
        }

        /* 🔥 IMPORTANT: LEFT ALIGN TEXT (not center) */
        .brand-text-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* 🔥 FIX */
          text-align: left;        /* 🔥 FIX */
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          color: white;
          line-height: 1.1;
        }

        .logo span {
          color: #ffd6e7;
        }

        .brand-tag {
          margin-top: 2px;
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.6px;

          background: linear-gradient(135deg, #ffd6e7, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-line {
          width: min(240px, 72vw);
          height: 1px;
          margin: 12px auto 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.45),
            transparent
          );
        }
      `}</style>
    </div>
  );
}