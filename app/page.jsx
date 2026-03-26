// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function RootPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");

//     const timer = setTimeout(() => {
//       if (code) {
//         router.push(`/scan?code=${code}`);
//       } else {
//         router.push("/admin/login");
//       }
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <div className="wrapper">
//       <div className="card">
//         <div className="spinner"></div>
//         <h2>Redirecting...</h2>
//         <p>Please wait while we prepare your experience</p>
//       </div>

//       <style jsx>{`
//         .wrapper {
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg, #67b26f, #4ca2cd);
//         }

//         .card {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(25px);
//           padding: 40px 60px;
//           border-radius: 20px;
//           text-align: center;
//           color: white;
//         }

//         .spinner {
//           width: 50px;
//           height: 50px;
//           border: 4px solid rgba(255,255,255,0.3);
//           border-top: 4px solid white;
//           border-radius: 50%;
//           margin: 0 auto;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const timer = setTimeout(() => {
      if (code) {
        router.push(`/scan?code=${code}`);
      } else {
        router.push("/admin/login");
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [router]);

  return (
    <div className="wrapper">
      <div className="card">
        <div className="spinner"></div>
        <h2>Redirecting...</h2>
        <p>Please wait while we prepare your experience</p>
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
          background: linear-gradient(135deg, #67b26f, #4ca2cd);
          padding: 16px;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          padding: 40px 60px;
          border-radius: 20px;
          text-align: center;
          color: white;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          margin: 0 auto 18px;
          animation: spin 1s linear infinite;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        p {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.6;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .wrapper {
            padding: 12px;
          }

          .card {
            padding: 30px 20px;
            border-radius: 16px;
          }

          .spinner {
            width: 42px;
            height: 42px;
            margin-bottom: 14px;
          }

          h2 {
            font-size: 22px;
          }

          p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}