// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import BrandHeader from "../BrandHeader";

// export default function CongratsReceiver() {
//   const [opened, setOpened] = useState(false);
//   const [revealMedia, setRevealMedia] = useState(false);
//   const [data, setData] = useState(null);

//   const params = useSearchParams();
//   const code = params.get("code");

//   useEffect(() => {
//     if (!code) return;

//     fetch(`/api/messages?code=${code}`)
//       .then((res) => res.json())
//       .then((apiData) => {
//         setData({
//           sender: apiData.senderName,
//           message: apiData.messageText,
//           image: apiData.imageUrl,
//           video: apiData.videoUrl,
//           audio: apiData.audioUrl,
//         });
//       })
//       .catch(console.error);
//   }, [code]);

//   if (!data) {
//     return <div className="state-screen">Loading celebration...</div>;
//   }

//   return (
//     <div className="container">
//       <div className="confetti" style={{ top: "10%", left: "15%" }} />
//       <div className="confetti pink" style={{ top: "60%", right: "10%" }} />
//       <div className="confetti blue" style={{ top: "30%", left: "70%" }} />
//       <div className="confetti green" style={{ bottom: "15%", right: "25%" }} />

//       {!opened ? (
//         <div className="gift-card" onClick={() => setOpened(true)}>
//           <BrandHeader />
//           <div className="gift">🎁</div>
//           <h2 className="gift-title">A Special Celebration Awaits!</h2>
//           <p className="gift-subtitle">
//             {data.sender || "Someone special"} has sent you an amazing congratulatory message
//           </p>
//           <div className="tap">Tap to open your celebration ✨</div>
//         </div>
//       ) : (
//         <div className="celebration-card">
//           <BrandHeader />
//           <div className="header">
//             <div className="emoji">🎉</div>
//             <div className="title">Congratulations!</div>
//             <div className="subtitle">You've earned this moment of joy</div>
//             <div className="from">With love from {data.sender}</div>
//           </div>

//           <div className="message-card">{data.message}</div>

//           {data.image && (
//             <div className="media-section">
//               <div className="media-label">📸 A cherished memory was shared</div>
//               <div
//                 className={`media-card ${revealMedia ? "show" : ""}`}
//                 onClick={() => setRevealMedia(true)}
//               >
//                 <img src={data.image} alt="celebration" />
//                 {!revealMedia && <div className="overlay">Tap to reveal the memory</div>}
//               </div>
//             </div>
//           )}

//           <div className="footer-note">
//             Keep shining bright and celebrating every milestone on your incredible journey! ✨
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

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
//           font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
//         }

//         .state-screen {
//           min-height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
//           color: white;
//           font-size: 18px;
//           font-weight: 500;
//           padding: 20px;
//           text-align: center;
//           font-family: 'Poppins', sans-serif;
//         }

//         .container {
//           min-height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
//           font-family: 'Poppins', sans-serif;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 20px;
//         }

//         .confetti {
//           position: absolute;
//           width: 14px;
//           height: 14px;
//           border-radius: 50%;
//           background: #ffeb3b;
//           opacity: 0.6;
//           animation: float 8s infinite ease-in-out;
//           pointer-events: none;
//         }

//         .confetti.pink {
//           background: #ff4081;
//         }

//         .confetti.blue {
//           background: #00e5ff;
//         }

//         .confetti.green {
//           background: #69f0ae;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-35px);
//           }
//         }

//         .gift-card {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 40px;
//           width: min(360px, 100%);
//           text-align: center;
//           box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
//           cursor: pointer;
//           animation: fadeIn 0.6s ease;
//           position: relative;
//           z-index: 2;
//         }

//         .gift {
//           font-size: 70px;
//           margin-bottom: 10px;
//           animation: bounce 2s infinite;
//         }

//         .gift-title {
//           font-size: 22px;
//           font-weight: 600;
//           margin: 12px 0 8px 0;
//           line-height: 1.3;
//           letter-spacing: -0.02em;
//         }

//         .gift-subtitle {
//           font-size: 15px;
//           font-weight: 400;
//           line-height: 1.6;
//           opacity: 0.95;
//           margin-bottom: 16px;
//         }

//         .tap {
//           margin-top: 12px;
//           font-size: 13px;
//           font-weight: 500;
//           opacity: 0.9;
//           letter-spacing: 0.5px;
//         }

//         @keyframes bounce {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .celebration-card {
//           background: rgba(255, 255, 255, 0.18);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 28px;
//           width: min(380px, 100%);
//           box-shadow: 0 35px 80px rgba(0, 0, 0, 0.4);
//           animation: fadeIn 0.5s ease;
//           position: relative;
//           z-index: 2;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 24px;
//         }

//         .emoji {
//           font-size: 40px;
//           margin-bottom: 8px;
//         }

//         .title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 4px;
//           line-height: 1.2;
//           letter-spacing: -0.03em;
//           background: linear-gradient(135deg, #fff, #f8f9ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .subtitle {
//           font-size: 14px;
//           font-weight: 400;
//           opacity: 0.9;
//           margin-bottom: 6px;
//           font-style: italic;
//         }

//         .from {
//           font-size: 13px;
//           font-weight: 500;
//           opacity: 0.85;
//           letter-spacing: 0.3px;
//         }

//         .message-card {
//           background: white;
//           color: #333;
//           padding: 22px;
//           border-radius: 18px;
//           font-size: 15px;
//           line-height: 1.7;
//           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
//           border-left: 5px solid #ff9800;
//           word-break: break-word;
//           font-weight: 400;
//           font-family: 'Poppins', sans-serif;
//         }

//         .media-section {
//           margin-top: 24px;
//         }

//         .media-label {
//           font-size: 12px;
//           font-weight: 500;
//           opacity: 0.85;
//           margin-bottom: 8px;
//           letter-spacing: 0.3px;
//         }

//         .media-card {
//           height: 60px;
//           border-radius: 14px;
//           overflow: hidden;
//           cursor: pointer;
//           transition: 0.5s;
//           box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
//           position: relative;
//         }

//         .media-card.show {
//           height: 220px;
//         }

//         .media-card img {
//           width: 100%;
//           height: 220px;
//           object-fit: cover;
//           filter: blur(12px);
//           transition: 0.6s;
//         }

//         .media-card.show img {
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
//           font-weight: 500;
//           letter-spacing: 0.5px;
//         }

//         .footer-note {
//           margin-top: 24px;
//           font-size: 13px;
//           font-weight: 400;
//           opacity: 0.9;
//           text-align: center;
//           line-height: 1.5;
//           letter-spacing: 0.2px;
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

//         @media (max-width: 768px) {
//           .container {
//             padding: 16px;
//           }

//           .gift-card {
//             padding: 34px 24px;
//             border-radius: 24px;
//           }

//           .celebration-card {
//             padding: 24px;
//             border-radius: 24px;
//           }

//           .gift {
//             font-size: 64px;
//           }

//           .title {
//             font-size: 26px;
//           }

//           .message-card {
//             font-size: 14px;
//             padding: 18px;
//           }

//           .media-card.show {
//             height: 200px;
//           }

//           .media-card img {
//             height: 200px;
//           }
//         }

//         @media (max-width: 480px) {
//           .container {
//             padding: 12px;
//           }

//           .gift-card {
//             padding: 28px 18px;
//             border-radius: 20px;
//           }

//           .celebration-card {
//             padding: 18px;
//             border-radius: 20px;
//           }

//           .gift {
//             font-size: 56px;
//           }

//           .gift-title {
//             font-size: 20px;
//           }

//           .title {
//             font-size: 24px;
//           }

//           .message-card {
//             font-size: 13px;
//             padding: 16px;
//             line-height: 1.6;
//           }

//           .media-card.show {
//             height: 180px;
//           }

//           .media-card img {
//             height: 180px;
//           }

//           .footer-note {
//             font-size: 12px;
//           }

//           .confetti {
//             width: 11px;
//             height: 11px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function CongratsReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) {
      setError("Celebration code not found");
      return;
    }

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!apiData) {
          setError("No celebration found");
          return;
        }

        setData({
          sender: apiData.senderName || "Someone special",
          message: apiData.messageText,
          image: apiData.imageUrl,
          video: apiData.videoUrl,
          audio: apiData.audioUrl,
        });
      })
      .catch(() => setError("Server error"));
  }, [code]);

  if (!data && !error) {
    return (
      <div className="loading-screen">
        <BrandHeader />
        <div className="loader-text">Polishing your celebration...</div>
      </div>
    );
  }

  if (error) {
    return <div className="loading-screen">{error}</div>;
  }

  return (
    <div className={`congrats-root ${opened ? "open" : ""}`}>
      <div className="glass-card" onClick={() => !opened && setOpened(true)}>
        <BrandHeader />

        {!opened ? (
          <div className="preview-view">
            <div className="emoji-blob">🎉</div>
            <div className="preview-title">
              A special celebration is waiting for you
            </div>
            <div className="preview-sender">From <strong>{data.sender}</strong></div>
            <div className="preview-hint">Tap to reveal your card ✨</div>
          </div>
        ) : (
          <div className="celebration-view">
            <div className="hero">
              <div className="emoji-glow">🏆</div>
              <div className="h1">Congratulations!</div>
              <div className="h2">You’ve earned this moment of joy</div>
              <div className="from">With love from <span>{data.sender}</span></div>
            </div>

            <div className="message-container">
              <div className="label">✨ Your message</div>
              <p className="message">{data.message}</p>
            </div>

            {data.image && (
              <div className="image-container">
                <div className="label">📸 A memory was shared</div>
                <div
                  className={`media-card ${revealMedia ? "revealed" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRevealMedia(true);
                  }}
                >
                  <img src={data.image} alt="Celebration photo" />
                  {!revealMedia && (
                    <div className="blur-overlay">
                      <span>Tap to reveal the image</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="finale-note">
              Keep shining bright and celebrating every milestone ahead! ✨
            </div>
          </div>
        )}
      </div>

      <div className="particle p1" />
      <div className="particle p2" />
      <div className="particle p3" />
      <div className="particle p4" />
      <div className="particle p5" />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

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
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .loading-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #4a00e0, #8e2de2);
          color: rgba(255, 255, 255, 0.95);
          padding: 20px;
          text-align: center;
          font-size: 18px;
        }

        .loader-text {
          margin-top: 12px;
          font-size: 14px;
          opacity: 0.8;
        }

        .congrats-root {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
        }

        .congrats-root.open {
          background: linear-gradient(180deg, #4a00e0, #8e2de2, #ff6a00);
        }

        .glass-card {
          width: min(420px, 95%);
          min-height: 540px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-radius: 28px;
          padding: 32px 28px;
          color: rgba(255, 255, 255, 0.98);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transform: scale(0.96);
          animation: cardFloat 0.85s ease-out forwards;
        }

        @keyframes cardFloat {
          0% {
            opacity: 0;
            transform: scale(0.75) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .glass-card:hover:not(.open) {
          transform: scale(1.01) translateY(-4px);
        }

        .preview-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          gap: 16px;
        }

        .emoji-blob {
          font-size: 80px;
          animation: floatUp 1.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 8px 24px rgba(255, 215, 0, 0.45));
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        .preview-title {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.5px;
          line-height: 1.4;
        }

        .preview-sender {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.85;
          letter-spacing: 0.3px;
        }

        .preview-hint {
          font-size: 13px;
          font-weight: 400;
          opacity: 0.75;
          letter-spacing: 0.4px;
          margin-top: 4px;
        }

        .celebration-view {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero {
          text-align: center;
          padding-bottom: 6px;
        }

        .emoji-glow {
          font-size: 48px;
          animation: glow 3s ease-in-out infinite alternate both;
          margin-bottom: 8px;
          filter: drop-shadow(0 6px 20px rgba(255, 215, 0, 0.45));
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.45));
            transform: scale(1);
          }
          to {
            filter: drop-shadow(0 0 28px rgba(255, 215, 0, 0.75));
            transform: scale(1.08);
          }
        }

        .h1 {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.8px;
          background: linear-gradient(135deg, #ff6a00, #ff9500, #ffb74d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .h2 {
          font-size: 15px;
          font-weight: 400;
          opacity: 0.9;
          margin: 4px 0 8px 0;
        }

        .from {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.85;
          letter-spacing: 0.3px;
        }

        .from span {
          color: #ff6a00;
        }

        .message-container {
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 22px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .message {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          word-break: break-word;
          letter-spacing: 0.2px;
        }

        .image-container {
          margin-top: 18px;
        }

        .media-card {
          position: relative;
          width: 100%;
          height: 70px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          border: 2px solid rgba(255, 255, 255, 0.22);
          transition: all 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .media-card.revealed {
          height: 240px;
          transform: translateY(-4px);
        }

        .media-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          filter: blur(10px) brightness(0.95);
          transform: scale(1.12);
          transition: all 0.85s ease;
        }

        .media-card.revealed img {
          filter: blur(0) brightness(1.05);
          transform: scale(1);
        }

        .blur-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .blur-overlay span {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.6px;
          color: rgba(255, 255, 255, 0.95);
        }

        .finale-note {
          font-size: 13px;
          opacity: 0.85;
          text-align: center;
          margin-top: 14px;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          letter-spacing: 0.3px;
          line-height: 1.5;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 12px rgba(255, 106, 0, 0.45);
          pointer-events: none;
          z-index: 1;
        }

        .p1 {
          left: 10%;
          top: 25%;
          animation: floatDot 14s ease-in infinite;
        }

        .p2 {
          left: 25%;
          top: 8%;
          animation: floatDot 12s ease-in infinite 1s;
        }

        .p3 {
          right: 20%;
          top: 15%;
          animation: floatDot 13s ease-in infinite 2s;
        }

        .p4 {
          right: 10%;
          bottom: 18%;
          animation: floatDot 11s ease-in infinite 0.5s;
        }

        .p5 {
          left: 15%;
          bottom: 20%;
          animation: floatDot 12s ease-in infinite 3s;
        }

        @keyframes floatDot {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .congrats-root {
            padding: 16px;
          }

          .glass-card {
            min-height: 500px;
            padding: 28px 22px;
          }

          .emoji-blob {
            font-size: 72px;
          }

          .preview-title {
            font-size: 20px;
          }

          .h1 {
            font-size: 26px;
          }

          .message {
            font-size: 14px;
          }

          .finale-note {
            font-size: 12px;
          }

          .media-card {
            height: 60px;
          }

          .media-card.revealed {
            height: 200px;
          }

          .media-card img {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .congrats-root {
            padding: 12px;
          }

          .glass-card {
            min-height: 460px;
            padding: 22px 18px;
          }

          .emoji-blob {
            font-size: 64px;
          }

          .preview-title {
            font-size: 18px;
          }

          .h1 {
            font-size: 24px;
          }

          .message {
            font-size: 13px;
          }

          .finale-note {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}