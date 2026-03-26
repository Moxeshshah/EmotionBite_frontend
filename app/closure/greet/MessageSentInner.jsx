
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function MessageSent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   const goBackHome = () => {
//     router.push(`/clouser/home?code=${code}`);
//   };

//   return (
//     <div
//       className="body"
//       style={{
//         background: "linear-gradient(180deg,#667eea,#764ba2,#6a11cb)",
//         minHeight: "100vh",
//         color: "white",
//         padding: "25px 20px 40px 20px",
//         position: "relative",
//         fontFamily: "'Inter', sans-serif",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       {/* Floating Particles */}
//       <div
//         className="particle"
//         style={{ left: "20%", animationDelay: "0s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "40%", animationDelay: "3s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "65%", animationDelay: "5s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "80%", animationDelay: "2s" }}
//       />

//       {/* Glass Card */}
//       <div
//         className="card"
//         style={{
//           width: "420px",
//           background: "rgba(255,255,255,0.12)",
//           backdropFilter: "blur(18px)",
//           borderRadius: "22px",
//           padding: "35px 28px",
//           boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
//           border: "1px solid rgba(255,255,255,0.2)",
//         }}
//       >
//         <div style={{ fontSize: "55px", marginBottom: "20px" }}>🌙</div>

//         <h2
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "28px",
//             marginBottom: "12px",
//           }}
//         >
//           Message Sent!
//         </h2>

//         <p
//           style={{
//             fontSize: "14px",
//             opacity: 0.85,
//             marginBottom: "25px",
//             lineHeight: 1.6,
//           }}
//         >
//           Your heartfelt closure message has been delivered 🌙.
//           You can now give the chocolate to the receiver and let the message do its magic.
//         </p>

//         <div style={{ fontSize: "50px", marginBottom: "20px" }}>🍫</div>

//         <button
//           onClick={goBackHome}
//           style={{
//             width: "100%",
//             padding: "16px",
//             border: "none",
//             borderRadius: "30px",
//             background: "linear-gradient(to right,#4e73df,#9b59b6)",
//             color: "white",
//             fontWeight: 500,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//             transition: "0.3s",
//           }}
//         >
//           Back to Home
//         </button>
//       </div>

//       {/* Toast (same pattern as other greet pages) */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           background: "white",
//           color: "#6a11cb",
//           padding: "12px 22px",
//           borderRadius: "30px",
//           fontSize: "13px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         🌙 Your closure message has been successfully sent!
//       </div>

//       {/* Keyframes */}
//       <style jsx>{`
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
//         .particle {
//           position: absolute;
//           width: 5px;
//           height: 5px;
//           background: rgba(255,255,255,0.35);
//           border-radius: 50%;
//           animation: float 10s infinite linear;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function MessageSent() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const goBackHome = () => {
    router.push(`/clouser/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="particle" style={{ left: "20%", animationDelay: "0s" }} />
      <div className="particle" style={{ left: "40%", animationDelay: "3s" }} />
      <div className="particle" style={{ left: "65%", animationDelay: "5s" }} />
      <div className="particle" style={{ left: "80%", animationDelay: "2s" }} />

      <div className="card">
        <div style={{ fontSize: "55px", marginBottom: "20px" }}>🌙</div>

        <h2>Message Sent!</h2>

        <p>
          Your heartfelt closure message has been delivered 🌙.
          You can now give the chocolate to the receiver and let the message do its magic.
        </p>

        <div style={{ fontSize: "50px", marginBottom: "20px" }}>🍫</div>

        <button onClick={goBackHome} className="back-btn">
          Back to Home
        </button>
      </div>

      <div className="toast">
        🌙 Your closure message has been successfully sent!
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
          color: white;
          padding: 25px 20px 40px 20px;
          position: relative;
          font-family: "Inter", sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(180deg, #667eea, #764ba2, #6a11cb);
          overflow: hidden;
          box-sizing: border-box;
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          animation: float 10s infinite linear;
          pointer-events: none;
        }

        .card {
          width: min(420px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 35px 28px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 2;
        }

        h2 {
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          opacity: 0.85;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .back-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(to right, #4e73df, #9b59b6);
          color: white;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
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
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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

          .card {
            padding: 30px 22px;
            border-radius: 20px;
          }

          h2 {
            font-size: 26px;
          }

          p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px 24px 12px;
          }

          .card {
            padding: 26px 18px;
            border-radius: 18px;
          }

          h2 {
            font-size: 24px;
          }

          p {
            font-size: 12.5px;
          }

          .back-btn {
            padding: 14px;
            font-size: 14px;
          }

          .particle {
            width: 4px;
            height: 4px;
          }
        }
      `}</style>
    </div>
  );
}