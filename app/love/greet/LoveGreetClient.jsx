// "use client";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";


// export default function LoveGreet() {
//   const router = useRouter();
// const params = useSearchParams();
// const code = params.get("code");
//   const floatingHearts = [
//     { emoji: "❤️", top: "10%", left: "15%" },
//     { emoji: "💕", bottom: "20%", right: "10%" },
//     { emoji: "💌", top: "30%", right: "25%" },
//     { emoji: "😍", top: "50%", left: "70%" },
//     { emoji: "💖", bottom: "15%", left: "20%" },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#ff758c,#ff7eb3,#ffb199)",
//         minHeight: "100vh",
//         display: "flex",
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
//         <div style={{ fontSize: "60px", marginBottom: "20px" }}>💖</div>
//         <h2 style={{ fontSize: "26px", fontFamily: "'Playfair Display', serif", marginBottom: "12px" }}>
//           Love Sent Successfully! 💌
//         </h2>
//         <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
//           Your message has been delivered! Make more hearts flutter and spread the love. 😍
//         </p>

//         <button
// onClick={() => router.push(`/love/home?code=${code}`)}
//           style={{
//             width: "100%",
//             padding: "16px",
//             borderRadius: "25px",
//             border: "none",
//             background: "white",
//             color: "#ff4f81",
//             fontWeight: 600,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe6ed")}
//           onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
//         >
//           Send Another 💕
//         </button>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-25px); }
//           100% { transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function LoveGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const floatingHearts = [
    { emoji: "❤️", top: "10%", left: "15%" },
    { emoji: "💕", bottom: "20%", right: "10%" },
    { emoji: "💌", top: "30%", right: "25%" },
    { emoji: "😍", top: "50%", left: "70%" },
    { emoji: "💖", bottom: "15%", left: "20%" },
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
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>💖</div>

        <h2>Love Sent Successfully! 💌</h2>

        <p>
          Your message has been delivered! Make more hearts flutter and spread the love. 😍
        </p>

        <button
          onClick={() => router.push(`/love/home?code=${code}`)}
          className="btn"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffe6ed")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Send Another 💕
        </button>
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
          background: linear-gradient(180deg, #ff758c, #ff7eb3, #ffb199);
          display: flex;
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
          border-radius: 25px;
          border: none;
          background: white;
          color: #ff4f81;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
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