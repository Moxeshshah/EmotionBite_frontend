"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function AnniversaryReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  useEffect(() => {
    if (!code) {
      setError("Message code not found");
      return;
    }

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!apiData) {
          setError("No message found");
          return;
        }

        setData({
          sender: apiData.senderName || "Your Partner",
          message: apiData.messageText,
          receiver: apiData.receiverName,
          image: apiData.image_url || apiData.imageUrl,
          song: apiData.song || null,
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Server error");
      });
  }, [code]);

  // Always render the main container - shows gift or content based on state
  return (
    <div className={opened ? "main-container open" : "main-container"}>
      {/* Floating Hearts */}
      <div className="heart-particle" style={{ left: "20%" }} />
      <div className="heart-particle" style={{ left: "45%", animationDelay: "3s" }} />
      <div className="heart-particle" style={{ left: "70%", animationDelay: "6s" }} />
      <div className="heart-particle" style={{ left: "85%", animationDelay: "2s" }} />

      {/* Main Card Container */}
      <div className={`anniversary-card ${opened ? "opened" : ""}`}>
        {error ? (
          // Show error inside the gift card
          <div className="closed-gift error-state">
            <BrandHeader />
            <div className="gift-icon">❌</div>
            <div className="gift-title">Oops!</div>
            <div className="gift-hint">{error}</div>
          </div>
        ) : !opened ? (
          // Show loading gift (no separate loading screen)
          <div className="closed-gift" onClick={() => setOpened(true)}>
  <BrandHeader />
  <div className="gift-icon">🎁</div>
  <div className="gift-title">Anniversary Surprise</div>
  <div className="gift-tagline">A moment crafted just for you</div>
  <div className="gift-divider">✦ ✦ ✦</div>
  <div className="gift-hint">Tap to unwrap your surprise 💖</div>
  <div className="gift-sub">Something beautiful awaits inside...</div>
</div>
        ) : (
          // Show opened content
          <div className="anniversary-content">
            <BrandHeader />
            
            <div className="header-section">
              <div className="heart-emoji">💝</div>
              <h2 className="anniversary-title">A Love Worth Celebrating..!!💖</h2>
            </div>

            <div className="love-note">
              <p className="message-text">"Dear {data.receiver}, {data.message}"</p>
              
              {data.image && (
                <div className="memory-section">
                  <div className="memory-label">💕 Shared Memory</div>
                  <div
                    className={`memory-card ${revealImage ? "revealed" : ""}`}
                    onClick={() => setRevealImage(true)}
                  >
                    <img src={data.image} alt="memory" />
                    {!revealImage && (
                      <div className="memory-overlay">
                        <span className="memory-text">Tap to reveal</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {data.song && (
                <div className="song-section">
                  <div className="song-label">🎵 Our Song</div>
                  <div className="song-name">{data.song}</div>
                </div>
              )}
            </div>

            <div className="sender-name">— {data.sender}</div>
            <div className="anniversary-note">
              💍 Forever starts today, every year.
            </div>
          </div>
        )}
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

  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Parisienne&family=Cinzel:wght@600;700&family=Poppins:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Dancing+Script:wght@700&family=Poppins:wght@300;400;500&display=swap');

.gift-title {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Great Vibes', cursive;
  color: white;
  text-shadow: 
    0 2px 15px rgba(255, 100, 150, 0.8),
    0 0 40px rgba(255, 182, 193, 0.5);
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.gift-tagline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.88);
  letter-spacing: 1.5px;
  margin-bottom: 18px;
  text-shadow: 0 1px 8px rgba(0,0,0,0.3);
}

.gift-divider {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 8px;
  margin-bottom: 18px;
}

.gift-hint {
  font-family: 'Dancing Script', cursive;
  font-size: 22px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 12px rgba(232, 67, 147, 0.7);
  animation: hintPulse 2s ease-in-out infinite;
  margin-bottom: 10px;
}

.gift-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.8px;
  font-style: italic;
}

@keyframes hintPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.04); }
}

  .main-container {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at top, #ff9a9e, #fecfef, #fecfef);
    transition: background 0.6s ease;
    padding: 60px 20px 80px 20px; /* ✅ Increased spacing */
    font-family: 'Poppins', sans-serif;
  }

  .main-container.open {
    background: radial-gradient(circle at top, #ff6b9d, #c44569);
  }

  .heart-particle {
    position: absolute;
    font-size: 18px;
    animation: heartFloat 12s infinite linear;
    pointer-events: none;
    top: 0;
    z-index: 1;
    opacity: 0.6;
  }

  @keyframes heartFloat {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    20% { opacity: 0.8; }
    80% { opacity: 0.4; }
    100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
  }

  .header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 10px;
    text-align: center;
  }

  .heart-emoji {
    font-size: 45px;
    animation: glow 3s ease-in-out infinite alternate;
  }

  .anniversary-title {
    font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive;
    font-size: 30px;
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: -0.2px;
    text-align: center;
    margin: 0 auto;
    color: white;
    text-shadow: 
      0 4px 12px rgba(0,0,0,0.4),
      0 0 30px rgba(255,192,203,0.6);
    max-width: 100%;
    padding: 0;
    word-break: break-word;
  }

  .anniversary-title:hover {
    transform: scale(1.02);
    text-shadow: 
      0 5px 16px rgba(0,0,0,0.5),
      0 0 40px rgba(255,192,203,0.8);
  }

  @keyframes glow {
    from { 
      filter: drop-shadow(0 0 10px rgba(255,182,193,0.7)); 
      transform: scale(1);
    }
    to { 
      filter: drop-shadow(0 0 25px rgba(255,182,193,1)); 
      transform: scale(1.05);
    }
  }

  .anniversary-card {
    width: min(450px, 95%);
    min-height: 550px;
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    position: relative;
    overflow: hidden;
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(0.93);
    animation: cardEntrance 1s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto; /* ✅ Extra spacing top/bottom */
    max-width: 450px;
  }

  .anniversary-card.opened {
    transform: scale(1);
    box-shadow: 0 50px 120px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  @keyframes cardEntrance {
    0% { 
      opacity: 0; 
      transform: scale(0.6) rotateX(25deg) translateY(30px); 
    }
    100% { 
      opacity: 1; 
      transform: scale(0.93) rotateX(0deg) translateY(0); 
    }
  }

  .closed-gift {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 45px;
    transition: all 0.4s ease;
    background: transparent;
    text-align: center;
    gap: 10px;
  }

  .closed-gift.error-state {
    cursor: default;
  }

  .closed-gift:hover:not(.error-state) {
    transform: translateY(-8px) scale(1.02);
  }

  .gift-icon {
    font-size: 85px;
    animation: giftBounce 2.2s infinite;
    margin-bottom: 25px;
  }

  @keyframes giftBounce {
    0%, 100% { transform: translateY(0) rotate(2deg); }
    33% { transform: translateY(-15px) rotate(-1deg); }
    66% { transform: translateY(-8px) rotate(1deg); }
  }

  .gift-title {
    font-size: 26px;
    margin-bottom: 12px;
    font-weight: 600;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }

  .gift-hint {
    font-size: 16px;
    opacity: 0.85;
    letter-spacing: 0.5px;
    color: white;
  }

  .anniversary-content {
    height: 100%;
    padding: 40px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    overflow-y: auto;
    background: transparent;
  }

  .love-note {
    width: 100%;
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    text-align: left;
    color: white;
    padding: 38px;
    margin-bottom: 25px;
    transform: translateY(12px);
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
  }

  .message-text {
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
    line-height: 1.85;
    font-weight: 500;
    font-style: italic;
    word-break: break-word;
    color: white;
  }

  .sender-name {
    margin-top: 2px;
    font-size: 17px;
    opacity: 0.92;
    font-family: 'Great Vibes', cursive;
    font-style: italic;
    letter-spacing: 0.4px;
    text-align: center;
  }

  .anniversary-note {
    margin-top: 6px;
    font-size: 14px;
    margin-bottom: 0; 
    opacity: 0.8;
    font-style: italic;
    text-align: center;
    padding-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
    font-family: 'Poppins', sans-serif;
  }

  /* ✅ NEW: Memory & Song Styles */
  .memory-section {
    margin-top: 25px;
  }
  
  .memory-label,
  .song-label {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: rgba(255,255,255,0.95);
    font-family: 'Poppins', sans-serif;
  }
  
  .memory-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
  
  .memory-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  
  .memory-card:hover {
    transform: scale(1.02);
  }
  
  .memory-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .memory-card.revealed .memory-overlay {
    opacity: 0;
  }
  
  .memory-text {
    color: white;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
  
  .song-section {
    margin-top: 20px;
  }
  
  .song-name {
    font-size: 18px;
    font-style: italic;
    color: rgba(255,255,255,0.95);
    font-family: 'Great Vibes', cursive;
    font-weight: 500;
  }

  /* ✅ Enhanced Responsive */
  @media (max-width: 480px) {
    .main-container {
      padding: 40px 15px 60px 15px; /* ✅ Mobile spacing */
    }
    
    .anniversary-card {
      margin: 15px auto;
      width: 95%;
      border-radius: 24px;
    }
    
    .anniversary-content {
      padding: 30px 20px;
    }
    
    .love-note {
      padding: 25px;
      margin-bottom: 20px;
    }
    
    .anniversary-title {
      font-size: 25px;
    }

    .message-text {
      font-size: 18px;
      line-height: 1.7;
    }
    
    .gift-icon {
      font-size: 75px;
    }
  }
`}</style>
    </div>
  );
}