// "use client";

// import { useEffect, useState } from "react";

// export default function QrPage() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/qr/all")
//       .then(res => res.json())
//       .then(setList);
//   }, []);

//   return (
//     <div>
//       <h2>QR Codes</h2>

//       <table style={table}>
//         <thead>
//           <tr>
//             <th>Code</th>
//             <th>Status</th>
//             <th>Created</th>
//             <th>Used</th>
//           </tr>
//         </thead>
//         <tbody>
//           {list.map(q => (
//             <tr key={q.id}>
//               <td>{q.code}</td>
//               <td style={{ color: q.status === "used" ? "red" : "green" }}>
//                 {q.status}
//               </td>
//               <td>{q.createdAt}</td>
//               <td>{q.usedAt || "-"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const table = {
//   width: "100%",
//   background: "white"
// };

"use client";

import { useEffect, useState } from "react";

export default function QrPage() {
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/qr/all")
      .then((res) => res.json())
      .then(setQrs);
  }, []);

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <h1>QR Codes</h1>
        <p>Manage and download QR codes</p>
      </div>

      <div className="card">
        {/* Top Bar */}
        <div className="topBar">
          <h3>All QR Codes</h3>

          <button
            className="primaryBtn"
            onClick={() =>
              window.open("http://localhost:8080/api/qr/download-all")
            }
          >
            Download All
          </button>
        </div>

        {/* DESKTOP TABLE */}
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {qrs.map((q) => (
                <tr key={q.id}>
                  <td>
                    <span className="badge code">{q.code}</span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        q.status === "USED" ? "used" : "active"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="secondaryBtn"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/qr/download/${q.code}`
                        )
                      }
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="mobileList">
          {qrs.map((q) => (
            <div key={q.id} className="mobileCard">
              <div className="topRow">
                <span className="badge code">{q.code}</span>
              </div>

              <div className="row">
                <span>Status</span>
                <span
                  className={`badge ${
                    q.status === "USED" ? "used" : "active"
                  }`}
                >
                  {q.status}
                </span>
              </div>

              <button
                className="secondaryBtn full"
                onClick={() =>
                  window.open(
                    `http://localhost:8080/api/qr/download/${q.code}`
                  )
                }
              >
                Download QR
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {qrs.length === 0 && (
          <div className="emptyState">No QR codes available</div>
        )}
      </div>

      <style jsx>{`
        .page {
          font-family: Inter, sans-serif;
        }

        .header {
          margin-bottom: 24px;
        }

        h1 {
          font-size: 26px;
          font-weight: 700;
        }

        .header p {
          color: #64748b;
          font-size: 14px;
        }

        .card {
          background: white;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 16px;
          font-weight: 600;
        }

        /* TABLE */
        .tableWrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        th, td {
          padding: 12px;
          font-size: 14px;
        }

        th {
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }

        tr:hover {
          background: #f8fafc;
        }

        /* BADGES */
        .badge {
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .code {
          background: #e0f2fe;
          color: #0369a1;
        }

        .active {
          background: #dcfce7;
          color: #166534;
        }

        .used {
          background: #fee2e2;
          color: #991b1b;
        }

        /* BUTTONS */
        .primaryBtn {
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          background: #6366f1;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .primaryBtn:hover {
          background: #4f46e5;
        }

        .secondaryBtn {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          background: #e2e8f0;
          cursor: pointer;
          font-weight: 500;
        }

        .secondaryBtn:hover {
          background: #cbd5f5;
        }

        .full {
          width: 100%;
          margin-top: 10px;
        }

        /* MOBILE */
        .mobileList {
          display: none;
        }

        .mobileCard {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        .topRow {
          margin-bottom: 10px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .emptyState {
          text-align: center;
          padding: 20px;
          color: #64748b;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .tableWrapper {
            display: none;
          }

          .mobileList {
            display: block;
          }

          .topBar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          h1 {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}