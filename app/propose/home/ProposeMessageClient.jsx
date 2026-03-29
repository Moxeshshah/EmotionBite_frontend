// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import BrandHeader from "../BrandHeader";
// import { useRef } from "react";

// export default function ProposalPlanner() {
//   const [speech, setSpeech] = useState("");
//   const [proposalDate, setProposalDate] = useState("");
//   const [location, setLocation] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
// const [isRecording, setIsRecording] = useState(false);
// const [audioBlob, setAudioBlob] = useState(null);
// const [audioPreview, setAudioPreview] = useState("");

// const mediaRecorderRef = useRef(null);
// const chunksRef = useRef([]);
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");
// const startRecording = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     mediaRecorderRef.current = new MediaRecorder(stream);
//     chunksRef.current = [];

//     mediaRecorderRef.current.ondataavailable = (e) => {
//       chunksRef.current.push(e.data);
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//       setAudioBlob(blob);
//       setAudioPreview(URL.createObjectURL(blob));
//     };

//     mediaRecorderRef.current.start();
//     setIsRecording(true);
//   } catch (err) {
//     alert("Microphone permission denied ❌");
//   }
// };

// const stopRecording = () => {
//   if (!mediaRecorderRef.current) return; // ✅ safety check

//   mediaRecorderRef.current.stop();
//   setIsRecording(false);
// };
// const uploadAudio = async () => {
//   if (!audioBlob) return "";

//   const formData = new FormData();
//   formData.append("file", audioBlob);
//   formData.append("upload_preset", "audio_upload");

//   const res = await fetch(
//     "https://api.cloudinary.com/v1_1/dgdexbbk7/video/upload",
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();
//   return data.secure_url;
// };

//   useEffect(() => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";

//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push(`/propose/login?code=${code}`);
//     }

//     return () => {
//       document.body.style.margin = "";
//       document.body.style.padding = "";
//       document.body.style.overflowX = "";
//     };
//   }, [router, code]);

//   const ideas = [
//     "Flash Mob Surprise 💃",
//     "Memory Slideshow 🎥",
//     "Hidden Ring Treasure Hunt 🔎",
//     "Family & Friends Appear 🎊",
//   ];

//   const suggestions = [
//     "From the moment I met you, I knew you were my forever.",
//     "Will you make me the happiest person by saying YES? 💍",
//     "Every love story is special, but ours is my favorite.",
//   ];

//   const fillIdea = (idea) => {
//     setSpeech((prev) => prev + "\n\nIdea: " + idea);
//   };

//   const fillSuggestion = (text) => {
//     setSpeech(text);
//   };

// const previewProposal = async () => {
//   if (speech.trim() === "") {
//     alert("Write your proposal speech first 💌");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token");

//     let uploadedAudioUrl = "";

//     if (audioBlob) {
//       uploadedAudioUrl = await uploadAudio();
//     }

//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: "Proposal",
//         receiverMobile: "1234567890",
//         senderName: localStorage.getItem("sender_name"),
//         senderMobile: localStorage.getItem("sender_mobile"),
//         messageText: speech,
//         imageUrl: "",
//         videoUrl: "",
//         audioUrl: uploadedAudioUrl, // ✅ HERE
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to save proposal");
//       return;
//     }

//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2000);
//     router.push(`/propose/greet?code=${code}`);
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

//   const floatingIcons = [
//     { className: "one", emoji: "💖", style: { top: "10%", left: "15%" } },
//     { className: "two", emoji: "💍", style: { bottom: "20%", right: "10%" } },
//   ];

//   return (
//     <div className="body">
//       {/* Animated particles */}
//       <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
//       <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
//       <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
//       <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
//       <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

//       {/* Floating proposal icons */}
//       {floatingIcons.map((icon, idx) => (
//         <div
//           key={idx}
//           className={`proposal-float ${icon.className}`}
//           style={{
//             animationDelay: `${idx * 2}s`,
//             ...icon.style,
//           }}
//         >
//           {icon.emoji}
//         </div>
//       ))}

//       <div className="bg-shape shape-one" />
//       <div className="bg-shape shape-two" />
//       <div className="bg-shape shape-three" />

//       <div className="card">
//         <BrandHeader />
//         <div className="content">
//           <div className="hero-section">
//             <h1>Plan The Perfect Proposal 💍</h1>
//             <p>Create a magical moment they will cherish forever.</p>
//           </div>

//           {/* Proposal Date & Location Compact Row */}
//           {/* <div className="date-location-row">
//             <div className="compact-field">
//               <label>Proposal Date 📅</label>
//               <input
//                 type="date"
//                 value={proposalDate}
//                 onChange={(e) => setProposalDate(e.target.value)}
//                 className="compact-input"
//               />
//             </div>
//             <div className="compact-field">
//               <label>Location 🌍</label>
//               <select 
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="compact-input"
//               >
//                 <option value="">Choose...</option>
//                 <option>Beach Sunset</option>
//                 <option>Romantic Rooftop</option>
//                 <option>Private Candlelight Dinner</option>
//                 <option>Mountain View</option>
//               </select>
//             </div>
//           </div> */}

//           {/* Proposal Speech */}
//           <div className="field">
//             <label>Write Your Proposal Speech 💌</label>
//             <textarea
//               value={speech}
//               onChange={(e) => setSpeech(e.target.value)}
//               placeholder="From the moment I met you, my life changed forever..."
//               className="message-input"
//               rows={4}
//             />
//           </div>
//           <div className="field">
//   <label>Record Your Voice 🎙️</label>

//   {!isRecording ? (
//     <button type="button" onClick={startRecording} className="send-btn">
//       🎙️ Start Recording
//     </button>
//   ) : (
//     <button type="button" onClick={stopRecording} className="send-btn">
//       ⏹️ Stop Recording
//     </button>
//   )}

//   {audioPreview && (
//     <audio
//       controls
//       src={audioPreview}
//       style={{ marginTop: "10px", width: "100%" }}
//     />
//   )}
// </div>

//           {/* Surprise Ideas Row */}
//           {/* <div className="field">
//             <label>Surprise Ideas 🎉</label>
//             <div className="ideas-row">
//               {ideas.map((idea, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => fillIdea(idea)}
//                   className="idea-chip"
//                 >
//                   {idea}
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* Suggestions Toggle */}
//           <div 
//             className="suggestions-title toggle"
//             onClick={() => setShowSuggestions(!showSuggestions)}
//           >
//             <span>Need proposal inspiration? ✨</span>
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
//                   onClick={() => fillSuggestion(sugg)}
//                 >
//                   {sugg}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button onClick={previewProposal} className="send-btn">
//             Preview Magical Moment ✨
//           </button>

//           {toastVisible && (
//             <div className="toast">
//               💍 Your proposal plan is saved!
//             </div>
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

//         :global(html), :global(body) {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           overflow-x: hidden;
//         }

//         .body {
//           min-height: 100vh;
//           width: 100vw;
//           background: linear-gradient(135deg, #3a0d2e, #7b1e3b, #c72c41, #ff6b9d);
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

//         @keyframes float {
//           0% {
//             transform: translateY(100vh) rotate(0deg);
//             opacity: 0;
//           }
//           20% { opacity: 0.8; }
//           80% { opacity: 0.8; }
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

//         .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff69b4, #ff1493); }
//         .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff9ff3, #f368e0); animation-duration: 12s; }
//         .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #c44569, #ff6b9d); animation-duration: 9s; }
//         .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff1493, #ff69b4); animation-duration: 11s; }
//         .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f368e0, #ff9ff3); animation-duration: 13s; }

//         .proposal-float {
//           position: absolute;
//           font-size: 30px;
//           opacity: 0.15;
//           animation: float 12s infinite ease-in-out;
//           filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
//           pointer-events: none;
//         }

//         .bg-shape {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.12;
//           filter: blur(4px);
//           animation: floatShape 16s infinite ease-in-out;
//         }
//         .shape-one { width: 120px; height: 120px; background: rgba(255, 255, 255, 0.4); top: 12%; left: 8%; }
//         .shape-two { width: 90px; height: 90px; background: rgba(255, 182, 193, 0.3); bottom: 18%; right: 12%; animation-direction: reverse; }
//         .shape-three { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.3); top: 70%; left: 18%; }

//         @keyframes floatShape {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(-18px) scale(1.05); }
//         }

//         .card {
//           width: min(580px, 100%);
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
//           from { opacity: 0; transform: translateY(25px) scale(0.98); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .content { position: relative; z-index: 2; }

//         .hero-section {
//           text-align: center;
//           margin-bottom: 28px;
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

//         .date-location-row {
//           display: flex;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .compact-field {
//           flex: 1;
//         }
//         .compact-field label {
//           display: block;
//           font-size: 13px;
//           margin-bottom: 6px;
//           opacity: 0.95;
//           font-weight: 500;
//         }
//         .compact-input {
//           width: 100%;
//           padding: 14px 16px;
//           border-radius: 20px;
//           border: none;
//           outline: none;
//           background: rgba(255, 255, 255, 0.92);
//           color: #333;
//           font-size: 14px;
//           backdrop-filter: blur(15px);
//           border: 1px solid rgba(255, 255, 255, 0.35);
//           transition: all 0.3s ease;
//         }
//         .compact-input:focus {
//           background: rgba(255, 255, 255, 1);
//           box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
//           transform: translateY(-1px);
//         }

//         .field {
//           margin-bottom: 20px;
//         }
//         .field label {
//           display: block;
//           font-size: 14px;
//           margin-bottom: 10px;
//           opacity: 0.95;
//           font-weight: 500;
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
//           background: rgba(255, 255, 255, 0.92);
//           backdrop-filter: blur(18px);
//           border: 1px solid rgba(255, 255, 255, 0.4);
//           line-height: 1.6;
//           font-family: "Poppins", sans-serif;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
//           transition: all 0.3s ease;
//           margin-bottom: 8px;
//         }
//         .message-input:focus {
//           background: rgba(255, 255, 255, 1);
//           box-shadow: 0 12px 35px rgba(255, 182, 193, 0.35);
//           transform: translateY(-2px);
//         }
//         .message-input::placeholder {
//           color: rgba(100, 100, 100, 0.7);
//         }

//         .ideas-row {
//           display: flex;
//           gap: 12px;
//           overflow-x: auto;
//           padding-bottom: 8px;
//         }
//         .idea-chip {
//           min-width: 150px;
//           padding: 14px 16px;
//           background: rgba(255, 255, 255, 0.22);
//           border-radius: 22px;
//           font-size: 13px;
//           text-align: center;
//           cursor: pointer;
//           flex-shrink: 0;
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.25);
//           transition: all 0.3s ease;
//           font-weight: 500;
//         }
//         .idea-chip:hover {
//           background: rgba(255, 255, 255, 0.35);
//           transform: translateY(-3px);
//           box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
//         }

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
//         .dropdown-icon {
//           transition: transform 0.3s ease;
//           font-size: 14px;
//           color: rgba(255, 255, 255, 0.9);
//         }
//         .dropdown-icon.open {
//           transform: rotate(180deg);
//         }

//         .suggestions-wrapper {
//           max-height: 0;
//           overflow: hidden;
//           transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           margin-bottom: 8px;
//         }
//         .suggestions-wrapper.open {
//           max-height: 450px;
//         }
//         .suggestions { margin-top: 8px; }
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
//           .date-location-row { flex-direction: column; gap: 0; }
//         }

//         @media (max-width: 480px) {
//           .body { padding: 12px; }
//           .card { padding: 24px 20px; border-radius: 22px; }
//           .hero-section h1 { font-size: 26px; }
//           .message-input { height: 110px; padding: 18px; }
//           .idea-chip { min-width: 140px; font-size: 12px; }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";
import { useRef } from "react";

export default function ProposalPlanner() {
  const [speech, setSpeech] = useState("");
  const [proposalDate, setProposalDate] = useState("");
  const [location, setLocation] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
const [isRecording, setIsRecording] = useState(false);
const [audioBlob, setAudioBlob] = useState(null);
const [audioPreview, setAudioPreview] = useState("");
const audioRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);
const [duration, setDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
const mediaRecorderRef = useRef(null);
const formatTime = (time) => {
  if (!time) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};
const chunksRef = useRef([]);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const toggleAudio = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    setIsPlaying(true);

    const interval = setInterval(() => {
      if (audio.ended) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentTime(0);
      } else if (audio.paused) {
        clearInterval(interval);
      } else {
        setCurrentTime(audio.currentTime);
      }
    }, 200);

  } else {
    audio.pause();
    setIsPlaying(false);
  }
};
useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !audioPreview) return;

  const handleLoaded = () => setDuration(audio.duration || 0);
  const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audio.currentTime = 0;
  };

  audio.addEventListener("loadedmetadata", handleLoaded);
  audio.addEventListener("timeupdate", handleTimeUpdate);
  audio.addEventListener("ended", handleEnded);

  audio.load();

  return () => {
    audio.removeEventListener("loadedmetadata", handleLoaded);
    audio.removeEventListener("timeupdate", handleTimeUpdate);
    audio.removeEventListener("ended", handleEnded);
  };
}, [audioPreview]);
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioPreview(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  } catch (err) {
    alert("Microphone permission denied ❌");
  }
};

const stopRecording = () => {
  if (!mediaRecorderRef.current) return; // ✅ safety check

  mediaRecorderRef.current.stop();
  setIsRecording(false);
};
const deleteAudio = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  setAudioBlob(null);
  setAudioPreview("");
  setIsPlaying(false);
  setCurrentTime(0);
  setDuration(0);
};
const uploadAudio = async () => {
  if (!audioBlob) return "";

  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("upload_preset", "audio_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgdexbbk7/video/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/propose/login?code=${code}`);
    }

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [router, code]);

  const ideas = [
    "Flash Mob Surprise 💃",
    "Memory Slideshow 🎥",
    "Hidden Ring Treasure Hunt 🔎",
    "Family & Friends Appear 🎊",
  ];

  const suggestions = [
    "From the moment I met you, I knew you were my forever.",
    "Will you make me the happiest person by saying YES? 💍",
    "Every love story is special, but ours is my favorite.",
  ];

  const fillIdea = (idea) => {
    setSpeech((prev) => prev + "\n\nIdea: " + idea);
  };

  const fillSuggestion = (text) => {
    setSpeech(text);
  };

const previewProposal = async () => {
  if (speech.trim() === "") {
    alert("Write your proposal speech first 💌");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    let uploadedAudioUrl = "";

    if (audioBlob) {
      uploadedAudioUrl = await uploadAudio();
    }

    const res = await fetch("/api/messages/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        qrCode: code,
        receiverName: "Proposal",
        receiverMobile: "1234567890",
        senderName: localStorage.getItem("sender_name"),
        senderMobile: localStorage.getItem("sender_mobile"),
        messageText: speech,
        imageUrl: "",
        videoUrl: "",
        audioUrl: uploadedAudioUrl, // ✅ HERE
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to save proposal");
      return;
    }

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
    router.push(`/propose/greet?code=${code}`);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  const floatingIcons = [
    { className: "one", emoji: "💖", style: { top: "10%", left: "15%" } },
    { className: "two", emoji: "💍", style: { bottom: "20%", right: "10%" } },
  ];

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Floating proposal icons */}
      {floatingIcons.map((icon, idx) => (
        <div
          key={idx}
          className={`proposal-float ${icon.className}`}
          style={{
            animationDelay: `${idx * 2}s`,
            ...icon.style,
          }}
        >
          {icon.emoji}
        </div>
      ))}

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <h1>Plan The Perfect Proposal 💍</h1>
            <p>Create a magical moment they will cherish forever.</p>
          </div>

          {/* Proposal Date & Location Compact Row */}
          {/* <div className="date-location-row">
            <div className="compact-field">
              <label>Proposal Date 📅</label>
              <input
                type="date"
                value={proposalDate}
                onChange={(e) => setProposalDate(e.target.value)}
                className="compact-input"
              />
            </div>
            <div className="compact-field">
              <label>Location 🌍</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="compact-input"
              >
                <option value="">Choose...</option>
                <option>Beach Sunset</option>
                <option>Romantic Rooftop</option>
                <option>Private Candlelight Dinner</option>
                <option>Mountain View</option>
              </select>
            </div>
          </div> */}

          {/* Proposal Speech */}
          <div className="field">
            <label>Write Your Proposal Speech 💌</label>
            <textarea
              value={speech}
              onChange={(e) => setSpeech(e.target.value)}
              placeholder="From the moment I met you, my life changed forever..."
              className="message-input"
              rows={4}
            />
          </div>
          <div className="field">
  <label>Record Your Voice 🎙️</label>

{!isRecording && !audioPreview ? (
  <button type="button" onClick={startRecording} className="send-btn">
    🎙️ Start Recording
  </button>
) : isRecording ? (
  <button type="button" onClick={stopRecording} className="send-btn">
    ⏹️ Stop Recording
  </button>
) : null}

{audioPreview && (
  <>
    <div className="voice-note-label">
      🎙️ Listen to your recorded message
    </div>

    <div className="voice-player">
      <button onClick={toggleAudio} className="play-btn">
        {isPlaying ? "⏸" : "▶"}
      </button>

      <div className="wave-bar">
        <div
          className="progress"
          style={{
            width:
              duration > 0
                ? `${Math.min((currentTime / duration) * 100, 100)}%`
                : "0%",
          }}
        />
      </div>

      <span className="time-text">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <audio ref={audioRef} src={audioPreview} preload="auto" />
    </div>

    {/* 🔥 DELETE BUTTON */}
    <button onClick={deleteAudio} className="delete-btn">
      🗑️ Delete Recording
    </button>
  </>
)}
</div>

          {/* Surprise Ideas Row */}
          {/* <div className="field">
            <label>Surprise Ideas 🎉</label>
            <div className="ideas-row">
              {ideas.map((idea, idx) => (
                <div
                  key={idx}
                  onClick={() => fillIdea(idea)}
                  className="idea-chip"
                >
                  {idea}
                </div>
              ))}
            </div>
          </div> */}

          {/* Suggestions Toggle */}
          <div 
            className="suggestions-title toggle"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <span>Need proposal inspiration? ✨</span>
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
                  onClick={() => fillSuggestion(sugg)}
                >
                  {sugg}
                </div>
              ))}
            </div>
          </div>

          <button onClick={previewProposal} className="send-btn">
            Preview Magical Moment ✨
          </button>

          {toastVisible && (
            <div className="toast">
              💍 Your proposal plan is saved!
            </div>
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

        :global(html), :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #3a0d2e, #7b1e3b, #c72c41, #ff6b9d);
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

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
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

        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ff69b4, #ff1493); }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff9ff3, #f368e0); animation-duration: 12s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #c44569, #ff6b9d); animation-duration: 9s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff1493, #ff69b4); animation-duration: 11s; }
        .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f368e0, #ff9ff3); animation-duration: 13s; }

        .proposal-float {
          position: absolute;
          font-size: 30px;
          opacity: 0.15;
          animation: float 12s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.4));
          pointer-events: none;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.12;
          filter: blur(4px);
          animation: floatShape 16s infinite ease-in-out;
        }
        .shape-one { width: 120px; height: 120px; background: rgba(255, 255, 255, 0.4); top: 12%; left: 8%; }
        .shape-two { width: 90px; height: 90px; background: rgba(255, 182, 193, 0.3); bottom: 18%; right: 12%; animation-direction: reverse; }
        .shape-three { width: 70px; height: 70px; background: rgba(255, 255, 255, 0.3); top: 70%; left: 18%; }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        .card {
          width: min(580px, 100%);
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
          from { opacity: 0; transform: translateY(25px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .content { position: relative; z-index: 2; }

        .hero-section {
          text-align: center;
          margin-bottom: 28px;
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

        .date-location-row {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .compact-field {
          flex: 1;
        }
        .compact-field label {
          display: block;
          font-size: 13px;
          margin-bottom: 6px;
          opacity: 0.95;
          font-weight: 500;
        }
        .compact-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 20px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.92);
          color: #333;
          font-size: 14px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          transition: all 0.3s ease;
        }
        .compact-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
          transform: translateY(-1px);
        }

        .field {
          margin-bottom: 20px;
        }
        .field label {
          display: block;
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.95;
          font-weight: 500;
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
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          font-family: "Poppins", sans-serif;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          margin-bottom: 8px;
        }
        .message-input:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 12px 35px rgba(255, 182, 193, 0.35);
          transform: translateY(-2px);
        }
        .message-input::placeholder {
          color: rgba(100, 100, 100, 0.7);
        }

        .ideas-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .idea-chip {
          min-width: 150px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.22);
          border-radius: 22px;
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          flex-shrink: 0;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .idea-chip:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
        }

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
        .dropdown-icon {
          transition: transform 0.3s ease;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }
        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 8px;
        }
        .suggestions-wrapper.open {
          max-height: 450px;
        }
        .suggestions { margin-top: 8px; }
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
          .date-location-row { flex-direction: column; gap: 0; }
        }

        @media (max-width: 480px) {
          .body { padding: 12px; }
          .card { padding: 24px 20px; border-radius: 22px; }
          .hero-section h1 { font-size: 26px; }
          .message-input { height: 110px; padding: 18px; }
          .idea-chip { min-width: 140px; font-size: 12px; }
        }
          /* 🎙️ Voice note label */
.voice-note-label {
  font-family: 'Dancing Script', cursive;
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ff9ff3, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInSoft 0.8s ease;
  letter-spacing: 0.5px;
}

/* 🎧 Voice player container */
.voice-player {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 30px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  box-shadow: 0 10px 30px rgba(255, 107, 180, 0.4);
  transition: all 0.3s ease;
}

/* ✨ subtle hover */
.voice-player:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(255, 107, 180, 0.55);
}

/* ▶️ Play button */
.play-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #c44569;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-btn:hover {
  transform: scale(1.1);
  background: #ffe4ec;
}

/* 📊 Progress bar container */
.wave-bar {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.4);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

/* 📈 Progress fill */
.progress {
  height: 100%;
  width: 0%;
  background: white;
  transition: width 0.2s linear;
}

/* ⏱️ Time text */
.time-text {
  font-size: 12px;
  color: white;
  font-weight: 500;
  min-width: 60px;
  text-align: right;
}

/* ✨ Soft fade animation */
@keyframes fadeInSoft {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  .delete-btn {
  margin-top: 10px;
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: rgba(255, 77, 77, 0.15);
  color: #ff4d6d;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.delete-btn:hover {
  background: rgba(255, 77, 77, 0.3);
  transform: translateY(-1px);
}
      `}</style>
    </div>
  );
}