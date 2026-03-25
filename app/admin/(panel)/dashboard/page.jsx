
// "use client";

// import { useEffect, useState } from "react";
// import { getCookie } from "cookies-next";
// import { deleteCookie } from "cookies-next";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     categories: 0,
//     qrs: 0,
//     users: 0,
//     messages: 0,
//   });

// // const token = getCookie("authToken");

// //   if (!token) {
// //     alert("Not logged in");
// //     return;
// //   }

// //   const headers = {
// //     Authorization: `Bearer ${token}`,
// //   };

// //   Promise.all([
// //     fetch("/api/categories?page=0&size=1", { headers }),
// //     fetch("/api/users?page=0&size=1", { headers }),
// //     fetch("/api/messages?page=0&size=1", { headers }),
// //   ])
// //     .then(async ([catRes, userRes, msgRes]) => {
// //       if (!catRes.ok || !userRes.ok || !msgRes.ok) {
// //         throw new Error("API failed");
// //       }

// //       const catData = await catRes.json();
// //       const userData = await userRes.json();
// //       const msgData = await msgRes.json();

// //       setStats({
// //         categories: catData.totalElements || 0,
// //         users: userData.totalElements || 0,
// //         messages: msgData.totalElements || 0,
// //         qrs: 0,
// //       });
// //     })
// //     .catch((err) => {
// //       console.error("Dashboard error:", err);
// //       alert("Error loading dashboard");
// //     });
// // }, []);
// useEffect(() => {
//   const token = getCookie("authToken");

//   console.log("TOKEN:", token); // debug

//   if (!token) {
//     window.location.href = "/admin/login";
//     return;
//   }

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   Promise.all([
//     fetch("/api/categories?page=0&size=1", { headers }),
//     fetch("/api/users?page=0&size=1", { headers }),
//     fetch("/api/messages/all?page=0&size=1", { headers }),
//   ])
//     .then(async ([catRes, userRes, msgRes]) => {

//       // ✅ HANDLE UNAUTHORIZED
//       if (
//         catRes.status === 401 ||
//         userRes.status === 401 ||
//         msgRes.status === 401
//       ) {
//         console.log("Unauthorized - clearing session");

//         deleteCookie("authToken");
//         window.location.href = "/admin/login";
//         return;
//       }

//       if (!catRes.ok || !userRes.ok || !msgRes.ok) {
//         throw new Error("API failed");
//       }

//       const catData = await catRes.json();
//       const userData = await userRes.json();
//       const msgData = await msgRes.json();

//       setStats({
//         categories: catData.totalElements || 0,
//         users: userData.totalElements || 0,
//         messages: msgData.totalElements || 0,
//         qrs: 0,
//       });
//     })
//     .catch((err) => {
//       console.error("Dashboard error:", err);
//     });
// }, []);


//   const Card = ({ title, value }) => (
//     <div className="card">
//       <h3>{value}</h3>
//       <p>{title}</p>
//     </div>
//   );

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <div className="grid">
//         <Card title="Categories" value={stats.categories} />
//         <Card title="QR Codes" value={stats.qrs} />
//         <Card title="Users" value={stats.users} />
//         <Card title="Messages" value={stats.messages} />
//       </div>

//       <style jsx>{`
//         .grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 20px;
//           margin-top: 30px;
//         }

//         .card {
//           background: rgba(255,255,255,0.2);
//           backdrop-filter: blur(20px);
//           padding: 25px;
//           border-radius: 16px;
//           text-align: center;
//         }

//         h3 {
//           font-size: 32px;
//           margin: 0;
//         }

//         p {
//           opacity: 0.8;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

export default function Dashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    qrs: 0,
    users: 0,
    messages: 0,
  });

  useEffect(() => {
    const token = getCookie("authToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch("/api/categories?page=0&size=1", { headers }),
      fetch("/api/users?page=0&size=1", { headers }),
      fetch("/api/messages/all?page=0&size=1", { headers }),
    ])
      .then(async ([catRes, userRes, msgRes]) => {
        if (
          catRes.status === 401 ||
          userRes.status === 401 ||
          msgRes.status === 401
        ) {
          deleteCookie("authToken");
          window.location.href = "/admin/login";
          return;
        }

        const catData = await catRes.json();
        const userData = await userRes.json();
        const msgData = await msgRes.json();

        setStats({
          categories: catData.totalElements || 0,
          users: userData.totalElements || 0,
          messages: msgData.totalElements || 0,
          qrs: 0,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const Card = ({ title, value }) => (
    <div className="card">
      <div className="label">{title}</div>
      <div className="value">{value}</div>
    </div>
  );

  return (
    <div>
      <h1 className="heading">Dashboard</h1>

      <div className="grid">
        <Card title="Categories" value={stats.categories} />
        <Card title="QR Codes" value={stats.qrs} />
        <Card title="Users" value={stats.users} />
        <Card title="Messages" value={stats.messages} />
      </div>

      <style jsx>{`
        .heading {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .label {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .value {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}