// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getCookie } from "cookies-next";


// export default function AdminLayout({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const admin = getCookie("authToken");
//     if (!admin) {
//       console.log("No admin found, redirecting to login");
//       router.push("/admin/login");
//     } else {
//       setChecked(true);
//     }
//   }, []);

//   if (!checked) return null;

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard" },
//     { name: "Categories", path: "/admin/categories" },
//     { name: "QR Codes", path: "/admin/qrcodes" },
//     { name: "Messages", path: "/admin/messages" },
//     { name: "Users", path: "/admin/users" },
//   ];

//   const logout = () => {
//     localStorage.removeItem("admin");
//     router.push("/admin/login");
//   };

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <div className="logo">Scanova</div>

//         {menu.map((item) => (
//           <div
//             key={item.path}
//             className={`menu ${pathname === item.path ? "active" : ""}`}
//             onClick={() => router.push(item.path)}
//           >
//             {item.name}
//           </div>
//         ))}

//         <div className="logout" onClick={logout}>Logout</div>
//       </div>

//       <div className="content">{children}</div>

//       <style jsx>{`
//         .container {
//           display: flex;
//           min-height: 100vh;
//           background: linear-gradient(135deg,#89f7fe,#66a6ff,#a18cd1);
//           font-family: Poppins;
//         }

//         .sidebar {
//           width: 240px;
//           background: rgba(255,255,255,0.2);
//           backdrop-filter: blur(20px);
//           padding: 25px;
//           color: white;
//         }

//         .logo {
//           font-size: 22px;
//           font-weight: 700;
//           margin-bottom: 30px;
//         }

//         .menu {
//           padding: 12px;
//           border-radius: 10px;
//           margin-bottom: 8px;
//           cursor: pointer;
//         }

//         .menu:hover {
//           background: rgba(255,255,255,0.25);
//         }

//         .active {
//           background: rgba(255,255,255,0.35);
//           font-weight: 600;
//         }

//         .logout {
//           margin-top: 40px;
//           padding: 12px;
//           background: rgba(255,0,0,0.3);
//           border-radius: 10px;
//           cursor: pointer;
//         }

//         .content {
//           flex: 1;
//           padding: 40px;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // 👈 sidebar toggle

  useEffect(() => {
    const token = getCookie("authToken");

    if (!token) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Categories", path: "/admin/categories" },
    { name: "QR Codes", path: "/admin/qrcodes" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Users", path: "/admin/users" },
  ];

  const logout = () => {
    deleteCookie("authToken");
    router.push("/admin/login");
  };

  return (
    <div className="layout">
      {/* Overlay (mobile) */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="logo">Scanova</div>

        <div className="menuList">
          {menu.map((item) => (
            <div
              key={item.path}
              className={`menuItem ${
                pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                router.push(item.path);
                setOpen(false); // close on click
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="logout" onClick={logout}>
          Logout
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="left">
            {/* Hamburger */}
            <div className="menuBtn" onClick={() => setOpen(true)}>
              ☰
            </div>

            <div className="title">Admin Panel</div>
          </div>

          <div className="right">Admin</div>
        </div>

        {/* Page Content */}
        <div className="content">{children}</div>
      </main>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          font-family: Inter, sans-serif;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9;
        }

        /* Sidebar */
        .sidebar {
          width: 240px;
          background: #0f172a;
          color: white;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .menuList {
          flex: 1;
        }

        .menuItem {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 6px;
          cursor: pointer;
          color: #cbd5f5;
        }

        .menuItem:hover {
          background: #1e293b;
          color: white;
        }

        .active {
          background: #6366f1;
          color: white;
          font-weight: 600;
        }

        .logout {
          padding: 12px;
          background: #ef4444;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
        }

        /* Main */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          height: 60px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .menuBtn {
          font-size: 22px;
          cursor: pointer;
          display: none;
        }

        .title {
          font-weight: 600;
        }

        .right {
          font-size: 14px;
          color: #64748b;
        }

        .content {
          padding: 24px;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 10;
            transform: translateX(-100%);
          }

          .sidebar.show {
            transform: translateX(0);
          }

          .menuBtn {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}