"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function FirstMessage() {
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
const code = params.get("code");
const token =
  typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
  const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
  const suggestions = [
    "Hi! I noticed we both love traveling. What's your favorite destination?",
    "Hey! If you could describe your perfect weekend, what would it look like?",
    "Hello 😊 What's something you're really passionate about?",
  ];

  const fillText = (text) => {
    setMessage(text);
  };

  const setMood = (mood) => {
    setMessage(`Mood: ${mood}\n\n`);
  };

// const sendMessage = async () => {
//   if (message.trim() === "") {
//     alert("Write your message before sending 😊");
//     return;
//   }

//   try {
//     await fetch("http://localhost:5000/api/message/send", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     code,
//     user_id,
//     receiver_name,
//     message_text: message
//   })
// });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.error || "Failed to send message");
//       return;
//     }

//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2500);

//     router.push(`/approach/greet?code=${code}`);
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

const sendMessage = async () => {
  if (message.trim() === "") {
    alert("Write your message");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // ✅ IMPORTANT

    const res = await fetch("/api/messages/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ TOKEN BASED
      },
      body: JSON.stringify({
        qrCode: code,
        receiverName: "Receiver",
        receiverMobile: "1234567890",
        senderName: localStorage.getItem("sender_name"),
        senderMobile: localStorage.getItem("sender_mobile"),
        messageText: message,
        imageUrl: "",
        videoUrl: "",
        audioUrl: "https://www.instagram.com/beingsalmankhan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to send message");
      return;
    }

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);

    router.push(`/approach/greet?code=${code}`);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


useEffect(() => {
  if (!code) return;

  const token = localStorage.getItem("token");

  if (!token) {
    router.push(`/approach/login?code=${code}`);
  }
}, [code]);
  const floatingShapes = [
    { className: "one", style: { width: "100px", height: "100px", background: "#ffffff", top: "15%", left: "10%" } },
    { className: "two", style: { width: "80px", height: "80px", background: "#ffdee9", bottom: "20%", right: "15%" } },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1)",
        minHeight: "100vh",
        padding: "25px 20px 40px",
        color: "white",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Floating shapes */}
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

      {/* Header */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Say Hello 👋</h1>
        <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
          Your first message sets the tone. Make it warm, real, and memorable.
        </p>
      </div>

      {/* Mood Selector */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "25px" }}>
        {moods.map((mood, idx) => (
          <div
            key={idx}
            onClick={() => setMood(mood)}
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
            {mood}
          </div>
        ))}
      </div>

      {/* Message Box */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your first message here..."
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
        {suggestions.map((sugg, idx) => (
          <div
            key={idx}
            onClick={() => fillText(sugg)}
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
            {sugg}
          </div>
        ))}
      </div>

      {/* Extras */}
      {/* <div style={{ marginTop: "25px" }}>
        <label style={{ fontSize: "13px" }}>Add a Voice Intro 🎙</label>
        <input
          type="file"
          accept="audio/*"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "15px",
            border: "none",
            background: "rgba(255,255,255,0.85)",
            marginTop: "5px",
          }}
        />
      </div> */}

      {/* Send Button */}
      <button
        onClick={sendMessage}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "16px",
          border: "none",
          borderRadius: "25px",
          background: "linear-gradient(90deg,#ff9a9e,#fad0c4)",
          color: "#333",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
      >
        Send First Step 🚀
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
            color: "#66a6ff",
            padding: "12px 22px",
            borderRadius: "30px",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          🎉 Your first message has been sent!
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}