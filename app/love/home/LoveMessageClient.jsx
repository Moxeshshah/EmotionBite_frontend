// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoveMessage() {
//   const [message, setMessage] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [audioUrl, setAudioUrl] = useState("");
//   const params = useSearchParams();
//   const code = params.get("code");
//   const router = useRouter();

//   const styles = ["😍 Romantic", "🥰 Cute", "🔥 Passionate", "💌 Deep"];
//   const suggestions = [
//     "Every moment with you feels like my favorite memory.",
//     "You walked into my life and made everything brighter.",
//     "Loving you is the easiest and best decision of my life.",
//   ];

//   useEffect(() => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";

//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push(`/love/login?code=${code}`);
//     }

//     return () => {
//       document.body.style.margin = "";
//       document.body.style.padding = "";
//       document.body.style.overflowX = "";
//     };
//   }, [router, code]);

//   const setStyle = (text) => {
//     setMessage("Style: " + text + "\n\n");
//   };

//   const fillText = (text) => {
//     setMessage(text);
//   };

//   const sendMessage = async () => {
//     if (message.trim() === "") {
//       alert("Write your love message before sending 💕");
//       return;
//     }

//     if (receiverName.trim() === "") {
//       alert("Please enter receiver name");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("/api/messages/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           qrCode: code,
//           receiverName: receiverName,
//           receiverMobile: "1234567890",
//           senderName: localStorage.getItem("sender_name"),
//           senderMobile: localStorage.getItem("sender_mobile"),
//           messageText: message,
//           imageUrl: "",
//           videoUrl: "",
//           audioUrl: audioUrl,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to send message");
//         return;
//       }

//       setToastVisible(true);
//       setTimeout(() => setToastVisible(false), 2000);
//       router.push(`/love/greet?code=${code}`);
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   const hearts = [
//     { className: "one", emoji: "❤️", style: { top: "10%", left: "15%" } },
//     { className: "two", emoji: "💕", style: { bottom: "20%", right: "10%" } },
//   ];

//   return (
//     <div className="body">
//       {/* Added particles like login page */}
//       <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
//       <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
//       <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
//       <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
//       <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

//       {hearts.map((h, idx) => (
//         <div
//           key={idx}
//           className="heart-float"
//           style={{
//             fontSize: "30px",
//             opacity: 0.15,
//             animation: "float 10s infinite ease-in-out",
//             ...h.style,
//           }}
//         >
//           {h.emoji}
//         </div>
//       ))}

//       <div className="bg-shape shape-one" />
//       <div className="bg-shape shape-two" />
//       <div className="bg-shape shape-three" />

//       <div className="card">
//         <div className="content">
//           <div className="hero-section">
//             <h1>Express Your Love 💖</h1>
//             <p>Make your feelings unforgettable and beautifully delivered.</p>
//           </div>

//           {/* Receiver Name Input */}
//           <div className="name-input-compact">
//             <input
//               type="text"
//               value={receiverName}
//               onChange={(e) => setReceiverName(e.target.value)}
//               placeholder="💝 Enter receiver name"
//               className="name-input"
//             />
//           </div>

//           {/* Style Pills Row */}
//           <div className="style-row">
//             {styles.map((s, idx) => (
//               <div key={idx} onClick={() => setStyle(s)} className="style-pill">
//                 {s}
//               </div>
//             ))}
//           </div>

//           <textarea
//             placeholder="Write your love message here..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="message-input"
//           />
//           <div className="music-section">
//   <div className="music-header">
//     🎵 Dedicate a Song
//   </div>

//   <div className="music-row">
//     <input
//       type="text"
//       placeholder="Paste Spotify / YouTube link..."
//       value={audioUrl}
//       onChange={(e) => setAudioUrl(e.target.value)}
//       className="music-input"
//     />

//     <button
//       className="music-btn"
//       onClick={() =>
//         window.open("https://open.spotify.com/search", "_blank")
//       }
//     >
//       Find
//     </button>
//   </div>

//   {/* Preview Player */}
//   {audioUrl && audioUrl.includes("spotify") && (
//     <div className="music-preview">
//       <iframe
//         src={audioUrl.replace(
//           "open.spotify.com",
//           "open.spotify.com/embed"
//         )}
//         width="100%"
//         height="80"
//         allow="autoplay; encrypted-media"
//       />
//     </div>
//   )}
// </div>

//           <div
//             className="suggestions-title toggle"
//             onClick={() => setShowSuggestions(!showSuggestions)}
//           >
//             <span>Need ideas? ✨</span>
//             <span className={`dropdown-icon ${showSuggestions ? "open" : ""}`}>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M6 9l6 6 6-6"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//           </div>
          
//           <div className={`suggestions-wrapper ${showSuggestions ? "open" : ""}`}>
//             <div className="suggestions">
//               {suggestions.map((sugg, idx) => (
//                 <div
//                   key={idx}
//                   className="suggestion-box"
//                   onClick={() => fillText(sugg)}
//                 >
//                   {sugg}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button onClick={sendMessage} className="send-btn">
//             Send Love 💕
//           </button>

//           {toastVisible && (
//             <div className="toast">💖 Your love message has been sent!</div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap");

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: "Poppins", sans-serif;
//         }

//         :global(html),
//         :global(body) {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           overflow-x: hidden;
//         }

//         .body {
//           min-height: 100vh;
//           width: 100vw;
//           /* Updated to match login page background */
//           background: linear-gradient(135deg, #ff6b9d, #c44569, #ff9ff3, #f368e0);
//           background-size: 400% 400%;
//           animation: gradientShift 12s ease infinite;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 16px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           box-sizing: border-box;
//         }

//         @keyframes gradientShift {
//           0%, 100% { background-position: 0% 50%; }
//           25% { background-position: 100% 50%; }
//           50% { background-position: 100% 100%; }
//           75% { background-position: 0% 100%; }
//         }

//         /* Added particle styles from login page */
//         @keyframes float {
//           0% {
//             transform: translateY(100vh) rotate(0deg);
//             opacity: 0;
//           }
//           20% {
//             opacity: 0.8;
//           }
//           80% {
//             opacity: 0.8;
//           }
//           100% {
//             transform: translateY(-20vh) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         .particle {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//           animation: float 10s infinite linear;
//           box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
//         }

//         .particle-1 {
//           width: 8px;
//           height: 8px;
//           background: linear-gradient(45deg, #ff69b4, #ff1493);
//         }

//         .particle-2 {
//           width: 6px;
//           height: 6px;
//           background: linear-gradient(45deg, #ff9ff3, #f368e0);
//           animation-duration: 12s;
//         }

//         .particle-3 {
//           width: 10px;
//           height: 10px;
//           background: linear-gradient(45deg, #c44569, #ff6b9d);
//           animation-duration: 9s;
//         }

//         .particle-4 {
//           width: 7px;
//           height: 7px;
//           background: linear-gradient(45deg, #ff1493, #ff69b4);
//           animation-duration: 11s;
//         }

//         .particle-5 {
//           width: 9px;
//           height: 9px;
//           background: linear-gradient(45deg, #f368e0, #ff9ff3);
//           animation-duration: 13s;
//         }

//         .heart-float {
//           position: absolute;
//           pointer-events: none;
//           animation: float 12s infinite ease-in-out;
//           filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-25px) rotate(10deg); }
//         }

//         .bg-shape {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.12;
//           filter: blur(4px);
//           animation: floatShape 16s infinite ease-in-out;
//         }

//         .shape-one {
//           width: 120px;
//           height: 120px;
//           background: rgba(255, 255, 255, 0.4);
//           top: 12%;
//           left: 8%;
//         }

//         .shape-two {
//           width: 90px;
//           height: 90px;
//           background: rgba(255, 182, 193, 0.3);
//           bottom: 18%;
//           right: 12%;
//           animation-direction: reverse;
//         }

//         .shape-three {
//           width: 70px;
//           height: 70px;
//           background: rgba(255, 255, 255, 0.3);
//           top: 70%;
//           left: 18%;
//         }

//         @keyframes floatShape {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(-18px) scale(1.05); }
//         }

//         /* Updated card to match login page style */
//         .card {
//           width: min(580px, 100%);
//           /* Updated to match login page card */
//           background: rgba(255, 255, 255, 0.12);
//           backdrop-filter: blur(25px);
//           border-radius: 28px;
//           padding: 32px 28px;
//           box-shadow: 
//             0 25px 60px rgba(255, 107, 180, 0.3),
//             inset 0 1px 0 rgba(255, 255, 255, 0.4);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           color: white;
//           position: relative;
//           z-index: 2;
//           animation: cardIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         @keyframes cardIn {
//           from {
//             opacity: 0;
//             transform: translateY(25px) scale(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         .content {
//           position: relative;
//           z-index: 2;
//         }

//         .hero-section {
//           text-align: center;
//           margin-bottom: 24px;
//         }

//         .hero-section h1 {
//           font-family: "Dancing Script", cursive;
//           font-size: 32px;
//           font-weight: 700;
//           background: linear-gradient(135deg, #fff, #ffe4e1);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin-bottom: 12px;
//           line-height: 1.1;
//           text-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
//         }

//         .hero-section p {
//           font-size: 15px;
//           opacity: 0.95;
//           line-height: 1.7;
//           font-weight: 300;
//         }

//         .name-input-compact {
//           margin: 20px 0 18px 0;
//         }

//         .name-input {
//           width: 100%;
//           padding: 16px 20px;
//           border-radius: 22px;
//           border: none;
//           outline: none;
//           font-size: 15px;
//           /* Updated to match login page input style */
//           background: rgba(255, 255, 255, 0.92);
//           backdrop-filter: blur(15px);
//           border: 1px solid rgba(255, 255, 255, 0.35);
//           color: #333;
//           font-weight: 500;
//           font-family: "Poppins", sans-serif;
//           transition: all 0.3s ease;
//           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
//         }

//         .name-input::placeholder {
//           color: rgba(100, 100, 100, 0.7);
//         }

//         .name-input:focus {
//           background: rgba(255, 255, 255, 1);
//           box-shadow: 
//             0 10px 30px rgba(255, 182, 193, 0.3),
//             0 0 0 3px rgba(255, 105, 180, 0.2);
//           transform: translateY(-2px);
//         }

//         .style-row {
//           display: flex;
//           gap: 12px;
//           overflow-x: auto;
//           margin-bottom: 24px;
//           padding-bottom: 8px;
//           -webkit-overflow-scrolling: touch;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .style-row::-webkit-scrollbar {
//           display: none;
//         }

//         .style-pill {
//           min-width: 125px;
//           padding: 12px 16px;
//           border-radius: 25px;
//           background: rgba(255, 255, 255, 0.25);
//           font-size: 13px;
//           text-align: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           flex-shrink: 0;
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           font-weight: 500;
//         }

//         .style-pill:hover {
//           background: rgba(255, 255, 255, 0.4);
//           transform: translateY(-4px) scale(1.02);
//           box-shadow: 0 12px 30px rgba(255, 182, 193, 0.4);
//         }

//         .message-input {
//           width: 100%;
//           height: 120px;
//           padding: 20px;
//           border-radius: 24px;
//           border: none;
//           resize: none;
//           outline: none;
//           font-size: 15px;
//           color: #333;
//           /* Updated to match login page input style */
//           background: rgba(255, 255, 255, 0.92);
//           backdrop-filter: blur(18px);
//           border: 1px solid rgba(255, 255, 255, 0.4);
//           line-height: 1.6;
//           font-family: "Poppins", sans-serif;
//           margin-bottom: 16px;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
//           transition: all 0.3s ease;
//         }

//         .message-input:focus {
//           background: rgba(255, 255, 255, 1);
//           box-shadow: 
//             0 12px 35px rgba(255, 182, 193, 0.35),
//             0 0 0 3px rgba(255, 105, 180, 0.25);
//           transform: translateY(-2px);
//         }

//         .message-input::placeholder {
//           color: rgba(100, 100, 100, 0.7);
//         }

//         /* Toggle Header */
//         .suggestions-title.toggle {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           cursor: pointer;
//           font-size: 14px;
//           margin: 16px 0 12px;
//           opacity: 0.95;
//           font-weight: 500;
//           padding: 12px 16px;
//           background: rgba(255, 255, 255, 0.15);
//           border-radius: 20px;
//           backdrop-filter: blur(12px);
//           transition: all 0.3s ease;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .suggestions-title.toggle:hover {
//           background: rgba(255, 255, 255, 0.25);
//           transform: translateY(-1px);
//         }

//         /* Dropdown icon animation */
//         .dropdown-icon {
//           transition: transform 0.3s ease;
//           font-size: 14px;
//           color: rgba(255, 255, 255, 0.9);
//         }

//         .dropdown-icon.open {
//           transform: rotate(180deg);
//         }

//         /* Wrapper animation */
//         .suggestions-wrapper {
//           max-height: 0;
//           overflow: hidden;
//           transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           margin-bottom: 8px;
//         }

//         .suggestions-wrapper.open {
//           max-height: 450px;
//         }

//         .suggestions {
//           margin-top: 8px;
//         }

//         .suggestion-box {
//           background: rgba(255, 255, 255, 0.22);
//           padding: 16px;
//           border-radius: 22px;
//           font-size: 14px;
//           margin-bottom: 14px;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.25);
//           line-height: 1.6;
//           font-weight: 400;
//           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
//         }

//         .suggestion-box:hover {
//           background: rgba(255, 255, 255, 0.35);
//           transform: translateX(8px) scale(1.01);
//           box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
//         }

//         .send-btn {
//           width: 100%;
//           padding: 18px 24px;
//           border: none;
//           border-radius: 32px;
//           /* Updated to match login page button */
//           background: linear-gradient(135deg, #ff6b9d, #c44569, #ff9ff3);
//           background-size: 300% 300%;
//           color: #fff;
//           font-weight: 600;
//           font-size: 16px;
//           cursor: pointer;
//           box-shadow: 0 12px 35px rgba(255, 107, 180, 0.5);
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           font-family: "Poppins", sans-serif;
//           position: relative;
//           overflow: hidden;
//           margin-top: 12px;
//         }

//         .send-btn:hover {
//           transform: translateY(-4px) scale(1.02);
//           box-shadow: 0 18px 45px rgba(255, 107, 180, 0.65);
//           background-position: 100% 0;
//         }

//         .toast {
//           position: fixed;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.95);
//           color: #ff69b4;
//           padding: 16px 28px;
//           border-radius: 35px;
//           font-size: 15px;
//           font-weight: 600;
//           box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
//           max-width: calc(100vw - 48px);
//           text-align: center;
//           z-index: 100;
//           animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           backdrop-filter: blur(20px);
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateX(-50%) translateY(40px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(-50%) translateY(0);
//             opacity: 1;
//           }
//         }

//         @media (max-width: 768px) {
//           .body { padding: 14px; }
//           .card { padding: 28px 24px; border-radius: 24px; }
//           .hero-section h1 { font-size: 28px; }
//           .hero-section p { font-size: 14px; }
//           .style-pill { min-width: 118px; font-size: 12.5px; }
//         }

//         @media (max-width: 480px) {
//           .body { padding: 12px; }
//           .card { padding: 24px 20px; border-radius: 22px; }
//           .hero-section h1 { font-size: 26px; }
//           .hero-section p { font-size: 13.5px; }
//           .message-input { height: 110px; padding: 18px; font-size: 14px; }
//           .name-input { padding: 14px 18px; font-size: 14px; }
//           .style-pill { min-width: 110px; padding: 11px 14px; font-size: 12px; }
//           .heart-float { font-size: 26px !important; }
//         }
//           .music-section {
//   margin: 18px 0;
//   padding: 14px;
//   border-radius: 20px;
//   background: rgba(255, 255, 255, 0.18);
//   backdrop-filter: blur(12px);
//   border: 1px solid rgba(255, 255, 255, 0.25);
// }

// .music-header {
//   font-size: 14px;
//   font-weight: 600;
//   margin-bottom: 10px;
//   opacity: 0.95;
// }

// .music-row {
//   display: flex;
//   gap: 8px;
// }

// .music-input {
//   flex: 1;
//   padding: 12px 14px;
//   border-radius: 18px;
//   border: none;
//   outline: none;
//   font-size: 13px;
//   background: rgba(255, 255, 255, 0.9);
//   color: #333;
// }

// .music-btn {
//   padding: 10px 14px;
//   border-radius: 18px;
//   border: none;
//   background: linear-gradient(135deg, #ff6b9d, #c44569);
//   color: white;
//   font-size: 12px;
//   cursor: pointer;
//   font-weight: 600;
// }

// .music-preview {
//   margin-top: 12px;
//   border-radius: 14px;
//   overflow: hidden;
// }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoveMessage() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
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
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/love/login?code=${code}`);
    }

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [router, code]);

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

    if (receiverName.trim() === "") {
      alert("Please enter receiver name");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName,
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: audioUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
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
  const convertToEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);

    // short link (youtu.be/xyz)
    if (urlObj.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}?autoplay=1`;
    }

    // full link (youtube.com/watch?v=xyz)
    if (urlObj.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}?autoplay=1`;
    }

    return url;
  } catch {
    return url;
  }
};

  return (
    <div className="body">
      {/* Added particles like login page */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {hearts.map((h, idx) => (
        <div
          key={idx}
          className="heart-float"
          style={{
            fontSize: "30px",
            opacity: 0.15,
            animation: "float 10s infinite ease-in-out",
            ...h.style,
          }}
        >
          {h.emoji}
        </div>
      ))}

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <div className="content">
          <div className="hero-section">
            <h1>Express Your Love 💖</h1>
            <p>Make your feelings unforgettable and beautifully delivered.</p>
          </div>

          {/* Receiver Name Input */}
          <div className="name-input-compact">
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="💝 Enter receiver name"
              className="name-input"
            />
          </div>

          {/* Style Pills Row */}
          <div className="style-row">
            {styles.map((s, idx) => (
              <div key={idx} onClick={() => setStyle(s)} className="style-pill">
                {s}
              </div>
            ))}
          </div>

          <textarea
            placeholder="Write your love message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <div className="music-section">
  <div className="music-header">
    🎵 Dedicate a Song
  </div>

  <div className="music-row">
    <input
      type="text"
      placeholder="Paste Spotify / YouTube link..."
      value={audioUrl}
onChange={(e) => {
  const val = e.target.value;
  setAudioUrl(convertToEmbedUrl(val));
}}      className="music-input"
    />

    <button
      className="music-btn"
      onClick={() =>
window.open("https://www.youtube.com/results?search_query=romantic+songs", "_blank")
      }
    >
      Find
    </button>
  </div>

  {/* Preview Player */}
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
</div>

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

          <button onClick={sendMessage} className="send-btn">
            Send Love 💕
          </button>

          {toastVisible && (
            <div className="toast">💖 Your love message has been sent!</div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          /* Updated to match login page background */
          background: linear-gradient(135deg, #ff6b9d, #c44569, #ff9ff3, #f368e0);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        /* Added particle styles from login page */
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 10s infinite linear;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }

        .particle-1 {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #ff9ff3, #f368e0);
          animation-duration: 12s;
        }

        .particle-3 {
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #c44569, #ff6b9d);
          animation-duration: 9s;
        }

        .particle-4 {
          width: 7px;
          height: 7px;
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          animation-duration: 11s;
        }

        .particle-5 {
          width: 9px;
          height: 9px;
          background: linear-gradient(45deg, #f368e0, #ff9ff3);
          animation-duration: 13s;
        }

        .heart-float {
          position: absolute;
          pointer-events: none;
          animation: float 12s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(4px);
          animation: floatShape 16s infinite ease-in-out;
        }

        .shape-one {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.4);
          top: 12%;
          left: 8%;
        }

        .shape-two {
          width: 90px;
          height: 90px;
          background: rgba(255, 182, 193, 0.3);
          bottom: 18%;
          right: 12%;
          animation-direction: reverse;
        }

        .shape-three {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.3);
          top: 70%;
          left: 18%;
        }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        /* Updated card to match login page style */
        .card {
          width: min(580px, 100%);
          /* Updated to match login page card */
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(25px);
          border-radius: 28px;
          padding: 32px 28px;
          box-shadow: 
            0 25px 60px rgba(255, 107, 180, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 24px;
        }

        .hero-section h1 {
          font-family: "Dancing Script", cursive;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #ffe4e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          line-height: 1.1;
          text-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
        }

        .hero-section p {
          font-size: 15px;
          opacity: 0.95;
          line-height: 1.7;
          font-weight: 300;
        }

        .name-input-compact {
          margin: 20px 0 18px 0;
        }

        .name-input {
          width: 100%;
          padding: 16px 20px;
          border-radius: 22px;
          border: none;
          outline: none;
          font-size: 15px;
          /* Updated to match login page input style */
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #333;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .name-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        .name-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 10px 30px rgba(255, 182, 193, 0.3),
            0 0 0 3px rgba(255, 105, 180, 0.2);
          transform: translateY(-2px);
        }

        .style-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          margin-bottom: 24px;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .style-row::-webkit-scrollbar {
          display: none;
        }

        .style-pill {
          min-width: 125px;
          padding: 12px 16px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 500;
        }

        .style-pill:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(255, 182, 193, 0.4);
        }

        .message-input {
          width: 100%;
          height: 120px;
          padding: 20px;
          border-radius: 24px;
          border: none;
          resize: none;
          outline: none;
          font-size: 15px;
          color: #333;
          /* Updated to match login page input style */
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          font-family: "Poppins", sans-serif;
          margin-bottom: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .message-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 12px 35px rgba(255, 182, 193, 0.35),
            0 0 0 3px rgba(255, 105, 180, 0.25);
          transform: translateY(-2px);
        }

        .message-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        /* Toggle Header */
        .suggestions-title.toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          margin: 16px 0 12px;
          opacity: 0.95;
          font-weight: 500;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .suggestions-title.toggle:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        /* Dropdown icon animation */
        .dropdown-icon {
          transition: transform 0.3s ease;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        /* Wrapper animation */
        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 8px;
        }

        .suggestions-wrapper.open {
          max-height: 450px;
        }

        .suggestions {
          margin-top: 8px;
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.22);
          padding: 16px;
          border-radius: 22px;
          font-size: 14px;
          margin-bottom: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          line-height: 1.6;
          font-weight: 400;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateX(8px) scale(1.01);
          box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
        }

        .send-btn {
          width: 100%;
          padding: 18px 24px;
          border: none;
          border-radius: 32px;
          /* Updated to match login page button */
          background: linear-gradient(135deg, #ff6b9d, #c44569, #ff9ff3);
          background-size: 300% 300%;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 107, 180, 0.5);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Poppins", sans-serif;
          position: relative;
          overflow: hidden;
          margin-top: 12px;
        }

        .send-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 45px rgba(255, 107, 180, 0.65);
          background-position: 100% 0;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #ff69b4;
          padding: 16px 28px;
          border-radius: 35px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
          max-width: calc(100vw - 48px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px);
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .body { padding: 14px; }
          .card { padding: 28px 24px; border-radius: 24px; }
          .hero-section h1 { font-size: 28px; }
          .hero-section p { font-size: 14px; }
          .style-pill { min-width: 118px; font-size: 12.5px; }
        }

        @media (max-width: 480px) {
          .body { padding: 12px; }
          .card { padding: 24px 20px; border-radius: 22px; }
          .hero-section h1 { font-size: 26px; }
          .hero-section p { font-size: 13.5px; }
          .message-input { height: 110px; padding: 18px; font-size: 14px; }
          .name-input { padding: 14px 18px; font-size: 14px; }
          .style-pill { min-width: 110px; padding: 11px 14px; font-size: 12px; }
          .heart-float { font-size: 26px !important; }
        }
          .music-section {
  margin: 18px 0;
  padding: 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.music-header {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  opacity: 0.95;
}

.music-row {
  display: flex;
  gap: 8px;
}

.music-input {
  flex: 1;
  padding: 12px 14px;
  border-radius: 18px;
  border: none;
  outline: none;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.music-btn {
  padding: 10px 14px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  color: white;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

.music-preview {
  margin-top: 12px;
  border-radius: 14px;
  overflow: hidden;
}
      `}</style>
    </div>
  );
}