"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function Anniversary() {
  const [loveNote, setLoveNote] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const canvasRef = useRef(null);

  // Your existing useEffect hooks remain the same...
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [mounted]);

  // Your romantic particle canvas animation (unchanged)
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    // ... your existing canvas particle code remains exactly the same
  }, [mounted]);

  useEffect(() => {
    if (!code) return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/anniversary/login?code=${code}`);
    }
  }, [code, router]);

  const celebrateLove = async () => {
    if (loveNote.trim() === "") {
      alert("Write something special before celebrating 💖");
      return;
    }
    if (!partnerName.trim()) {
      alert("Please enter your partner's name");
      return;
    }

    try {
      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: partnerName,
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: loveNote,
          imageUrl: "",
          videoUrl: "",
          audioUrl: audioUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to save message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        router.push(`/anniversary/greet?code=${code}`);
      }, 1500);
      setLoveNote("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const fillText = (text) => {
    setLoveNote(text);
  };

  const suggestions = [
    "Happy anniversary, my love. You're the reason every day feels like a gift. 💌",
    "Another year with you feels like a dream I never want to wake up from. I love you endlessly. 💕",
    "Every moment with you is a chapter I'd relive a thousand times. Happy anniversary, my everything. 💞",
  ];

  const convertToEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";
      let startTime = 0;

      if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.slice(1);
        startTime = urlObj.searchParams.get("t");
      }
      if (urlObj.searchParams.get("v")) {
        videoId = urlObj.searchParams.get("v");
        startTime = urlObj.searchParams.get("t");
      }

      const parseTime = (t) => {
        if (!t) return 0;
        if (t.includes("m") || t.includes("s")) {
          let seconds = 0;
          const matchM = t.match(/(\d+)m/);
          const matchS = t.match(/(\d+)s/);
          if (matchM) seconds += parseInt(matchM[1]) * 60;
          if (matchS) seconds += parseInt(matchS[1]);
          return seconds;
        }
        return parseInt(t);
      };

      const start = parseTime(startTime);
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${start}`;
    } catch {
      return url;
    }
  };

  if (!mounted) {
    return (
      <div className="body">
        <div className="login-card">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            Loading your romantic moment... 💕
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      {/* Canvas particles (your existing code) */}
      <canvas
        ref={canvasRef}
        className="particles-canvas"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Love page particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Background shapes */}
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="anniversary-card">
        <BrandHeader />
        
        <div className="romantic-header">
          <div className="avatar">💗</div>
          <h1 className="title-glow">Our Special Day</h1>
          <p className="subtitle romantic-fade">
            Another year of love, laughter, and unforgettable memories
          </p>
        </div>

        {/* Partner Name Input */}
        <div className="input-box slide-in">
          <label htmlFor="partner-name">Partner's Name 👩‍❤️‍👨</label>
          <input
            id="partner-name"
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your partner's name"
          />
        </div>

        {/* Love Note */}
        <div className="input-box slide-in delay-1">
          <label htmlFor="love-note">Write Your Love Note 💌</label>
          <textarea
            id="love-note"
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            placeholder="Write a heartfelt anniversary message to your partner..."
            rows="4"
          />
        </div>

        {/* Music Section from Love Page */}
        {/* <div className="music-section slide-in delay-2">
          <div className="music-header">🎵 Dedicate Our Song</div>
          <div className="music-row">
            <input
              type="text"
              placeholder="Paste YouTube song link..."
              value={audioUrl}
              onChange={(e) => setAudioUrl(convertToEmbedUrl(e.target.value))}
              className="music-input"
            />
            <button
              className="music-btn"
              onClick={() => window.open("https://www.youtube.com/results?search_query=anniversary+songs", "_blank")}
            >
              Find
            </button>
          </div>
          {audioUrl && audioUrl.includes("youtube") && (
            <div className="music-preview">
              <iframe
                width="100%"
                height="180"
                src={audioUrl}
                title="YouTube player"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}
        </div> */}

        {/* Suggestions */}
        <div className="suggestions-section slide-in delay-3">
          <div
            className="suggestions-title toggle"
            onClick={() => setShowSuggestions(!showSuggestions)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowSuggestions(!showSuggestions)}
          >
            <h3>Need inspiration? ✨</h3>
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
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fillText(sugg)}
                >
                  "{sugg}"
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          className="celebrate-btn magic-btn" 
          onClick={celebrateLove}
          disabled={!partnerName.trim() || !loveNote.trim()}
        >
          <span className="btn-content">Celebrate Love 🎊</span>
          <div className="btn-glow"></div>
        </button>
      </div>

      {toastVisible && (
        <div className="toast">
          💖 Your anniversary celebration has been saved!
        </div>
      )}

<style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Dancing+Script:wght@400;500;600;700&family=Sacramento&family=Poppins:ital,wght@0,300..800;1,300..800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :global(html), :global(body) {
    margin: 0; padding: 0; width: 100%; overflow-x: hidden;
  }

  .body {
    height: 100dvh; width: 100vw;
    background: linear-gradient(135deg,
      #6a0c6a 0%, #9b59b6 20%, #d63384 40%,
      #e84393 60%, #fd79a8 80%, #fdeaea 100%);
    background-size: 400% 400%;
    animation: gradientShift 12s ease infinite;
    position: relative;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 50%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }

  .particles-canvas { display: block; }

  .anniversary-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(35px);
    -webkit-backdrop-filter: blur(35px);
    border-radius: 28px;
    padding: 18px 22px 14px;
    text-align: center;
    box-shadow:
      0 30px 60px rgba(106,12,106,0.4),
      0 0 0 1px rgba(253,234,234,0.3),
      inset 0 1px 0 rgba(255,255,255,0.4);
    border: 1px solid rgba(253,234,234,0.4);
    z-index: 10;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .romantic-header {
    position: relative;
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  .romantic-header::before {
    content: "";
    position: absolute;
    top: -10px; left: 50%;
    transform: translateX(-50%);
    width: 80px; height: 3px;
    background: linear-gradient(90deg, transparent, #fdeaea, transparent);
    border-radius: 2px;
  }

  .avatar {
    font-size: 52px;
    margin-bottom: 6px;
    animation: heartBeat 1.8s infinite;
    filter: drop-shadow(0 10px 20px rgba(232,67,147,0.7));
    display: block;
  }

  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
  }

  .title-glow {
    font-family: 'Dancing Script', cursive;
    font-size: 60px; font-weight: 700;
    background: linear-gradient(135deg, #ffffff, #fdeaea, #e84393);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px; line-height: 1.1;
  }

  .subtitle.romantic-fade {
    color: rgba(255,255,255,0.95);
    font-size: 16px; font-weight: 400;
    line-height: 1.3; font-style: italic;
    font-family: 'Sacramento', cursive;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }

  /* ── INPUTS ── */
  .input-box {
    margin-bottom: 10px;
    text-align: left;
    flex-shrink: 0;
    opacity: 0;
    transform: translateY(30px);
  }

  .input-box.slide-in { animation: slideInUp 0.8s ease-out forwards; }
  .input-box.slide-in.delay-1 { animation-delay: 0.2s; }
  .input-box.slide-in.delay-2 { animation-delay: 0.4s; }
  .input-box.slide-in.delay-3 { animation-delay: 0.6s; }

  @keyframes slideInUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .input-box label {
    font-size: 13px;
    color: rgba(255,255,255,0.95);
    display: block; margin-bottom: 6px;
    font-weight: 500; letter-spacing: 0.3px;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }

  .input-box input, .input-box textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 16px;
    border: 2px solid rgba(253,234,234,0.4);
    outline: none;
    background: rgba(255,255,255,0.22);
    backdrop-filter: blur(20px);
    font-size: 15px; color: #ffffff;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(106,12,106,0.3);
    resize: none;
  }

  .input-box textarea {
    min-height: 90px;
    max-height: 120px;
  }

  .input-box input::placeholder,
  .input-box textarea::placeholder {
    color: rgba(255,255,255,0.6);
  }

  .input-box input:focus,
  .input-box textarea:focus {
    background: rgba(255,255,255,0.3);
    border-color: rgba(232,67,147,0.9);
    box-shadow: 0 10px 30px rgba(232,67,147,0.5);
  }

  /* ── PARTICLES ── */
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    20% { opacity: 0.8; }
    80% { opacity: 0.8; }
    100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
  }

  .particle {
    position: absolute; border-radius: 50%;
    pointer-events: none; animation: float 10s infinite linear;
    box-shadow: 0 0 20px rgba(255,255,255,0.6); z-index: 1;
  }
  .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff69b4, #ff1493); }
  .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff9ff3, #f368e0); animation-duration: 12s; }
  .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #c44569, #ff6b9d); animation-duration: 9s; }
  .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff1493, #ff69b4); animation-duration: 11s; }
  .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f368e0, #ff9ff3); animation-duration: 13s; }

  .bg-shape {
    position: absolute; border-radius: 50%;
    opacity: 0.12; filter: blur(4px);
    animation: floatShape 16s infinite ease-in-out; z-index: 1;
  }
  .shape-one { width: 100px; height: 100px; background: rgba(255,255,255,0.4); top: 10%; left: 6%; }
  .shape-two { width: 75px; height: 75px; background: rgba(255,182,193,0.3); bottom: 15%; right: 10%; animation-direction: reverse; }
  .shape-three { width: 60px; height: 60px; background: rgba(255,255,255,0.3); top: 65%; left: 15%; }

  @keyframes floatShape {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-14px) scale(1.05); }
  }

  /* ── SUGGESTIONS ── */
  .suggestions-section {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .suggestions-title {
    font-size: 14px; font-weight: 700;
    margin-bottom: 0; opacity: 0.95;
    font-family: 'Dancing Script', cursive;
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer;
    padding: 12px 18px;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.20) 0%,
      rgba(253,234,234,0.25) 50%,
      rgba(255,255,255,0.15) 100%);
    border-radius: 18px;
    backdrop-filter: blur(25px);
    transition: all 0.3s ease;
    border: 1px solid rgba(253,234,234,0.4);
    box-shadow: 0 8px 25px rgba(106,12,106,0.25);
    position: relative; overflow: hidden;
  }

  .suggestions-title:hover {
    background: rgba(255,255,255,0.28);
    transform: translateY(-3px);
  }

  .suggestions-title h3 {
    background: linear-gradient(135deg, #ffffff 0%, #fdeaea 50%, #e84393 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin: 0;
    font-size: 15px; font-weight: 600;
  }

  .dropdown-icon {
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #fdeaea, #e84393);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dropdown-icon.open { transform: rotate(180deg); }

  .suggestions-wrapper {
    max-height: 0; overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1);
    margin-top: 8px;
  }

  .suggestions-wrapper.open { max-height: 400px; }

  .suggestions { display: flex; flex-direction: column; gap: 8px; padding: 4px 0; }

  .suggestion-box {
    background: linear-gradient(135deg,
      rgba(255,255,255,0.22) 0%,
      rgba(253,234,234,0.25) 100%);
    padding: 12px 16px;
    border-radius: 18px; font-size: 13px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.3);
    line-height: 1.5;
    font-family: 'Poppins', sans-serif;
    font-weight: 500; color: white;
    text-align: left;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .suggestion-box:hover {
    background: rgba(255,255,255,0.32);
    transform: translateX(8px);
    box-shadow: 0 10px 30px rgba(232,67,147,0.4);
  }

  /* ── BUTTON ── */
  .magic-btn { position: relative; overflow: hidden; }

  .celebrate-btn {
    width: 100%;
    padding: 14px;
    border: none; border-radius: 24px;
    background: linear-gradient(135deg,
      #e84393 0%, #fd79a8 25%,
      #9b59b6 50%, #6a0c6a 75%, #e84393 100%);
    background-size: 300% 300%;
    color: #ffffff; cursor: pointer;
    margin-top: 10px;
    font-size: 16px; font-weight: 700;
    font-family: 'Poppins', sans-serif;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
    transition: all 0.4s ease;
    box-shadow: 0 10px 35px rgba(232,67,147,0.6);
    animation: shimmer 4s infinite;
    flex-shrink: 0;
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .btn-content { position: relative; z-index: 2; }

  .btn-glow {
    position: absolute; top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: scale(0); transition: all 0.6s; z-index: 1;
  }

  .celebrate-btn:hover .btn-glow { transform: scale(1) rotate(180deg); }

  .celebrate-btn:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 20px 50px rgba(232,67,147,0.8);
  }

  .celebrate-btn:active { transform: translateY(-2px); }

  .celebrate-btn:disabled {
    opacity: 0.6; cursor: not-allowed;
    transform: none !important; animation: none;
  }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 30px; left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    color: #e84393; padding: 14px 28px;
    border-radius: 30px; font-size: 15px;
    font-weight: 600;
    box-shadow: 0 15px 50px rgba(232,67,147,0.4);
    border: 1px solid rgba(253,234,234,0.6);
    animation: toastSlide 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 1000; max-width: calc(100vw - 40px);
  }

  @keyframes toastSlide {
    from { transform: translateX(-50%) translateY(80px); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 390px) {
    .anniversary-card { padding: 14px 16px 12px; border-radius: 22px; }
    .avatar { font-size: 44px; }
    .title-glow { font-size: 40px; }
    .subtitle.romantic-fade { font-size: 25px; }
    .input-box textarea { min-height: 75px; }
    .celebrate-btn { font-size: 15px; padding: 12px; }
  }

  @media (min-height: 800px) {
    .anniversary-card { padding: 24px 28px 18px; }
    .avatar { font-size: 60px; margin-bottom: 8px; }
    .title-glow { font-size: 40px; }
    .romantic-header { margin-bottom: 16px; }
    .input-box { margin-bottom: 14px; }
    .input-box textarea { min-height: 110px; }
    .celebrate-btn { padding: 16px; font-size: 17px; }
  }
`}</style>
    </div>
  );
}