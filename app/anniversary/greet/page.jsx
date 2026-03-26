// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// export const dynamic = "force-dynamic";

// export default function AnniversaryGreet() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   return (
//     <div className="page">

//       {/* Floating Hearts */}
//       {["💖", "💕", "💞", "💘"].map((heart, idx) => (
//         <div
//           key={idx}
//           className="heart"
//           style={{
//             left: `${15 + idx * 20}%`,
//             animationDelay: `${idx * 1.5}s`,
//           }}
//         >
//           {heart}
//         </div>
//       ))}

//       {/* Card */}
//       <div className="card">
//         <div className="icon">💌</div>

//         <h2>Love Sent Successfully! 💖</h2>

//         <p>
//           Your heartfelt anniversary message has been delivered. Now you can
//           share the love and celebrate together! 🎊
//         </p>

//         <button
//           onClick={() => router.push(`/anniversary/home?code=${code}`)}
//         >
//           Back to Memories ✨
//         </button>
//       </div>

//       {/* Toast */}
//       <div className="toast">
//         💖 Message delivered with love!
//       </div>

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//         }

//         .page {
//           font-family: 'Poppins', sans-serif;
//           background: linear-gradient(180deg,#ff9a9e,#fad0c4,#fbc2eb);
//           min-height: 100vh;
//           padding: 25px 16px 40px;
//           color: white;
//           position: relative;
//           overflow-x: hidden;

//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           text-align: center;
//         }

//         /* 🔥 CARD FIX */
//         .card {
//           width: 100%;
//           max-width: 400px;
//           background: rgba(255,255,255,0.2);
//           backdrop-filter: blur(15px);
//           border-radius: 25px;
//           padding: 40px 30px;
//           box-shadow: 0 8px 25px rgba(0,0,0,0.3);
//           border: 1px solid rgba(255,255,255,0.3);
//         }

//         .icon {
//           font-size: 60px;
//           margin-bottom: 20px;
//         }

//         h2 {
//           font-family: 'Playfair Display', serif;
//           font-size: 26px;
//           margin-bottom: 12px;
//         }

//         p {
//           font-size: 14px;
//           opacity: 0.9;
//           margin-bottom: 25px;
//           line-height: 1.6;
//         }

//         button {
//           width: 100%;
//           padding: 15px;
//           border: none;
//           border-radius: 30px;
//           background: linear-gradient(to right,#ff758c,#ff7eb3);
//           color: white;
//           font-weight: 500;
//           font-size: 15px;
//           cursor: pointer;
//           box-shadow: 0 8px 25px rgba(255,118,136,0.4);
//           transition: 0.3s;
//         }

//         button:hover {
//           transform: translateY(-3px);
//         }

//         /* Toast */
//         .toast {
//           position: fixed;
//           bottom: 20px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: white;
//           color: #ff4d6d;
//           padding: 12px 22px;
//           border-radius: 30px;
//           font-size: 13px;
//           box-shadow: 0 8px 25px rgba(0,0,0,0.3);
//         }

//         /* Floating hearts */
//         .heart {
//           position: absolute;
//           font-size: 18px;
//           opacity: 0.6;
//           animation: float 8s infinite ease-in;
//           pointer-events: none;
//         }

//         /* 🔥 MOBILE */
//         @media (max-width: 480px) {
//           .page {
//             padding: 20px 12px 30px;
//           }

//           .card {
//             padding: 28px 20px;
//             border-radius: 18px;
//           }

//           h2 {
//             font-size: 22px;
//           }

//           p {
//             font-size: 13px;
//           }

//           .icon {
//             font-size: 50px;
//           }

//           button {
//             padding: 13px;
//             font-size: 14px;
//           }
//         }

//         /* 🔥 DESKTOP */
//         @media (min-width: 768px) {
//           .page {
//             align-items: center;
//           }
//         }

//         @keyframes float {
//           0% { transform: translateY(100vh) scale(0.6); opacity: 0; }
//           50% { opacity: 1; }
//           100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
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
    <div className="page">
      {["💖", "💕", "💞", "💘"].map((heart, idx) => (
        <div
          key={idx}
          className="heart"
          style={{
            left: `${15 + idx * 20}%`,
            animationDelay: `${idx * 1.5}s`,
          }}
        >
          {heart}
        </div>
      ))}

      <div className="card">
        <div className="icon">💌</div>

        <h2>Love Sent Successfully! 💖</h2>

        <p>
          Your heartfelt anniversary message has been delivered. Now you can
          share the love and celebrate together! 🎊
        </p>

        <button onClick={() => router.push(`/anniversary/home?code=${code}`)}>
          Back to Memories ✨
        </button>
      </div>

      <div className="toast">💖 Message delivered with love!</div>

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
          text-align: center;
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          border-radius: 25px;
          padding: 40px 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 2;
          position: relative;
        }

        .icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        h2 {
          font-family: "Playfair Display", serif;
          font-size: 26px;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        button {
          width: 100%;
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

        button:hover {
          transform: translateY(-3px);
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
          opacity: 0.6;
          animation: float 8s infinite ease-in;
          pointer-events: none;
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

          .card {
            padding: 28px 20px;
            border-radius: 18px;
          }

          h2 {
            font-size: 22px;
          }

          p {
            font-size: 13px;
          }

          .icon {
            font-size: 50px;
          }

          button {
            padding: 13px;
            font-size: 14px;
          }

          .heart {
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .page {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}