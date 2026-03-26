// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function LoveMessage() {
//   const [message, setMessage] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const params = useSearchParams();
// const code = params.get("code");
    
//     const router = useRouter();

//   const styles = ["😍 Romantic", "🥰 Cute", "🔥 Passionate", "💌 Deep"];
//   const suggestions = [
//     "Every moment with you feels like my favorite memory.",
//     "You walked into my life and made everything brighter.",
//     "Loving you is the easiest and best decision of my life.",
//   ];
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push(`/love/login?code=${code}`);
//   }
// }, []);
//   const setStyle = (text) => {
//     setMessage("Style: " + text + "\n\n");
//   };

//   const fillText = (text) => {
//     setMessage(text);
//   };

// const sendMessage = async () => {
//   if (message.trim() === "") {
//     alert("Write your love message before sending 💕");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token"); // ✅ IMPORTANT

//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ SEND TOKEN
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: "Love",
//         receiverMobile: "1234567890",
//         senderName: localStorage.getItem("sender_name"),
//         senderMobile: localStorage.getItem("sender_mobile"),
//         messageText: message,
//         imageUrl: "",
//         videoUrl: "",
//         audioUrl: "",
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to send message");
//       return;
//     }

//     router.push(`/love/greet?code=${code}`);

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

//   const hearts = [
//     { className: "one", emoji: "❤️", style: { top: "10%", left: "15%" } },
//     { className: "two", emoji: "💕", style: { bottom: "20%", right: "10%" } },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#ff758c,#ff7eb3,#ffb199)",
//         minHeight: "100vh",
//         padding: "25px 20px 40px",
//         color: "white",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Floating Hearts */}
//       {hearts.map((h, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             fontSize: "30px",
//             opacity: 0.15,
//             animation: "float 10s infinite ease-in-out",
//             ...h.style,
//           }}
//         >
//           {h.emoji}
//         </div>
//       ))}

//       {/* Header */}
//       <div style={{ marginTop: "20px", marginBottom: "25px" }}>
//         <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Express Your Love 💖</h1>
//         <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
//           Make your feelings unforgettable and beautifully delivered.
//         </p>
//       </div>

//       {/* Styles */}
//       <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "20px" }}>
//         {styles.map((s, idx) => (
//           <div
//             key={idx}
//             onClick={() => setStyle(s)}
//             style={{
//               minWidth: "120px",
//               padding: "10px 15px",
//               borderRadius: "25px",
//               background: "rgba(255,255,255,0.25)",
//               fontSize: "13px",
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "0.3s",
//             }}
//           >
//             {s}
//           </div>
//         ))}
//       </div>

//       {/* Message Box */}
//       <textarea
//         placeholder="Write your love message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         style={{
//           width: "100%",
//           height: "130px",
//           padding: "15px",
//           borderRadius: "18px",
//           border: "none",
//           resize: "none",
//           outline: "none",
//           fontSize: "14px",
//           color: "#333",
//         }}
//       />

//       {/* Suggestions */}
//       <div style={{ marginTop: "20px" }}>
//         {suggestions.map((s, idx) => (
//           <div
//             key={idx}
//             onClick={() => fillText(s)}
//             style={{
//               background: "rgba(255,255,255,0.2)",
//               padding: "12px",
//               borderRadius: "18px",
//               fontSize: "13px",
//               marginBottom: "10px",
//               cursor: "pointer",
//               transition: "0.3s",
//             }}
//           >
//             {s}
//           </div>
//         ))}
//       </div>

//       {/* Premium Section */}
//       <div style={{ marginTop: "25px" }}>
//         <div style={{ fontSize: "14px", marginBottom: "10px", fontWeight: 600 }}>✨ Premium Add-ons</div>
//         {["🎙 Add Voice Note", "📷 Add Photo", "🎥 Add Video", "🎵 Add Background Music"].map((item, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               background: "rgba(255,255,255,0.25)",
//               padding: "12px",
//               borderRadius: "18px",
//               marginBottom: "10px",
//               fontSize: "13px",
//             }}
//           >
//             {item}
//             <span
//               style={{
//                 background: "gold",
//                 color: "#333",
//                 padding: "3px 8px",
//                 borderRadius: "12px",
//                 fontSize: "11px",
//                 fontWeight: 600,
//               }}
//             >
//               Premium
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Send Button */}
//       <button
//         onClick={sendMessage}
//         style={{
//           width: "100%",
//           marginTop: "30px",
//           padding: "16px",
//           border: "none",
//           borderRadius: "25px",
//           background: "white",
//           color: "#ff4f81",
//           fontWeight: 600,
//           fontSize: "15px",
//           cursor: "pointer",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//           transition: "0.3s",
//         }}
//       >
//         Send Love 💕
//       </button>

//       {/* Toast */}
//       {toastVisible && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "white",
//             color: "#ff4f81",
//             padding: "12px 22px",
//             borderRadius: "30px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           }}
//         >
//           💖 Your love message has been sent!
//         </div>
//       )}

//       {/* Keyframes */}
//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//           100% {
//             transform: translateY(0px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoveMessage() {
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
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
          receiverName: "Love",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

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

  return (
    <div className="body">
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

      <div className="page">
        <div style={{ marginTop: "20px", marginBottom: "25px" }}>
          <h1>Express Your Love 💖</h1>
          <p>
            Make your feelings unforgettable and beautifully delivered.
          </p>
        </div>

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
          className="message-box"
        />

        <div style={{ marginTop: "20px" }}>
          {suggestions.map((s, idx) => (
            <div key={idx} onClick={() => fillText(s)} className="suggestion">
              {s}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "25px" }}>
          <div className="premium-title">✨ Premium Add-ons</div>
          {["🎙 Add Voice Note", "📷 Add Photo", "🎥 Add Video", "🎵 Add Background Music"].map(
            (item, idx) => (
              <div key={idx} className="premium-item">
                <span>{item}</span>
                <span className="premium-badge">Premium</span>
              </div>
            )
          )}
        </div>

        <button onClick={sendMessage} className="send-btn">
          Send Love 💕
        </button>
      </div>

      {toastVisible && (
        <div className="toast">
          💖 Your love message has been sent!
        </div>
      )}

      <style jsx>{`
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
          background: linear-gradient(180deg, #ff758c, #ff7eb3, #ffb199);
          color: white;
          position: relative;
          overflow: hidden;
          padding: 20px 16px 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }

        .page {
          width: 100%;
          max-width: 560px;
          position: relative;
          z-index: 2;
        }

        .heart-float {
          position: absolute;
          pointer-events: none;
        }

        h1 {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          margin-top: 8px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .style-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 20px;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }

        .style-pill {
          min-width: 120px;
          padding: 10px 15px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .message-box {
          width: 100%;
          height: 130px;
          padding: 15px;
          border-radius: 18px;
          border: none;
          resize: none;
          outline: none;
          font-size: 14px;
          color: #333;
          box-sizing: border-box;
          background: white;
        }

        .suggestion {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 18px;
          font-size: 13px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .premium-title {
          font-size: 14px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .premium-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.25);
          padding: 12px;
          border-radius: 18px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .premium-badge {
          background: gold;
          color: #333;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .send-btn {
          width: 100%;
          margin-top: 30px;
          padding: 16px;
          border: none;
          border-radius: 25px;
          background: white;
          color: #ff4f81;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #ff4f81;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 16px 14px 28px;
          }

          h1 {
            font-size: 24px;
          }

          p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          h1 {
            font-size: 22px;
          }

          p {
            font-size: 12.5px;
          }

          .style-pill {
            min-width: 112px;
            font-size: 12px;
            padding: 9px 12px;
          }

          .message-box {
            height: 120px;
            font-size: 13px;
          }

          .suggestion,
          .premium-item {
            font-size: 12px;
            padding: 11px;
          }

          .send-btn {
            padding: 14px;
            font-size: 14px;
          }

          .heart-float {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}