// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getCookie } from "cookies-next";

// export default function UsersPage() {
//   const [list, setList] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const token = getCookie("authToken");

//     if (!token) {
//       router.push("/admin/login");
//       return;
//     }

//     fetch("/api/users?page=0&size=20", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (res.status === 401) {
//           router.push("/admin/login");
//           return;
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data) setList(data.content || []);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to load users");
//       });
//   }, []);

//   return (
//     <div className="page">
//       {/* Header */}
//       <div className="header">
//         <h1>Users</h1>
//         <p>Manage all registered users</p>
//       </div>

//       <div className="card">
//         <h3>All Users</h3>

//         {/* DESKTOP TABLE */}
//         <div className="tableWrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Mobile</th>
//               </tr>
//             </thead>

//             <tbody>
//               {list.map((u) => (
//                 <tr key={u.id}>
//                   <td>{u.id}</td>

//                   <td>
//                     {u.firstName || "-"} {u.lastName || ""}
//                   </td>

//                   <td>
//                     <span className="badge mobile">
//                       {u.mobileNo || "-"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* MOBILE CARDS */}
//         <div className="mobileList">
//           {list.map((u) => (
//             <div key={u.id} className="mobileCard">
//               <div className="topRow">
//                 <span className="id">#{u.id}</span>
//               </div>

//               <div className="name">
//                 {u.firstName || "-"} {u.lastName || ""}
//               </div>

//               <div className="mobileRow">
//                 <span className="label">Mobile</span>
//                 <span className="badge mobile">
//                   {u.mobileNo || "-"}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* EMPTY */}
//         {list.length === 0 && (
//           <div className="emptyState">No users found</div>
//         )}
//       </div>

//       <style jsx>{`
//         .page {
//           font-family: Inter, sans-serif;
//         }

//         .header {
//           margin-bottom: 24px;
//         }

//         h1 {
//           font-size: 26px;
//           font-weight: 700;
//         }

//         .header p {
//           color: #64748b;
//           font-size: 14px;
//         }

//         .card {
//           background: white;
//           border-radius: 14px;
//           padding: 20px;
//           box-shadow: 0 8px 25px rgba(0,0,0,0.05);
//         }

//         h3 {
//           margin-bottom: 16px;
//           font-size: 16px;
//           font-weight: 600;
//         }

//         /* TABLE */
//         .tableWrapper {
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//           min-width: 600px;
//         }

//         th, td {
//           padding: 12px;
//           font-size: 14px;
//           text-align: left;
//         }

//         th {
//           color: #64748b;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         tr:hover {
//           background: #f8fafc;
//         }

//         /* BADGE */
//         .badge {
//           padding: 6px 10px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .mobile {
//           background: #ede9fe;
//           color: #5b21b6;
//         }

//         /* MOBILE */
//         .mobileList {
//           display: none;
//         }

//         .mobileCard {
//           background: #ffffff;
//           border-radius: 14px;
//           padding: 14px;
//           margin-bottom: 12px;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.06);
//         }

//         .topRow {
//           display: flex;
//           justify-content: flex-end;
//           font-size: 12px;
//           color: #64748b;
//           margin-bottom: 6px;
//         }

//         .name {
//           font-weight: 600;
//           margin-bottom: 10px;
//         }

//         .mobileRow {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .label {
//           font-size: 13px;
//           color: #64748b;
//         }

//         .emptyState {
//           text-align: center;
//           padding: 20px;
//           color: #64748b;
//         }

//         /* RESPONSIVE */
//         @media (max-width: 768px) {
//           .tableWrapper {
//             display: none;
//           }

//           .mobileList {
//             display: block;
//           }

//           .card {
//             padding: 16px;
//           }

//           h1 {
//             font-size: 22px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function UsersPage() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const token = getCookie("authToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch("/api/users?page=0&size=20", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setList(data.content || []);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load users");
      });

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, [router]);

  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <h1>Users</h1>
          <p>Manage all registered users</p>
        </div>

        <div className="card">
          <h3>All Users</h3>

          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                </tr>
              </thead>

              <tbody>
                {list.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      {u.firstName || "-"} {u.lastName || ""}
                    </td>
                    <td>
                      <span className="badge mobile">{u.mobileNo || "-"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobileList">
            {list.map((u) => (
              <div key={u.id} className="mobileCard">
                <div className="topRow">
                  <span className="id">#{u.id}</span>
                </div>

                <div className="name">
                  {u.firstName || "-"} {u.lastName || ""}
                </div>

                <div className="mobileRow">
                  <span className="label">Mobile</span>
                  <span className="badge mobile">{u.mobileNo || "-"}</span>
                </div>
              </div>
            ))}
          </div>

          {list.length === 0 && <div className="emptyState">No users found</div>}
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
          background: #f8fafc;
        }

        .page {
          min-height: 100vh;
          width: 100vw;
          font-family: Inter, sans-serif;
          background: #f8fafc;
          padding: 24px 16px 40px;
        }

        .content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          margin-bottom: 24px;
        }

        h1 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
        }

        .header p {
          color: #64748b;
          font-size: 14px;
          margin-top: 4px;
        }

        .card {
          background: white;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
        }

        h3 {
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }

        .tableWrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        th,
        td {
          padding: 12px;
          font-size: 14px;
          text-align: left;
        }

        th {
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        tr:hover {
          background: #f8fafc;
        }

        .badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .mobile {
          background: #ede9fe;
          color: #5b21b6;
        }

        .mobileList {
          display: none;
        }

        .mobileCard {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        }

        .topRow {
          display: flex;
          justify-content: flex-end;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .name {
          font-weight: 600;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .mobileRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .label {
          font-size: 13px;
          color: #64748b;
        }

        .emptyState {
          text-align: center;
          padding: 20px;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .page {
            padding: 18px 12px 30px;
          }

          .tableWrapper {
            display: none;
          }

          .mobileList {
            display: block;
          }

          .card {
            padding: 16px;
          }

          h1 {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding: 12px;
          }

          h1 {
            font-size: 20px;
          }

          .header p {
            font-size: 13px;
          }

          h3 {
            font-size: 15px;
          }

          .mobileCard {
            padding: 12px;
          }

          .badge {
            font-size: 11px;
            padding: 5px 8px;
          }
        }
      `}</style>
    </div>
  );
}