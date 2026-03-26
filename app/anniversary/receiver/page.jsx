
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// export default function AnniversaryReceiver() {
//   const [opened, setOpened] = useState(false);
//   const [revealImage, setRevealImage] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   const params = useSearchParams();
//   const code = params.get("code");

//   // Fetch message
// useEffect(() => {
//   if (!code) {
//     setError("Message code not found");
//     return;
//   }

//   fetch(`/api/messages?code=${code}`)
//     .then(res => res.json())
//     .then(apiData => {
//       console.log("API DATA:", apiData); // debug

//       if (!apiData) {
//         setError("No message found");
//         return;
//       }

//       setData({
//         sender: apiData.senderName || "Your Partner",
//         message: apiData.messageText,
//         image: apiData.image_url,
//         song: apiData.song || null,
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       setError("Server error");
//     });
// }, [code]);

//   // Loading state
//   if (!data && !error) {
//     return (
//       <div style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#ff9a9e",
//         color: "white",
//         fontSize: "18px"
//       }}>
//         Loading your memory...
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div style={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#ff9a9e",
//         color: "white",
//         fontSize: "18px"
//       }}>
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       {/* Floating hearts */}
//       <div className="heart h1">💖</div>
//       <div className="heart h2">💕</div>
//       <div className="heart h3">💞</div>

//       {!opened ? (
//         /* Closed Invitation */
//         <div className="invite-card" onClick={() => setOpened(true)}>
//           <div className="emoji">📖</div>
//           <h2>A memory from your journey</h2>
//           <p>{data.sender} shared a special anniversary message with you</p>
//           <div className="hint">Tap to open ✨</div>
//         </div>
//       ) : (
//         /* Opened View */
//         <div className="memory-card">
//           <div className="title">Our Beautiful Story</div>

//           {/* Message */}
//           <div className="note">
//             <p className="text">“{data.message}”</p>
//             <div className="from">— {data.sender}</div>
//           </div>

//           {/* Image */}
//           {data.image && (
//             <div className="photo-section">
//               <div className="label">A memory was shared</div>

//               <div
//                 className={`photo-card ${revealImage ? "show" : ""}`}
//                 onClick={() => setRevealImage(true)}
//               >
//                 <img src={data.image} alt="memory" />
//                 {!revealImage && (
//                   <div className="overlay">Tap to reveal</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Song (optional) */}
//           {data.song && (
//             <div className="song">
//               🎵 Dedicated Song
//               <div className="song-name">{data.song}</div>
//             </div>
//           )}

//           <button className="reply-btn">
//             Send Love Back 💌
//           </button>
//         </div>
//       )}

//       {/* DESIGN — unchanged */}
// <style jsx>{`
//   * {
//     box-sizing: border-box;
//   }

//   .container {
//     min-height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb);
//     font-family: 'Poppins', sans-serif;
//     color: white;
//     position: relative;
//     overflow: hidden;
//     padding: 20px;

//     /* 🔥 IMPORTANT */
//     text-align: center;
//   }

//   /* Floating hearts */
//   .heart {
//     position: absolute;
//     font-size: 24px;
//     opacity: 0.15;
//     animation: float 10s infinite ease-in-out;
//   }

//   .h1 { top: 15%; left: 10%; }
//   .h2 { bottom: 20%; right: 12%; }
//   .h3 { top: 35%; right: 25%; }

//   @keyframes float {
//     0%,100% { transform: translateY(0); }
//     50% { transform: translateY(-25px); }
//   }

//   /* 🔥 CARD FIX */
//   .invite-card,
//   .memory-card {
//     width: 100%;
//     max-width: 380px; /* instead of fixed */
//     margin: auto;
//   }

//   .invite-card {
//     background: rgba(255,255,255,0.2);
//     backdrop-filter: blur(20px);
//     border-radius: 28px;
//     padding: 40px 30px;
//     box-shadow: 0 30px 70px rgba(0,0,0,0.3);
//     cursor: pointer;
//     animation: fadeIn 0.6s ease;
//   }

//   .emoji {
//     font-size: 60px;
//     margin-bottom: 10px;
//     animation: pulse 2s infinite;
//   }

//   .hint {
//     margin-top: 12px;
//     font-size: 13px;
//     opacity: 0.8;
//   }

//   @keyframes pulse {
//     0%,100% { transform: scale(1); }
//     50% { transform: scale(1.08); }
//   }

//   .memory-card {
//     background: rgba(255,255,255,0.18);
//     backdrop-filter: blur(20px);
//     border-radius: 28px;
//     padding: 25px;
//     box-shadow: 0 40px 90px rgba(0,0,0,0.35);
//     animation: fadeIn 0.5s ease;
//   }

//   .title {
//     font-family: 'Playfair Display', serif;
//     font-size: 24px;
//     margin-bottom: 14px;
//   }

//   .note {
//     background: linear-gradient(180deg,#ffffff,#fff5f7);
//     color: #444;
//     padding: 20px;
//     border-radius: 18px;
//     box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//   }

//   .text {
//     font-family: 'Playfair Display', serif;
//     font-size: 16px;
//     line-height: 1.8;
//   }

//   .from {
//     margin-top: 10px;
//     font-size: 13px;
//     opacity: 0.7;
//   }

//   .photo-section { margin-top: 16px; }
//   .label { font-size: 12px; opacity: 0.8; margin-bottom: 6px; }

//   .photo-card {
//     height: 60px;
//     border-radius: 14px;
//     overflow: hidden;
//     cursor: pointer;
//     position: relative;
//     transition: 0.5s;
//   }

//   .photo-card.show { height: 220px; }

//   .photo-card img {
//     width: 100%;
//     height: 220px;
//     object-fit: cover;
//     filter: blur(12px);
//     transition: 0.6s;
//   }

//   .photo-card.show img {
//     filter: blur(0);
//     transform: scale(1.05);
//   }

//   .overlay {
//     position: absolute;
//     inset: 0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: rgba(0,0,0,0.3);
//     font-size: 12px;
//   }

//   .song {
//     margin-top: 18px;
//     background: rgba(255,255,255,0.25);
//     padding: 12px;
//     border-radius: 16px;
//     font-size: 13px;
//   }

//   .song-name {
//     margin-top: 4px;
//     font-weight: 600;
//   }

//   .reply-btn {
//     margin-top: 20px;
//     width: 100%;
//     padding: 14px;
//     border-radius: 25px;
//     border: none;
//     background: linear-gradient(90deg,#ff758c,#ff7eb3);
//     color: white;
//     font-weight: 600;
//     cursor: pointer;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.3);
//   }

//   .reply-btn:hover {
//     transform: translateY(-2px);
//   }

//   /* 🔥 MOBILE IMPROVEMENTS */
//   @media (max-width: 480px) {
//     .invite-card {
//       padding: 28px 20px;
//     }

//     .memory-card {
//       padding: 20px 16px;
//     }

//     .emoji {
//       font-size: 50px;
//     }

//     .title {
//       font-size: 20px;
//     }

//     .text {
//       font-size: 14px;
//     }

//     .photo-card.show {
//       height: 180px;
//     }

//     .photo-card img {
//       height: 180px;
//     }
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
// `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
          image: apiData.image_url || apiData.imageUrl,
          song: apiData.song || null,
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Server error");
      });
  }, [code]);

  if (!data && !error) {
    return (
      <div className="state-screen">Loading your memory...</div>
    );
  }

  if (error) {
    return (
      <div className="state-screen">{error}</div>
    );
  }

  return (
    <div className="container">
      <div className="heart h1">💖</div>
      <div className="heart h2">💕</div>
      <div className="heart h3">💞</div>

      {!opened ? (
        <div className="invite-card" onClick={() => setOpened(true)}>
          <div className="emoji">📖</div>
          <h2>A memory from your journey</h2>
          <p>{data.sender} shared a special anniversary message with you</p>
          <div className="hint">Tap to open ✨</div>
        </div>
      ) : (
        <div className="memory-card">
          <div className="title">Our Beautiful Story</div>

          <div className="note">
            <p className="text">“{data.message}”</p>
            <div className="from">— {data.sender}</div>
          </div>

          {data.image && (
            <div className="photo-section">
              <div className="label">A memory was shared</div>

              <div
                className={`photo-card ${revealImage ? "show" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="memory" />
                {!revealImage && <div className="overlay">Tap to reveal</div>}
              </div>
            </div>
          )}

          {data.song && (
            <div className="song">
              🎵 Dedicated Song
              <div className="song-name">{data.song}</div>
            </div>
          )}

          <button className="reply-btn">Send Love Back 💌</button>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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
          background: linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb);
          color: white;
          font-size: 18px;
          padding: 20px;
          text-align: center;
        }

        .container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb);
          font-family: "Poppins", sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
          text-align: center;
          box-sizing: border-box;
        }

        .heart {
          position: absolute;
          font-size: 24px;
          opacity: 0.15;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .h1 {
          top: 15%;
          left: 10%;
        }

        .h2 {
          bottom: 20%;
          right: 12%;
        }

        .h3 {
          top: 35%;
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

        .invite-card,
        .memory-card {
          width: 100%;
          max-width: 380px;
          margin: auto;
          z-index: 2;
          position: relative;
        }

        .invite-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 40px 30px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          animation: fadeIn 0.6s ease;
        }

        .emoji {
          font-size: 60px;
          margin-bottom: 10px;
          animation: pulse 2s infinite;
        }

        .hint {
          margin-top: 12px;
          font-size: 13px;
          opacity: 0.8;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .memory-card {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 25px;
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.35);
          animation: fadeIn 0.5s ease;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: 24px;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .note {
          background: linear-gradient(180deg, #ffffff, #fff5f7);
          color: #444;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          text-align: left;
        }

        .text {
          font-family: "Playfair Display", serif;
          font-size: 16px;
          line-height: 1.8;
          word-break: break-word;
        }

        .from {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.7;
        }

        .photo-section {
          margin-top: 16px;
          text-align: left;
        }

        .label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .photo-card {
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: 0.5s;
        }

        .photo-card.show {
          height: 220px;
        }

        .photo-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .photo-card.show img {
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

        .song {
          margin-top: 18px;
          background: rgba(255, 255, 255, 0.25);
          padding: 12px;
          border-radius: 16px;
          font-size: 13px;
        }

        .song-name {
          margin-top: 4px;
          font-weight: 600;
        }

        .reply-btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border-radius: 25px;
          border: none;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: white;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
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

        @media (max-width: 480px) {
          .container {
            padding: 12px;
          }

          .invite-card {
            padding: 28px 20px;
            border-radius: 22px;
          }

          .memory-card {
            padding: 20px 16px;
            border-radius: 22px;
          }

          .emoji {
            font-size: 50px;
          }

          .title {
            font-size: 20px;
          }

          .text {
            font-size: 14px;
          }

          .photo-card.show {
            height: 180px;
          }

          .photo-card img {
            height: 180px;
          }

          .reply-btn {
            padding: 12px;
            font-size: 13px;
          }

          .heart {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}