
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CongratsConnect() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  // const user_id =
  //   typeof window !== "undefined"
  //     ? localStorage.getItem("user_id")
  //     : null;

  // Redirect if not logged
  // useEffect(() => {
  //   if (!user_id) {
  //     router.push(`/congrats/login?code=${code}`);
  //   }
  // }, []);
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push(`/congrats/login?code=${code}`);
  }
}, []);

  const suggestions = [
    "So proud of you! 🎊",
    "You totally deserve this! 🌟",
    "Cheers to your success! 🥂",
    "Keep shining bright! ✨",
  ];

  const fill = (text) => {
    setMessage(text);
  };

  // ===== API INTEGRATION =====
const sendWish = async () => {
  if (message.trim() === "") {
    alert("Please write a message 🎉");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // ✅ SAME AS LOVE FLOW

    const res = await fetch("/api/messages/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ IMPORTANT
      },
      body: JSON.stringify({
        qrCode: code,
        receiverName: receiverName || "Receiver",
        receiverMobile: "1234567890", // keep default or dynamic later
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

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);

    setMessage("");
    router.push(`/congrats/greet?code=${code}`);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  const confettiPositions = [
    { top: "10%", left: "15%", bg: "#ffeb3b" },
    { top: "60%", right: "10%", bg: "#00e5ff" },
    { top: "35%", left: "70%", bg: "#ff4081" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#4a00e0,#8e2de2,#ff6a00)",
        minHeight: "100vh",
        color: "white",
        padding: "20px 18px 40px 18px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Confetti */}
      {confettiPositions.map((c, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            opacity: 0.6,
            animation: "float 6s infinite ease-in-out",
            background: c.bg,
            top: c.top || "auto",
            left: c.left || "auto",
            right: c.right || "auto",
          }}
        />
      ))}

      {/* Header */}
      <div style={{ marginTop: "20px", marginBottom: "25px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700 }}>
          Send Joyful Wishes 🎉
        </h1>
        <p style={{ fontSize: "13px", marginTop: "6px", opacity: 0.9 }}>
          Celebrate milestones and spread happiness instantly.
        </p>
      </div>

      {/* Recipient */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Recipient's Name 🎈"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      {/* Suggestions */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom: "20px",
        }}
      >
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            onClick={() => fill(s)}
            style={{
              minWidth: "160px",
              padding: "10px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              background: "rgba(255,255,255,0.2)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Message Box */}
      <textarea
        placeholder="Write your congratulation message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          height: "130px",
          padding: "15px",
          borderRadius: "18px",
          border: "none",
          resize: "none",
          fontSize: "14px",
          background: "white",
          color: "#333",
          outline: "none",
        }}
      />

      {/* Premium Section (design unchanged) */}
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            fontSize: "13px",
            marginBottom: "12px",
            fontWeight: 600,
          }}
        >
          Add Celebration Extras ✨
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "12px",
          }}
        >
          {[
            { icon: "🎙", label: "Voice Note", accept: "audio/*" },
            { icon: "📸", label: "Photo", accept: "image/*" },
            { icon: "🎥", label: "Video", accept: "video/*" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "14px 8px",
                textAlign: "center",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() =>
                document.getElementById(item.label)?.click()
              }
            >
              {item.icon}
              <br />
              {item.label}
              <input
                type="file"
                accept={item.accept}
                id={item.label}
                style={{ display: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={sendWish}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "16px",
          border: "none",
          borderRadius: "20px",
          background: "linear-gradient(90deg,#ff9800,#ff5722)",
          color: "white",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        Send Cheers 🎊
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
            color: "#ff5722",
            padding: "12px 20px",
            borderRadius: "25px",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          }}
        >
          🎉 Your congratulation has been sent!
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}