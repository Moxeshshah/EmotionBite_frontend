
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ProposalPlanner() {
//   const [speech, setSpeech] = useState("");
//   const [toastVisible, setToastVisible] = useState(false);

//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   // Redirect if not logged
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push(`/propose/login?code=${code}`);
//   }
// }, []);

//   const ideas = [
//     "Flash Mob Surprise 💃",
//     "Memory Slideshow 🎥",
//     "Hidden Ring Treasure Hunt 🔎",
//     "Family & Friends Appear 🎊",
//   ];

//   const fillIdea = (idea) => {
//     setSpeech((prev) => prev + "\n\nIdea: " + idea);
//   };

//   // ===== API INTEGRATION =====
// const previewProposal = async () => {
//   if (speech.trim() === "") {
//     alert("Write your proposal speech first 💌");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token"); // ✅ same as LoveMessage

//     const res = await fetch("/api/messages/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ REQUIRED
//       },
//       body: JSON.stringify({
//         qrCode: code,
//         receiverName: "Proposal", // ✅ same structure
//         receiverMobile: "1234567890",
//         senderName: localStorage.getItem("sender_name"),
//         senderMobile: localStorage.getItem("sender_mobile"),
//         messageText: speech,
//         imageUrl: "",
//         videoUrl: "",
//         audioUrl: "",
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to save proposal");
//       return;
//     }

//     // ✅ Show toast
//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2000);

//     // ✅ Redirect
//     router.push(`/propose/greet?code=${code}`);
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };

//   const floatingIcons = [
//     { emoji: "💖", style: { top: "15%", left: "10%" } },
//     { emoji: "🌹", style: { bottom: "20%", right: "15%" } },
//     { emoji: "💍", style: { top: "40%", right: "25%" } },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#3a0d2e,#7b1e3b,#c72c41)",
//         minHeight: "100vh",
//         padding: "25px 20px 40px",
//         color: "white",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Floating icons */}
//       {floatingIcons.map((f, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             fontSize: "22px",
//             opacity: 0.2,
//             animation: "float 10s infinite ease-in-out",
//             ...f.style,
//           }}
//         >
//           {f.emoji}
//         </div>
//       ))}

//       {/* Header */}
//       <div style={{ marginTop: "20px", marginBottom: "30px" }}>
//         <h1 style={{ fontSize: "26px", fontWeight: 700 }}>
//           Plan The Perfect Proposal 💍
//         </h1>
//         <p
//           style={{
//             fontSize: "14px",
//             marginTop: "8px",
//             opacity: 0.9,
//             lineHeight: 1.6,
//           }}
//         >
//           This is where your forever begins. Design a magical moment they will
//           never forget.
//         </p>
//       </div>

//       {/* Proposal Date */}
//       <div style={{ marginBottom: "25px" }}>
//         <label
//           style={{
//             fontSize: "13px",
//             display: "block",
//             marginBottom: "8px",
//           }}
//         >
//           Proposal Date 📅
//         </label>
//         <input
//           type="date"
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

//       {/* Location */}
//       <div style={{ marginBottom: "25px" }}>
//         <label
//           style={{
//             fontSize: "13px",
//             display: "block",
//             marginBottom: "8px",
//           }}
//         >
//           Choose Location 🌍
//         </label>
//         <select
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
//         >
//           <option>Beach Sunset</option>
//           <option>Romantic Rooftop</option>
//           <option>Private Candlelight Dinner</option>
//           <option>Mountain View</option>
//         </select>
//       </div>

//       {/* Proposal Speech */}
//       <div style={{ marginBottom: "25px" }}>
//         <label
//           style={{
//             fontSize: "13px",
//             display: "block",
//             marginBottom: "8px",
//           }}
//         >
//           Write Your Proposal Speech 💌
//         </label>
//         <textarea
//           value={speech}
//           onChange={(e) => setSpeech(e.target.value)}
//           placeholder="From the moment I met you..."
//           style={{
//             width: "100%",
//             padding: "14px",
//             borderRadius: "16px",
//             border: "none",
//             outline: "none",
//             background: "rgba(255,255,255,0.85)",
//             color: "#333",
//             fontSize: "14px",
//             height: "120px",
//             resize: "none",
//           }}
//         />
//       </div>

//       {/* Surprise Ideas */}
//       <div style={{ marginBottom: "25px" }}>
//         <label
//           style={{
//             fontSize: "13px",
//             display: "block",
//             marginBottom: "8px",
//           }}
//         >
//           Surprise Ideas 🎉
//         </label>
//         <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
//           {ideas.map((idea, idx) => (
//             <div
//               key={idx}
//               onClick={() => fillIdea(idea)}
//               style={{
//                 minWidth: "180px",
//                 padding: "15px",
//                 background: "rgba(255,255,255,0.15)",
//                 borderRadius: "20px",
//                 fontSize: "13px",
//                 cursor: "pointer",
//               }}
//             >
//               {idea}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={previewProposal}
//         style={{
//           width: "100%",
//           marginTop: "30px",
//           padding: "16px",
//           border: "none",
//           borderRadius: "30px",
//           background: "linear-gradient(90deg,#ff758c,#ff7eb3)",
//           color: "white",
//           fontWeight: 600,
//           fontSize: "15px",
//           cursor: "pointer",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//         }}
//       >
//         Preview Magical Moment ✨
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
//             color: "#c72c41",
//             padding: "12px 22px",
//             borderRadius: "30px",
//             fontSize: "13px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           }}
//         >
//           💍 Your proposal plan is saved!
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-25px); }
//           100% { transform: translateY(0px); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProposalPlanner() {
  const [speech, setSpeech] = useState("");
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
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(`/propose/login?code=${code}`);
    }
  }, [router, code]);

  const ideas = [
    "Flash Mob Surprise 💃",
    "Memory Slideshow 🎥",
    "Hidden Ring Treasure Hunt 🔎",
    "Family & Friends Appear 🎊",
  ];

  const fillIdea = (idea) => {
    setSpeech((prev) => prev + "\n\nIdea: " + idea);
  };

  const previewProposal = async () => {
    if (speech.trim() === "") {
      alert("Write your proposal speech first 💌");
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
          receiverName: "Proposal",
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: speech,
          imageUrl: "",
          videoUrl: "",
          audioUrl: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save proposal");
        return;
      }

      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);

      router.push(`/propose/greet?code=${code}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const floatingIcons = [
    { emoji: "💖", style: { top: "15%", left: "10%" } },
    { emoji: "🌹", style: { bottom: "20%", right: "15%" } },
    { emoji: "💍", style: { top: "40%", right: "25%" } },
  ];

  return (
    <div className="body">
      {floatingIcons.map((f, idx) => (
        <div
          key={idx}
          className="float-icon"
          style={{
            animationDelay: `${idx * 0.7}s`,
            ...f.style,
          }}
        >
          {f.emoji}
        </div>
      ))}

      <div className="page">
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <h1>Plan The Perfect Proposal 💍</h1>
          <p>
            This is where your forever begins. Design a magical moment they will
            never forget.
          </p>
        </div>

        <div className="field">
          <label>Proposal Date 📅</label>
          <input type="date" className="control" />
        </div>

        <div className="field">
          <label>Choose Location 🌍</label>
          <select className="control">
            <option>Beach Sunset</option>
            <option>Romantic Rooftop</option>
            <option>Private Candlelight Dinner</option>
            <option>Mountain View</option>
          </select>
        </div>

        <div className="field">
          <label>Write Your Proposal Speech 💌</label>
          <textarea
            value={speech}
            onChange={(e) => setSpeech(e.target.value)}
            placeholder="From the moment I met you..."
            className="control speech-box"
          />
        </div>

        <div className="field">
          <label>Surprise Ideas 🎉</label>
          <div className="ideas-row">
            {ideas.map((idea, idx) => (
              <div
                key={idx}
                onClick={() => fillIdea(idea)}
                className="idea-chip"
              >
                {idea}
              </div>
            ))}
          </div>
        </div>

        <button onClick={previewProposal} className="preview-btn">
          Preview Magical Moment ✨
        </button>
      </div>

      {toastVisible && (
        <div className="toast">💍 Your proposal plan is saved!</div>
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
          background: linear-gradient(180deg, #3a0d2e, #7b1e3b, #c72c41);
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
          max-width: 620px;
          position: relative;
          z-index: 2;
        }

        .float-icon {
          position: absolute;
          font-size: 22px;
          opacity: 0.2;
          animation: float 10s infinite ease-in-out;
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

        .field {
          margin-bottom: 25px;
        }

        .field label {
          font-size: 13px;
          display: block;
          margin-bottom: 8px;
        }

        .control {
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.85);
          color: #333;
          font-size: 14px;
        }

        .speech-box {
          height: 120px;
          resize: none;
        }

        .ideas-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
        }

        .idea-chip {
          min-width: 180px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .preview-btn {
          width: 100%;
          margin-top: 30px;
          padding: 16px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: 0.3s;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #c72c41;
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
            transform: translateY(-25px);
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

          .idea-chip {
            min-width: 165px;
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

          .field {
            margin-bottom: 20px;
          }

          .control {
            padding: 12px;
            font-size: 13px;
          }

          .speech-box {
            height: 110px;
          }

          .idea-chip {
            min-width: 150px;
            font-size: 12px;
            padding: 13px;
          }

          .preview-btn {
            padding: 14px;
            font-size: 14px;
          }

          .float-icon {
            font-size: 18px;
            opacity: 0.16;
          }
        }
      `}</style>
    </div>
  );
}