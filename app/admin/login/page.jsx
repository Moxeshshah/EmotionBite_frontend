// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { setCookie, deleteCookie } from "cookies-next";

// export default function AdminLogin() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     deleteCookie("authToken");

//     if (!username || !password) {
//       alert("Enter username & password");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: username,
//           password: password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       setCookie("authToken", data.result.token, {
//         maxAge: 60 * 60 * 24,
//         path: "/",
//         sameSite: "lax",
//       });

//       window.location.href = "/admin/dashboard";
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="left">
//         <div className="branding">
//           <h1>Emotion Bite</h1>
//           <p>Smart QR Management Platform</p>
//         </div>
//       </div>

//       <div className="right">
//         <div className="card">
//           <h2>Welcome</h2>
//           <p className="sub">Login to your admin panel</p>

//           <div className="inputGroup">
//             <input
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="inputGroup">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button onClick={handleLogin} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .container {
//           display: flex;
//           min-height: 100vh;
//           font-family: "Inter", sans-serif;
//         }

//         .left {
//           flex: 1;
//           background: linear-gradient(135deg, #0f172a, #1e293b);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .branding h1 {
//           font-size: 42px;
//           font-weight: 700;
//           margin-bottom: 10px;
//         }

//         .branding p {
//           opacity: 0.7;
//         }

//         .right {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #f8fafc;
//         }

//         .card {
//           width: 100%;
//           max-width: 360px;
//           padding: 40px 30px;
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.08);
//         }

//         h2 {
//           font-size: 24px;
//           margin-bottom: 6px;
//         }

//         .sub {
//           font-size: 13px;
//           color: #64748b;
//           margin-bottom: 20px;
//         }

//         .inputGroup {
//           margin-bottom: 16px;
//         }

//         input {
//           width: 100%;
//           padding: 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           outline: none;
//           font-size: 14px;
//         }

//         input:focus {
//           border-color: #6366f1;
//         }

//         button {
//           width: 100%;
//           padding: 12px;
//           border-radius: 10px;
//           border: none;
//           background: #6366f1;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }

//         button:hover {
//           background: #4f46e5;
//         }

//         button:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         @media (max-width: 768px) {
//           .container {
//             flex-direction: column;
//           }

//           .left {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

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
          <h1>Emotion Bite</h1>
          <p>Smart QR Management Platform</p>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <h2>Welcome</h2>
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

        .container {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          font-family: "Inter", sans-serif;
        }

        .left {
          flex: 1;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .branding {
          text-align: center;
        }

        .branding h1 {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.1;
        }

        .branding p {
          opacity: 0.7;
          font-size: 14px;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 24px;
        }

        .card {
          width: 100%;
          max-width: 360px;
          padding: 40px 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        h2 {
          font-size: 24px;
          margin-bottom: 6px;
          line-height: 1.2;
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
          transition: border-color 0.2s ease;
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
            width: 100%;
            min-height: 180px;
            flex: 0 0 auto;
          }

          .right {
            width: 100%;
            flex: 1;
          }

          .branding h1 {
            font-size: 34px;
          }
        }

        @media (max-width: 480px) {
          .left {
            min-height: 150px;
            padding: 18px;
          }

          .right {
            padding: 18px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 14px;
          }

          .branding h1 {
            font-size: 28px;
          }

          .branding p {
            font-size: 13px;
          }

          h2 {
            font-size: 22px;
          }

          .sub {
            font-size: 12px;
          }

          input {
            padding: 11px;
            font-size: 13px;
          }

          button {
            padding: 11px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}