
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function Anniversary() {
//   const [loveNote, setLoveNote] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);

//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");


//   // Redirect if not logged
// useEffect(() => {
//   if (!code) return;

//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.replace(`/anniversary/login?code=${code}`);
//   }
// }, [code]);

//   // ===== API INTEGRATION =====
// // ===== API INTEGRATION (UPDATED) =====
// const celebrateLove = async () => {
//   if (loveNote.trim() === "") {
//     alert("Write something special before celebrating 💖");
//     return;
//   }

//   try {
//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ token support
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: "Partner",
//         receiverMobile: "1234567890", // keep static or dynamic later
//         senderName: localStorage.getItem("sender_name"),
//         senderMobile: localStorage.getItem("sender_mobile"),
//         messageText: loveNote,
//         imageUrl: "",
//         videoUrl: "",
//         audioUrl: "",
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to save message");
//       return;
//     }

//     // ✅ Toast + smooth UX
//     setToastVisible(true);

//     setTimeout(() => {
//       setToastVisible(false);
//       router.push(`/anniversary/greet?code=${code}`);
//     }, 1500);

//     setLoveNote("");

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

//   const floatingHearts = [
//     { emoji: "💖", left: "15%", delay: "0s" },
//     { emoji: "💕", left: "35%", delay: "3s" },
//     { emoji: "💞", left: "60%", delay: "5s" },
//     { emoji: "💘", left: "80%", delay: "2s" },
//   ];

//   const moments = [
//     "💍 The day we said yes to forever.",
//     "🌍 Our first trip together.",
//     "🏡 Building dreams side by side.",
//   ];

//   const songs = [
//     "Perfect - Ed Sheeran",
//     "All of Me - John Legend",
//     "A Thousand Years - Christina Perri",
//   ];

//   return (
//    <div className="page">
//   <div className="container">

//     {/* Floating Hearts */}
//     {floatingHearts.map((heart, idx) => (
//       <div
//         key={idx}
//         className="heart"
//         style={{
//           left: heart.left,
//           animationDelay: heart.delay,
//         }}
//       >
//         {heart.emoji}
//       </div>
//     ))}

//     {/* Header */}
//     <div className="section">
//       <h1>Our Special Day 💑</h1>
//       <p>
//         Another year of love, laughter, and unforgettable memories.
//       </p>
//     </div>

//     {/* Upload */}
//     <div className="section">
//       <label>Upload a Favorite Memory 📸</label>
//       <input type="file" accept="image/*" />
//     </div>

//     {/* Love Note */}
//     <textarea
//       value={loveNote}
//       onChange={(e) => setLoveNote(e.target.value)}
//       placeholder="Write a heartfelt anniversary message..."
//     />

//     {/* Timeline */}
//     <div className="section">
//       <h3>Beautiful Moments Together ✨</h3>
//       {moments.map((moment, idx) => (
//         <div key={idx} className="moment">
//           {moment}
//         </div>
//       ))}
//     </div>

//     {/* Song */}
//     <div className="section">
//       <label>Dedicate a Song 🎵</label>
//       <select>
//         {songs.map((song, idx) => (
//           <option key={idx}>{song}</option>
//         ))}
//       </select>
//     </div>

//     {/* Button */}
//     <button onClick={celebrateLove}>
//       Celebrate Love 🎊
//     </button>

//     {/* Toast */}
//     {toastVisible && (
//       <div className="toast">
//         💖 Your anniversary celebration has been saved!
//       </div>
//     )}

// </div>
// <style jsx>{`
//   * {
//     box-sizing: border-box;
//   }

//   .page {
//     font-family: 'Poppins', sans-serif;
//     background: linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb);
//     min-height: 100vh;
//     padding: 25px 16px 40px;
//     color: white;
//     position: relative;
//     overflow-x: hidden;

//     display: flex;
//     justify-content: center;
//     align-items: flex-start; /* 🔥 better for scroll */
//   }

//   /* 🔥 MAIN CONTAINER FIX */
//   .container {
//     width: 100%;
//     max-width: 500px;
//     margin: auto;
//   }

//   h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: 28px;
//     line-height: 1.3;
//   }

//   p {
//     font-size: 14px;
//     margin-top: 8px;
//     opacity: 0.9;
//   }

//   .section {
//     margin-bottom: 24px;
//   }

//   label {
//     font-size: 13px;
//     display: block;
//     margin-bottom: 6px;
//   }

//   /* 🔥 INPUT FIX */
//   input,
//   select,
//   textarea {
//     width: 100%;
//     padding: 12px;
//     border-radius: 15px;
//     border: none;
//     background: rgba(255,255,255,0.85);
//     font-size: 14px;
//     outline: none;
//   }

//   textarea {
//     height: 130px;
//     resize: none;
//     color: #333;
//   }

//   .moment {
//     background: rgba(255,255,255,0.2);
//     padding: 14px;
//     border-radius: 16px;
//     margin-bottom: 10px;
//     font-size: 13px;
//   }

//   button {
//     width: 100%;
//     margin-top: 28px;
//     padding: 15px;
//     border: none;
//     border-radius: 30px;
//     background: linear-gradient(to right,#ff758c,#ff7eb3);
//     color: white;
//     font-weight: 500;
//     font-size: 15px;
//     cursor: pointer;
//     box-shadow: 0 8px 25px rgba(255,118,136,0.4);
//   }

//   .toast {
//     position: fixed;
//     bottom: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: white;
//     color: #ff4d6d;
//     padding: 12px 22px;
//     border-radius: 30px;
//     font-size: 13px;
//     box-shadow: 0 8px 25px rgba(0,0,0,0.3);
//   }

//   /* 🔥 HEART FIX (prevents overflow issues) */
//   .page > div[style] {
//     pointer-events: none;
//   }

//   /* 🔥 MOBILE */
//   @media (max-width: 480px) {
//     .page {
//       padding: 20px 12px 30px;
//     }

//     h1 {
//       font-size: 22px;
//     }

//     p {
//       font-size: 13px;
//     }

//     textarea {
//       height: 110px;
//       padding: 10px;
//     }

//     input, select {
//       padding: 10px;
//     }

//     button {
//       padding: 13px;
//       font-size: 14px;
//     }

//     .moment {
//       padding: 12px;
//       font-size: 12px;
//     }
//   }

//   /* 🔥 LARGE SCREEN (important upgrade) */
//   @media (min-width: 768px) {
//     .page {
//       align-items: center; /* center vertically on desktop */
//     }

//     .container {
//       max-width: 520px;
//     }
//   }

//   @keyframes float {
//     0% { transform: translateY(100vh) scale(0.6); opacity: 0; }
//     50% { opacity: 1; }
//     100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
//   }
// `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Anniversary() {
  const [loveNote, setLoveNote] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const router = useRouter();
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
    if (!code) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/anniversary/login?code=${code}`);
    }
  }, [code, router]);

  const celebrateLove = async () => {
    if (loveNote.trim() === "") {
      alert("Write something special before celebrating 💖");
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
          receiverName: "Partner",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: loveNote,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save message");
        return;
      }

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        router.push(`/anniversary/greet?code=${code}`);
      }, 1500);

      setLoveNote("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const floatingHearts = [
    { emoji: "💖", left: "15%", delay: "0s" },
    { emoji: "💕", left: "35%", delay: "3s" },
    { emoji: "💞", left: "60%", delay: "5s" },
    { emoji: "💘", left: "80%", delay: "2s" },
  ];

  const moments = [
    "💍 The day we said yes to forever.",
    "🌍 Our first trip together.",
    "🏡 Building dreams side by side.",
  ];

  const songs = [
    "Perfect - Ed Sheeran",
    "All of Me - John Legend",
    "A Thousand Years - Christina Perri",
  ];

  return (
    <div className="page">
      <div className="container">
        {floatingHearts.map((heart, idx) => (
          <div
            key={idx}
            className="heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
            }}
          >
            {heart.emoji}
          </div>
        ))}

        <div className="section">
          <h1>Our Special Day 💑</h1>
          <p>Another year of love, laughter, and unforgettable memories.</p>
        </div>

        <div className="section">
          <label>Upload a Favorite Memory 📸</label>
          <input type="file" accept="image/*" />
        </div>

        <textarea
          value={loveNote}
          onChange={(e) => setLoveNote(e.target.value)}
          placeholder="Write a heartfelt anniversary message..."
        />

        <div className="section">
          <h3>Beautiful Moments Together ✨</h3>
          {moments.map((moment, idx) => (
            <div key={idx} className="moment">
              {moment}
            </div>
          ))}
        </div>

        <div className="section">
          <label>Dedicate a Song 🎵</label>
          <select>
            {songs.map((song, idx) => (
              <option key={idx}>{song}</option>
            ))}
          </select>
        </div>

        <button onClick={celebrateLove}>Celebrate Love 🎊</button>

        {toastVisible && (
          <div className="toast">💖 Your anniversary celebration has been saved!</div>
        )}
      </div>

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

        .page {
          font-family: "Poppins", sans-serif;
          background: linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb);
          min-height: 100vh;
          width: 100vw;
          padding: 25px 16px 40px;
          color: white;
          position: relative;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          box-sizing: border-box;
        }

        .container {
          width: 100%;
          max-width: 500px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        h1 {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          line-height: 1.3;
        }

        p {
          font-size: 14px;
          margin-top: 8px;
          opacity: 0.9;
          line-height: 1.6;
        }

        h3 {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .section {
          margin-bottom: 24px;
        }

        label {
          font-size: 13px;
          display: block;
          margin-bottom: 6px;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 15px;
          border: none;
          background: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          outline: none;
          color: #333;
        }

        textarea {
          height: 130px;
          resize: none;
        }

        .moment {
          background: rgba(255, 255, 255, 0.2);
          padding: 14px;
          border-radius: 16px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        button {
          width: 100%;
          margin-top: 28px;
          padding: 15px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(to right, #ff758c, #ff7eb3);
          color: white;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 118, 136, 0.4);
          transition: 0.3s;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #ff4d6d;
          padding: 12px 22px;
          border-radius: 30px;
          font-size: 13px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 32px);
          text-align: center;
          z-index: 50;
        }

        .heart {
          position: absolute;
          font-size: 18px;
          animation: float 6s infinite ease-in;
          pointer-events: none;
          opacity: 0.85;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0.6);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding: 20px 12px 30px;
          }

          h1 {
            font-size: 22px;
          }

          p {
            font-size: 13px;
          }

          textarea {
            height: 110px;
            padding: 10px;
          }

          input,
          select {
            padding: 10px;
          }

          button {
            padding: 13px;
            font-size: 14px;
          }

          .moment {
            padding: 12px;
            font-size: 12px;
          }

          .heart {
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .page {
            align-items: center;
          }

          .container {
            max-width: 520px;
          }
        }
      `}</style>
    </div>
  );
}