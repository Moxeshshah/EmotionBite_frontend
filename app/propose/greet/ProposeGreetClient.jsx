
// "use client";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ProposalGreet() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   const floatingHearts = [
//     { emoji: "💖", top: "15%", left: "10%" },
//     { emoji: "💌", top: "30%", right: "15%" },
//     { emoji: "🌹", bottom: "20%", left: "25%" },
//     { emoji: "💍", top: "50%", left: "70%" },
//     { emoji: "💕", bottom: "15%", right: "20%" },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#3a0d2e,#7b1e3b,#c72c41)",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         color: "white",
//         position: "relative",
//         overflow: "hidden",
//         padding: "25px 20px",
//       }}
//     >
//       {/* Floating Hearts */}
//       {floatingHearts.map((h, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             fontSize: "28px",
//             opacity: 0.15,
//             animation: "float 10s infinite ease-in-out",
//             top: h.top || "auto",
//             left: h.left || "auto",
//             right: h.right || "auto",
//             bottom: h.bottom || "auto",
//           }}
//         >
//           {h.emoji}
//         </div>
//       ))}

//       {/* Greet Card */}
//       <div
//         style={{
//           background: "rgba(255,255,255,0.15)",
//           backdropFilter: "blur(20px)",
//           borderRadius: "25px",
//           padding: "45px 35px",
//           maxWidth: "400px",
//           boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
//           border: "1px solid rgba(255,255,255,0.2)",
//           zIndex: 2,
//         }}
//       >
//         <div style={{ fontSize: "60px", marginBottom: "20px" }}>💍</div>

//         <h2
//           style={{
//             fontSize: "26px",
//             fontFamily: "'Playfair Display', serif",
//             marginBottom: "12px",
//           }}
//         >
//           Your Proposal is Ready! 💌
//         </h2>

//         <p
//           style={{
//             fontSize: "14px",
//             lineHeight: 1.6,
//             opacity: 0.9,
//             marginBottom: "25px",
//           }}
//         >
//           Your magical moment has been planned! Make it unforgettable and share your love. 🌹
//         </p>

//         {/* Back Button (Logic added only) */}
//         <button
//           onClick={() => router.push(`/propose/home?code=${code}`)}
//           style={{
//             width: "100%",
//             padding: "16px",
//             borderRadius: "30px",
//             border: "none",
//             background: "#ffffff",
//             color: "#c72c41",
//             fontWeight: 600,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.background = "#fbe6ee")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.background = "#ffffff")
//           }
//         >
//           Back to Home 🏡
//         </button>
//       </div>

//       {/* Toast (same style as approach greet) */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           background: "#fff",
//           color: "#c72c41",
//           padding: "12px 22px",
//           borderRadius: "30px",
//           fontSize: "13px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         💍 Your proposal has been successfully saved!
//       </div>

//       {/* Floating Animation */}
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-30px); }
//           100% { transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProposalGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const floatingHearts = [
    { emoji: "💖", top: "15%", left: "10%" },
    { emoji: "💌", top: "30%", right: "15%" },
    { emoji: "🌹", bottom: "20%", left: "25%" },
    { emoji: "💍", top: "50%", left: "70%" },
    { emoji: "💕", bottom: "15%", right: "20%" },
  ];

  return (
    <div className="body">
      {floatingHearts.map((h, idx) => (
        <div
          key={idx}
          className="heart-float"
          style={{
            animationDelay: `${idx * 0.7}s`,
            top: h.top || "auto",
            left: h.left || "auto",
            right: h.right || "auto",
            bottom: h.bottom || "auto",
          }}
        >
          {h.emoji}
        </div>
      ))}

      <div className="card">
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>💍</div>

        <h2>Your Proposal is Ready! 💌</h2>

        <p>
          Your magical moment has been planned! Make it unforgettable and share your love. 🌹
        </p>

        <button
          onClick={() => router.push(`/propose/home?code=${code}`)}
          className="btn"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fbe6ee")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Back to Home 🏡
        </button>
      </div>

      <div className="toast">💍 Your proposal has been successfully saved!</div>

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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 25px 20px;
          box-sizing: border-box;
        }

        .heart-float {
          position: absolute;
          font-size: 28px;
          opacity: 0.15;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
          z-index: 1;
        }

        .card {
          width: min(400px, 100%);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 45px 35px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
          position: relative;
        }

        h2 {
          font-size: 26px;
          font-family: "Playfair Display", serif;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .btn {
          width: 100%;
          padding: 16px;
          border-radius: 30px;
          border: none;
          background: #ffffff;
          color: #c72c41;
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
          background: #fff;
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 18px 14px;
          }

          .card {
            padding: 38px 24px;
            border-radius: 22px;
          }

          h2 {
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

          .card {
            padding: 30px 18px;
            border-radius: 18px;
          }

          .card > div:first-child {
            font-size: 54px !important;
            margin-bottom: 16px !important;
          }

          h2 {
            font-size: 22px;
          }

          p {
            font-size: 12.5px;
          }

          .btn {
            padding: 14px;
            font-size: 14px;
          }

          .heart-float {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}