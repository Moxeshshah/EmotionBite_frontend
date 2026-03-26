// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function LoveSpace() {
//   const [message, setMessage] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const router = useRouter();
//   const [receiverName, setReceiverName] = useState("");
// const params = useSearchParams();
// const code = params.get("code");
//   const suggestions = [
//     "You mean the world to me 🌍",
//     "I fall for you every day 💘",
//     "My heart belongs to you ❤️",
//     "You are my forever ✨",
//   ];

//   const fill = (text) => {
//     setMessage(text);
//   };
// useEffect(() => {
//   if (!code) return;

//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.replace(`/love/login?code=${code}`);
//   }
// }, [code]);
// const sendMessage = async () => {
//     if (message.trim() === "") {
//       alert("Please write a message 💕");
//       return;
//     }

//     if (receiverName.trim() === "") {
//       alert("Enter receiver name");
//       return;
//     }

//     try {
//     const res = await fetch("/api/messages/save", {
//           method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ if using token
//         },
//         body: JSON.stringify({
//           qrCode: code,
//           receiverName: receiverName,
//           receiverMobile: "1234567890", // keep dummy or dynamic
//           senderName: localStorage.getItem("sender_name"),
//           senderMobile: localStorage.getItem("sender_mobile"),
//           messageText: message,
//           imageUrl: "",
//           videoUrl: "",
//           audioUrl: "",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to send message");
//         return;
//       }

//       // ✅ Show toast
//       setToastVisible(true);

//       // ✅ Smooth UX delay
//       setTimeout(() => {
//         setToastVisible(false);
//         router.push(`/love/greet?code=${code}`);
//       }, 1500);

//       setMessage("");
//       setReceiverName("");

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "'Inter', sans-serif",
//         background: "linear-gradient(180deg,#3b0d2e,#7b1e5c,#ff758f)",
//         minHeight: "100vh",
//         color: "#fff",
//         padding: "20px 18px 40px 18px",
//       }}
//     >
//       {/* Header */}
//       <div className="header" style={{ marginTop: "20px", marginBottom: "30px" }}>
//         <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", lineHeight: 1.3 }}>
//           Send a Romantic Love Message 💖
//         </h1>
//         <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.85 }}>
//           Let your heart speak what words sometimes hide.
//         </p>
//       </div>

//       {/* Recipient Input */}
//       <div className="recipient" style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Your Loved One's Name 💕"
//   value={receiverName}
//   onChange={(e) => setReceiverName(e.target.value)}

//           style={{
//             width: "100%",
//             padding: "14px",
//             borderRadius: "14px",
//             border: "none",
//             outline: "none",
//             fontSize: "14px",
//             background: "#fff",
//             color: "#333",
//           }}
//         />
//       </div>

//       {/* Suggestions */}
//       <div
//         className="suggestion-container"
//         style={{ margin: "15px 0 25px 0", overflowX: "auto", display: "flex", gap: "10px", paddingBottom: "5px" }}
//       >
//         {suggestions.map((sugg, idx) => (
//           <div
//             key={idx}
//             onClick={() => fill(sugg)}
//             style={{
//               minWidth: "160px",
//               padding: "10px 14px",
//               borderRadius: "20px",
//               fontSize: "12px",
//               background: "rgba(255,255,255,0.15)",
//               cursor: "pointer",
//               transition: "0.3s",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {sugg}
//           </div>
//         ))}
//       </div>

//       {/* Message Box */}
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Write your love message here..."
//         style={{
//           width: "100%",
//           height: "130px",
//           padding: "15px",
//           borderRadius: "18px",
//           border: "none",
//           outline: "none",
//           resize: "none",
//           fontSize: "14px",
//           background: "#fff",
//           color: "#333",
//         }}
//       />

//       {/* Premium Section */}
//       <div className="premium-section" style={{ marginTop: "30px" }}>
//         <div className="premium-title" style={{ fontSize: "14px", marginBottom: "15px", opacity: 0.9 }}>
//           ✨ Add Something Magical
//         </div>

//         <div
//           className="premium-grid"
//           style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}
//         >
//           {[
//             { icon: "🎙", label: "Voice Note", accept: "audio/*" },
//             { icon: "🖼", label: "Photo", accept: "image/*" },
//             { icon: "🎥", label: "Video", accept: "video/*" },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="premium-card"
//               style={{
//                 background: "rgba(255,255,255,0.12)",
//                 borderRadius: "16px",
//                 padding: "14px 8px",
//                 textAlign: "center",
//                 fontSize: "12px",
//                 cursor: "pointer",
//                 transition: "0.3s",
//               }}
//             >
//               {item.icon}
//               <br />
//               {item.label}
//               <input type="file" accept={item.accept} style={{ display: "none" }} />
//             </div>
//           ))}
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
//           fontSize: "15px",
//           fontWeight: 600,
//           background: "#ffffff",
//           color: "#7b1e5c",
//           cursor: "pointer",
//           transition: "0.3s",
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe0ec")}
//         onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
//       >
//         Send With Love 💌
//       </button>

//       {/* Toast */}
//       {toastVisible && (
//         <div
//           className="toast"
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#fff",
//             color: "#7b1e5c",
//             padding: "12px 20px",
//             borderRadius: "25px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           }}
//         >
//           💖 Your love message has been sent.
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useRouter, useSearchParams, useEffect } from "react";
import { useRouter as useNextRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import { useEffect as useReactEffect } from "react";

export default function LoveSpace() {
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const router = useNextRouter();
  const [receiverName, setReceiverName] = useState("");
  const params = useNextSearchParams();
  const code = params.get("code");

  const suggestions = [
    "You mean the world to me 🌍",
    "I fall for you every day 💘",
    "My heart belongs to you ❤️",
    "You are my forever ✨",
  ];

  const fill = (text) => {
    setMessage(text);
  };

  useReactEffect(() => {
    if (!code) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(`/love/login?code=${code}`);
    }
  }, [code, router]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Please write a message 💕");
      return;
    }

    if (receiverName.trim() === "") {
      alert("Enter receiver name");
      return;
    }

    try {
      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName,
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
        router.push(`/love/greet?code=${code}`);
      }, 1500);

      setMessage("");
      setReceiverName("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="body">
      <div className="page-wrap">
        <div className="header" style={{ marginTop: "20px", marginBottom: "30px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", lineHeight: 1.3 }}>
            Send a Romantic Love Message 💖
          </h1>
          <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.85 }}>
            Let your heart speak what words sometimes hide.
          </p>
        </div>

        <div className="recipient" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Your Loved One's Name 💕"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              outline: "none",
              fontSize: "14px",
              background: "#fff",
              color: "#333",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          className="suggestion-container"
          style={{
            margin: "15px 0 25px 0",
            overflowX: "auto",
            display: "flex",
            gap: "10px",
            paddingBottom: "5px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {suggestions.map((sugg, idx) => (
            <div
              key={idx}
              onClick={() => fill(sugg)}
              style={{
                minWidth: "160px",
                padding: "10px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                background: "rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "0.3s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {sugg}
            </div>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your love message here..."
          style={{
            width: "100%",
            height: "130px",
            padding: "15px",
            borderRadius: "18px",
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: "14px",
            background: "#fff",
            color: "#333",
            boxSizing: "border-box",
          }}
        />

        <div className="premium-section" style={{ marginTop: "30px" }}>
          <div className="premium-title" style={{ fontSize: "14px", marginBottom: "15px", opacity: 0.9 }}>
            ✨ Add Something Magical
          </div>

          <div className="premium-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
            {[
              { icon: "🎙", label: "Voice Note", accept: "audio/*" },
              { icon: "🖼", label: "Photo", accept: "image/*" },
              { icon: "🎥", label: "Video", accept: "video/*" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="premium-card"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "14px 8px",
                  textAlign: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                {item.icon}
                <br />
                {item.label}
                <input type="file" accept={item.accept} style={{ display: "none" }} />
              </div>
            ))}
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
            fontSize: "15px",
            fontWeight: 600,
            background: "#ffffff",
            color: "#7b1e5c",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe0ec")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Send With Love 💌
        </button>

        {toastVisible && (
          <div
            className="toast"
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              color: "#7b1e5c",
              padding: "12px 20px",
              borderRadius: "25px",
              fontSize: "13px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              maxWidth: "calc(100vw - 32px)",
              textAlign: "center",
              zIndex: 50,
            }}
          >
            💖 Your love message has been sent.
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

        .body {
          min-height: 100vh;
          width: 100vw;
          font-family: "Inter", sans-serif;
          background: linear-gradient(180deg, #3b0d2e, #7b1e5c, #ff758f);
          color: #fff;
          padding: 20px 18px 40px 18px;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .page-wrap {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
          position: relative;
        }

        .premium-card:hover {
          transform: translateY(-2px);
        }

        .header h1 {
          font-size: 28px;
        }

        @media (max-width: 768px) {
          .body {
            padding: 16px 14px 30px 14px;
          }

          .header h1 {
            font-size: 26px;
          }

          .premium-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px 24px 12px;
          }

          .header h1 {
            font-size: 24px;
          }

          .suggestion-container > div {
            min-width: 145px !important;
          }

          .premium-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}