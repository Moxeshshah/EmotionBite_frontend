

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
  const [mounted, setMounted] = useState(false); // ✅ Client-only safety

  useEffect(() => {
    setMounted(true); // ✅ Mark as client-mounted
  }, []);

  useEffect(() => {
    if (!code || !mounted) return; // ✅ Skip if no code or not mounted

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

  // Rest of your JSX remains identical...
  return (
    <div className="container">
      <BrandHeader />

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      {opened && <div className="sparkle">✨</div>}

      {!opened ? (
        <div className="invite-card" onClick={() => setOpened(true)}>
          <div className="preview">
            <div className="preview-avatar">😊</div>
            <div>
              <div className="preview-name">{data.sender || "New Connection"}</div>
              <div className="preview-sub">sent you a message</div>
            </div>
          </div>

          <div className="big-emoji">✉️</div>

          <h2>You've got a new message</h2>
          <p>Someone reached out to start a conversation.</p>

          <div className="tap-hint">Tap to open ✨</div>
        </div>
      ) : (
        <div className="chat-card">
          <div className="chat-header">
            <div className="avatar">😊</div>
            <div>
              <div className="name">{data.sender || "New Connection"}</div>
              <div className="status">Active now</div>
            </div>
          </div>

          <div className="message-label">First message</div>

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

          <button className="reply-btn">Reply & Start Chat 💬</button>
        </div>
      )}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
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
          padding: 26px 20px 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeIn 0.6s ease;
          z-index: 2;
        }

        .preview {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .preview-avatar,
        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-name {
          font-size: 16px;
          font-weight: 600;
        }

        .preview-sub {
          font-size: 12px;
          opacity: 0.85;
        }

        .big-emoji {
          font-size: 48px;
          text-align: center;
          margin: 18px 0;
        }

        .invite-card h2 {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 8px;
        }

        .invite-card p {
          font-size: 14px;
          opacity: 0.9;
          text-align: center;
          line-height: 1.6;
        }

        .tap-hint {
          margin-top: 18px;
          text-align: center;
          font-size: 13px;
          opacity: 0.95;
          font-weight: 500;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .name {
          font-size: 16px;
          font-weight: 600;
        }

        .status {
          font-size: 12px;
          opacity: 0.85;
        }

        .message-label,
        .memory-label,
        .insta-label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .bubble {
          background: linear-gradient(135deg, #fff, #f7f7f7);
          color: #2d2d2d;
          padding: 18px;
          border-radius: 22px 22px 22px 8px;
          margin-top: 10px;
          line-height: 1.6;
          min-height: 60px;
          white-space: pre-wrap;
        }

        .memory-section {
          margin-top: 18px;
        }

        .memory-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(14px);
        }

        .memory-card img {
          width: 100%;
          display: block;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.35);
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .insta-section {
          margin-top: 18px;
        }

        .insta-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 18px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(14px);
          margin-top: 10px;
        }

        .insta-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .insta-text {
          font-size: 14px;
          line-height: 1.4;
        }

        .insta-text span {
          display: block;
          font-size: 12px;
          opacity: 0.85;
          margin-top: 3px;
        }

        .reply-btn {
          margin-top: 24px;
          width: 100%;
          padding: 16px;
          border-radius: 28px;
          border: none;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 700;
          cursor: pointer;
          font-size: 15px;
        }

        .loading-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #a18cd1 100%);
          color: white;
        }

        .loader {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        .loading-title {
          font-size: 20px;
          font-weight: 600;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 18px 14px;
          }

          .invite-card,
          .chat-card {
            max-width: 100%;
          }

          .invite-card h2 {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 16px 12px;
          }

          .invite-card,
          .chat-card {
            padding: 22px 16px 24px;
          }

          .invite-card h2 {
            font-size: 20px;
          }

          .bubble {
            padding: 16px;
          }

          .reply-btn {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}