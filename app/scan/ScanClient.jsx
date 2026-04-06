
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

    if (!code) {
      setTimeout(() => router.push("/error"), 1000);
      return;
    }

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
        setTimeout(() => router.push("/error"), 1000);
      });

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [code, router]);

  // ✅ FIXED: Complete inline fallback with text + spinner
  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #4ca2cd, #67b26f)",
          padding: "20px",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            marginBottom: "20px",
            border: "3px solid rgba(255,255,255,0.6)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "scanInline 2s linear infinite",
            }}
          />
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "white",
            lineHeight: "1.2",
          }}
        >
          Verifying QR Code
        </h2>
        <p
          style={{
            fontSize: "14px",
            opacity: "0.9",
            color: "white",
            lineHeight: "1.6",
            textAlign: "center",
            maxWidth: "280px",
          }}
        >
          Please wait while we prepare your surprise...
        </p>
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

      <style jsx global>{`
        @keyframes scanInline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

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
          padding: 20px;
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
          margin-bottom: 12px;
          line-height: 1.2;
        }

        p {
          font-size: 15px;
          opacity: 0.9;
          line-height: 1.6;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}