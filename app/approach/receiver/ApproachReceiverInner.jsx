"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ApproachReceiver() {
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!code || !mounted) return;

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        setData({
          sender: apiData.senderName,
          receiver: apiData.receiverName,
          message: apiData.messageText,
          image: apiData.imageUrl,
          video: apiData.videoUrl,
          audio: apiData.audioUrl,
          instagram: apiData.instagramUrl,
        });
      })
      .catch(console.error);
  }, [code, mounted]);

  useEffect(() => {
    if (!opened || !data?.message) return;

    setTypedMessage("");

    let i = 0;
    const text = data.message;

    const interval = setInterval(() => {
      setTypedMessage(text.slice(0, i + 1));
      i++;

      if (i >= text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [opened, data]);

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <h2 className="loading-title">Loading Emotion Bite...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <h2 className="loading-title">Loading message...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      {/* {opened && <div className="sparkle">✨</div>} */}

      {!opened ? (
        <div className="invite-card" onClick={() => setOpened(true)}>
          <BrandHeader />
          {/* <div className="preview">
            <div className="preview-avatar">😊</div>
            <div>
              <div className="preview-name">{data.sender || "New Connection"}</div>
              <div className="preview-sub">sent you a message</div>
            </div>
          </div> */}

          <div className="big-emoji">✉️</div>

          <h2>You've got a message</h2>
          <p>Someone reached out to start a conversation.</p>

          <div className="tap-hint">Tap to open ✨</div>
        </div>
      ) : (
        <div className="chat-card">
          <BrandHeader />
          <div className="chat-header">
            <div className="avatar">😊</div>
            <div>
              <div className="name">{data.sender || "New Connection"}</div>
              {/* <div className="status">Active now</div> */}
            </div>
          </div>

          <div className="message-label">A stranger just reach out to you...</div>

          <div className="bubble">{typedMessage}</div>

          {data.image && (
            <div className="memory-section">
              <div className="memory-label">📷 Photo shared</div>

              <div
                className={`memory-card ${revealImage ? "revealed" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="shared" />
                {!revealImage && <div className="overlay">Tap to reveal</div>}
              </div>
            </div>
          )}

          {data.instagram && (
            <div className="insta-section">
              <div className="insta-label">💜 Connect on Instagram</div>

              <div
                className="insta-card"
                onClick={() => window.open(data.instagram, "_blank")}
              >
                <img src="/image1.png" alt="insta" className="insta-icon" />
                <div className="insta-text">
                  Interested? Check their Instagram 👀
                  <span>Tap to open</span>
                </div>
              </div>
            </div>
          )}

          {/* <button className="reply-btn">Reply & Start Chat 💬</button> */}
        </div>
      )}
<style jsx global>{`
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Comic+Neue:ital,wght@0,400;0,700&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: "Comic Neue", cursive;
  }

  .container {
    min-height: 100vh;
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
    color: #333;
    position: relative;
    overflow: hidden;
    padding: 80px 20px 60px;
    margin: 0;
  }

  .bg-shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.16;
    filter: blur(2px);
  }

  .shape-one {
    width: 110px;
    height: 110px;
    background: white;
    top: 10%;
    left: 8%;
    animation: float 12s infinite ease-in-out;
  }

  .shape-two {
    width: 80px;
    height: 80px;
    background: #ffd6e7;
    bottom: 14%;
    right: 10%;
    animation: float 14s infinite ease-in-out reverse;
  }

  .shape-three {
    width: 62px;
    height: 62px;
    background: #ffffff;
    top: 65%;
    left: 20%;
    animation: float 10s infinite ease-in-out;
  }

  .invite-card,
  .chat-card {
    width: 100%;
    max-width: 600px;
    padding: 36px 30px;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(20px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.25);
    animation: bounceIn 0.7s ease-out;
    position: relative;
    z-index: 2;
  }

  .preview,
  .chat-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .preview-avatar,
  .avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    box-shadow: 0 10px 25px rgba(255, 107, 157, 0.4);
  }

  .preview-name,
  .name {
    font-size: 20px;
    font-weight: 700;
    font-family: "Dancing Script", cursive;
    color: #33125b;
  }

  .preview-sub,
  .status {
    font-size: 13px;
    opacity: 0.7;
    font-weight: 600;
    font-style: italic;
  }

  .big-emoji {
    font-size: 80px;
    text-align: center;
    margin: 24px 0 16px;
    animation: jello 1.5s infinite ease-in-out;
  }

  .invite-card h2 {
    font-size: 32px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 12px;
    font-family: "Dancing Script", cursive;
    color: #f4d9ee;
    letter-spacing: -0.5px;
  }

  .invite-card p {
    font-size: 16px;
    opacity: 0.85;
    text-align: center;
    line-height: 1.7;
    max-width: 340px;
    margin: 0 auto;
    font-style: italic;
  }

  .tap-hint {
    margin-top: 24px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    color: #f9c2f7;
    letter-spacing: 1px;
    text-transform: uppercase;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .message-label,
  .memory-label,
  .insta-label {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
    font-family: "Dancing Script", cursive;
    color: #522b38;
  }

  .bubble {
    background: rgba(255, 255, 255, 0.95);
    color: #1a1a2e;
    padding: 26px;
    border-radius: 24px 24px 24px 12px;
    margin-top: 12px;
    line-height: 1.7;
    min-height: 80px;
    white-space: pre-wrap;
    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
    font-size: 16px;
    font-weight: 500;
    border: 1px solid rgba(255, 107, 157, 0.2);
    animation: wiggle 0.5s ease-out 0.3s both;
  }

  .memory-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
    margin-top: 14px;
    transition: all 0.3s ease;
  }

  .memory-card:hover {
    transform: scale(1.02);
  }

  .memory-card img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    font-size: 15px;
    font-weight: 700;
    backdrop-filter: blur(4px);
  }

  .insta-section {
    margin-top: 26px;
  }

  .insta-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 15px;
    border-radius: 20px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(16px);
    margin-top: 12px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .insta-card:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .insta-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .insta-text {
    font-size: 15px;
    line-height: 1.5\;
    font-weight: 500;
  }

  .insta-text span {
    display: block;
    font-size: 13px;
    opacity: 0.9;
    margin-top: 4px;
    font-weight: 600;
  }

  .reply-btn {
    margin-top: 28px;
    width: 100%;
    padding: 18px 24px;
    border-radius: 32px;
    border: none;
    background: linear-gradient(135deg, #ff6b9d, #c44569);
    color: white;
    font-weight: 700;
    cursor: pointer;
    font-size: 16px;
    font-family: "Comic Neue", cursive;
    box-shadow: 0 12px 35px rgba(255, 107, 157, 0.4);
    transition: all 0.3s ease;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    animation: btnPulse 2s infinite ease-in-out;
  }

  .reply-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 45px rgba(255, 107, 157, 0.5);
  }

  .loading-screen {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
    color: #333;
    padding: 20px;
  }

  .loader {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
  }

  .loading-title {
    font-size: 22px;
    font-weight: 700;
    font-family: "Dancing Script", cursive;
    color: #333;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-25px) rotate(180deg);
    }
  }

  @keyframes jello {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(0.9) rotate(-2deg); }
    75% { transform: scale(1.05) rotate(2deg); }
  }

  @keyframes pulse {
    0% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0.8; transform: scale(1); }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    60% {
      opacity: 1;
      transform: translateY(-10px) scale(1.05);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  @keyframes wiggle {
    0% { transform: rotate(0); }
    20% { transform: rotate(1deg); }
    40% { transform: rotate(-1deg); }
    60% { transform: rotate(1deg); }
    80% { transform: rotate(-1deg); }
    100% { transform: rotate(0); }
  }

  @keyframes btnPulse {
    0%, 100% { box-shadow: 0 12px 35px rgba(255, 107, 157, 0.4); }
    50% { box-shadow: 0 16px 45px rgba(255, 107, 157, 0.5); }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 70px 14px 50px;
      gap: 20px;
    }
    .invite-card,
    .chat-card {
      width: 100%;
      max-width: none;
      padding: 28px 20px;
      border-radius: 20px;
    }
    .invite-card h2 {
      font-size: 26px;
    }
    .big-emoji {
      font-size: 56px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 60px 12px 40px;
    }
    .invite-card,
    .chat-card {
      padding: 24px 16px;
      border-radius: 18px;
    }
    .bubble {
      padding: 18px 16px;
      font-size: 15px;
    }
    .reply-btn {
      padding: 16px 20px;
      font-size: 15px;
    }
    .preview-avatar,
    .avatar {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
  }

  @media (max-width: 360px) {
    .container {
      padding: 55px 8px 30px;
    }
  }
`}</style>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import BrandHeader from "../BrandHeader";

// export default function ApproachReceiver() {
//   const searchParams = useSearchParams();
//   const code = searchParams?.get("code");
//   const [data, setData] = useState(null);
//   const [opened, setOpened] = useState(false);
//   const [revealImage, setRevealImage] = useState(false);
//   const [typedMessage, setTypedMessage] = useState("");
//   const [mounted, setMounted] = useState(false);
//   const [particles, setParticles] = useState([]);

//   useEffect(() => { setMounted(true); }, []);

//   useEffect(() => {
//     if (!code || !mounted) return;
//     fetch(`/api/messages?code=${code}`)
//       .then((res) => res.json())
//       .then((apiData) => {
//         setData({
//           sender: apiData.senderName,
//           receiver: apiData.receiverName,
//           message: apiData.messageText,
//           image: apiData.imageUrl,
//           video: apiData.videoUrl,
//           audio: apiData.audioUrl,
//           instagram: apiData.instagramUrl,
//         });
//       })
//       .catch(console.error);
//   }, [code, mounted]);

//   useEffect(() => {
//     if (!opened || !data?.message) return;
//     setTypedMessage("");
//     // Spawn particles on open
//     setParticles(Array.from({ length: 12 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       delay: Math.random() * 0.8,
//       size: 8 + Math.random() * 12,
//       char: ["✦", "◆", "✿", "❋", "⬡"][Math.floor(Math.random() * 5)],
//     })));
//     setTimeout(() => setParticles([]), 2500);

//     let i = 0;
//     const text = data.message;
//     const interval = setInterval(() => {
//       setTypedMessage(text.slice(0, i + 1));
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, 22);
//     return () => clearInterval(interval);
//   }, [opened, data]);

//   if (!mounted || !data) {
//     return (
//       <div className="eb-loading">
//         <div className="pulse-ring" />
//         <div className="eb-loader" />
//         <p>{!mounted ? "Loading Emotion Bite…" : "Fetching your message…"}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="eb-root">
//       <div className="orb orb-1" />
//       <div className="orb orb-2" />
//       <div className="orb orb-3" />

//       {/* Burst particles */}
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           className="particle"
//           style={{
//             left: `${p.x}%`,
//             bottom: "45%",
//             animationDelay: `${p.delay}s`,
//             fontSize: `${p.size}px`,
//           }}
//         >
//           {p.char}
//         </div>
//       ))}

//       {!opened ? (
//         /* ── SEALED ENVELOPE VIEW ── */
//         <div className="invite-wrap">
//           <div className="invite-card" onClick={() => setOpened(true)}>
//             <div className="card-accent" />
//             <BrandHeader />

//             <div className="envelope-area">
//               <div className="envelope">
//                 <div className="envelope-body">
//                   <div className="envelope-flap" />
//                   <div className="envelope-letter">
//                     <div className="letter-lines">
//                       <div className="letter-line" />
//                       <div className="letter-line short" />
//                       <div className="letter-line" />
//                       <div className="letter-line short" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="seal">
//                   <span>♥</span>
//                 </div>
//               </div>
//             </div>

//             <h2 className="invite-title">Someone sent you a message</h2>
//             <p className="invite-sub">
//               A stranger reached out. Something heartfelt is waiting inside.
//             </p>

//             <div className="tap-btn">
//               <span>Open Message</span>
//               <span className="tap-sparkle">✨</span>
//             </div>

//             <p className="tap-micro">Tap anywhere to reveal</p>
//           </div>
//         </div>
//       ) : (
//         /* ── OPENED MESSAGE VIEW ── */
//         <div className="chat-wrap">
//           <div className="chat-card">
//             <div className="card-accent" />
//             <BrandHeader />

//             {/* Sender */}
//             <div className="sender-row">
//               <div className="sender-avatar">
//                 {data.sender ? data.sender.charAt(0).toUpperCase() : "?"}
//               </div>
//               <div>
//                 <div className="sender-name">{data.sender || "A Stranger"}</div>
//                 <div className="sender-tag">reached out to you</div>
//               </div>
//               <div className="new-badge">NEW</div>
//             </div>

//             {/* Message bubble */}
//             <div className="msg-section">
//               <div className="msg-label">
//                 <span className="label-dot" />
//                 Message for you
//               </div>
//               <div className="bubble">
//                 <div className="bubble-quote">"</div>
//                 <p className="bubble-text">{typedMessage}</p>
//                 {typedMessage.length < (data?.message?.length || 0) && (
//                   <span className="typing-cursor">|</span>
//                 )}
//               </div>
//             </div>

//             {/* Image */}
//             {data.image && (
//               <div className="media-section">
//                 <div className="media-label">
//                   <span className="label-dot" />
//                   Photo shared
//                 </div>
//                 <div
//                   className={`media-card ${revealImage ? "revealed" : ""}`}
//                   onClick={() => setRevealImage(true)}
//                 >
//                   <img src={data.image} alt="shared" className="media-img" />
//                   {!revealImage && (
//                     <div className="media-overlay">
//                       <div className="reveal-pill">Tap to reveal 👁</div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Instagram */}
//             {data.instagram && (
//               <div className="insta-section">
//                 <div className="media-label">
//                   <span className="label-dot" />
//                   Connect on Instagram
//                 </div>
//                 <div
//                   className="insta-card"
//                   onClick={() => window.open(data.instagram, "_blank")}
//                 >
//                   <div className="insta-logo-wrap">
//                     <img src="/image1.png" alt="Instagram" className="insta-logo" />
//                   </div>
//                   <div className="insta-info">
//                     <div className="insta-cta">They want to stay connected 👀</div>
//                     <div className="insta-link">
//                       {data.instagram.replace("https://www.instagram.com/", "@")}
//                     </div>
//                   </div>
//                   <div className="insta-arrow">→</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
//         body { font-family: 'DM Sans', sans-serif; }

//         .eb-root {
//           min-height: 100vh;
//           width: 100%;
//           background: #0c0a12;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 24px 16px;
//           position: relative;
//           overflow: hidden;
//         }

//         .orb {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(90px);
//           pointer-events: none;
//         }
//         .orb-1 {
//           width: 500px; height: 500px;
//           background: radial-gradient(circle, rgba(233,30,140,0.14) 0%, transparent 70%);
//           top: -150px; left: -100px;
//           animation: driftOrb 22s ease-in-out infinite;
//         }
//         .orb-2 {
//           width: 400px; height: 400px;
//           background: radial-gradient(circle, rgba(100,30,200,0.1) 0%, transparent 70%);
//           bottom: -100px; right: -80px;
//           animation: driftOrb 18s ease-in-out infinite reverse;
//         }
//         .orb-3 {
//           width: 280px; height: 280px;
//           background: radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%);
//           top: 50%; right: 15%;
//           animation: driftOrb 26s ease-in-out infinite 8s;
//         }

//         /* Burst particles */
//         .particle {
//           position: fixed;
//           color: rgba(233,30,140,0.6);
//           pointer-events: none;
//           z-index: 50;
//           animation: burstUp 2s ease-out both;
//         }

//         /* ─── INVITE CARD ─── */
//         .invite-wrap {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 10;
//         }

//         .invite-card {
//           position: relative;
//           width: 100%;
//           max-width: 420px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(233,30,140,0.18);
//           border-radius: 28px;
//           padding: 32px 28px 28px;
//           backdrop-filter: blur(24px);
//           box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 64px rgba(0,0,0,0.55), 0 0 80px rgba(233,30,140,0.1);
//           cursor: pointer;
//           text-align: center;
//           color: #F5EEE8;
//           animation: cardRise 0.7s cubic-bezier(0.22,1,0.36,1) both;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .invite-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.6), 0 0 100px rgba(233,30,140,0.18);
//         }

//         .card-accent {
//           position: absolute;
//           top: 0; left: 10%; right: 10%;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, #E91E8C, #F5C842, #E91E8C, transparent);
//           border-radius: 0 0 2px 2px;
//         }

//         /* Envelope illustration */
//         .envelope-area {
//           display: flex;
//           justify-content: center;
//           margin: 24px 0 20px;
//           position: relative;
//         }
//         .envelope {
//           position: relative;
//           width: 120px; height: 90px;
//         }
//         .envelope-body {
//           width: 120px; height: 90px;
//           background: linear-gradient(135deg, rgba(233,30,140,0.15) 0%, rgba(233,30,140,0.05) 100%);
//           border: 1px solid rgba(233,30,140,0.3);
//           border-radius: 4px;
//           position: relative;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .envelope-flap {
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 50%;
//           background: linear-gradient(180deg, rgba(233,30,140,0.25) 0%, rgba(233,30,140,0.1) 100%);
//           clip-path: polygon(0 0, 100% 0, 50% 75%);
//           border-bottom: 1px solid rgba(233,30,140,0.25);
//           animation: flapFloat 3s ease-in-out infinite;
//         }
//         .envelope-letter {
//           width: 70px; height: 50px;
//           background: rgba(255,255,255,0.08);
//           border-radius: 3px;
//           border: 1px solid rgba(255,255,255,0.12);
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           gap: 5px;
//           padding: 8px;
//           margin-top: 16px;
//         }
//         .letter-line {
//           height: 2px;
//           width: 100%;
//           background: rgba(255,255,255,0.2);
//           border-radius: 1px;
//         }
//         .letter-line.short { width: 65%; }
//         .seal {
//           position: absolute;
//           bottom: -12px; left: 50%;
//           transform: translateX(-50%);
//           width: 28px; height: 28px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #E91E8C, #c4156f);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 11px;
//           box-shadow: 0 4px 14px rgba(233,30,140,0.5);
//           animation: sealPulse 2s ease-in-out infinite;
//           z-index: 2;
//         }

//         .invite-title {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 26px;
//           font-weight: 600;
//           color: #F5EEE8;
//           margin: 20px 0 10px;
//           letter-spacing: -0.02em;
//           line-height: 1.2;
//         }
//         .invite-sub {
//           font-size: 13px;
//           color: rgba(255,255,255,0.38);
//           line-height: 1.65;
//           font-weight: 300;
//           max-width: 300px;
//           margin: 0 auto 24px;
//         }

//         .tap-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: linear-gradient(135deg, #E91E8C, #c4156f);
//           color: white;
//           padding: 13px 28px;
//           border-radius: 100px;
//           font-size: 14px;
//           font-weight: 500;
//           box-shadow: 0 8px 28px rgba(233,30,140,0.4);
//           transition: all 0.3s ease;
//           animation: tapPulse 2.5s ease-in-out infinite;
//         }
//         .tap-sparkle { font-size: 16px; }
//         .tap-micro {
//           margin-top: 12px;
//           font-size: 11px;
//           color: rgba(255,255,255,0.18);
//           letter-spacing: 0.06em;
//         }

//         /* ─── CHAT CARD ─── */
//         .chat-wrap {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 10;
//         }

//         .chat-card {
//           position: relative;
//           width: 100%;
//           max-width: 520px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(233,30,140,0.15);
//           border-radius: 28px;
//           padding: 32px 28px 28px;
//           backdrop-filter: blur(24px);
//           box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 64px rgba(0,0,0,0.55);
//           color: #F5EEE8;
//           animation: cardRise 0.6s cubic-bezier(0.22,1,0.36,1) both;
//         }

//         /* Sender */
//         .sender-row {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 16px 0 20px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           margin-bottom: 20px;
//         }
//         .sender-avatar {
//           width: 48px; height: 48px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, rgba(233,30,140,0.3), rgba(233,30,140,0.1));
//           border: 1px solid rgba(233,30,140,0.3);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 22px;
//           font-weight: 600;
//           color: rgba(233,30,140,0.9);
//           flex-shrink: 0;
//         }
//         .sender-name {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 20px;
//           font-weight: 600;
//           color: #F5EEE8;
//           letter-spacing: -0.01em;
//         }
//         .sender-tag {
//           font-size: 12px;
//           color: rgba(255,255,255,0.3);
//           margin-top: 1px;
//         }
//         .new-badge {
//           margin-left: auto;
//           background: rgba(233,30,140,0.15);
//           border: 1px solid rgba(233,30,140,0.3);
//           color: rgba(233,30,140,0.9);
//           font-size: 9px;
//           font-weight: 600;
//           letter-spacing: 0.1em;
//           padding: 3px 8px;
//           border-radius: 100px;
//           flex-shrink: 0;
//         }

//         /* Message */
//         .msg-section { margin-bottom: 20px; }
//         .msg-label, .media-label {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           font-size: 11px;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.3);
//           margin-bottom: 10px;
//         }
//         .label-dot {
//           width: 5px; height: 5px;
//           border-radius: 50%;
//           background: #E91E8C;
//           flex-shrink: 0;
//         }

//         .bubble {
//           background: rgba(255,255,255,0.06);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 6px 20px 20px 20px;
//           padding: 20px 22px;
//           position: relative;
//           min-height: 80px;
//         }
//         .bubble-quote {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 52px;
//           color: rgba(233,30,140,0.2);
//           line-height: 0.6;
//           position: absolute;
//           top: 12px; left: 14px;
//           font-weight: 700;
//           font-style: italic;
//         }
//         .bubble-text {
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(255,255,255,0.85);
//           font-weight: 300;
//           white-space: pre-wrap;
//           padding-top: 8px;
//         }
//         .typing-cursor {
//           display: inline-block;
//           color: #E91E8C;
//           font-weight: 300;
//           animation: blink 0.7s step-end infinite;
//         }

//         /* Media */
//         .media-section { margin-bottom: 16px; }
//         .media-card {
//           border-radius: 16px;
//           overflow: hidden;
//           cursor: pointer;
//           position: relative;
//           transition: transform 0.3s ease;
//         }
//         .media-card:hover { transform: scale(1.01); }
//         .media-img { width: 100%; height: 240px; object-fit: cover; display: block; }
//         .media-overlay {
//           position: absolute; inset: 0;
//           background: rgba(10,5,7,0.6);
//           backdrop-filter: blur(6px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .reveal-pill {
//           background: rgba(233,30,140,0.2);
//           border: 1px solid rgba(233,30,140,0.4);
//           color: rgba(233,30,140,0.9);
//           padding: 10px 22px;
//           border-radius: 100px;
//           font-size: 13px;
//           font-weight: 500;
//         }

//         /* Instagram card */
//         .insta-section { margin-top: 4px; }
//         .insta-card {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding: 14px 16px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 16px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//         .insta-card:hover {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(233,30,140,0.2);
//           transform: translateY(-2px);
//         }
//         .insta-logo-wrap {
//           width: 40px; height: 40px;
//           border-radius: 11px;
//           background: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           flex-shrink: 0;
//         }
//         .insta-logo { width: 26px; height: 26px; object-fit: contain; }
//         .insta-info { flex: 1; }
//         .insta-cta {
//           font-size: 13px;
//           color: rgba(255,255,255,0.75);
//           font-weight: 500;
//           margin-bottom: 2px;
//         }
//         .insta-link {
//           font-size: 12px;
//           color: rgba(233,30,140,0.7);
//         }
//         .insta-arrow {
//           color: rgba(255,255,255,0.2);
//           font-size: 18px;
//           flex-shrink: 0;
//         }

//         /* Loading */
//         .eb-loading {
//           min-height: 100vh;
//           background: #0c0a12;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 16px;
//           color: rgba(255,255,255,0.35);
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px;
//           position: relative;
//         }
//         .pulse-ring {
//           position: absolute;
//           width: 120px; height: 120px;
//           border-radius: 50%;
//           border: 1px solid rgba(233,30,140,0.2);
//           animation: ringPulse 2s ease-out infinite;
//         }
//         .eb-loader {
//           width: 36px; height: 36px;
//           border: 2px solid rgba(233,30,140,0.15);
//           border-top-color: #E91E8C;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//           position: relative;
//           z-index: 1;
//         }

//         @keyframes cardRise {
//           from { opacity: 0; transform: translateY(28px) scale(0.97); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes driftOrb {
//           0%, 100% { transform: translate(0, 0); }
//           33% { transform: translate(28px, -18px); }
//           66% { transform: translate(-18px, 14px); }
//         }
//         @keyframes burstUp {
//           0% { transform: translateY(0) scale(0); opacity: 0; }
//           20% { opacity: 1; transform: translateY(-30px) scale(1); }
//           100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
//         }
//         @keyframes flapFloat {
//           0%, 100% { transform: rotateX(0deg); }
//           50% { transform: rotateX(15deg); }
//         }
//         @keyframes sealPulse {
//           0%, 100% { box-shadow: 0 4px 14px rgba(233,30,140,0.5); }
//           50% { box-shadow: 0 6px 24px rgba(233,30,140,0.7); }
//         }
//         @keyframes tapPulse {
//           0%, 100% { box-shadow: 0 8px 28px rgba(233,30,140,0.4); }
//           50% { box-shadow: 0 12px 40px rgba(233,30,140,0.6); transform: scale(1.02); }
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         @keyframes ringPulse {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           100% { transform: scale(2); opacity: 0; }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         @media (max-width: 768px) {
//           .invite-card, .chat-card { max-width: 100%; }
//         }
//         @media (max-width: 480px) {
//           .invite-card, .chat-card { padding: 24px 18px 22px; border-radius: 20px; }
//           .invite-title { font-size: 22px; }
//           .bubble-text { font-size: 14px; }
//           .media-img { height: 200px; }
//         }
//       `}</style>
//     </div>
//   );
// }
