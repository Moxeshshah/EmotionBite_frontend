"use client";

import BrandHeader from "../BrandHeader";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FirstMessage() {
  const [message, setMessage] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [senderName, setSenderName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
  const suggestions = [
    "Hey 😊 I saw your profile and felt like saying hi. How's your day going?",
    "Hi! You seem interesting… what's something that always makes you smile?",
    "Hey 👋 If we met randomly, what would be the first thing you'd say to me?",
    "Hello! What's one thing you absolutely love doing in your free time?",
    "Hey 😊 I don't usually do this, but you seem worth a conversation.",
  ];

  const fillText = (text) => {
    setMessage(text);
  };

  const setMood = (mood) => {
    setMessage(`Mood: ${mood}\n\n`);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Write your message");
      return;
    }

    if (senderName.trim() === "") {
      alert("Please enter your name");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const instagramUrl = instagramUsername.trim()
        ? `https://www.instagram.com/${instagramUsername.trim()}`
        : "";

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: "Stranger",
          receiverMobile: "",
          senderName: senderName,
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
          instagramUrl: instagramUrl,
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
    setMounted(true);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [code, router]);

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <h2 className="loading-title">Loading Emotion Bite...</h2>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <h1>Say Hello 👋</h1>
            <p>
              Your first message sets the tone. Make it warm, real, and
              memorable.
            </p>
          </div>

          {/* Compact Name Input */}
          <div className="name-input-compact">
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="👤 Enter your name"
              className="name-input"
            />
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your first message here..."
            className="message-input"
          />

<div
  className="suggestions-title toggle"
  onClick={() => setShowSuggestions(!showSuggestions)}
>
  <span>Need ideas? ✨</span>
  <span className={`dropdown-icon ${showSuggestions ? "open" : ""}`}>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</span>
</div>         
 <div className={`suggestions-wrapper ${showSuggestions ? "open" : ""}`}>
  <div className="suggestions">
    {suggestions.map((sugg, idx) => (
      <div
        key={idx}
        className="suggestion-box"
        onClick={() => fillText(sugg)}
      >
        {sugg}
      </div>
    ))}
  </div>
</div>
          <div className="instagram-section">
            <div className="insta-header">
              <div className="insta-icon">
                <img src="/image1.png" alt="Instagram" />
              </div>
              <div>
                <h3>Stay Connected</h3>
                <p>Let them find you beyond this moment</p>
              </div>
            </div>

            <div className="insta-input-box">
              <span>@</span>
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                placeholder="your_username"
              />
            </div>

            {/* {instagramUsername && (
              <div className="insta-preview">
                🔗 instagram.com/{instagramUsername}
              </div>
            )} */}
          </div>

          <button onClick={sendMessage} className="send-btn">
            Send First Step 🚀
          </button>

          {toastVisible && (
            <div className="toast">🎉 Your first message has been sent!</div>
          )}
        </div>
      </div>

      
    </div>
  );
}
