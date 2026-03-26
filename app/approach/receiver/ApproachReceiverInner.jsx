

// // "use client";

// // import BrandHeader from "../BrandHeader";
// // import { useSearchParams } from "next/navigation";
// // import { useEffect, useState } from "react";

// // export default function ApproachReceiver() {
// //   const params = useSearchParams();
// //   const code = params.get("code");

// //   const [data, setData] = useState(null);
// //   const [opened, setOpened] = useState(false);
// //   const [revealImage, setRevealImage] = useState(false);
// //   const [typedMessage, setTypedMessage] = useState("");

// //   useEffect(() => {
// //     if (!code) return;

// //     fetch(`/api/messages?code=${code}`)
// //       .then((res) => res.json())
// //       .then((apiData) => {
// //         setData({
// //           sender: apiData.senderName,
// //           receiver: apiData.receiverName,
// //           message: apiData.messageText,
// //           image: apiData.imageUrl,
// //           video: apiData.videoUrl,
// //           audio: apiData.audioUrl,
// //           instagram: apiData.instagramUrl,
// //         });
// //       })
// //       .catch(console.error);
// //   }, [code]);

// //   useEffect(() => {
// //     if (!opened || !data?.message) return;

// //     setTypedMessage("");

// //     let i = 0;
// //     const text = data.message;

// //     const interval = setInterval(() => {
// //       setTypedMessage(text.slice(0, i + 1));
// //       i++;

// //       if (i >= text.length) clearInterval(interval);
// //     }, 25);

// //     return () => clearInterval(interval);
// //   }, [opened, data]);

// //   // if (!data) {
// //   //   return <div style={{ padding: 40 }}>Loading message...</div>;
// //   // }

// //   return (
// //     <div className="container">
// //       <BrandHeader />

// //       <div className="float-icon icon-1">💬</div>
// //       <div className="float-icon icon-2">✨</div>
// //       <div className="float-icon icon-3">😊</div>

// //       {opened && <div className="sparkle">✨</div>}

// //       {!opened ? (
// //         <div className="invite-card" onClick={() => setOpened(true)}>
// //           <div className="preview">
// //             <div className="preview-avatar">😊</div>
// //             <div>
// //               <div className="preview-name">{data.sender || "New Connection"}</div>
// //               <div className="preview-sub">sent you a message</div>
// //             </div>
// //           </div>

// //           <div className="big-emoji">✉️</div>

// //           <h2>You’ve got a new message</h2>
// //           <p>Someone reached out to start a conversation.</p>

// //           <div className="tap-hint">Tap to open ✨</div>
// //         </div>
// //       ) : (
// //         <div className="chat-card">
// //           <div className="chat-header">
// //             <div className="avatar">😊</div>
// //             <div>
// //               <div className="name">{data.sender || "New Connection"}</div>
// //               <div className="status">Active now</div>
// //             </div>
// //           </div>

// //           <div className="message-label">First message</div>

// //           <div className="bubble">{typedMessage}</div>

// //           {data.image && (
// //             <div className="memory-section">
// //               <div className="memory-label">📷 Photo shared</div>

// //               <div
// //                 className={`memory-card ${revealImage ? "revealed" : ""}`}
// //                 onClick={() => setRevealImage(true)}
// //               >
// //                 <img src={data.image} alt="shared" />
// //                 {!revealImage && <div className="overlay">Tap to reveal</div>}
// //               </div>
// //             </div>
// //           )}

// //           {data.instagram && (
// //             <div className="insta-section">
// //               <div className="insta-label">💜 Connect on Instagram</div>

// //               <div
// //                 className="insta-card"
// //                 onClick={() => window.open(data.instagram, "_blank")}
// //               >
// //                 <img src="/image.png" alt="insta" className="insta-icon" />
// //                 <div className="insta-text">
// //                   Interested? Check their Instagram 👀
// //                   <span>Tap to open</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           <button className="reply-btn">Reply & Start Chat 💬</button>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         * {
// //           margin: 0;
// //           padding: 0;
// //           box-sizing: border-box;
// //         }

// //         :global(html),
// //         :global(body) {
// //           margin: 0;
// //           padding: 0;
// //           width: 100%;
// //           overflow-x: hidden;
// //         }

// //         .container {
// //           min-height: 100vh;
// //           width: 100vw;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
// //           font-family: "Poppins", sans-serif;
// //           color: white;
// //           position: relative;
// //           overflow: hidden;
// //           padding: 20px;
// //         }

// //         .float-icon {
// //           position: absolute;
// //           font-size: 36px;
// //           opacity: 0.15;
// //           animation: float 10s infinite ease-in-out;
// //           pointer-events: none;
// //         }

// //         .icon-1 {
// //           top: 12%;
// //           left: 10%;
// //         }

// //         .icon-2 {
// //           bottom: 18%;
// //           right: 12%;
// //         }

// //         .icon-3 {
// //           top: 30%;
// //           right: 25%;
// //         }

// //         @keyframes float {
// //           0%,
// //           100% {
// //             transform: translateY(0);
// //           }
// //           50% {
// //             transform: translateY(-25px);
// //           }
// //         }

// //         .sparkle {
// //           position: absolute;
// //           top: 20%;
// //           font-size: 40px;
// //           animation: sparkle 1.2s ease forwards;
// //           pointer-events: none;
// //         }

// //         @keyframes sparkle {
// //           0% {
// //             opacity: 0;
// //             transform: scale(0.5) rotate(0deg);
// //           }
// //           50% {
// //             opacity: 1;
// //             transform: scale(1.3) rotate(20deg);
// //           }
// //           100% {
// //             opacity: 0;
// //             transform: scale(1) rotate(40deg);
// //           }
// //         }

// //         .invite-card {
// //           background: rgba(255, 255, 255, 0.2);
// //           backdrop-filter: blur(20px);
// //           border-radius: 28px;
// //           padding: 35px;
// //           width: min(360px, 100%);
// //           text-align: center;
// //           box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
// //           cursor: pointer;
// //           animation: fadeIn 0.6s ease;
// //           z-index: 2;
// //         }

// //         .preview {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           background: rgba(255, 255, 255, 0.15);
// //           padding: 10px 14px;
// //           border-radius: 16px;
// //           margin-bottom: 18px;
// //         }

// //         .preview-avatar {
// //           width: 38px;
// //           height: 38px;
// //           border-radius: 50%;
// //           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .preview-name {
// //           font-size: 14px;
// //           font-weight: 600;
// //         }

// //         .preview-sub {
// //           font-size: 11px;
// //           opacity: 0.8;
// //         }

// //         .big-emoji {
// //           font-size: 60px;
// //           margin-bottom: 10px;
// //           animation: pulse 1.8s infinite;
// //         }

// //         @keyframes pulse {
// //           0% {
// //             transform: scale(1);
// //           }
// //           50% {
// //             transform: scale(1.12);
// //           }
// //           100% {
// //             transform: scale(1);
// //           }
// //         }

// //         .tap-hint {
// //           margin-top: 12px;
// //           font-size: 13px;
// //           opacity: 0.8;
// //         }

// //         .chat-card {
// //           background: rgba(255, 255, 255, 0.18);
// //           backdrop-filter: blur(20px);
// //           border-radius: 28px;
// //           padding: 25px;
// //           width: min(360px, 100%);
// //           box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
// //           animation: fadeIn 0.5s ease;
// //           z-index: 2;
// //         }

// //         .chat-header {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           margin-bottom: 14px;
// //         }

// //         .avatar {
// //           width: 42px;
// //           height: 42px;
// //           border-radius: 50%;
// //           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .name {
// //           font-weight: 600;
// //         }

// //         .status {
// //           font-size: 11px;
// //           opacity: 0.7;
// //         }

// //         .message-label {
// //           font-size: 11px;
// //           opacity: 0.7;
// //           margin-bottom: 6px;
// //         }

// //         .bubble {
// //           position: relative;
// //           background: linear-gradient(135deg, #ffffff, #f7f7f7);
// //           color: #2d2d2d;
// //           padding: 18px 20px;
// //           border-radius: 22px 22px 22px 8px;
// //           font-size: 15px;
// //           line-height: 1.7;
// //           font-weight: 500;
// //           box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12),
// //             inset 0 1px 0 rgba(255, 255, 255, 0.7);
// //           border: 1px solid rgba(0, 0, 0, 0.05);
// //           animation: bubblePop 0.5s ease;
// //           word-break: break-word;
// //         }

// //         .bubble::before {
// //           content: "";
// //           position: absolute;
// //           left: 0;
// //           top: 20%;
// //           width: 4px;
// //           height: 60%;
// //           border-radius: 10px;
// //           background: linear-gradient(#ff9a9e, #fad0c4);
// //         }

// //         .memory-section {
// //           margin-top: 16px;
// //         }

// //         .memory-label {
// //           font-size: 12px;
// //           opacity: 0.8;
// //           margin-bottom: 6px;
// //         }

// //         .memory-card {
// //           height: 60px;
// //           border-radius: 14px;
// //           overflow: hidden;
// //           cursor: pointer;
// //           position: relative;
// //           transition: 0.5s;
// //           box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
// //         }

// //         .memory-card.revealed {
// //           height: 220px;
// //         }

// //         .memory-card img {
// //           width: 100%;
// //           height: 220px;
// //           object-fit: cover;
// //           filter: blur(12px);
// //           transition: 0.6s;
// //         }

// //         .memory-card.revealed img {
// //           filter: blur(0);
// //           transform: scale(1.05);
// //         }

// //         .overlay {
// //           position: absolute;
// //           inset: 0;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           background: rgba(0, 0, 0, 0.3);
// //           font-size: 12px;
// //         }

// //         .insta-section {
// //           margin-top: 18px;
// //         }

// //         .insta-label {
// //           font-size: 12px;
// //           opacity: 0.8;
// //           margin-bottom: 6px;
// //         }

// //         .insta-card {
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           padding: 12px;
// //           border-radius: 16px;
// //           cursor: pointer;
// //           background: rgba(255, 255, 255, 0.15);
// //           backdrop-filter: blur(12px);
// //           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
// //           transition: 0.3s;
// //         }

// //         .insta-card:hover {
// //           transform: translateY(-2px);
// //         }

// //         .insta-icon {
// //           width: 42px;
// //           height: 42px;
// //           border-radius: 12px;
// //         }

// //         .insta-text {
// //           font-size: 13px;
// //           font-weight: 500;
// //         }

// //         .insta-text span {
// //           display: block;
// //           font-size: 11px;
// //           opacity: 0.7;
// //         }

// //         .reply-btn {
// //           margin-top: 20px;
// //           width: 100%;
// //           padding: 14px;
// //           border-radius: 20px;
// //           border: none;
// //           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
// //           color: #333;
// //           font-weight: 600;
// //           cursor: pointer;
// //           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
// //         }

// //         .reply-btn:hover {
// //           transform: translateY(-2px);
// //         }

// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         @media (max-width: 768px) {
// //           .container {
// //             padding: 16px;
// //           }

// //           .invite-card,
// //           .chat-card {
// //             width: 100%;
// //             padding: 28px 22px;
// //             border-radius: 24px;
// //           }

// //           .big-emoji {
// //             font-size: 54px;
// //           }

// //           .float-icon {
// //             font-size: 30px;
// //             opacity: 0.12;
// //           }

// //           .bubble {
// //             font-size: 14px;
// //             padding: 16px 18px;
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .container {
// //             padding: 12px;
// //           }

// //           .invite-card,
// //           .chat-card {
// //             padding: 22px 16px;
// //             border-radius: 22px;
// //           }

// //           .preview {
// //             padding: 9px 12px;
// //           }

// //           .preview-name {
// //             font-size: 13px;
// //           }

// //           .big-emoji {
// //             font-size: 48px;
// //           }

// //           .invite-card h2 {
// //             font-size: 22px;
// //           }

// //           .chat-header {
// //             margin-bottom: 12px;
// //           }

// //           .avatar {
// //             width: 38px;
// //             height: 38px;
// //           }

// //           .bubble {
// //             font-size: 13.5px;
// //             line-height: 1.65;
// //           }

// //           .memory-card.revealed {
// //             height: 190px;
// //           }

// //           .memory-card img {
// //             height: 190px;
// //           }

// //           .insta-card {
// //             padding: 10px;
// //           }

// //           .insta-text {
// //             font-size: 12px;
// //           }

// //           .reply-btn {
// //             padding: 13px;
// //             font-size: 14px;
// //           }

// //           .float-icon {
// //             font-size: 24px;
// //           }

// //           .icon-1 {
// //             top: 8%;
// //             left: 4%;
// //           }

// //           .icon-2 {
// //             bottom: 10%;
// //             right: 6%;
// //           }

// //           .icon-3 {
// //             top: 22%;
// //             right: 10%;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";

// import BrandHeader from "../BrandHeader";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ApproachReceiver() {
//   const params = useSearchParams();
//   const code = params.get("code");

//   const [data, setData] = useState(null);
//   const [opened, setOpened] = useState(false);
//   const [revealImage, setRevealImage] = useState(false);
//   const [typedMessage, setTypedMessage] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";

//     return () => {
//       document.body.style.margin = "";
//       document.body.style.padding = "";
//       document.body.style.overflowX = "";
//     };
//   }, []);

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

//     let i = 0;
//     const text = data.message;

//     const interval = setInterval(() => {
//       setTypedMessage(text.slice(0, i + 1));
//       i++;

//       if (i >= text.length) clearInterval(interval);
//     }, 25);

//     return () => clearInterval(interval);
//   }, [opened, data]);

//   if (!mounted) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           width: "100vw",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1)",
//           padding: "20px",
//           fontFamily: "'Poppins', sans-serif",
//           color: "white",
//         }}
//       >
//         <div
//           style={{
//             width: "50px",
//             height: "50px",
//             border: "3px solid rgba(255,255,255,0.3)",
//             borderTop: "3px solid white",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "20px",
//           }}
//         />
//         <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
//           Loading Emotion Bite...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <BrandHeader />

//       <div className="float-icon icon-1">💬</div>
//       <div className="float-icon icon-2">✨</div>
//       <div className="float-icon icon-3">😊</div>

//       {opened && <div className="sparkle">✨</div>}

//       {!opened ? (
//         <div className="invite-card" onClick={() => setOpened(true)}>
//           <div className="preview">
//             <div className="preview-avatar">😊</div>
//             <div>
//               <div className="preview-name">{data?.sender || "New Connection"}</div>
//               <div className="preview-sub">sent you a message</div>
//             </div>
//           </div>

//           <div className="big-emoji">✉️</div>

//           <h2>You've got a new message</h2>
//           <p>Someone reached out to start a conversation.</p>

//           <div className="tap-hint">Tap to open ✨</div>
//         </div>
//       ) : (
//         <div className="chat-card">
//           <div className="chat-header">
//             <div className="avatar">😊</div>
//             <div>
//               <div className="name">{data?.sender || "New Connection"}</div>
//               <div className="status">Active now</div>
//             </div>
//           </div>

//           <div className="message-label">First message</div>

//           <div className="bubble">{typedMessage}</div>

//           {data?.image && (
//             <div className="memory-section">
//               <div className="memory-label">📷 Photo shared</div>

//               <div
//                 className={`memory-card ${revealImage ? "revealed" : ""}`}
//                 onClick={() => setRevealImage(true)}
//               >
//                 <img src={data.image} alt="shared" />
//                 {!revealImage && <div className="overlay">Tap to reveal</div>}
//               </div>
//             </div>
//           )}

//           {data?.instagram && (
//             <div className="insta-section">
//               <div className="insta-label">💜 Connect on Instagram</div>

//               <div
//                 className="insta-card"
//                 onClick={() => window.open(data.instagram, "_blank")}
//               >
//                 <img src="/image.png" alt="insta" className="insta-icon" />
//                 <div className="insta-text">
//                   Interested? Check their Instagram 👀
//                   <span>Tap to open</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <button className="reply-btn">Reply & Start Chat 💬</button>
//         </div>
//       )}

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         :global(html),
//         :global(body) {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           overflow-x: hidden;
//         }

//         .container {
//           min-height: 100vh;
//           width: 100vw;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
//           font-family: "Poppins", sans-serif;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 20px 20px 60px;
//         }

//         .float-icon {
//           position: absolute;
//           font-size: 36px;
//           opacity: 0.15;
//           animation: float 10s infinite ease-in-out;
//           pointer-events: none;
//         }

//         .icon-1 {
//           top: 12%;
//           left: 10%;
//         }

//         .icon-2 {
//           bottom: 18%;
//           right: 12%;
//         }

//         .icon-3 {
//           top: 30%;
//           right: 25%;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-25px);
//           }
//         }

//         .sparkle {
//           position: absolute;
//           top: 20%;
//           font-size: 40px;
//           animation: sparkle 1.2s ease forwards;
//           pointer-events: none;
//         }

//         @keyframes sparkle {
//           0% {
//             opacity: 0;
//             transform: scale(0.5) rotate(0deg);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.3) rotate(20deg);
//           }
//           100% {
//             opacity: 0;
//             transform: scale(1) rotate(40deg);
//           }
//         }

//         .invite-card {
//           background: rgba(255, 255, 255, 0.2);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 35px;
//           width: min(360px, 100%);
//           text-align: center;
//           box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
//           cursor: pointer;
//           animation: fadeIn 0.6s ease;
//           z-index: 2;
//         }

//         .preview {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           background: rgba(255, 255, 255, 0.15);
//           padding: 10px 14px;
//           border-radius: 16px;
//           margin-bottom: 18px;
//         }

//         .preview-avatar {
//           width: 38px;
//           height: 38px;
//           border-radius: 50%;
//           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .preview-name {
//           font-size: 14px;
//           font-weight: 600;
//         }

//         .preview-sub {
//           font-size: 11px;
//           opacity: 0.8;
//         }

//         .big-emoji {
//           font-size: 60px;
//           margin-bottom: 10px;
//           animation: pulse 1.8s infinite;
//         }

//         @keyframes pulse {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.12);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         .tap-hint {
//           margin-top: 12px;
//           font-size: 13px;
//           opacity: 0.8;
//         }

//         .chat-card {
//           background: rgba(255, 255, 255, 0.18);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 25px;
//           width: min(360px, 100%);
//           box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
//           animation: fadeIn 0.5s ease;
//           z-index: 2;
//         }

//         .chat-header {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 14px;
//         }

//         .avatar {
//           width: 42px;
//           height: 42px;
//           border-radius: 50%;
//           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .name {
//           font-weight: 600;
//         }

//         .status {
//           font-size: 11px;
//           opacity: 0.7;
//         }

//         .message-label {
//           font-size: 11px;
//           opacity: 0.7;
//           margin-bottom: 6px;
//         }

//         .bubble {
//           position: relative;
//           background: linear-gradient(135deg, #ffffff, #f7f7f7);
//           color: #2d2d2d;
//           padding: 18px 20px;
//           border-radius: 22px 22px 22px 8px;
//           font-size: 15px;
//           line-height: 1.7;
//           font-weight: 500;
//           box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12),
//             inset 0 1px 0 rgba(255, 255, 255, 0.7);
//           border: 1px solid rgba(0, 0, 0, 0.05);
//           animation: bubblePop 0.5s ease;
//           word-break: break-word;
//         }

//         .bubble::before {
//           content: "";
//           position: absolute;
//           left: 0;
//           top: 20%;
//           width: 4px;
//           height: 60%;
//           border-radius: 10px;
//           background: linear-gradient(#ff9a9e, #fad0c4);
//         }

//         .memory-section {
//           margin-top: 16px;
//         }

//         .memory-label {
//           font-size: 12px;
//           opacity: 0.8;
//           margin-bottom: 6px;
//         }

//         .memory-card {
//           height: 60px;
//           border-radius: 14px;
//           overflow: hidden;
//           cursor: pointer;
//           position: relative;
//           transition: 0.5s;
//           box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
//         }

//         .memory-card.revealed {
//           height: 220px;
//         }

//         .memory-card img {
//           width: 100%;
//           height: 220px;
//           object-fit: cover;
//           filter: blur(12px);
//           transition: 0.6s;
//         }

//         .memory-card.revealed img {
//           filter: blur(0);
//           transform: scale(1.05);
//         }

//         .overlay {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: rgba(0, 0, 0, 0.3);
//           font-size: 12px;
//         }

//         .insta-section {
//           margin-top: 18px;
//         }

//         .insta-label {
//           font-size: 12px;
//           opacity: 0.8;
//           margin-bottom: 6px;
//         }

//         .insta-card {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px;
//           border-radius: 16px;
//           cursor: pointer;
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(12px);
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
//           transition: 0.3s;
//         }

//         .insta-card:hover {
//           transform: translateY(-2px);
//         }

//         .insta-icon {
//           width: 42px;
//           height: 42px;
//           border-radius: 12px;
//         }

//         .insta-text {
//           font-size: 13px;
//           font-weight: 500;
//         }

//         .insta-text span {
//           display: block;
//           font-size: 11px;
//           opacity: 0.7;
//         }

//         .reply-btn {
//           margin-top: 20px;
//           width: 100%;
//           padding: 14px;
//           border-radius: 20px;
//           border: none;
//           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
//           color: #333;
//           font-weight: 600;
//           cursor: pointer;
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
//         }

//         .reply-btn:hover {
//           transform: translateY(-2px);
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes bubblePop {
//           0% {
//             transform: scale(0.8);
//             opacity: 0;
//           }
//           70% {
//             transform: scale(1.02);
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @media (max-width: 768px) {
//           .container {
//             padding: 16px 16px 80px;
//           }

//           .invite-card,
//           .chat-card {
//             width: 100%;
//             padding: 28px 22px;
//             border-radius: 24px;
//           }

//           .big-emoji {
//             font-size: 54px;
//           }

//           .float-icon {
//             font-size: 30px;
//             opacity: 0.12;
//           }

//           .bubble {
//             font-size: 14px;
//             padding: 16px 18px;
//           }
//         }

//         @media (max-width: 480px) {
//           .container {
//             padding: 12px 12px 80px;
//           }

//           .invite-card,
//           .chat-card {
//             padding: 22px 16px;
//             border-radius: 22px;
//           }

//           .preview {
//             padding: 9px 12px;
//           }

//           .preview-name {
//             font-size: 13px;
//           }

//           .big-emoji {
//             font-size: 48px;
//           }

//           .invite-card h2 {
//             font-size: 22px;
//           }

//           .chat-header {
//             margin-bottom: 12px;
//           }

//           .avatar {
//             width: 38px;
//             height: 38px;
//           }

//           .bubble {
//             font-size: 13.5px;
//             line-height: 1.65;
//           }

//           .memory-card.revealed {
//             height: 190px;
//           }

//           .memory-card img {
//             height: 190px;
//           }

//           .insta-card {
//             padding: 10px;
//           }

//           .insta-text {
//             font-size: 12px;
//           }

//           .reply-btn {
//             padding: 13px;
//             font-size: 14px;
//           }

//           .float-icon {
//             font-size: 24px;
//           }

//           .icon-1 {
//             top: 8%;
//             left: 4%;
//           }

//           .icon-2 {
//             bottom: 10%;
//             right: 6%;
//           }

//           .icon-3 {
//             top: 22%;
//             right: 10%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import BrandHeader from "../BrandHeader";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FirstMessage() {
  const [message, setMessage] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
  const suggestions = [
    "Hey 😊 I saw your profile and felt like saying hi. How's your day going?",
    "Hi! You seem interesting… what's something that always makes you smile?",
    "Hey 👋 If we met randomly, what would be the first thing you'd say to me?",
    "Hello! What's one thing you absolutely love doing in your free time?",
    "Hey 😊 I don't usually do this, but you seem worth a conversation.",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/approach/login?code=${code}`);
    }
  }, [router, code]);

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
          receiverName: "Receiver",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
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
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1)",
          padding: "20px",
          fontFamily: "'Poppins', sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "3px solid rgba(255,255,255,0.3)",
            borderTop: "3px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="body">
      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <BrandHeader />

      <div className="card">
        <div className="content">
          <div className="hero-section">
            <h1>Say Hello 👋</h1>
            <p>
              Your first message sets the tone. Make it warm, real, and
              memorable.
            </p>
          </div>

          <div className="mood-row">
            {moods.map((mood, idx) => (
              <div
                key={idx}
                className="mood-pill"
                onClick={() => setMood(mood)}
              >
                {mood}
              </div>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your first message here..."
            className="message-input"
          />

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

            {instagramUsername && (
              <div className="insta-preview">
                🔗 instagram.com/{instagramUsername}
              </div>
            )}
          </div>

          <div className="suggestions-title">Need ideas? ✨</div>
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

          <button onClick={sendMessage} className="send-btn">
            Send First Step 🚀
          </button>

          {toastVisible && (
            <div className="toast">
              🎉 Your first message has been sent!
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

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
          background: linear-gradient(
            135deg,
            #89f7fe 0%,
            #66a6ff 50%,
            #a18cd1 100%
          );
          color: white;
          position: relative;
          overflow-x: hidden;
          padding: 18px 14px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .card {
          width: 100%;
          max-width: 600px;
          padding: 26px 20px 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 0.8s ease-out;
          margin-top: 20px;
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .suggestions-title {
          font-size: 14px;
          margin: 18px 0 10px;
          opacity: 0.9;
          font-weight: 500;
        }

        .suggestion-box {
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .suggestion-box:active {
          transform: scale(0.97);
        }

        .hero-section {
          text-align: center;
          margin-bottom: 24px;
        }

        .hero-section h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .hero-section p {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .mood-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          margin-bottom: 24px;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .mood-row::-webkit-scrollbar {
          display: none;
        }

        .mood-pill {
          min-width: 120px;
          padding: 12px 16px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .mood-pill:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .message-input {
          width: 100%;
          height: 140px;
          padding: 18px;
          border-radius: 20px;
          border: none;
          resize: none;
          outline: none;
          font-size: 15px;
          color: #333;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          line-height: 1.5;
          font-family: inherit;
        }

        .message-input::placeholder {
          color: rgba(51, 51, 51, 0.6);
        }

        .message-input:focus {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .instagram-section {
          margin: 28px 0;
          padding: 18px;
          border-radius: 22px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25),
            rgba(255, 255, 255, 0.1)
          );
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .insta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .insta-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .insta-icon img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .insta-header h3 {
          font-size: 15px;
          font-weight: 600;
        }

        .insta-header p {
          font-size: 12px;
          opacity: 0.85;
        }

        .insta-input-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 14px;
          padding: 10px 14px;
          gap: 8px;
        }

        .insta-input-box span {
          color: #888;
          font-weight: 600;
          flex-shrink: 0;
        }

        .insta-input-box input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 14px;
          background: transparent;
        }

        .insta-preview {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.9;
        }

        .suggestions {
          margin-top: 16px;
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.2);
          padding: 14px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          line-height: 1.5;
        }

        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .send-btn {
          width: 100%;
          margin-top: 24px;
          padding: 16px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 154, 158, 0.4);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .send-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(255, 154, 158, 0.5);
        }

        .toast {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #66a6ff;
          padding: 14px 24px;
          border-radius: 35px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.03);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px 80px;
          }
          .hero-section h1 {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 16px 12px 80px;
          }
          .hero-section h1 {
            font-size: 22px;
          }
          .mood-pill {
            min-width: 100px;
            padding: 10px 12px;
            font-size: 12.5px;
          }
          .message-input {
            height: 130px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}