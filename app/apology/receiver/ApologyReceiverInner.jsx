// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// export default function ApologyReceiver() {
//   const [opened, setOpened] = useState(false);
//   const [revealImage, setRevealImage] = useState(false);
//   const [response, setResponse] = useState(null);
// const params = useSearchParams();
// const code = params.get("code");
// const [data, setData] = useState(null);

// useEffect(() => {
//   if (!code) return;

//   fetch(`/api/messages?code=${code}`)
//     .then(res => res.json())
//     .then(apiData => {
//       console.log("API DATA:", apiData); // debug

//       setData({
//         sender: apiData.senderName,
//         receiver: apiData.receiverName,
//         message: apiData.messageText,
//         image: apiData.image_url,
//         video: apiData.video_url,
//         audio: apiData.audio_url
//       });
//     })
//     .catch(err => {
//       console.error("Fetch error:", err);
//     });
// }, [code]);
// if (!data) return <div style={{padding:40}}>Loading...</div>;
//   // Demo data (replace with API)

//   return (
//     <div className="container">
//       {/* Floating calm elements */}
//       <div className="float f1">🕊</div>
//       <div className="float f2">✨</div>
//       <div className="float f3">🌧</div>

//       {!opened ? (
//         /* Closed State */
//         <div className="closed-card" onClick={() => setOpened(true)}>
//           <div className="emoji">💌</div>
//           <h2>A message for you</h2>
//           <p>Someone wants to say something important</p>
//           <div className="hint">Tap to open</div>
//         </div>
//       ) : (
//         /* Opened State */
//         <div className="letter-card">
//           <div className="title">A Message From The Heart</div>

//           {/* Letter */}
//           <div className="paper">
//             <p className="text">“{data.message}”</p>
//             <div className="from">— {data.sender}</div>
//           </div>

//           {/* Memory reveal */}
//           {data.image && (
//             <div className="memory-section">
//               <div className="memory-label">A memory was shared</div>

//               <div
//                 className={`memory-card ${
//                   revealImage ? "show" : ""
//                 }`}
//                 onClick={() => setRevealImage(true)}
//               >
//                 <img src={data.image} alt="memory" />
//                 {!revealImage && (
//                   <div className="overlay">Tap to reveal</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Response */}
//           {!response && (
//             <div className="actions">
//               <button
//                 className="forgive"
//                 onClick={() => setResponse("forgive")}
//               >
//                 I Forgive 🤍
//               </button>

//               <button
//                 className="time"
//                 onClick={() => setResponse("time")}
//               >
//                 I Need Time
//               </button>
//             </div>
//           )}

//           {response === "forgive" && (
//             <div className="result success">
//               Healing begins. Thank you for your kindness.
//             </div>
//           )}

//           {response === "time" && (
//             <div className="result">
//               Take your time. Some wounds need space.
//             </div>
//           )}
//         </div>
//       )}

//       <style jsx>{`
//         .container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(180deg,#3a1c71,#d76d77,#ffaf7b);
//           font-family: 'Inter', sans-serif;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 20px;
//         }

//         /* Floating calm elements */
//         .float {
//           position: absolute;
//           font-size: 30px;
//           opacity: 0.12;
//           animation: float 10s infinite ease-in-out;
//         }

//         .f1 { top: 15%; left: 10%; }
//         .f2 { top: 30%; right: 20%; }
//         .f3 { bottom: 20%; left: 25%; }

//         @keyframes float {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }

//         /* Closed card */
//         .closed-card {
//           background: rgba(255,255,255,0.12);
//           backdrop-filter: blur(20px);
//           border-radius: 26px;
//           padding: 40px;
//           width: 360px;
//           text-align: center;
//           box-shadow: 0 30px 70px rgba(0,0,0,0.35);
//           cursor: pointer;
//           animation: fadeIn 0.5s ease;
//         }

//         .emoji {
//           font-size: 64px;
//           margin-bottom: 10px;
//           animation: bounce 2s infinite;
//         }

//         .hint {
//           margin-top: 10px;
//           font-size: 13px;
//           opacity: 0.8;
//         }

//         @keyframes bounce {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }

//         /* Letter card */
//         .letter-card {
//           background: rgba(255,255,255,0.15);
//           backdrop-filter: blur(20px);
//           border-radius: 26px;
//           padding: 28px;
//           width: 380px;
//           box-shadow: 0 40px 90px rgba(0,0,0,0.4);
//           animation: fadeIn 0.5s ease;
//         }

//         .title {
//           font-family: 'Playfair Display', serif;
//           font-size: 24px;
//           text-align: center;
//           margin-bottom: 14px;
//         }

//         /* Paper */
//         .paper {
//           background: linear-gradient(180deg,#ffffff,#f8f8f8);
//           color: #444;
//           padding: 26px;
//           border-radius: 18px;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.25);
//         }

//         .text {
//           font-family: 'Playfair Display', serif;
//           font-size: 17px;
//           line-height: 1.9;
//           font-style: italic;
//         }

//         .from {
//           margin-top: 14px;
//           font-size: 14px;
//           opacity: 0.7;
//         }

//         /* Memory */
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
//         }

//         .memory-card.show {
//           height: 220px;
//         }

//         .memory-card img {
//           width: 100%;
//           height: 220px;
//           object-fit: cover;
//           filter: blur(12px);
//           transition: 0.6s;
//         }

//         .memory-card.show img {
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

//         /* Actions */
//         .actions {
//           margin-top: 20px;
//           display: flex;
//           gap: 10px;
//         }

//         .actions button {
//           flex: 1;
//           padding: 12px;
//           border-radius: 20px;
//           border: none;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .forgive {
//           background: #ffffff;
//           color: #3a1c71;
//         }

//         .time {
//           background: rgba(255,255,255,0.4);
//           color: #333;
//         }

//         .result {
//           margin-top: 18px;
//           text-align: center;
//           font-size: 14px;
//         }

//         .success {
//           font-weight: 600;
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

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApologyReceiver() {
  const [opened, setOpened] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [response, setResponse] = useState(null);
  const params = useSearchParams();
  const code = params.get("code");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/messages?code=${code}`)
      .then((res) => res.json())
      .then((apiData) => {
        console.log("API DATA:", apiData);

        setData({
          sender: apiData.senderName,
          receiver: apiData.receiverName,
          message: apiData.messageText,
          image: apiData.image_url,
          video: apiData.video_url,
          audio: apiData.audio_url,
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [code]);

  if (!data) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div className="container">
      <div className="float f1">🕊</div>
      <div className="float f2">✨</div>
      <div className="float f3">🌧</div>

      {!opened ? (
        <div className="closed-card" onClick={() => setOpened(true)}>
          <div className="emoji">💌</div>
          <h2>A message for you</h2>
          <p>Someone wants to say something important</p>
          <div className="hint">Tap to open</div>
        </div>
      ) : (
        <div className="letter-card">
          <div className="title">A Message From The Heart</div>

          <div className="paper">
            <p className="text">“{data.message}”</p>
            <div className="from">— {data.sender}</div>
          </div>

          {data.image && (
            <div className="memory-section">
              <div className="memory-label">A memory was shared</div>

              <div
                className={`memory-card ${revealImage ? "show" : ""}`}
                onClick={() => setRevealImage(true)}
              >
                <img src={data.image} alt="memory" />
                {!revealImage && <div className="overlay">Tap to reveal</div>}
              </div>
            </div>
          )}

          {!response && (
            <div className="actions">
              <button className="forgive" onClick={() => setResponse("forgive")}>
                I Forgive 🤍
              </button>

              <button className="time" onClick={() => setResponse("time")}>
                I Need Time
              </button>
            </div>
          )}

          {response === "forgive" && (
            <div className="result success">
              Healing begins. Thank you for your kindness.
            </div>
          )}

          {response === "time" && (
            <div className="result">
              Take your time. Some wounds need space.
            </div>
          )}
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
          background: linear-gradient(180deg, #3a1c71, #d76d77, #ffaf7b);
          font-family: "Inter", sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
        }

        .float {
          position: absolute;
          font-size: 30px;
          opacity: 0.12;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .f1 {
          top: 15%;
          left: 10%;
        }

        .f2 {
          top: 30%;
          right: 20%;
        }

        .f3 {
          bottom: 20%;
          left: 25%;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .closed-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          border-radius: 26px;
          padding: 40px;
          width: min(360px, 100%);
          text-align: center;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          animation: fadeIn 0.5s ease;
          z-index: 2;
        }

        .emoji {
          font-size: 64px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }

        .hint {
          margin-top: 10px;
          font-size: 13px;
          opacity: 0.8;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .letter-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 26px;
          padding: 28px;
          width: min(380px, 100%);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.5s ease;
          z-index: 2;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: 24px;
          text-align: center;
          margin-bottom: 14px;
        }

        .paper {
          background: linear-gradient(180deg, #ffffff, #f8f8f8);
          color: #444;
          padding: 26px;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }

        .text {
          font-family: "Playfair Display", serif;
          font-size: 17px;
          line-height: 1.9;
          font-style: italic;
        }

        .from {
          margin-top: 14px;
          font-size: 14px;
          opacity: 0.7;
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
        }

        .memory-card.show {
          height: 220px;
        }

        .memory-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          filter: blur(12px);
          transition: 0.6s;
        }

        .memory-card.show img {
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

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .actions button {
          flex: 1;
          padding: 12px;
          border-radius: 20px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .forgive {
          background: #ffffff;
          color: #3a1c71;
        }

        .time {
          background: rgba(255, 255, 255, 0.4);
          color: #333;
        }

        .result {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }

        .success {
          font-weight: 600;
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

          .closed-card {
            padding: 32px 24px;
            width: 100%;
          }

          .letter-card {
            padding: 22px;
            width: 100%;
          }

          .title {
            font-size: 22px;
          }

          .paper {
            padding: 22px;
          }

          .text {
            font-size: 16px;
            line-height: 1.8;
          }

          .actions {
            flex-direction: column;
          }

          .float {
            font-size: 26px;
            opacity: 0.1;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 12px;
          }

          .closed-card {
            padding: 28px 18px;
            border-radius: 22px;
          }

          .letter-card {
            padding: 18px;
            border-radius: 22px;
          }

          .emoji {
            font-size: 54px;
          }

          .closed-card h2 {
            font-size: 20px;
          }

          .closed-card p {
            font-size: 13px;
          }

          .title {
            font-size: 20px;
          }

          .paper {
            padding: 18px;
            border-radius: 16px;
          }

          .text {
            font-size: 15px;
          }

          .memory-card.show {
            height: 190px;
          }

          .memory-card img {
            height: 190px;
          }

          .actions button {
            padding: 11px;
            font-size: 13px;
          }

          .float {
            font-size: 22px;
          }

          .f1 {
            top: 8%;
            left: 4%;
          }

          .f2 {
            top: 20%;
            right: 8%;
          }

          .f3 {
            bottom: 10%;
            left: 8%;
          }
        }
      `}</style>
    </div>
  );
}