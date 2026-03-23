"use client";

import { useRouter } from "next/navigation";

export default function LoveGreet() {
  const router = useRouter();

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(180deg,#3b0d2e,#7b1e5c,#ff758f)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "25px 20px",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Floating Stickers */}
      {["💌", "🕊", "✨", "🌧"].map((sticker, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "36px",
            opacity: 0.2,
            left: `${10 + idx * 20}%`,
            animation: `float 10s infinite ease-in-out`,
            animationDelay: `${idx * 1.5}s`,
          }}
        >
          {sticker}
        </div>
      ))}

      {/* Confirmation Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "22px",
          padding: "40px 35px",
          maxWidth: "400px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>💖</div>
        <h2 style={{ fontSize: "26px", marginBottom: "12px", fontFamily: "'Playfair Display', serif" }}>
          Your Message Has Been Sent! 💌
        </h2>
        <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
          Your heartfelt message has been delivered. You can now give it to your loved one or let it brighten their day. 🕊✨
        </p>

        <button
          onClick={() => router.push("/apology/home")}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "30px",
            fontSize: "15px",
            fontWeight: 600,
            background: "#ffffff",
            color: "#7b1e5c",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe0ec")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Back to Your Messages ✨
        </button>
      </div>

      {/* Toast */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          color: "#7b1e5c",
          padding: "12px 20px",
          borderRadius: "25px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        💌 Your message has been delivered with care.
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}