// "use client";

// import { useRouter } from "next/navigation";

// export default function AnniversaryGreet() {
//   const router = useRouter();

//   return (
//     <div
//       style={{
//         fontFamily: "'Poppins', sans-serif",
//         background: "linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb)",
//         minHeight: "100vh",
//         padding: "25px 20px 40px",
//         color: "white",
//         position: "relative",
//         overflowX: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//       }}
//     >
//       {/* Floating Hearts */}
//       {["💖", "💕", "💞", "💘"].map((heart, idx) => (
//         <div
//           key={idx}
//           style={{
//             position: "absolute",
//             fontSize: "18px",
//             left: `${15 + idx * 20}%`,
//             animation: `float 8s infinite ease-in`,
//             animationDelay: `${idx * 1.5}s`,
//             opacity: 0.6,
//           }}
//         >
//           {heart}
//         </div>
//       ))}

//       {/* Confirmation Card */}
//       <div
//         style={{
//           background: "rgba(255,255,255,0.2)",
//           backdropFilter: "blur(15px)",
//           borderRadius: "25px",
//           padding: "40px 30px",
//           maxWidth: "400px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//           border: "1px solid rgba(255,255,255,0.3)",
//         }}
//       >
//         <div style={{ fontSize: "60px", marginBottom: "20px" }}>💌</div>
//         <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", marginBottom: "12px" }}>
//           Love Sent Successfully! 💖
//         </h2>
//         <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "25px", lineHeight: 1.6 }}>
//           Your heartfelt anniversary message has been delivered. Now you can share the love and celebrate together! 🎊
//         </p>

//         <button
//           onClick={() => router.push("/anniversary/home")}
//           style={{
//             width: "100%",
//             padding: "15px",
//             border: "none",
//             borderRadius: "30px",
//             background: "linear-gradient(to right,#ff758c,#ff7eb3)",
//             color: "white",
//             fontWeight: 500,
//             fontSize: "15px",
//             cursor: "pointer",
//             boxShadow: "0 8px 25px rgba(255,118,136,0.4)",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
//         >
//           Back to Memories ✨
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
//           color: "#ff4d6d",
//           padding: "12px 22px",
//           borderRadius: "30px",
//           fontSize: "13px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
//         }}
//       >
//         💖 Message delivered with love!
//       </div>

//       {/* Keyframes */}
//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(100vh) scale(0.6);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-10vh) scale(1.2);
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
export const dynamic = "force-dynamic";
export default function AnniversaryGreet() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb)",
        minHeight: "100vh",
        padding: "25px 20px 40px",
        color: "white",
        position: "relative",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Floating Hearts */}
      {["💖", "💕", "💞", "💘"].map((heart, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            fontSize: "18px",
            left: `${15 + idx * 20}%`,
            animation: `float 8s infinite ease-in`,
            animationDelay: `${idx * 1.5}s`,
            opacity: 0.6,
          }}
        >
          {heart}
        </div>
      ))}

      {/* Confirmation Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(15px)",
          borderRadius: "25px",
          padding: "40px 30px",
          maxWidth: "400px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>💌</div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            marginBottom: "12px",
          }}
        >
          Love Sent Successfully! 💖
        </h2>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.9,
            marginBottom: "25px",
            lineHeight: 1.6,
          }}
        >
          Your heartfelt anniversary message has been delivered. Now you can share the love and celebrate together! 🎊
        </p>

        {/* Back Button (logic added only) */}
        <button
          onClick={() => router.push(`/anniversary/home?code=${code}`)}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "30px",
            background: "linear-gradient(to right,#ff758c,#ff7eb3)",
            color: "white",
            fontWeight: 500,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(255,118,136,0.4)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          Back to Memories ✨
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
          color: "#ff4d6d",
          padding: "12px 22px",
          borderRadius: "30px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        💖 Message delivered with love!
      </div>

      {/* Keyframes */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
}