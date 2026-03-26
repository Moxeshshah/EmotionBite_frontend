// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ScanPage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

// useEffect(() => {
//   if (!code) return;

// fetch(`/api/scan?code=${code}`)
//     .then((res) => {
//       if (!res.ok) throw new Error("QR API failed");
//       return res.json();
//     })
//     .then((data) => {
//       const category = data.category.toLowerCase();

//       setTimeout(() => {
//         if (data.status === "UNUSED") {
//           router.push(`/${category}/login?code=${code}`);
//         } else {
//           router.push(`/${category}/receiver?code=${code}`);
//         }
//       }, 2000);
//     })
//     .catch((err) => {
//       console.error(err);
//       router.push("/error");
//     });
// }, [code, router]);

//   return (
//     <div className="wrapper">
//       <div className="card">
//         <div className="scanner">
//           <div className="scanLine"></div>
//         </div>

//         <h2>Verifying QR Code</h2>
//         <p>Please wait while we prepare your surprise...</p>
//       </div>

//       <style jsx>{`
//         .wrapper {
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg, #4ca2cd, #67b26f);
//           animation: fadeIn 0.8s ease-in-out;
//         }

//         .card {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(30px);
//           padding: 50px 60px;
//           border-radius: 25px;
//           text-align: center;
//           color: white;
//           box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
//           width: 350px;
//         }

//         .scanner {
//           position: relative;
//           width: 120px;
//           height: 120px;
//           margin: 0 auto 25px auto;
//           border: 3px solid rgba(255, 255, 255, 0.6);
//           border-radius: 20px;
//           overflow: hidden;
//         }

//         .scanLine {
//           position: absolute;
//           top: 0;
//           width: 100%;
//           height: 4px;
//           background: white;
//           animation: scan 2s linear infinite;
//         }

//         h2 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 10px;
//         }

//         p {
//           font-size: 14px;
//           opacity: 0.85;
//         }

//         @keyframes scan {
//           0% {
//             top: 0;
//           }
//           100% {
//             top: 100%;
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    if (!code) return;

    fetch(`/api/scan?code=${code}`)
      .then((res) => {
        if (!res.ok) throw new Error("QR API failed");
        return res.json();
      })
      .then((data) => {
        const category = data.category.toLowerCase();

        setTimeout(() => {
          if (data.status === "UNUSED") {
            router.push(`/${category}/login?code=${code}`);
          } else {
            router.push(`/${category}/receiver?code=${code}`);
          }
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        router.push("/error");
      });

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [code, router]);

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #4ca2cd, #67b26f)",
          padding: "16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "80px",
            height: "80px",
            border: "3px solid rgba(255,255,255,0.6)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "4px",
              background: "white",
              animation: "scan 2s linear infinite",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="card">
        <div className="scanner">
          <div className="scanLine"></div>
        </div>

        <h2>Verifying QR Code</h2>
        <p>Please wait while we prepare your surprise...</p>
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

        .wrapper {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4ca2cd, #67b26f);
          padding: 16px;
          animation: fadeIn 0.8s ease-in-out;
        }

        .card {
          width: 100%;
          max-width: 380px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px);
          padding: 40px 30px;
          border-radius: 25px;
          text-align: center;
          color: white;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }

        .scanner {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 25px;
          border: 3px solid rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          overflow: hidden;
        }

        .scanLine {
          position: absolute;
          top: 0;
          width: 100%;
          height: 4px;
          background: white;
          animation: scan 2s linear infinite;
        }

        h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          opacity: 0.85;
          line-height: 1.6;
        }

        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .wrapper {
            padding: 12px;
          }

          .card {
            padding: 30px 20px;
            border-radius: 20px;
          }

          .scanner {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
          }

          h2 {
            font-size: 22px;
          }

          p {
            font-size: 13px;
          }
        }

        @media (max-width: 360px) {
          .card {
            padding: 24px 16px;
          }

          .scanner {
            width: 90px;
            height: 90px;
          }
        }
      `}</style>
    </div>
  );
}