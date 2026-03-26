// "use client";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";

// export default function FirstStepGreet() {
//   const router = useRouter();
// const params = useSearchParams();
// const code = params.get("code");

//   const floatingShapes = [
//     { style: { width: "100px", height: "100px", background: "#ffffff", top: "15%", left: "10%" } },
//     { style: { width: "80px", height: "80px", background: "#ffdee9", bottom: "20%", right: "15%" } },
//     { style: { width: "90px", height: "90px", background: "#fbc2eb", top: "25%", right: "25%" } },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#89f7fe,#66a6ff,#a18cd1)",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         padding: "25px 20px",
//         color: "#fff",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Floating Shapes */}
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

//       {/* Greeting Card */}
//       <div
//         style={{
//           background: "rgba(255,255,255,0.15)",
//           backdropFilter: "blur(18px)",
//           borderRadius: "25px",
//           padding: "40px 35px",
//           maxWidth: "400px",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//           border: "1px solid rgba(255,255,255,0.2)",
//           zIndex: 2,
//         }}
//       >
//         <div style={{ fontSize: "60px", marginBottom: "20px" }}>👋</div>
//         <h2 style={{ fontSize: "26px", fontFamily: "'Playfair Display', serif", marginBottom: "12px" }}>
//           Your First Message is Sent! 🎉
//         </h2>
//         <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
//           You’ve taken the first step! Your message has been delivered. Sit back, relax, and let the conversation begin. ✨
//         </p>

//         <button onClick={() => router.push(`/approach/home?code=${code}`)}
//           style={{
//             width: "100%",
//             padding: "16px",
//             borderRadius: "30px",
//             border: "none",
//             background: "#ffffff",
//             color: "#66a6ff",
//             fontWeight: 600,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f7ff")}
//           onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
//         >
//           Back to Home 🏡
//         </button>
//       </div>

//       {/* Toast */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           background: "#fff",
//           color: "#66a6ff",
//           padding: "12px 22px",
//           borderRadius: "30px",
//           fontSize: "13px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         🚀 Your first message has been successfully sent!
//       </div>

//       {/* Keyframes */}
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

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function FirstStepGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const floatingShapes = [
    { style: { width: "100px", height: "100px", background: "#ffffff", top: "15%", left: "10%" } },
    { style: { width: "80px", height: "80px", background: "#ffdee9", bottom: "20%", right: "15%" } },
    { style: { width: "90px", height: "90px", background: "#fbc2eb", top: "25%", right: "25%" } },
  ];

  return (
    <div className="body">
      {floatingShapes.map((shape, idx) => (
        <div
          key={idx}
          className="float-shape"
          style={{
            ...shape.style,
          }}
        />
      ))}

      <div className="card">
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>👋</div>
        <h2>
          Your First Message is Sent! 🎉
        </h2>
        <p>
          You’ve taken the first step! Your message has been delivered. Sit back, relax, and let the conversation begin. ✨
        </p>

        <button
          onClick={() => router.push(`/approach/home?code=${code}`)}
          className="home-btn"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e0f7ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          Back to Home 🏡
        </button>
      </div>

      <div className="toast">
        🚀 Your first message has been successfully sent!
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 25px 20px;
          color: #fff;
          position: relative;
          overflow: hidden;
          font-family: "Poppins", sans-serif;
          background: linear-gradient(180deg, #89f7fe, #66a6ff, #a18cd1);
          box-sizing: border-box;
        }

        .float-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
          animation: float 12s infinite ease-in-out;
          pointer-events: none;
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(18px);
          border-radius: 25px;
          padding: 40px 35px;
          width: min(400px, 100%);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
          position: relative;
        }

        .card h2 {
          font-size: 26px;
          font-family: "Playfair Display", serif;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .card p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 25px;
        }

        .home-btn {
          width: 100%;
          padding: 16px;
          border-radius: 30px;
          border: none;
          background: #ffffff;
          color: #66a6ff;
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
          color: #66a6ff;
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
            padding: 18px 14px;
          }

          .card {
            padding: 34px 24px;
            border-radius: 22px;
          }

          .card h2 {
            font-size: 24px;
          }

          .card p {
            font-size: 13px;
          }

          .float-shape {
            opacity: 0.12;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 14px 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 20px;
          }

          .card h2 {
            font-size: 22px;
          }

          .card p {
            font-size: 12.5px;
          }

          .home-btn {
            padding: 14px;
            font-size: 14px;
          }

          .float-shape {
            opacity: 0.1;
          }

          .float-shape:nth-child(1) {
            top: 8% !important;
            left: 4% !important;
          }

          .float-shape:nth-child(2) {
            bottom: 10% !important;
            right: 6% !important;
          }

          .float-shape:nth-child(3) {
            top: 14% !important;
            right: 10% !important;
          }
        }
      `}</style>
    </div>
  );
}