"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    fetch(`http://localhost:8084/api/ebs/v1/qr/scan/${code}`)
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
        }, 2000); // smooth UX delay
      })
      .catch((err) => {
        console.error(err);
        router.push("/error");
      });
  }, [code, router]);

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
        .wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4ca2cd, #67b26f);
          animation: fadeIn 0.8s ease-in-out;
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px);
          padding: 50px 60px;
          border-radius: 25px;
          text-align: center;
          color: white;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
          width: 350px;
        }

        .scanner {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 25px auto;
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
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        p {
          font-size: 14px;
          opacity: 0.85;
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
      `}</style>
    </div>
  );
}
