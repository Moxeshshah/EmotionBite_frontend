// "use client";
// import { useRouter } from "next/navigation";

// export default function CongratsGreet() {
//   const router = useRouter();

//   const confettiPieces = [
//     { top: "10%", left: "15%", bg: "#ffeb3b" },
//     { top: "60%", left: "25%", bg: "#00e5ff" },
//     { top: "35%", right: "20%", bg: "#ff4081" },
//     { bottom: "15%", right: "25%", bg: "#69f0ae" },
//     { top: "20%", left: "70%", bg: "#ff9800" },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#4a00e0,#8e2de2,#ff6a00)",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         color: "white",
//         padding: "25px 20px",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Floating Confetti */}
//       {confettiPieces.map((c, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             width: "14px",
//             height: "14px",
//             borderRadius: "50%",
//             opacity: 0.6,
//             background: c.bg,
//             top: c.top || "auto",
//             left: c.left || "auto",
//             right: c.right || "auto",
//             bottom: c.bottom || "auto",
//             animation: "float 8s infinite ease-in-out",
//           }}
//         />
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
//         <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
//         <h2 style={{ fontSize: "26px", fontFamily: "'Playfair Display', serif", marginBottom: "12px" }}>
//           Celebration Sent! 🌟
//         </h2>
//         <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
//           Your congratulatory message has been delivered! Keep spreading joy and positive vibes. 🥳
//         </p>

//         <button
//           onClick={() => router.push("/congrats/home")}
//           style={{
//             width: "100%",
//             padding: "16px",
//             borderRadius: "30px",
//             border: "none",
//             background: "#ffffff",
//             color: "#8e2de2",
//             fontWeight: 600,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#f3e5ff")}
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
//           background: "white",
//           color: "#8e2de2",
//           padding: "12px 22px",
//           borderRadius: "30px",
//           fontSize: "13px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         🎊 Your congratulations have been sent successfully!
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

export default function CongratsGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const confettiPieces = [
    { top: "10%", left: "15%", bg: "#ffeb3b" },
    { top: "60%", left: "25%", bg: "#00e5ff" },
    { top: "35%", right: "20%", bg: "#ff4081" },
    { bottom: "15%", right: "25%", bg: "#69f0ae" },
    { top: "20%", left: "70%", bg: "#ff9800" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#4a00e0,#8e2de2,#ff6a00)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "25px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Confetti */}
      {confettiPieces.map((c, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            opacity: 0.6,
            background: c.bg,
            top: c.top || "auto",
            left: c.left || "auto",
            right: c.right || "auto",
            bottom: c.bottom || "auto",
            animation: "float 8s infinite ease-in-out",
          }}
        />
      ))}

      {/* Greet Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "25px",
          padding: "45px 35px",
          maxWidth: "400px",
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
        <h2
          style={{
            fontSize: "26px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "12px",
          }}
        >
          Celebration Sent! 🌟
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            opacity: 0.9,
            marginBottom: "25px",
          }}
        >
          Your congratulatory message has been delivered! Keep spreading joy and positive vibes. 🥳
        </p>

        {/* Back Button (logic added only) */}
        <button
          onClick={() => router.push(`/congrats/home?code=${code}`)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "30px",
            border: "none",
            background: "#ffffff",
            color: "#8e2de2",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#f3e5ff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#ffffff")
          }
        >
          Back to Home 🏡
        </button>
      </div>

      {/* Toast */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          color: "#8e2de2",
          padding: "12px 22px",
          borderRadius: "30px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        🎊 Your congratulations have been sent successfully!
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}