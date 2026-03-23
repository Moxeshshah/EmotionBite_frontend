"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";


export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const admin = getCookie("authToken");
    if (!admin) {
      console.log("No admin found, redirecting to login");
      router.push("/admin/login");
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Categories", path: "/admin/categories" },
    { name: "QR Codes", path: "/admin/qrcodes" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Users", path: "/admin/users" },
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">Scanova</div>

        {menu.map((item) => (
          <div
            key={item.path}
            className={`menu ${pathname === item.path ? "active" : ""}`}
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </div>
        ))}

        <div className="logout" onClick={logout}>Logout</div>
      </div>

      <div className="content">{children}</div>

      <style jsx>{`
        .container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg,#89f7fe,#66a6ff,#a18cd1);
          font-family: Poppins;
        }

        .sidebar {
          width: 240px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          padding: 25px;
          color: white;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .menu {
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .menu:hover {
          background: rgba(255,255,255,0.25);
        }

        .active {
          background: rgba(255,255,255,0.35);
          font-weight: 600;
        }

        .logout {
          margin-top: 40px;
          padding: 12px;
          background: rgba(255,0,0,0.3);
          border-radius: 10px;
          cursor: pointer;
        }

        .content {
          flex: 1;
          padding: 40px;
          color: white;
        }
      `}</style>
    </div>
  );
}