// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import BrandHeader from "../BrandHeader";

// export default function ClosureSpace() {
//   const [message, setMessage] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code");

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push(`/closure/login?code=${code}`);
//     }
//   }, [router, code]);

//   const fill = (text) => {
//     setMessage(text);
//   };

//   const sendMessage = async () => {
//     if (message.trim() === "") {
//       alert("Write your final words before sending 🌙");
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
//           receiverName: receiverName || "Receiver",
//           receiverMobile: "",
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

//       setToastVisible(true);

//       setTimeout(() => {
//         setToastVisible(false);
//         router.push(`/closure/greet?code=${code}`);
//       }, 1500);

//       setMessage("");
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="body">
//       <div className="particle" style={{ left: "20%", animationDelay: "0s" }} />
//       <div className="particle" style={{ left: "40%", animationDelay: "3s" }} />
//       <div className="particle" style={{ left: "65%", animationDelay: "5s" }} />
//       <div className="particle" style={{ left: "80%", animationDelay: "2s" }} />

//       <div className="page-wrap">
//               <BrandHeader />

//         <div className="login-card">
//           <div className="avatar">🌙</div>
//           <h2>Write Your Final Words</h2>
//           <div className="subtitle">
//             Some messages are not about reopening doors — they are about gently closing them with peace.
//           </div>

//           <div className="input-box">
//             <label>Their Name</label>
//             <input
//               type="text"
//               placeholder="Enter their name"
//               value={receiverName}
//               onChange={(e) => setReceiverName(e.target.value)}
//             />
//           </div>

//           <div className="suggestion-row">
//             {[
//               "I wish you peace and happiness.",
//               "Thank you for the memories.",
//               "This is my goodbye.",
//               "I'm letting go with gratitude.",
//             ].map((text, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => fill(text)}
//                 className="suggestion-pill"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>

//           <div className="input-box">
//             <label>Your Message</label>
//             <textarea
//               placeholder="Write your closure message here..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               rows="5"
//             />
//           </div>

//           <div className="option-section">
//             <div className="option-grid">
//               {/* Commented out sections remain unchanged */}
//             </div>
//           </div>

//           {/* Reduced marginTop from 10px to 0 */}
//           <button
//             type="button"
//             className="login-btn"
//             onClick={sendMessage}
//             style={{ marginTop: 0 }}
//           >
//             Send & Release 🕊
//           </button>
//         </div>
//       </div>

//       {toastVisible && (
//         <div className="toast">
//           🌙 Your message has been released peacefully.
//         </div>
//       )}

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap");

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

//         .body {
//           min-height: 100vh;
//           width: 100vw;
//           color: white;
//           padding: 16px;
//           position: relative;
//           overflow-x: hidden;
//           font-family: "Inter", sans-serif;
//           background: linear-gradient(135deg, #667eea, #764ba2, #6a11cb);
//           box-sizing: border-box;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .page-wrap {
//           width: 100%;
//           max-width: 390px;
//           margin: 0 auto;
//           position: relative;
//           z-index: 2;
//         }

//         .particle {
//           position: absolute;
//           width: 6px;
//           height: 6px;
//           background: rgba(255, 255, 255, 0.4);
//           border-radius: 50%;
//           animation: float 8s infinite linear;
//           pointer-events: none;
//         }

//         @keyframes float {
//           0% {
//             transform: translateY(100vh);
//             opacity: 0;
//           }
//           30% {
//             opacity: 0.6;
//           }
//           100% {
//             transform: translateY(-10vh);
//             opacity: 0;
//           }
//         }

//         .login-card {
//           width: 100%;
//           background: rgba(255, 255, 255, 0.12);
//           backdrop-filter: blur(18px);
//           border-radius: 22px;
//           padding: 45px 35px;
//           text-align: center;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           position: relative;
//           z-index: 2;
//         }

//         .avatar {
//           font-size: 55px;
//           margin-bottom: 15px;
//         }

//         h2 {
//           font-family: "Cormorant Garamond", serif;
//           font-size: 30px;
//           color: #fff;
//           margin-bottom: 10px;
//           line-height: 1.2;
//         }

//         .subtitle {
//           color: #e0e0e0;
//           font-size: 14px;
//           margin-bottom: 28px;
//           line-height: 1.6;
//         }

//         .input-box {
//           margin-bottom: 18px;
//           text-align: left;
//         }

//         .input-box label {
//           font-size: 13px;
//           color: #fff;
//           display: block;
//           margin-bottom: 6px;
//         }

//         .input-box input {
//           width: 100%;
//           padding: 12px;
//           border-radius: 14px;
//           border: none;
//           outline: none;
//           background: rgba(255, 255, 255, 0.85);
//           font-size: 14px;
//         }

//         .input-box textarea {
//           width: 100%;
//           padding: 16px;
//           border-radius: 14px;
//           border: none;
//           outline: none;
//           background: rgba(255, 255, 255, 0.9);
//           font-size: 14px;
//           resize: vertical;
//           font-family: inherit;
//           line-height: 1.5;
//           min-height: 140px;
//         }

//         .suggestion-row {
//           display: flex;
//           gap: 10px;
//           overflow-x: auto;
//           margin: 20px 0;
//           padding-bottom: 5px;
//           -webkit-overflow-scrolling: touch;
//         }

//         .suggestion-pill {
//           min-width: 170px;
//           padding: 10px 15px;
//           border-radius: 25px;
//           font-size: 12px;
//           background: rgba(255, 255, 255, 0.2);
//           white-space: nowrap;
//           cursor: pointer;
//           flex-shrink: 0;
//           border: 1px solid rgba(255, 255, 255, 0.15);
//           transition: all 0.3s ease;
//         }

//         .suggestion-pill:hover {
//           background: rgba(255, 255, 255, 0.35);
//           transform: translateY(-2px);
//         }

//         .option-section {
//           margin: 15px 0 5px 0; /* Reduced top margin */
//         }

//         .option-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 12px;
//         }

//         .login-btn {
//           width: 100%;
//           padding: 16px;
//           border: none;
//           border-radius: 30px;
//           background: linear-gradient(to right, #4e73df, #9b59b6);
//           color: #fff;
//           cursor: pointer;
//           font-size: 15px;
//           font-weight: 600;
//           transition: all 0.3s ease;
//           font-family: inherit;
//           margin-top: 0; /* Removed top margin */
//         }

//         .login-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(78, 115, 223, 0.4);
//         }

//         .toast {
//           position: fixed;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.95);
//           color: #6a11cb;
//           padding: 12px 24px;
//           border-radius: 30px;
//           font-size: 14px;
//           font-weight: 500;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
//           max-width: calc(100vw - 40px);
//           text-align: center;
//           z-index: 50;
//           border: 1px solid rgba(106, 17, 203, 0.2);
//         }

//         @media (max-width: 768px) {
//           .body {
//             padding: 14px;
//           }

//           .login-card {
//             padding: 36px 24px;
//             border-radius: 20px;
//           }

//           .avatar {
//             font-size: 50px;
//           }

//           h2 {
//             font-size: 28px;
//           }

//           .subtitle {
//             font-size: 13px;
//             margin-bottom: 22px;
//           }

//           .suggestion-pill {
//             min-width: 160px;
//           }

//           .option-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 480px) {
//           .body {
//             padding: 12px;
//           }

//           .login-card {
//             padding: 28px 18px;
//             border-radius: 18px;
//           }

//           .avatar {
//             font-size: 46px;
//           }

//           h2 {
//             font-size: 24px;
//           }

//           .subtitle {
//             font-size: 12px;
//             margin-bottom: 18px;
//           }

//           .suggestion-pill {
//             min-width: 150px;
//             padding: 9px 12px;
//             font-size: 11.5px;
//           }

//           .input-box input,
//           .input-box textarea {
//             padding: 11px;
//             font-size: 13px;
//           }

//           .login-btn {
//             padding: 14px;
//             font-size: 14px;
//           }

//           .particle {
//             width: 5px;
//             height: 5px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

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
          receiverMobile: "",
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
        <BrandHeader />

        <div className="login-card">
          <div className="avatar">🌙</div>
          <h2>Write Your Final Words</h2>
          <div className="subtitle">
            Some messages are not about reopening doors — they are about gently closing them with peace.
          </div>

          <div className="input-box">
            <label>Their Name</label>
            <input
              type="text"
              placeholder="Enter their name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </div>

          <div className="suggestion-row">
            {[
              "I wish you peace and happiness.",
              "Thank you for the memories.",
              "This is my goodbye.",
              "I'm letting go with gratitude.",
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

          <div className="input-box">
            <label>Your Message</label>
            <textarea
              placeholder="Write your closure message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
            />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={sendMessage}
          >
            Send & Release 🕊
          </button>
        </div>
      </div>

      {toastVisible && (
        <div className="toast">
          🌙 Your message has been released peacefully.
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap");

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
          padding: 20px 16px;
          position: relative;
          overflow-x: hidden;
          font-family: "Inter", sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2, #6a11cb);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding-top: 30px;
        }

        .page-wrap {
          width: 100%;
          max-width: 390px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: float 8s infinite linear;
          pointer-events: none;
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

        .login-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
          max-height: 85vh;
          overflow-y: auto;
        }

        .avatar {
          font-size: 50px;
          margin-bottom: 10px;
        }

        h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: 27px;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .subtitle {
          color: #e0e0e0;
          font-size: 13.5px;
          margin-bottom: 22px;
          line-height: 1.4;
        }

        .input-box {
          margin-bottom: 14px;
          text-align: left;
        }

        .input-box label {
          font-size: 12.5px;
          color: #fff;
          display: block;
          margin-bottom: 5px;
        }

        .input-box input {
          width: 100%;
          padding: 11px;
          border-radius: 14px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.85);
          font-size: 14px;
        }

        .input-box textarea {
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          resize: vertical;
          font-family: inherit;
          line-height: 1.4;
          min-height: 105px;
        }

        .suggestion-row {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          margin: 14px 0;
          padding-bottom: 5px;
          -webkit-overflow-scrolling: touch;
        }

        .suggestion-pill {
          min-width: 145px;
          padding: 9px 13px;
          border-radius: 22px;
          font-size: 11.5px;
          background: rgba(255, 255, 255, 0.2);
          white-space: nowrap;
          cursor: pointer;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }

        .suggestion-pill:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        .login-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(to right, #4e73df, #9b59b6);
          color: #fff;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: inherit;
          margin-top: 10px;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(78, 115, 223, 0.4);
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #6a11cb;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 40px);
          text-align: center;
          z-index: 50;
          border: 1px solid rgba(106, 17, 203, 0.2);
        }

        @media (max-width: 768px) {
          .body {
            padding: 24px 20px;
            padding-top: 40px;
          }

          .page-wrap {
            max-width: 100%;
          }

          .login-card {
            padding: 28px 22px;
            border-radius: 20px;
            margin: 0 8px;
            max-height: 88vh;
          }

          .avatar {
            font-size: 46px;
            margin-bottom: 8px;
          }

          h2 {
            font-size: 25px;
            margin-bottom: 6px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 18px;
          }

          .input-box {
            margin-bottom: 12px;
          }

          .input-box textarea {
            min-height: 98px;
          }

          .suggestion-row {
            margin: 12px 0;
          }

          .suggestion-pill {
            min-width: 135px;
          }

          .login-btn {
            padding: 14px;
            margin-top: 8px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 20px 18px;
            padding-top: 35px;
          }

          .login-card {
            padding: 24px 20px;
            margin: 0 6px;
            max-height: 90vh;
          }

          .avatar {
            font-size: 42px;
            margin-bottom: 7px;
          }

          h2 {
            font-size: 23px;
          }

          .subtitle {
            margin-bottom: 16px;
          }

          .input-box textarea {
            min-height: 92px;
          }

          .suggestion-pill {
            min-width: 125px;
            padding: 8px 11px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}