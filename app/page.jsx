"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code) {
        router.push(`/scan?code=${code}`);
      } else {
        console.log("No code found, redirecting to admin login");
        router.push("/admin/login");
      }
    }, 1500); // small delay for smooth UX

    return () => clearTimeout(timer);
  }, [code, router]);

  return (
    <div className="wrapper">
      <div className="card">
        <div className="spinner"></div>
        <h2>Redirecting...</h2>
        <p>Please wait while we prepare your experience</p>
      </div>

      <style jsx>{`
        .wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #67b26f, #4ca2cd);
          animation: fadeIn 1s ease-in-out;
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          padding: 40px 60px;
          border-radius: 20px;
          text-align: center;
          color: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }

        h2 {
          margin-top: 20px;
          font-size: 24px;
          font-weight: 600;
        }

        p {
          margin-top: 10px;
          font-size: 14px;
          opacity: 0.8;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255,255,255,0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}