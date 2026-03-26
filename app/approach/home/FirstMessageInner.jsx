// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function FirstMessage() {
//   const [message, setMessage] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const router = useRouter();
//   const params = useSearchParams();
// const code = params.get("code");
// const token =
//   typeof window !== "undefined"
//     ? localStorage.getItem("token")
//     : null;
//   const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
//   const suggestions = [
//     "Hi! I noticed we both love traveling. What's your favorite destination?",
//     "Hey! If you could describe your perfect weekend, what would it look like?",
//     "Hello 😊 What's something you're really passionate about?",
//   ];

//   const fillText = (text) => {
//     setMessage(text);
//   };

//   const setMood = (mood) => {
//     setMessage(`Mood: ${mood}\n\n`);
//   };

// // const sendMessage = async () => {
// //   if (message.trim() === "") {
// //     alert("Write your message before sending 😊");
// //     return;
// //   }

// //   try {
// //     await fetch("http://localhost:5000/api/message/send", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json"
// //   },
// //   body: JSON.stringify({
// //     code,
// //     user_id,
// //     receiver_name,
// //     message_text: message
// //   })
// // });

// //     const data = await res.json();

// //     if (!res.ok) {
// //       alert(data.error || "Failed to send message");
// //       return;
// //     }

// //     setToastVisible(true);
// //     setTimeout(() => setToastVisible(false), 2500);

// //     router.push(`/approach/greet?code=${code}`);
// //   } catch (err) {
// //     console.error(err);
// //     alert("Server error");
// //   }
// // };

// const sendMessage = async () => {
//   if (message.trim() === "") {
//     alert("Write your message");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token"); // ✅ IMPORTANT

//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ TOKEN BASED
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: "Receiver",
//         receiverMobile: "1234567890",
//         senderName: localStorage.getItem("sender_name"),
//         senderMobile: localStorage.getItem("sender_mobile"),
//         messageText: message,
//         imageUrl: "",
//         videoUrl: "",
//         audioUrl: "https://www.instagram.com/beingsalmankhan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to send message");
//       return;
//     }

//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2000);

//     router.push(`/approach/greet?code=${code}`);
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };


// useEffect(() => {
//   if (!code) return;

//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push(`/approach/login?code=${code}`);
//   }
// }, [code]);
//   const floatingShapes = [
//     { className: "one", style: { width: "100px", height: "100px", background: "#ffffff", top: "15%", left: "10%" } },
//     { className: "two", style: { width: "80px", height: "80px", background: "#ffdee9", bottom: "20%", right: "15%" } },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1)",
//         minHeight: "100vh",
//         padding: "25px 20px 40px",
//         color: "white",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Floating shapes */}
//       {floatingShapes.map((shape, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             borderRadius: "50%",
//             opacity: 0.15,
//             animation: "float 12s infinite ease-in-out",
//             ...shape.style,
//           }}
//         />
//       ))}

//       {/* Header */}
//       <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//         <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Say Hello 👋</h1>
//         <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
//           Your first message sets the tone. Make it warm, real, and memorable.
//         </p>
//       </div>

//       {/* Mood Selector */}
//       <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "25px" }}>
//         {moods.map((mood, idx) => (
//           <div
//             key={idx}
//             onClick={() => setMood(mood)}
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
//             {mood}
//           </div>
//         ))}
//       </div>

//       {/* Message Box */}
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Write your first message here..."
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
//         {suggestions.map((sugg, idx) => (
//           <div
//             key={idx}
//             onClick={() => fillText(sugg)}
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
//             {sugg}
//           </div>
//         ))}
//       </div>

//       {/* Extras */}
//       {/* <div style={{ marginTop: "25px" }}>
//         <label style={{ fontSize: "13px" }}>Add a Voice Intro 🎙</label>
//         <input
//           type="file"
//           accept="audio/*"
//           style={{
//             width: "100%",
//             padding: "12px",
//             borderRadius: "15px",
//             border: "none",
//             background: "rgba(255,255,255,0.85)",
//             marginTop: "5px",
//           }}
//         />
//       </div> */}

//       {/* Send Button */}
//       <button
//         onClick={sendMessage}
//         style={{
//           width: "100%",
//           marginTop: "30px",
//           padding: "16px",
//           border: "none",
//           borderRadius: "25px",
//           background: "linear-gradient(90deg,#ff9a9e,#fad0c4)",
//           color: "#333",
//           fontWeight: 600,
//           fontSize: "15px",
//           cursor: "pointer",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//           transition: "0.3s",
//         }}
//       >
//         Send First Step 🚀
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
//             color: "#66a6ff",
//             padding: "12px 22px",
//             borderRadius: "30px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           }}
//         >
//           🎉 Your first message has been sent!
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-25px);
//           }
//           100% {
//             transform: translateY(0px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function FirstMessage() {
//   const [message, setMessage] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
//   const suggestions = [
//     "Hi! I noticed we both love traveling. What's your favorite destination?",
//     "Hey! If you could describe your perfect weekend, what would it look like?",
//     "Hello 😊 What's something you're really passionate about?",
//   ];

//   const fillText = (text) => {
//     setMessage(text);
//   };

//   const setMood = (mood) => {
//     setMessage(`Mood: ${mood}\n\n`);
//   };

//   const sendMessage = async () => {
//     if (message.trim() === "") {
//       alert("Write your message");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("/api/messages/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           qrCode: code,
//           receiverName: "Receiver",
//           receiverMobile: "1234567890",
//           senderName: localStorage.getItem("sender_name"),
//           senderMobile: localStorage.getItem("sender_mobile"),
//           messageText: message,
//           imageUrl: "",
//           videoUrl: "",
//           audioUrl:"",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to send message");
//         return;
//       }

//       setToastVisible(true);
//       setTimeout(() => setToastVisible(false), 2000);

//       router.push(`/approach/greet?code=${code}`);
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   useEffect(() => {
//     if (!code) return;

//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push(`/approach/login?code=${code}`);
//     }
//   }, [code, router]);

//   const floatingShapes = [
//     {
//       className: "one",
//       style: {
//         width: "100px",
//         height: "100px",
//         background: "#ffffff",
//         top: "15%",
//         left: "10%",
//       },
//     },
//     {
//       className: "two",
//       style: {
//         width: "80px",
//         height: "80px",
//         background: "#ffdee9",
//         bottom: "20%",
//         right: "15%",
//       },
//     },
//   ];

//   return (
//     <div className="body">
//       <div className="page-wrap">
//         {floatingShapes.map((shape, idx) => (
//           <div
//             key={idx}
//             style={{
//               position: "absolute",
//               borderRadius: "50%",
//               opacity: 0.15,
//               animation: "float 12s infinite ease-in-out",
//               pointerEvents: "none",
//               ...shape.style,
//             }}
//           />
//         ))}

//         <div className="content">
//           <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//             <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Say Hello 👋</h1>
//             <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
//               Your first message sets the tone. Make it warm, real, and memorable.
//             </p>
//           </div>

//           <div className="mood-row">
//             {moods.map((mood, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => setMood(mood)}
//                 className="mood-pill"
//               >
//                 {mood}
//               </div>
//             ))}
//           </div>

//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Write your first message here..."
//             style={{
//               width: "100%",
//               height: "130px",
//               padding: "15px",
//               borderRadius: "18px",
//               border: "none",
//               resize: "none",
//               outline: "none",
//               fontSize: "14px",
//               color: "#333",
//               boxSizing: "border-box",
//             }}
//           />

//           <div style={{ marginTop: "20px" }}>
//             {suggestions.map((sugg, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => fillText(sugg)}
//                 className="suggestion-box"
//               >
//                 {sugg}
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={sendMessage}
//             className="send-btn"
//           >
//             Send First Step 🚀
//           </button>

//           {toastVisible && (
//             <div className="toast">
//               🎉 Your first message has been sent!
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: "Poppins", sans-serif;
//         }

//         :global(html),
//         :global(body) {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           overflow-x: hidden;
//         }

//         .body {
//           min-height: 100vh;
//           width: 100vw;
//           padding: 25px 20px 40px;
//           color: white;
//           position: relative;
//           overflow-x: hidden;
//           background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
//           box-sizing: border-box;
//         }

//         .page-wrap {
//           width: 100%;
//           max-width: 620px;
//           margin: 0 auto;
//           position: relative;
//           min-height: calc(100vh - 65px);
//         }

//         .content {
//           position: relative;
//           z-index: 2;
//         }

//         .mood-row {
//           display: flex;
//           gap: 10px;
//           overflow-x: auto;
//           margin-bottom: 25px;
//           padding-bottom: 5px;
//           -webkit-overflow-scrolling: touch;
//         }

//         .mood-pill {
//           min-width: 120px;
//           padding: 10px 15px;
//           border-radius: 25px;
//           background: rgba(255, 255, 255, 0.25);
//           font-size: 13px;
//           text-align: center;
//           cursor: pointer;
//           transition: 0.3s;
//           flex-shrink: 0;
//         }

//         .suggestion-box {
//           background: rgba(255, 255, 255, 0.2);
//           padding: 12px;
//           border-radius: 18px;
//           font-size: 13px;
//           margin-bottom: 10px;
//           cursor: pointer;
//           transition: 0.3s;
//         }

//         .send-btn {
//           width: 100%;
//           margin-top: 30px;
//           padding: 16px;
//           border: none;
//           border-radius: 25px;
//           background: linear-gradient(90deg, #ff9a9e, #fad0c4);
//           color: #333;
//           font-weight: 600;
//           font-size: 15px;
//           cursor: pointer;
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
//           transition: 0.3s;
//         }

//         .toast {
//           position: fixed;
//           bottom: 20px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: white;
//           color: #66a6ff;
//           padding: 12px 22px;
//           border-radius: 30px;
//           font-size: 13px;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
//           max-width: calc(100vw - 32px);
//           text-align: center;
//           z-index: 50;
//         }

//         @keyframes float {
//           0% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-25px);
//           }
//           100% {
//             transform: translateY(0px);
//           }
//         }

//         @media (max-width: 768px) {
//           .body {
//             padding: 18px 14px 30px;
//           }

//           .page-wrap {
//             min-height: calc(100vh - 48px);
//           }

//           .mood-pill {
//             min-width: 110px;
//           }

//           .suggestion-box {
//             font-size: 12.5px;
//           }
//         }

//         @media (max-width: 480px) {
//           .body {
//             padding: 14px 12px 24px;
//           }

//           h1 {
//             font-size: 24px !important;
//           }

//           .mood-pill {
//             min-width: 105px;
//             padding: 9px 12px;
//             font-size: 12px;
//           }

//           .suggestion-box {
//             padding: 11px;
//             font-size: 12px;
//           }

//           textarea {
//             height: 120px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FirstMessage() {
  const [message, setMessage] = useState("");
  const [instagramUsername, setInstagramUsername] = useState(""); // ✅ New state
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const moods = ["😊 Friendly", "😄 Playful", "✨ Thoughtful", "💬 Direct"];
  const suggestions = [
    "Hi! I noticed we both love traveling. What's your favorite destination?",
    "Hey! If you could describe your perfect weekend, what would it look like?",
    "Hello 😊 What's something you're really passionate about?",
  ];

  const fillText = (text) => {
    setMessage(text);
  };

  const setMood = (mood) => {
    setMessage(`Mood: ${mood}\n\n`);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Write your message");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // ✅ Format Instagram URL automatically
      const instagramUrl = instagramUsername.trim()
        ? `https://www.instagram.com/${instagramUsername.trim()}`
        : "";

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: "Receiver",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
          instagramUrl: instagramUrl, // ✅ Send formatted URL to backend
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);

      router.push(`/approach/greet?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    if (!code) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/approach/login?code=${code}`);
    }
  }, [code, router]);

  const floatingShapes = [
    {
      className: "one",
      style: {
        width: "100px",
        height: "100px",
        background: "#ffffff",
        top: "15%",
        left: "10%",
      },
    },
    {
      className: "two",
      style: {
        width: "80px",
        height: "80px",
        background: "#ffdee9",
        bottom: "20%",
        right: "15%",
      },
    },
  ];

  return (
    <div className="body">
      <div className="page-wrap">
        {floatingShapes.map((shape, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              borderRadius: "50%",
              opacity: 0.15,
              animation: "float 12s infinite ease-in-out",
              pointerEvents: "none",
              ...shape.style,
            }}
          />
        ))}

        <div className="content">
          <div style={{ marginTop: "20px", marginBottom: "30px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 700 }}>Say Hello 👋</h1>
            <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9, lineHeight: 1.6 }}>
              Your first message sets the tone. Make it warm, real, and memorable.
            </p>
          </div>

          <div className="mood-row">
            {moods.map((mood, idx) => (
              <div
                key={idx}
                onClick={() => setMood(mood)}
                className="mood-pill"
              >
                {mood}
              </div>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your first message here..."
            style={{
              width: "100%",
              height: "130px",
              padding: "15px",
              borderRadius: "18px",
              border: "none",
              resize: "none",
              outline: "none",
              fontSize: "14px",
              color: "#333",
              boxSizing: "border-box",
            }}
          />

          {/* ✅ NEW INSTAGRAM FIELD */}
          <div className="instagram-section">
            <label className="field-label">📸 Instagram (optional)</label>
            <div className="input-wrapper">
              <span className="prefix">instagram.com/</span>
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                placeholder="yourusername"
                className="instagram-input"
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            {suggestions.map((sugg, idx) => (
              <div
                key={idx}
                onClick={() => fillText(sugg)}
                className="suggestion-box"
              >
                {sugg}
              </div>
            ))}
          </div>

          <button
            onClick={sendMessage}
            className="send-btn"
          >
            Send First Step 🚀
          </button>

          {toastVisible && (
            <div className="toast">
              🎉 Your first message has been sent!
            </div>
          )}
        </div>
      </div>

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
          padding: 25px 20px 40px;
          color: white;
          position: relative;
          overflow-x: hidden;
          background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
          box-sizing: border-box;
        }

        .page-wrap {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
          position: relative;
          min-height: calc(100vh - 65px);
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .mood-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 25px;
          padding-bottom: 5px;
          -webkit-overflow-scrolling: touch;
        }

        .mood-pill {
          min-width: 120px;
          padding: 10px 15px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.25);
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
          flex-shrink: 0;
        }

        .mood-pill:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        /* ✅ NEW INSTAGRAM STYLES */
        .instagram-section {
          margin-top: 25px;
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          margin-bottom: 8px;
          opacity: 0.9;
          font-weight: 500;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .prefix {
          padding: 0 15px;
          background: rgba(255, 255, 255, 0.15);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
        }

        .instagram-input {
          flex: 1;
          padding: 15px;
          border: none;
          outline: none;
          background: transparent;
          color: #333;
          font-size: 14px;
          width: 100%;
        }

        .instagram-input::placeholder {
          color: rgba(51, 51, 51, 0.6);
        }

        .suggestion-box {
          background: rgba(255, 255, 255, 0.2);
          padding: 12px;
          border-radius: 18px;
          font-size: 13px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(5px);
        }

        .send-btn {
          width: 100%;
          margin-top: 30px;
          padding: 16px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        .send-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #66a6ff;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
          animation: slideUp 0.3s ease;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px 30px;
          }

          .page-wrap {
            min-height: calc(100vh - 48px);
          }

          .mood-pill {
            min-width: 110px;
          }

          .instagram-input {
            font-size: 13.5px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px 24px;
          }

          h1 {
            font-size: 24px !important;
          }

          .mood-pill {
            min-width: 105px;
            padding: 9px 12px;
            font-size: 12px;
          }

          .suggestion-box {
            padding: 11px;
            font-size: 12px;
          }

          textarea {
            height: 120px !important;
          }

          .instagram-section {
            margin-top: 22px;
            margin-bottom: 18px;
          }

          .prefix {
            padding: 0 12px;
            font-size: 12.5px;
          }
        }
      `}</style>
    </div>
  );
}