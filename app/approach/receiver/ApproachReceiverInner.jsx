// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ApproachReceiver() {

// const params = useSearchParams();
// const code = params.get("code");

// const [data, setData] = useState(null);
// const [opened, setOpened] = useState(false);
// const [revealImage, setRevealImage] = useState(false);
// const [typedMessage, setTypedMessage] = useState("");

// useEffect(() => {
//   if (!code) return;

//   fetch(`/api/messages?code=${code}`)
//     .then(res => res.json())
//     .then(apiData => {
//       setData({
//   sender: apiData.senderName,
//   receiver: apiData.receiverName,
//   message: apiData.messageText,
//   image: apiData.imageUrl,
//   video: apiData.videoUrl,
//   audio: apiData.audioUrl,
//   instagram: apiData.audioUrl // ✅ NEW
// });
//     })
//     .catch(console.error);
// }, [code]);

// /* typing animation */
// useEffect(() => {
//   if (!opened || !data?.message) return;

//   setTypedMessage(""); // ✅ reset before typing

//   let i = 0;
//   const text = data.message;

//   const interval = setInterval(() => {
//     setTypedMessage(text.slice(0, i + 1));
//     i++;

//     if (i >= text.length) clearInterval(interval);
//   }, 25);

//   return () => clearInterval(interval);
// }, [opened, data]);

// if (!data) {
//   return <div style={{padding:40}}>Loading message...</div>;
// }

// return (
// <div className="container">

//   {/* Floating icons */}
//   <div className="float-icon" style={{ top: "12%", left: "10%" }}>💬</div>
//   <div className="float-icon" style={{ bottom: "18%", right: "12%" }}>✨</div>
//   <div className="float-icon" style={{ top: "30%", right: "25%" }}>😊</div>

//   {opened && <div className="sparkle">✨</div>}

//   {!opened ? (

//     /* Invitation Screen */
//     <div className="invite-card" onClick={() => setOpened(true)}>

//       <div className="preview">
//         <div className="preview-avatar">😊</div>
//         <div>
//           <div className="preview-name">
//             {data.sender || "New Connection"}
//           </div>
//           <div className="preview-sub">sent you a message</div>
//         </div>
//       </div>

//       <div className="big-emoji">✉️</div>

//       <h2>You’ve got a new message</h2>
//       <p>Someone reached out to start a conversation.</p>

//       <div className="tap-hint">Tap to open ✨</div>

//     </div>

//   ) : (

//     /* Chat View */
//     <div className="chat-card">

//       {/* Header */}
//       <div className="chat-header">
//         <div className="avatar">😊</div>
//         <div>
//           <div className="name">
//             {data.sender || "New Connection"}
//           </div>
//           <div className="status">Active now</div>
//         </div>
//       </div>

//       <div className="message-label">First message</div>

//       {/* Message bubble */}
//       <div className="bubble">
//         {typedMessage}
//       </div>

//       {/* Image reveal */}
//       {data.image && (
//         <div className="memory-section">

//           <div className="memory-label">📷 Photo shared</div>

//           <div
//             className={`memory-card ${revealImage ? "revealed" : ""}`}
//             onClick={() => setRevealImage(true)}
//           >

//             <img src={data.image} alt="shared" />

//             {!revealImage && (
//               <div className="overlay">
//                 Tap to reveal
//               </div>
//             )}

//           </div>

//         </div>
//       )}
//       {/* Instagram connect */}
// {data.instagram && (
//   <div className="insta-section">

//     <div className="insta-label">💜 Connect on Instagram</div>

//     <div
//       className="insta-card"
//       onClick={() => window.open(data.instagram, "_blank")}
//     >
//       <img src="/image.png" alt="insta" className="insta-icon" />

//       <div className="insta-text">
// Interested? Check their Instagram 👀
//         <span>Tap to open</span>
//       </div>
//     </div>

//   </div>
// )}

//       <button className="reply-btn">
//         Reply & Start Chat 💬
//       </button>

//     </div>

//   )}

// <style jsx>{`

// .container{
// min-height:100vh;
// display:flex;
// justify-content:center;
// align-items:center;
// background:linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1);
// font-family:'Poppins',sans-serif;
// color:white;
// position:relative;
// overflow:hidden;
// padding:20px;
// }

// /* floating icons */

// .float-icon{
// position:absolute;
// font-size:36px;
// opacity:0.15;
// animation:float 10s infinite ease-in-out;
// }

// @keyframes float{
// 0%,100%{transform:translateY(0)}
// 50%{transform:translateY(-25px)}
// }

// /* sparkle */

// .sparkle{
// position:absolute;
// top:20%;
// font-size:40px;
// animation:sparkle 1.2s ease forwards;
// }

// @keyframes sparkle{
// 0%{opacity:0;transform:scale(.5) rotate(0deg)}
// 50%{opacity:1;transform:scale(1.3) rotate(20deg)}
// 100%{opacity:0;transform:scale(1) rotate(40deg)}
// }

// /* invite card */

// .invite-card{
// background:rgba(255,255,255,0.2);
// backdrop-filter:blur(20px);
// border-radius:28px;
// padding:35px;
// width:360px;
// text-align:center;
// box-shadow:0 25px 60px rgba(0,0,0,0.3);
// cursor:pointer;
// animation:fadeIn .6s ease;
// }

// .preview{
// display:flex;
// align-items:center;
// gap:10px;
// background:rgba(255,255,255,0.15);
// padding:10px 14px;
// border-radius:16px;
// margin-bottom:18px;
// }

// .preview-avatar{
// width:38px;
// height:38px;
// border-radius:50%;
// background:linear-gradient(90deg,#ff9a9e,#fad0c4);
// display:flex;
// align-items:center;
// justify-content:center;
// }

// .preview-name{
// font-size:14px;
// font-weight:600;
// }

// .preview-sub{
// font-size:11px;
// opacity:.8;
// }

// /* envelope animation */

// .big-emoji{
// font-size:60px;
// margin-bottom:10px;
// animation:pulse 1.8s infinite;
// }

// @keyframes pulse{
// 0%{transform:scale(1)}
// 50%{transform:scale(1.12)}
// 100%{transform:scale(1)}
// }

// .tap-hint{
// margin-top:12px;
// font-size:13px;
// opacity:.8;
// }

// /* chat card */

// .chat-card{
// background:rgba(255,255,255,0.18);
// backdrop-filter:blur(20px);
// border-radius:28px;
// padding:25px;
// width:360px;
// box-shadow:0 30px 70px rgba(0,0,0,0.3);
// animation:fadeIn .5s ease;
// }

// .chat-header{
// display:flex;
// align-items:center;
// gap:10px;
// margin-bottom:14px;
// }

// .avatar{
// width:42px;
// height:42px;
// border-radius:50%;
// background:linear-gradient(90deg,#ff9a9e,#fad0c4);
// display:flex;
// align-items:center;
// justify-content:center;
// }

// .name{font-weight:600}
// .status{font-size:11px;opacity:.7}

// .message-label{
// font-size:11px;
// opacity:.7;
// margin-bottom:6px;
// }

// /* bubble animation */
// .bubble {
//   position: relative;
//   background: linear-gradient(135deg,#ffffff,#f7f7f7);
//   color: #2d2d2d;
//   padding: 18px 20px;
//   border-radius: 22px 22px 22px 8px;
//   font-size: 15px;
//   line-height: 1.7;
//   font-weight: 500;
//   box-shadow:
//     0 12px 35px rgba(0,0,0,0.12),
//     inset 0 1px 0 rgba(255,255,255,0.7);
//   border: 1px solid rgba(0,0,0,0.05);
//   animation: bubblePop .5s ease;
// }

// .bubble::before{
//   content:"";
//   position:absolute;
//   left:0;
//   top:20%;
//   width:4px;
//   height:60%;
//   border-radius:10px;
//   background:linear-gradient(#ff9a9e,#fad0c4);
// }

// /* image reveal */

// .memory-section{margin-top:16px}
// .memory-label{font-size:12px;opacity:.8;margin-bottom:6px}

// .memory-card{
// height:60px;
// border-radius:14px;
// overflow:hidden;
// cursor:pointer;
// position:relative;
// transition:.5s;
// box-shadow:0 15px 40px rgba(0,0,0,0.3);
// }

// .memory-card.revealed{height:220px}

// .memory-card img{
// width:100%;
// height:220px;
// object-fit:cover;
// filter:blur(12px);
// transition:.6s;
// }

// .memory-card.revealed img{
// filter:blur(0);
// transform:scale(1.05);
// }

// .overlay{
// position:absolute;
// inset:0;
// display:flex;
// justify-content:center;
// align-items:center;
// background:rgba(0,0,0,0.3);
// font-size:12px;
// }

// /* instagram section */

// .insta-section{
//   margin-top:18px;
// }

// .insta-label{
//   font-size:12px;
//   opacity:.8;
//   margin-bottom:6px;
// }

// .insta-card{
//   display:flex;
//   align-items:center;
//   gap:12px;
//   padding:12px;
//   border-radius:16px;
//   cursor:pointer;
//   background:rgba(255,255,255,0.15);
//   backdrop-filter:blur(12px);
//   box-shadow:0 10px 30px rgba(0,0,0,0.25);
//   transition:.3s;
// }

// .insta-card:hover{
//   transform:translateY(-2px);
// }

// .insta-icon{
//   width:42px;
//   height:42px;
//   border-radius:12px;
// }

// .insta-text{
//   font-size:13px;
//   font-weight:500;
// }

// .insta-text span{
//   display:block;
//   font-size:11px;
//   opacity:.7;
// }


// /* reply */

// .reply-btn{
// margin-top:20px;
// width:100%;
// padding:14px;
// border-radius:20px;
// border:none;
// background:linear-gradient(90deg,#ff9a9e,#fad0c4);
// color:#333;
// font-weight:600;
// cursor:pointer;
// box-shadow:0 10px 25px rgba(0,0,0,0.3);
// }

// .reply-btn:hover{
// transform:translateY(-2px)
// }

// @keyframes fadeIn{
// from{opacity:0;transform:translateY(20px)}
// to{opacity:1;transform:translateY(0)}
// }

// `}</style>

// </div>
// );
// }
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApproachReceiver() {
  const params = useSearchParams();
  const code = params.get("code");

  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    if (!code) return;

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
  }, [code]);

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

  if (!data) {
    return <div style={{ padding: 40 }}>Loading message...</div>;
  }

  return (
    <div className="container">
      <div className="float-icon icon-1">💬</div>
      <div className="float-icon icon-2">✨</div>
      <div className="float-icon icon-3">😊</div>

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

          <h2>You’ve got a new message</h2>
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
                <img src="/image.png" alt="insta" className="insta-icon" />
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

        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
          font-family: "Poppins", sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .float-icon {
          position: absolute;
          font-size: 36px;
          opacity: 0.15;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .icon-1 {
          top: 12%;
          left: 10%;
        }

        .icon-2 {
          bottom: 18%;
          right: 12%;
        }

        .icon-3 {
          top: 30%;
          right: 25%;
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

        .sparkle {
          position: absolute;
          top: 20%;
          font-size: 40px;
          animation: sparkle 1.2s ease forwards;
          pointer-events: none;
        }

        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) rotate(20deg);
          }
          100% {
            opacity: 0;
            transform: scale(1) rotate(40deg);
          }
        }

        .invite-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 35px;
          width: min(360px, 100%);
          text-align: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
          z-index: 2;
        }

        .preview {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.15);
          padding: 10px 14px;
          border-radius: 16px;
          margin-bottom: 18px;
        }

        .preview-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-name {
          font-size: 14px;
          font-weight: 600;
        }

        .preview-sub {
          font-size: 11px;
          opacity: 0.8;
        }

        .big-emoji {
          font-size: 60px;
          margin-bottom: 10px;
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }

        .tap-hint {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.8;
        }

        .chat-card {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 25px;
          width: min(360px, 100%);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.5s ease;
          z-index: 2;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
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
          font-weight: 600;
        }

        .status {
          font-size: 11px;
          opacity: 0.7;
        }

        .message-label {
          font-size: 11px;
          opacity: 0.7;
          margin-bottom: 6px;
        }

        .bubble {
          position: relative;
          background: linear-gradient(135deg, #ffffff, #f7f7f7);
          color: #2d2d2d;
          padding: 18px 20px;
          border-radius: 22px 22px 22px 8px;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 500;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.05);
          animation: bubblePop 0.5s ease;
          word-break: break-word;
        }

        .bubble::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          width: 4px;
          height: 60%;
          border-radius: 10px;
          background: linear-gradient(#ff9a9e, #fad0c4);
        }

        .memory-section {
          margin-top: 16px;
        }

        .memory-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .memory-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: 0.5s;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .memory-card.revealed {
          height: 220px;
        }

        .memory-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .memory-card.revealed img {
          filter: blur(0);
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          font-size: 12px;
        }

        .insta-section {
          margin-top: 18px;
        }

        .insta-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .insta-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          transition: 0.3s;
        }

        .insta-card:hover {
          transform: translateY(-2px);
        }

        .insta-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
        }

        .insta-text {
          font-size: 13px;
          font-weight: 500;
        }

        .insta-text span {
          display: block;
          font-size: 11px;
          opacity: 0.7;
        }

        .reply-btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border-radius: 20px;
          border: none;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .reply-btn:hover {
          transform: translateY(-2px);
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

        @media (max-width: 768px) {
          .container {
            padding: 16px;
          }

          .invite-card,
          .chat-card {
            width: 100%;
            padding: 28px 22px;
            border-radius: 24px;
          }

          .big-emoji {
            font-size: 54px;
          }

          .float-icon {
            font-size: 30px;
            opacity: 0.12;
          }

          .bubble {
            font-size: 14px;
            padding: 16px 18px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px;
          }

          .invite-card,
          .chat-card {
            padding: 22px 16px;
            border-radius: 22px;
          }

          .preview {
            padding: 9px 12px;
          }

          .preview-name {
            font-size: 13px;
          }

          .big-emoji {
            font-size: 48px;
          }

          .invite-card h2 {
            font-size: 22px;
          }

          .chat-header {
            margin-bottom: 12px;
          }

          .avatar {
            width: 38px;
            height: 38px;
          }

          .bubble {
            font-size: 13.5px;
            line-height: 1.65;
          }

          .memory-card.revealed {
            height: 190px;
          }

          .memory-card img {
            height: 190px;
          }

          .insta-card {
            padding: 10px;
          }

          .insta-text {
            font-size: 12px;
          }

          .reply-btn {
            padding: 13px;
            font-size: 14px;
          }

          .float-icon {
            font-size: 24px;
          }

          .icon-1 {
            top: 8%;
            left: 4%;
          }

          .icon-2 {
            bottom: 10%;
            right: 6%;
          }

          .icon-3 {
            top: 22%;
            right: 10%;
          }
        }
      `}</style>
    </div>
  );
}