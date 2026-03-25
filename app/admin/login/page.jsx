"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    deleteCookie("authToken");

    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Login failed");
        return;
      }

      setCookie("authToken", data.result.token, {
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
      });

      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="branding">
          <h1>Scanova</h1>
          <p>Smart QR Management Platform</p>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <h2>Welcome Back</h2>
          <p className="sub">Login to your admin panel</p>

          <div className="inputGroup">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          min-height: 100vh;
          font-family: "Inter", sans-serif;
        }

        .left {
          flex: 1;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .branding h1 {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .branding p {
          opacity: 0.7;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .card {
          width: 100%;
          max-width: 360px;
          padding: 40px 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        h2 {
          font-size: 24px;
          margin-bottom: 6px;
        }

        .sub {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
        }

        .inputGroup {
          margin-bottom: 16px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 14px;
        }

        input:focus {
          border-color: #6366f1;
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #6366f1;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        button:hover {
          background: #4f46e5;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .left {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}

