// "use client";
// import { useRouter } from "next/navigation";

// export default function ProposalGreet() {
//   const router = useRouter();

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
//         <h2 style={{ fontSize: "26px", fontFamily: "'Playfair Display', serif", marginBottom: "12px" }}>
//           Your Proposal is Ready! 💌
//         </h2>
//         <p style={{ fontSize: "14px", lineHeight: 1.6, opacity: 0.9, marginBottom: "25px" }}>
//           Your magical moment has been planned! Make it unforgettable and share your love. 🌹
//         </p>

//         <button
//           onClick={() => router.push("/propose/home")}
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
//           onMouseEnter={(e) => (e.currentTarget.style.background = "#fbe6ee")}
//           onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
//         >
//           Back to Home 🏡
//         </button>
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
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#3a0d2e,#7b1e3b,#c72c41)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding: "25px 20px",
      }}
    >
      {/* Floating Hearts */}
      {floatingHearts.map((h, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "28px",
            opacity: 0.15,
            animation: "float 10s infinite ease-in-out",
            top: h.top || "auto",
            left: h.left || "auto",
            right: h.right || "auto",
            bottom: h.bottom || "auto",
          }}
        >
          {h.emoji}
        </div>
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
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>💍</div>

        <h2
          style={{
            fontSize: "26px",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "12px",
          }}
        >
          Your Proposal is Ready! 💌
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            opacity: 0.9,
            marginBottom: "25px",
          }}
        >
          Your magical moment has been planned! Make it unforgettable and share your love. 🌹
        </p>

        {/* Back Button (Logic added only) */}
        <button
          onClick={() => router.push(`/propose/home?code=${code}`)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "30px",
            border: "none",
            background: "#ffffff",
            color: "#c72c41",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#fbe6ee")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#ffffff")
          }
        >
          Back to Home 🏡
        </button>
      </div>

      {/* Toast (same style as approach greet) */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          color: "#c72c41",
          padding: "12px 22px",
          borderRadius: "30px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        💍 Your proposal has been successfully saved!
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