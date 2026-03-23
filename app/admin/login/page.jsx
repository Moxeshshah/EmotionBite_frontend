"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie  } from "cookies-next";


export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


const handleLogin = async () => {
  deleteCookie("authToken"); // 🔥 CLEAR OLD TOKEN FIRST

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

    // 🔥 HARD REDIRECT (IMPORTANT)
    window.location.href = "/admin/dashboard";

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="body">
      <div className="card">
        <div className="title">Scanova Admin</div>
        <div className="subtitle">Manage Categories & QR Codes</div>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <style jsx>{`
        .body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4, #a18cd1);
          font-family: "Poppins", sans-serif;
        }

        .card {
          width: 380px;
          padding: 40px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          color: white;
        }

        input {
          width: 100%;
          padding: 14px;
          margin-top: 15px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          outline: none;
        }

        button {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          border-radius: 20px;
          border: none;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          font-weight: 600;
          cursor: pointer;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
        }

        .subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
