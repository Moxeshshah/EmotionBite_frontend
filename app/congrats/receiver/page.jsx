// "use client";

// import { useState } from "react";

// export default function CongratsReceiver() {
//   const [opened, setOpened] = useState(false);
//   const [revealMedia, setRevealMedia] = useState(false);

//   // Demo data (replace with API)
//   const data = {
//     sender: "Someone who celebrates you",
//     message:
//       "Congratulations on your achievement! You worked hard for this and truly deserve every bit of success. Keep shining and reaching new heights! 🎉",
//     image:
//       "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80", // set null if no media
//   };

//   return (
//     <div className="container">
//       {/* Floating confetti */}
//       <div className="confetti" style={{ top: "10%", left: "15%" }} />
//       <div className="confetti pink" style={{ top: "60%", right: "10%" }} />
//       <div className="confetti blue" style={{ top: "30%", left: "70%" }} />
//       <div className="confetti green" style={{ bottom: "15%", right: "25%" }} />

//       {!opened ? (
//         /* Gift Closed Screen */
//         <div className="gift-card" onClick={() => setOpened(true)}>
//           <div className="gift">🎁</div>
//           <h2>A celebration for you</h2>
//           <p>Someone sent you a congratulatory message</p>
//           <div className="tap">Tap to open ✨</div>
//         </div>
//       ) : (
//         /* Opened Celebration Card */
//         <div className="celebration-card">
//           <div className="header">
//             <div className="emoji">🎉</div>
//             <div className="title">Congratulations!</div>
//             <div className="from">From {data.sender}</div>
//           </div>

//           {/* Message */}
//           <div className="message-card">
//             {data.message}
//           </div>

//           {/* Media Reveal */}
//           {data.image && (
//             <div className="media-section">
//               <div className="media-label">📸 A memory was shared</div>

//               <div
//                 className={`media-card ${revealMedia ? "show" : ""}`}
//                 onClick={() => setRevealMedia(true)}
//               >
//                 <img src={data.image} alt="celebration" />

//                 {!revealMedia && (
//                   <div className="overlay">Tap to reveal</div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="footer-note">
//             Keep shining and celebrating your journey ✨
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(180deg,#4a00e0,#8e2de2,#ff6a00);
//           font-family: 'Poppins', sans-serif;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 20px;
//         }

//         /* Confetti */
//         .confetti {
//           position: absolute;
//           width: 14px;
//           height: 14px;
//           border-radius: 50%;
//           background: #ffeb3b;
//           opacity: 0.6;
//           animation: float 8s infinite ease-in-out;
//         }

//         .confetti.pink { background: #ff4081; }
//         .confetti.blue { background: #00e5ff; }
//         .confetti.green { background: #69f0ae; }

//         @keyframes float {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-35px); }
//         }

//         /* Closed Gift */
//         .gift-card {
//           background: rgba(255,255,255,0.15);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 40px;
//           width: 360px;
//           text-align: center;
//           box-shadow: 0 30px 70px rgba(0,0,0,0.4);
//           cursor: pointer;
//           animation: fadeIn 0.6s ease;
//         }

//         .gift {
//           font-size: 70px;
//           margin-bottom: 10px;
//           animation: bounce 2s infinite;
//         }

//         .tap {
//           margin-top: 12px;
//           font-size: 13px;
//           opacity: 0.8;
//         }

//         @keyframes bounce {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         /* Celebration Card */
//         .celebration-card {
//           background: rgba(255,255,255,0.18);
//           backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 28px;
//           width: 380px;
//           box-shadow: 0 35px 80px rgba(0,0,0,0.4);
//           animation: fadeIn 0.5s ease;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 18px;
//         }

//         .emoji {
//           font-size: 40px;
//         }

//         .title {
//           font-size: 26px;
//           font-weight: 700;
//           margin-top: 5px;
//         }

//         .from {
//           font-size: 12px;
//           opacity: 0.8;
//         }

//         /* Message Card (Greeting style) */
//         .message-card {
//           background: white;
//           color: #333;
//           padding: 20px;
//           border-radius: 18px;
//           font-size: 15px;
//           line-height: 1.7;
//           box-shadow: 0 15px 35px rgba(0,0,0,0.15);
//           border-left: 5px solid #ff9800;
//         }

//         /* Media */
//         .media-section {
//           margin-top: 18px;
//         }

//         .media-label {
//           font-size: 12px;
//           opacity: 0.8;
//           margin-bottom: 6px;
//         }

//         .media-card {
//           height: 60px;
//           border-radius: 14px;
//           overflow: hidden;
//           cursor: pointer;
//           transition: 0.5s;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.3);
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
//           background: rgba(0,0,0,0.3);
//           font-size: 12px;
//         }

//         .footer-note {
//           margin-top: 18px;
//           font-size: 12px;
//           opacity: 0.8;
//           text-align: center;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CongratsReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealMedia, setRevealMedia] = useState(false);
  const [data, setData] = useState(null);

  const params = useSearchParams();
  const code = params.get("code");

  // Fetch message (same logic as approach)
useEffect(() => {
  if (!code) return;

  fetch(`/api/messages?code=${code}`)
    .then(res => res.json())
    .then(apiData => {
      setData({
        sender: apiData.senderName,
        message: apiData.messageText,
        image: apiData.imageUrl,
        video: apiData.videoUrl,
        audio: apiData.audioUrl,
      });
    })
    .catch(console.error);
}, [code]);

  // Loading state
  if (!data) {
    return <div style={{ padding: 40 }}>Loading celebration...</div>;
  }

  return (
    <div className="container">
      {/* Floating confetti */}
      <div className="confetti" style={{ top: "10%", left: "15%" }} />
      <div className="confetti pink" style={{ top: "60%", right: "10%" }} />
      <div className="confetti blue" style={{ top: "30%", left: "70%" }} />
      <div className="confetti green" style={{ bottom: "15%", right: "25%" }} />

      {!opened ? (
        /* Gift Closed Screen */
        <div className="gift-card" onClick={() => setOpened(true)}>
          <div className="gift">🎁</div>
          <h2>A celebration for you</h2>
          <p>{data.sender || "Someone special"} sent you a congratulatory message</p>
          <div className="tap">Tap to open ✨</div>
        </div>
      ) : (
        /* Opened Celebration Card */
        <div className="celebration-card">
          <div className="header">
            <div className="emoji">🎉</div>
            <div className="title">Congratulations!</div>
            <div className="from">From {data.sender}</div>
          </div>

          {/* Message */}
          <div className="message-card">
            {data.message}
          </div>

          {/* Media Reveal */}
          {data.image && (
            <div className="media-section">
              <div className="media-label">📸 A memory was shared</div>

              <div
                className={`media-card ${revealMedia ? "show" : ""}`}
                onClick={() => setRevealMedia(true)}
              >
                <img src={data.image} alt="celebration" />

                {!revealMedia && (
                  <div className="overlay">Tap to reveal</div>
                )}
              </div>
            </div>
          )}

          <div className="footer-note">
            Keep shining and celebrating your journey ✨
          </div>
        </div>
      )}

      {/* ---- DESIGN CSS (unchanged) ---- */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg,#4a00e0,#8e2de2,#ff6a00);
          font-family: 'Poppins', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .confetti {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffeb3b;
          opacity: 0.6;
          animation: float 8s infinite ease-in-out;
        }

        .confetti.pink { background: #ff4081; }
        .confetti.blue { background: #00e5ff; }
        .confetti.green { background: #69f0ae; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-35px); }
        }

        .gift-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 40px;
          width: 360px;
          text-align: center;
          box-shadow: 0 30px 70px rgba(0,0,0,0.4);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
        }

        .gift {
          font-size: 70px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        .tap {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.8;
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .celebration-card {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 28px;
          width: 380px;
          box-shadow: 0 35px 80px rgba(0,0,0,0.4);
          animation: fadeIn 0.5s ease;
        }

        .header {
          text-align: center;
          margin-bottom: 18px;
        }

        .emoji { font-size: 40px; }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-top: 5px;
        }

        .from {
          font-size: 12px;
          opacity: 0.8;
        }

        .message-card {
          background: white;
          color: #333;
          padding: 20px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.7;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          border-left: 5px solid #ff9800;
        }

        .media-section { margin-top: 18px; }
        .media-label { font-size: 12px; opacity: 0.8; margin-bottom: 6px; }

        .media-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.5s;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          position: relative;
        }

        .media-card.show { height: 220px; }

        .media-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .media-card.show img {
          filter: blur(0);
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.3);
          font-size: 12px;
        }

        .footer-note {
          margin-top: 18px;
          font-size: 12px;
          opacity: 0.8;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}