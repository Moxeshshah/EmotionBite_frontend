// "use client";

// import { useRouter } from "next/navigation";

// export default function MessageSent() {
//   const router = useRouter();

//   const goBackHome = () => {
//     router.push("/clouser/home"); // redirect back to home if needed
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
//         style={{ left: "20%", animation: "float 10s infinite linear", animationDelay: "0s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "40%", animation: "float 10s infinite linear", animationDelay: "3s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "65%", animation: "float 10s infinite linear", animationDelay: "5s" }}
//       />
//       <div
//         className="particle"
//         style={{ left: "80%", animation: "float 10s infinite linear", animationDelay: "2s" }}
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
//         <div
//           className="icon"
//           style={{ fontSize: "55px", marginBottom: "20px" }}
//         >
//           🌙
//         </div>
//         <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "12px" }}>
//           Message Sent!
//         </h2>
//         <p style={{ fontSize: "14px", opacity: 0.85, marginBottom: "25px", lineHeight: 1.6 }}>
//           Your heartfelt closure message has been delivered 🌙.  
//           You can now give the chocolate to the receiver and let the message do its magic.
//         </p>

//         <div
//           className="choco"
//           style={{ fontSize: "50px", marginBottom: "20px" }}
//         >
//           🍫
//         </div>

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
    <div
      className="body"
      style={{
        background: "linear-gradient(180deg,#667eea,#764ba2,#6a11cb)",
        minHeight: "100vh",
        color: "white",
        padding: "25px 20px 40px 20px",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Floating Particles */}
      <div
        className="particle"
        style={{ left: "20%", animationDelay: "0s" }}
      />
      <div
        className="particle"
        style={{ left: "40%", animationDelay: "3s" }}
      />
      <div
        className="particle"
        style={{ left: "65%", animationDelay: "5s" }}
      />
      <div
        className="particle"
        style={{ left: "80%", animationDelay: "2s" }}
      />

      {/* Glass Card */}
      <div
        className="card"
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          borderRadius: "22px",
          padding: "35px 28px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ fontSize: "55px", marginBottom: "20px" }}>🌙</div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "28px",
            marginBottom: "12px",
          }}
        >
          Message Sent!
        </h2>

        <p
          style={{
            fontSize: "14px",
            opacity: 0.85,
            marginBottom: "25px",
            lineHeight: 1.6,
          }}
        >
          Your heartfelt closure message has been delivered 🌙.
          You can now give the chocolate to the receiver and let the message do its magic.
        </p>

        <div style={{ fontSize: "50px", marginBottom: "20px" }}>🍫</div>

        <button
          onClick={goBackHome}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "30px",
            background: "linear-gradient(to right,#4e73df,#9b59b6)",
            color: "white",
            fontWeight: 500,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
        >
          Back to Home
        </button>
      </div>

      {/* Toast (same pattern as other greet pages) */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          color: "#6a11cb",
          padding: "12px 22px",
          borderRadius: "30px",
          fontSize: "13px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        🌙 Your closure message has been successfully sent!
      </div>

      {/* Keyframes */}
      <style jsx>{`
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
        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.35);
          border-radius: 50%;
          animation: float 10s infinite linear;
        }
      `}</style>
    </div>
  );
}