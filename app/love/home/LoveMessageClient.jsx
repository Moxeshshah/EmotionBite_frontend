"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoveMessage() {
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const params = useSearchParams();
const code = params.get("code");
    
    const router = useRouter();

  const styles = ["😍 Romantic", "🥰 Cute", "🔥 Passionate", "💌 Deep"];
  const suggestions = [
    "Every moment with you feels like my favorite memory.",
    "You walked into my life and made everything brighter.",
    "Loving you is the easiest and best decision of my life.",
  ];
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push(`/love/login?code=${code}`);
  }
}, []);
  const setStyle = (text) => {
    setMessage("Style: " + text + "\n\n");
  };

  const fillText = (text) => {
    setMessage(text);
  };

const sendMessage = async () => {
  if (message.trim() === "") {
    alert("Write your love message before sending 💕");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // ✅ IMPORTANT

    const res = await fetch("/api/messages/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ SEND TOKEN
      },
      body: JSON.stringify({
        qrCode: code,
        receiverName: "Love",
        receiverMobile: "1234567890",
        senderName: localStorage.getItem("sender_name"),
        senderMobile: localStorage.getItem("sender_mobile"),
        messageText: message,
        imageUrl: "",
        videoUrl: "",
        audioUrl: "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to send message");
      return;
    }

    router.push(`/love/greet?code=${code}`);

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  const hearts = [
    { className: "one", emoji: "❤️", style: { top: "10%", left: "15%" } },
    { className: "two", emoji: "💕", style: { bottom: "20%", right: "10%" } },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#ff758c,#ff7eb3,#ffb199)",
        minHeight: "100vh",
        padding: "25px 20px 40px",
        color: "white",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Floating Hearts */}
      {hearts.map((h, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "30px",
            opacity: 0.15,
            animation: "float 10s infinite ease-in-out",
            ...h.style,
          }}
        >
          {h.emoji}
        </div>
      ))}

      {/* Header */}
      <div style={{ marginTop: "20px", marginBottom: "25px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Express Your Love 💖</h1>
        <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
          Make your feelings unforgettable and beautifully delivered.
        </p>
      </div>

      {/* Styles */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "20px" }}>
        {styles.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setStyle(s)}
            style={{
              minWidth: "120px",
              padding: "10px 15px",
              borderRadius: "25px",
              background: "rgba(255,255,255,0.25)",
              fontSize: "13px",
              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Message Box */}
      <textarea
        placeholder="Write your love message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          height: "130px",
          padding: "15px",
          borderRadius: "18px",
          border: "none",
          resize: "none",
          outline: "none",
          fontSize: "14px",
          color: "#333",
        }}
      />

      {/* Suggestions */}
      <div style={{ marginTop: "20px" }}>
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            onClick={() => fillText(s)}
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "12px",
              borderRadius: "18px",
              fontSize: "13px",
              marginBottom: "10px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Premium Section */}
      <div style={{ marginTop: "25px" }}>
        <div style={{ fontSize: "14px", marginBottom: "10px", fontWeight: 600 }}>✨ Premium Add-ons</div>
        {["🎙 Add Voice Note", "📷 Add Photo", "🎥 Add Video", "🎵 Add Background Music"].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(255,255,255,0.25)",
              padding: "12px",
              borderRadius: "18px",
              marginBottom: "10px",
              fontSize: "13px",
            }}
          >
            {item}
            <span
              style={{
                background: "gold",
                color: "#333",
                padding: "3px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              Premium
            </span>
          </div>
        ))}
      </div>

      {/* Send Button */}
      <button
        onClick={sendMessage}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "16px",
          border: "none",
          borderRadius: "25px",
          background: "white",
          color: "#ff4f81",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
      >
        Send Love 💕
      </button>

      {/* Toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            color: "#ff4f81",
            padding: "12px 22px",
            borderRadius: "30px",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          💖 Your love message has been sent!
        </div>
      )}

      {/* Keyframes */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
}