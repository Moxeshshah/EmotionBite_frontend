
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProposalPlanner() {
  const [speech, setSpeech] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const user_id =
    typeof window !== "undefined"
      ? localStorage.getItem("user_id")
      : null;

  // Redirect if not logged
useEffect(() => {
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    router.push(`/propose/login?code=${code}`);
  }
}, []);

  const ideas = [
    "Flash Mob Surprise 💃",
    "Memory Slideshow 🎥",
    "Hidden Ring Treasure Hunt 🔎",
    "Family & Friends Appear 🎊",
  ];

  const fillIdea = (idea) => {
    setSpeech((prev) => prev + "\n\nIdea: " + idea);
  };

  // ===== API INTEGRATION =====
const previewProposal = async () => {
  if (speech.trim() === "") {
    alert("Write your proposal speech first 💌");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // ✅ same as LoveMessage

    const res = await fetch("/api/messages/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
      body: JSON.stringify({
        qrCode: code,
        receiverName: "Proposal", // ✅ same structure
        receiverMobile: "1234567890",
        senderName: localStorage.getItem("sender_name"),
        senderMobile: localStorage.getItem("sender_mobile"),
        messageText: speech,
        imageUrl: "",
        videoUrl: "",
        audioUrl: "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save proposal");
      return;
    }

    // ✅ Show toast
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);

    // ✅ Redirect
    router.push(`/propose/greet?code=${code}`);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  const floatingIcons = [
    { emoji: "💖", style: { top: "15%", left: "10%" } },
    { emoji: "🌹", style: { bottom: "20%", right: "15%" } },
    { emoji: "💍", style: { top: "40%", right: "25%" } },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#3a0d2e,#7b1e3b,#c72c41)",
        minHeight: "100vh",
        padding: "25px 20px 40px",
        color: "white",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Floating icons */}
      {floatingIcons.map((f, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "22px",
            opacity: 0.2,
            animation: "float 10s infinite ease-in-out",
            ...f.style,
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* Header */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
          Plan The Perfect Proposal 💍
        </h1>
        <p
          style={{
            fontSize: "14px",
            marginTop: "8px",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          This is where your forever begins. Design a magical moment they will
          never forget.
        </p>
      </div>

      {/* Proposal Date */}
      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            fontSize: "13px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Proposal Date 📅
        </label>
        <input
          type="date"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.85)",
            color: "#333",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Location */}
      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            fontSize: "13px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Choose Location 🌍
        </label>
        <select
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.85)",
            color: "#333",
            fontSize: "14px",
          }}
        >
          <option>Beach Sunset</option>
          <option>Romantic Rooftop</option>
          <option>Private Candlelight Dinner</option>
          <option>Mountain View</option>
        </select>
      </div>

      {/* Proposal Speech */}
      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            fontSize: "13px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Write Your Proposal Speech 💌
        </label>
        <textarea
          value={speech}
          onChange={(e) => setSpeech(e.target.value)}
          placeholder="From the moment I met you..."
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.85)",
            color: "#333",
            fontSize: "14px",
            height: "120px",
            resize: "none",
          }}
        />
      </div>

      {/* Surprise Ideas */}
      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            fontSize: "13px",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Surprise Ideas 🎉
        </label>
        <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
          {ideas.map((idea, idx) => (
            <div
              key={idx}
              onClick={() => fillIdea(idea)}
              style={{
                minWidth: "180px",
                padding: "15px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "20px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {idea}
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={previewProposal}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "16px",
          border: "none",
          borderRadius: "30px",
          background: "linear-gradient(90deg,#ff758c,#ff7eb3)",
          color: "white",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        Preview Magical Moment ✨
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
            color: "#c72c41",
            padding: "12px 22px",
            borderRadius: "30px",
            fontSize: "13px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          💍 Your proposal plan is saved!
        </div>
      )}

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