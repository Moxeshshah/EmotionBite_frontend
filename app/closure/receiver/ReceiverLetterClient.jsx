"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ReceiverLetter() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const code = params.get("code");

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
          receiverName: apiData.receiverName || "For You",
          sender: apiData.senderName || "Someone who cared",
          message: apiData.messageText,
          image: apiData.imageUrl,
        });
      })
      .catch(() => setError("Server error"));
  }, [code]);

  if (!data && !error) {
    return <div className="state-screen">Loading your message...</div>;
  }

  if (error) {
    return <div className="state-screen">{error}</div>;
  }

  return (
    <div className={opened ? "main-container open" : "main-container"}>
      {/* Floating Particles */}
      <div className="particle" style={{ left: "20%" }} />
      <div className="particle" style={{ left: "45%", animationDelay: "3s" }} />
      <div className="particle" style={{ left: "70%", animationDelay: "6s" }} />
      <div className="particle" style={{ left: "85%", animationDelay: "2s" }} />

      {/* Main Card Container */}
      <div className={`letter-card ${opened ? "opened" : ""}`}>
        {!opened ? (
          <div className="closed-envelope" onClick={() => setOpened(true)}>
                    <BrandHeader />

            <div className="envelope-icon">📜</div>
            <div className="envelope-title">A message awaits ✨</div>
            <div className="envelope-hint">Tap to open 💫</div>
          </div>
        ) : (
          <div className="letter-content">
            <BrandHeader />
            
            <div className="header-section">
              <div className="moon">🌙</div>
              <h2 className="receiver-name">Dear, {data.receiverName}</h2>
            </div>

            <div className="letter-paper">
              <p className="message-text">"{data.message}"</p>

              {data.image && (
                <div className="memory-section">
                  <div className="memory-label">✨ A memory was shared</div>
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
            </div>

            <div className="sender-name">— {data.sender}</div>
            <div className="peace-note">
              🌿 Some messages are meant to bring peace, not replies.
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

        .state-screen {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3a1c71;
          color: white;
          font-size: 18px;
          padding: 20px;
          text-align: center;
        }

        .main-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top, #6a11cb, #3a1c71);
          transition: background 0.6s ease;
          padding: 20px;
        }

        .main-container.open {
          background: radial-gradient(circle at top, #141e30, #000010);
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float 10s infinite linear;
          pointer-events: none;
          top: 0;
          z-index: 1;
        }

        /* RESTORED ORIGINAL HEADER */
        .header-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .moon {
          font-size: 40px;
          animation: glow 3s ease-in-out infinite alternate;
        }

        /* SAME ELEGANT FONT + GLITCH FIX */
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Parisienne&display=swap');

        .receiver-name {
          font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.8px;
          text-align: center;
          margin: 0;
          color: white;
          text-shadow: 
            0 4px 12px rgba(0,0,0,0.4),
            0 0 30px rgba(255,255,255,0.2);
          max-width: 90%;
          word-break: break-word;
          overflow-wrap: break-word;
          padding: 0 10px;
        }

        .receiver-name:hover {
          transform: scale(1.02);
          text-shadow: 
            0 5px 16px rgba(0,0,0,0.5),
            0 0 40px rgba(255,255,255,0.4);
        }

        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }

        /* ORIGINAL CARD LAYOUT RESTORED */
        .letter-card {
          width: min(450px, 95%);
          min-height: 500px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.95);
          animation: cardEntrance 0.8s ease-out;
        }

        .letter-card.opened {
          transform: scale(1);
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        @keyframes cardEntrance {
          0% { opacity: 0; transform: scale(0.7) rotateX(20deg); }
          100% { opacity: 1; transform: scale(0.95) rotateX(0deg); }
        }

        .closed-envelope {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .closed-envelope:hover {
          transform: translateY(-5px);
        }

        .envelope-icon {
          font-size: 80px;
          animation: bounce 2s infinite;
          margin-bottom: 20px;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .envelope-title {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .envelope-hint {
          font-size: 15px;
          opacity: 0.8;
          letter-spacing: 0.5px;
        }

        .letter-content {
          height: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          color: white;
          overflow-y: auto;
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
          to { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
        }

        .letter-paper {
          background: linear-gradient(180deg, rgba(255,247,237,0.95), rgba(255,232,214,0.9));
          color: #3b2f2f;
          padding: 35px;
          border-radius: 25px;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          text-align: left;
          backdrop-filter: blur(10px);
          margin-bottom: 25px;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }

        .letter-paper:hover {
          transform: translateY(0);
        }

        .message-text {
          font-size: 19px;
          line-height: 1.85;
          font-style: italic;
          word-break: break-word;
          margin-bottom: 0;
        }

        .memory-section {
          margin-top: 30px;
        }

        .memory-label {
          font-size: 13px;
          opacity: 0.8;
          margin-bottom: 12px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .memory-card {
          position: relative;
          height: 70px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .memory-card:hover {
          transform: translateY(-3px);
        }

        .memory-card.revealed {
          height: 280px;
        }

        .memory-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          filter: blur(15px) brightness(0.65);
          transform: scale(1.1);
          transition: all 0.8s ease;
        }

        .memory-card.revealed img {
          filter: blur(0) brightness(1);
          transform: scale(1);
        }

        .memory-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
        }

        .memory-text {
          background: rgba(255, 255, 255, 0.98);
          color: #333;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .sender-name {
          margin-top: 20px;
          font-size: 16px;
          opacity: 0.9;
          font-style: italic;
          letter-spacing: 0.3px;
        }

        .peace-note {
          margin-top: 15px;
          font-size: 13px;
          opacity: 0.75;
          font-style: italic;
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .letter-card {
            width: 95%;
            min-height: 450px;
            border-radius: 25px;
          }
          
          .letter-content {
            padding: 30px 25px;
          }
          
          .letter-paper {
            padding: 28px;
          }
          
          .envelope-icon {
            font-size: 70px;
          }
          
          .receiver-name {
            font-size: 32px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 15px;
          }
          
          .letter-card {
            min-height: 420px;
            border-radius: 20px;
          }
          
          .letter-content {
            padding: 25px 20px;
          }
          
          .letter-paper {
            padding: 22px;
          }
          
          .envelope-icon {
            font-size: 65px;
          }
          
          .receiver-name {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import BrandHeader from "../BrandHeader";

// export default function ReceiverLetter() {
//   const [opened, setOpened] = useState(false);
//   const [revealImage, setRevealImage] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   const params = useSearchParams();
//   const code = params.get("code");

//   useEffect(() => {
//     if (!code) {
//       setError("Message code not found");
//       return;
//     }

//     fetch(`/api/messages?code=${code}`)
//       .then((res) => res.json())
//       .then((apiData) => {
//         if (!apiData) {
//           setError("No message found");
//           return;
//         }

//         setData({
//           receiverName: apiData.receiverName || "You",
//           sender: apiData.senderName || "Someone who cared",
//           message: apiData.messageText,
//           image: apiData.imageUrl,
//         });
//       })
//       .catch(() => setError("Server error"));
//   }, [code]);

//   if (!data && !error) {
//     return <div className="state-screen">Loading your closure message...</div>;
//   }

//   if (error) {
//     return <div className="state-screen">{error}</div>;
//   }

//   return (
//     <div className={opened ? "main-container open" : "main-container"}>
//       {/* Floating Particles & Serenity Elements */}
//       <div className="particle" style={{ left: "15%" }} />
//       <div className="particle" style={{ left: "35%", animationDelay: "2s" }} />
//       <div className="particle" style={{ left: "55%", animationDelay: "4s" }} />
//       <div className="particle" style={{ left: "75%", animationDelay: "1s" }} />
//       <div className="particle" style={{ left: "90%", animationDelay: "3s" }} />
      
//       <div className="leaf-float l1">🍃</div>
//       <div className="leaf-float l2">🌿</div>
//       <div className="leaf-float l3">🌱</div>

//       {/* Main Card Container */}
//       <div className={`letter-card ${opened ? "opened" : ""}`}>
//         {!opened ? (
//           <div className="closed-envelope" onClick={() => setOpened(true)}>
//             <BrandHeader />
//             <div className="envelope-icon">📜</div>
//             <div className="envelope-title">A closure message awaits 🌿</div>
//             <div className="envelope-hint">Tap to find your peace</div>
//           </div>
//         ) : (
//           <div className="letter-content">
//             <div className="header-section">
//               <BrandHeader />
//               <div className="peace-icon">🕊️</div>
//               <h2 className="receiver-name">Dear, {data.receiverName}</h2>
//             </div>

//             {/* Closure Message Display */}
//             <div className="closure-message-container">
//               <div className="message-header">
//                 <div className="ribbon">📜 Closure Letter</div>
//               </div>
              
//               <div className="message-scroll-wrapper">
//                 <div className="message-content">
//                   <p className="closure-message">"{data.message}"</p>
//                 </div>
//               </div>
              
//               <div className="message-footer">
//                 <div className="signature">
//                   <span className="signature-line">With peace and closure,</span>
//                   <span className="sender-signature">{data.sender}</span>
//                 </div>
//               </div>
//             </div>

//             {data.image && (
//               <div className="memory-section">
//                 <div className="memory-label">✨ A memory was shared</div>
//                 <div
//                   className={`memory-card ${revealImage ? "revealed" : ""}`}
//                   onClick={() => setRevealImage(true)}
//                 >
//                   <img src={data.image} alt="Shared memory" />
//                   {!revealImage && (
//                     <div className="memory-overlay">
//                       <span className="memory-text">Tap to reveal</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="closure-note">
//               🌿 Some chapters close to begin new journeys.
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Parisienne&family=Poppins:wght@300;400;500;600;700&display=swap');

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

//         .state-screen {
//           min-height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: #3a1c71;
//           color: white;
//           font-size: 18px;
//           padding: 20px;
//           text-align: center;
//         }

//         .main-container {
//           min-height: 100vh;
//           width: 100vw;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           position: relative;
//           overflow: hidden;
//           background: radial-gradient(circle at top, #6a11cb, #3a1c71);
//           transition: background 0.6s ease;
//           padding: 20px;
//         }

//         .main-container.open {
//           background: radial-gradient(circle at top, #141e30, #000010);
//         }

//         .particle {
//           position: absolute;
//           width: 6px;
//           height: 6px;
//           background: rgba(255, 255, 255, 0.6);
//           border-radius: 50%;
//           animation: floatParticle 12s infinite linear;
//           pointer-events: none;
//           top: 0;
//           z-index: 1;
//           box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
//         }

//         .leaf-float {
//           position: absolute;
//           font-size: 24px;
//           opacity: 0.12;
//           animation: floatLeaf 18s infinite ease-in-out;
//           pointer-events: none;
//           filter: drop-shadow(0 4px 12px rgba(255,255,255,0.2));
//           z-index: 1;
//         }

//         .l1 { top: 20%; left: 10%; }
//         .l2 { top: 55%; right: 20%; animation-delay: 4s; }
//         .l3 { bottom: 30%; left: 15%; animation-delay: 8s; }

//         @keyframes floatParticle {
//           0% { 
//             transform: translateY(100vh) rotate(0deg); 
//             opacity: 0; 
//           }
//           20% { opacity: 0.8; }
//           80% { opacity: 0.8; }
//           100% { 
//             transform: translateY(-15vh) rotate(360deg); 
//             opacity: 0; 
//           }
//         }

//         @keyframes floatLeaf {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           33% { transform: translateY(-25px) rotate(10deg); }
//           66% { transform: translateY(-40px) rotate(-5deg); }
//         }

//         .letter-card {
//           width: min(450px, 95%);
//           min-height: 580px;
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(20px);
//           border-radius: 30px;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           box-shadow: 
//             0 25px 60px rgba(0, 0, 0, 0.4),
//             inset 0 1px 0 rgba(255, 255, 255, 0.3);
//           position: relative;
//           overflow: hidden;
//           transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//           transform: scale(0.95);
//           animation: cardEntrance 0.8s ease-out;
//         }

//         .letter-card.opened {
//           transform: scale(1);
//           box-shadow: 
//             0 40px 100px rgba(0, 0, 0, 0.6),
//             inset 0 1px 0 rgba(255, 255, 255, 0.2);
//           min-height: 620px;
//         }

//         @keyframes cardEntrance {
//           0% { opacity: 0; transform: scale(0.7) rotateX(20deg); }
//           100% { opacity: 1; transform: scale(0.95) rotateX(0deg); }
//         }

//         .closed-envelope {
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           cursor: pointer;
//           padding: 40px;
//           transition: all 0.3s ease;
//           text-align: center;
//         }

//         .closed-envelope:hover {
//           transform: translateY(-5px);
//         }

//         .envelope-icon {
//           font-size: 80px;
//           animation: bounce 2s infinite;
//           margin-bottom: 20px;
//           filter: drop-shadow(0 8px 25px rgba(106, 17, 203, 0.4));
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }

//         .envelope-title {
//           font-size: 24px;
//           margin-bottom: 10px;
//           font-weight: 600;
//         }

//         .envelope-hint {
//           font-size: 15px;
//           opacity: 0.8;
//           letter-spacing: 0.5px;
//         }

//         .letter-content {
//           height: 100%;
//           padding: 40px;
//           display: flex;
//           flex-direction: column;
//           color: white;
//           overflow-y: auto;
//           gap: 15px;
//         }

//         .header-section {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 5px;
//           margin-bottom: 0px;
//         }

//         .peace-icon {
//           font-size: 40px;
//           animation: glow 3s ease-in-out infinite alternate;
//         }

//         @keyframes glow {
//           from { filter: drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
//           to { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
//         }

//         .receiver-name {
//           font-family: 'Dancing Script', 'Great Vibes', 'Parisienne', cursive;
//           font-size: 36px;
//           line-height: 1.1;
//           font-weight: 700;
//           letter-spacing: -0.8px;
//           text-align: center;
//           margin: 0;
//           color: white;
//           text-shadow: 
//             0 4px 12px rgba(0,0,0,0.4),
//             0 0 30px rgba(255,255,255,0.2);
//           max-width: 90%;
//           word-break: break-word;
//           overflow-wrap: break-word;
//           padding: 0 10px;
//         }

//         /* Closure Message Container - Original Colors */
//         .closure-message-container {
//           flex: 1;
//           background: linear-gradient(180deg, rgba(255,247,237,0.95), rgba(255,232,214,0.9));
//           border-radius: 25px;
//           overflow: hidden;
//           box-shadow: 
//             0 20px 50px rgba(0, 0, 0, 0.3),
//             inset 0 1px 0 rgba(255, 255, 255, 0.8);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           position: relative;
//           backdrop-filter: blur(10px);
//           margin-bottom: 2px;
//           transform: translateY(10px);
//           transition: transform 0.4s ease;
//         }

//         .closure-message-container:hover {
//           transform: translateY(0);
//         }

//         .message-header {
//           background: linear-gradient(135deg, #6a11cb, #3a1c71);
//           padding: 20px 25px;
//           text-align: center;
//         }

//         .ribbon {
//           font-family: 'Dancing Script', cursive;
//           font-size: 22px;
//           color: white;
//           font-weight: 700;
//           text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
//           letter-spacing: -0.5px;
//         }

//         .message-scroll-wrapper {
//           height: 220px;
//           overflow-y: auto;
//           padding: 30px 28px;
//           display: flex;
//           align-items: flex-start;
//         }

//         .message-scroll-wrapper::-webkit-scrollbar {
//           width: 6px;
//         }

//         .message-scroll-wrapper::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//         }

//         .message-scroll-wrapper::-webkit-scrollbar-thumb {
//           background: linear-gradient(135deg, #6a11cb, #3a1c71);
//           border-radius: 10px;
//         }

//         .closure-message {
//           font-size: 19px;
//           line-height: 1.85;
//           font-style: italic;
//           color: #3b2f2f;
//           font-weight: 400;
//           margin: 0;
//           word-break: break-word;
//           letter-spacing: -0.3px;
//         }

//         .message-footer {
//           background: rgba(255, 248, 247, 0.9);
//           padding: 15px 22px;
//           text-align: right;
//           border-top: 1px solid rgba(58, 28, 113, 0.3);
//         }

//         .signature {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//         }

//         .signature-line {
//           font-size: 13px;
//           color: #6a11cb;
//           font-weight: 500;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//           opacity: 0.9;
//         }

//         .sender-signature {
//           font-family: 'Great Vibes', cursive;
//           font-size: 20px;
//           color: #3a1c71;
//           font-weight: 400;
//           letter-spacing: 0.5px;
//         }

//         .memory-section {
//           margin-top: 20px;
//         }

//         .memory-label {
//           font-size: 13px;
//           opacity: 0.8;
//           margin-bottom: 12px;
//           font-weight: 500;
//           letter-spacing: 0.3px;
//         }

//         .memory-card {
//           position: relative;
//           height: 70px;
//           border-radius: 20px;
//           overflow: hidden;
//           cursor: pointer;
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           border: 2px solid rgba(255, 255, 255, 0.2);
//         }

//         .memory-card:hover {
//           transform: translateY(-3px);
//         }

//         .memory-card.revealed {
//           height: 280px;
//         }

//         .memory-card img {
//           width: 100%;
//           height: 280px;
//           object-fit: cover;
//           filter: blur(15px) brightness(0.65);
//           transform: scale(1.1);
//           transition: all 0.8s ease;
//         }

//         .memory-card.revealed img {
//           filter: blur(0) brightness(1);
//           transform: scale(1);
//         }

//         .memory-overlay {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: rgba(0, 0, 0, 0.4);
//           backdrop-filter: blur(5px);
//         }

//         .memory-text {
//           background: rgba(255, 255, 255, 0.98);
//           color: #3a1c71;
//           padding: 12px 24px;
//           border-radius: 30px;
//           font-size: 13px;
//           font-weight: 600;
//           box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
//         }

//         .closure-note {
//           font-size: 13px;
//           opacity: 0.75;
//           font-style: italic;
//           text-align: center;
//           padding-top: 15px;
//           border-top: 1px solid rgba(255, 255, 255, 0.2);
//           font-weight: 300;
//           letter-spacing: 0.3px;
//         }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .letter-card {
//             width: 95%;
//             min-height: 550px;
//           }
          
//           .letter-card.opened {
//             min-height: 600px;
//           }
          
//           .letter-content {
//             padding: 30px 25px;
//           }
          
//           .message-scroll-wrapper {
//             height: 200px;
//             padding: 25px 24px;
//           }
          
//           .closure-message {
//             font-size: 18px;
//           }
          
//           .envelope-icon {
//             font-size: 70px;
//           }
          
//           .receiver-name {
//             font-size: 32px;
//           }
//         }

//         @media (max-width: 480px) {
//           .main-container {
//             padding: 15px;
//           }
          
//           .letter-card {
//             min-height: 520px;
//           }
          
//           .letter-content {
//             padding: 25px 20px;
//           }
          
//           .message-scroll-wrapper {
//             height: 180px;
//             padding: 22px 20px;
//           }
          
//           .closure-message {
//             font-size: 17px;
//           }
          
//           .envelope-icon {
//             font-size: 65px;
//           }
          
//           .receiver-name {
//             font-size: 28px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }