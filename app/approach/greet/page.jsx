"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function FirstStepGreet() {
  const router = useRouter();
const params = useSearchParams();
const code = params.get("code");

  const floatingShapes = [
    { style: { width: "100px", height: "100px", background: "#ffffff", top: "15%", left: "10%" } },
    { style: { width: "80px", height: "80px", background: "#ffdee9", bottom: "20%", right: "15%" } },
    { style: { width: "90px", height: "90px", background: "#fbc2eb", top: "25%", right: "25%" } },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "25px 20px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Shapes */}
      {floatingShapes.map((shape, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            borderRadius: "50%",
            opacity: 0.15,
            animation: "float 12s infinite ease-in-out",
            ...shape.style,
          }}
        />
      ))}

      {/* Greeting Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "25px",
          padding: "40px 35px",
          maxWidth: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>👋</div>
        <h2 style={{ fontSize: "26px", fontFamily: "'Playfair Display', serif", marginBottom: "12px" }}>
          Your First Message is Sent! 🎉
        </h2>
        <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
          You’ve taken the first step! Your message has been delivered. Sit back, relax, and let the conversation begin. ✨
        </p>

        <button onClick={() => router.push(`/approach/home?code=${code}`)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "30px",
            border: "none",
            background: "#ffffff",
            color: "#66a6ff",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f7ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Back to Home 🏡
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
          color: "#66a6ff",
          padding: "12px 22px",
          borderRadius: "30px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        🚀 Your first message has been successfully sent!
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}