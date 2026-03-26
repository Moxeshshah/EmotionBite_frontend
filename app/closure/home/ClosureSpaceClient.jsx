
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ClosureSpace() {
//   const [message, setMessage] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code");


//   // Redirect if not logged
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push(`/closure/login?code=${code}`);
//   }
// }, []);

//   const fill = (text) => {
//     setMessage(text);
//   };

//   // ===== API INTEGRATION =====
// const sendMessage = async () => {
//   if (message.trim() === "") {
//     alert("Write your final words before sending 🌙");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token"); // ✅ IMPORTANT

//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ TOKEN
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: receiverName || "Receiver",
//         receiverMobile: "1234567890", // can make dynamic later
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

//     setToastVisible(true);

//     setTimeout(() => {
//       setToastVisible(false);
//       router.push(`/closure/greet?code=${code}`);
//     }, 1500);

//     setMessage("");
//   } catch (error) {
//     console.error(error);
//     alert("Server error");
//   }
// };

//   return (
//     <div
//       className="body"
//       style={{
//         background: "linear-gradient(180deg,#667eea,#764ba2,#6a11cb)",
//         minHeight: "100vh",
//         color: "white",
//         padding: "25px 20px 40px 20px",
//         position: "relative",
//         overflowX: "hidden",
//         fontFamily: "'Inter', sans-serif",
//       }}
//     >
//       {/* Floating Particles */}
//       <div
//         className="particle"
//         style={{ left: "20%", animation: "float 10s infinite linear", animationDelay: "0s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "40%", animation: "float 10s infinite linear", animationDelay: "3s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "65%", animation: "float 10s infinite linear", animationDelay: "5s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "80%", animation: "float 10s infinite linear", animationDelay: "2s" }}
//       />

//       {/* Header */}
//       <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//         <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", letterSpacing: "1px" }}>
//           Write Your Final Words 🌙
//         </h1>
//         <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.85, lineHeight: 1.6 }}>
//           Some messages are not about reopening doors — they are about gently closing them with peace.
//         </p>
//       </div>

//       {/* Recipient */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Their Name"
//           value={receiverName}
//           onChange={(e) => setReceiverName(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "14px",
//             borderRadius: "16px",
//             border: "none",
//             outline: "none",
//             background: "rgba(255,255,255,0.85)",
//             color: "#333",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       {/* Suggestions */}
//       <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "20px" }}>
//         {[
//           "I wish you peace and happiness.",
//           "Thank you for the memories.",
//           "This is my goodbye.",
//           "I’m letting go with gratitude.",
//         ].map((text, idx) => (
//           <div
//             key={idx}
//             onClick={() => fill(text)}
//             style={{
//               minWidth: "170px",
//               padding: "10px 15px",
//               borderRadius: "25px",
//               fontSize: "12px",
//               background: "rgba(255,255,255,0.2)",
//               whiteSpace: "nowrap",
//               cursor: "pointer",
//             }}
//           >
//             {text}
//           </div>
//         ))}
//       </div>

//       {/* Message Box */}
//       <textarea
//         placeholder="Write your closure message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         style={{
//           width: "100%",
//           height: "140px",
//           padding: "16px",
//           borderRadius: "18px",
//           border: "none",
//           resize: "none",
//           fontSize: "14px",
//           outline: "none",
//           background: "white",
//           color: "#333",
//         }}
//       />

//       {/* Premium Options */}
//       <div style={{ marginTop: "28px" }}>
//         <div style={{ fontSize: "13px", marginBottom: "12px", opacity: 0.9 }}>
//           Optional Reflection Additions
//         </div>

//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px" }}>
//           <div
//             style={{
//               background: "rgba(255,255,255,0.18)",
//               borderRadius: "18px",
//               padding: "16px",
//               textAlign: "center",
//               fontSize: "13px",
//               cursor: "pointer",
//             }}
//           >
//             🎙 Record Voice Reflection
//             <input type="file" accept="audio/*" style={{ display: "none" }} />
//           </div>

//           <div
//             style={{
//               background: "rgba(255,255,255,0.18)",
//               borderRadius: "18px",
//               padding: "16px",
//               textAlign: "center",
//               fontSize: "13px",
//               cursor: "pointer",
//             }}
//           >
//             📷 Attach a Memory
//             <input type="file" accept="image/*" style={{ display: "none" }} />
//           </div>
//         </div>
//       </div>

//       {/* Send Button */}
//       <button
//         onClick={sendMessage}
//         style={{
//           width: "100%",
//           marginTop: "30px",
//           padding: "16px",
//           border: "none",
//           borderRadius: "30px",
//           background: "linear-gradient(to right,#4e73df,#9b59b6)",
//           color: "white",
//           fontWeight: 500,
//           fontSize: "15px",
//           cursor: "pointer",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         Send & Release 🕊
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
//             color: "#6a11cb",
//             padding: "12px 22px",
//             borderRadius: "30px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
//           }}
//         >
//           🌙 Your message has been released peacefully.
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(100vh); opacity: 0; }
//           30% { opacity: 0.6; }
//           100% { transform: translateY(-10vh); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClosureSpace() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/closure/login?code=${code}`);
    }
  }, [router, code]);

  const fill = (text) => {
    setMessage(text);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Write your final words before sending 🌙");
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
          receiverName: receiverName || "Receiver",
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

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/closure/greet?code=${code}`);
      }, 1500);

      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="body">
      <div className="particle" style={{ left: "20%", animationDelay: "0s" }} />
      <div className="particle" style={{ left: "40%", animationDelay: "3s" }} />
      <div className="particle" style={{ left: "65%", animationDelay: "5s" }} />
      <div className="particle" style={{ left: "80%", animationDelay: "2s" }} />

      <div className="page-wrap">
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", letterSpacing: "1px" }}>
            Write Your Final Words 🌙
          </h1>
          <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.85, lineHeight: 1.6 }}>
            Some messages are not about reopening doors — they are about gently closing them with peace.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Their Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.85)",
              color: "#333",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div className="suggestion-row">
          {[
            "I wish you peace and happiness.",
            "Thank you for the memories.",
            "This is my goodbye.",
            "I’m letting go with gratitude.",
          ].map((text, idx) => (
            <div
              key={idx}
              onClick={() => fill(text)}
              className="suggestion-pill"
            >
              {text}
            </div>
          ))}
        </div>

        <textarea
          placeholder="Write your closure message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: "140px",
            padding: "16px",
            borderRadius: "18px",
            border: "none",
            resize: "none",
            fontSize: "14px",
            outline: "none",
            background: "white",
            color: "#333",
            boxSizing: "border-box",
          }}
        />

        <div style={{ marginTop: "28px" }}>
          <div style={{ fontSize: "13px", marginBottom: "12px", opacity: 0.9 }}>
            Optional Reflection Additions
          </div>

          <div className="option-grid">
            <div className="option-card">
              🎙 Record Voice Reflection
              <input type="file" accept="audio/*" style={{ display: "none" }} />
            </div>

            <div className="option-card">
              📷 Attach a Memory
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </div>
          </div>
        </div>

        <button
          onClick={sendMessage}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "16px",
            border: "none",
            borderRadius: "30px",
            background: "linear-gradient(to right,#4e73df,#9b59b6)",
            color: "white",
            fontWeight: 500,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          Send & Release 🕊
        </button>
      </div>

      {toastVisible && (
        <div className="toast">
          🌙 Your message has been released peacefully.
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

        .body {
          min-height: 100vh;
          width: 100vw;
          color: white;
          padding: 25px 20px 40px 20px;
          position: relative;
          overflow-x: hidden;
          font-family: "Inter", sans-serif;
          background: linear-gradient(180deg, #667eea, #764ba2, #6a11cb);
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .page-wrap {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: float 10s infinite linear;
          pointer-events: none;
        }

        .suggestion-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 20px;
          padding-bottom: 5px;
          -webkit-overflow-scrolling: touch;
        }

        .suggestion-pill {
          min-width: 170px;
          padding: 10px 15px;
          border-radius: 25px;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.2);
          white-space: nowrap;
          cursor: pointer;
          flex-shrink: 0;
        }

        .option-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .option-card {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 18px;
          padding: 16px;
          text-align: center;
          font-size: 13px;
          cursor: pointer;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #6a11cb;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px 30px 14px;
          }

          .page-wrap {
            max-width: 100%;
          }

          .option-grid {
            grid-template-columns: 1fr;
          }

          .suggestion-pill {
            min-width: 160px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px 24px 12px;
          }

          h1 {
            font-size: 24px !important;
          }

          .suggestion-pill {
            min-width: 150px;
            padding: 9px 12px;
            font-size: 11.5px;
          }

          textarea {
            height: 130px !important;
          }

          .option-card {
            padding: 14px;
            font-size: 12px;
          }

          .particle {
            width: 5px;
            height: 5px;
          }
        }
      `}</style>
    </div>
  );
}