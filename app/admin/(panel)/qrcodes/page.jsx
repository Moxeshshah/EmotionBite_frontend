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
      .then(res => res.json())
      .then(setQrs);
  }, []);

  return (
    <div className="container">
      <h1 className="title">QR Codes Management</h1>

      <div className="card">

        <div className="topBar">
          <h3>All QR Codes</h3>

          <button
            className="downloadAll"
            onClick={() =>
              window.open("http://localhost:8080/api/qr/download-all")
            }
          >
            Download All (ZIP)
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>

          <tbody>
            {qrs.map(q => (
              <tr key={q.id}>
                <td>
                  <span className="codeBadge">{q.code}</span>
                </td>

                <td>
                  <span
                    className={
                      q.status === "USED"
                        ? "status used"
                        : "status active"
                    }
                  >
                    {q.status}
                  </span>
                </td>

                <td>
                  <button
                    className="downloadBtn"
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

        {qrs.length === 0 && (
          <div className="emptyState">
            No QR codes available
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          padding: 30px;
          color: white;
        }

        .title {
          font-size: 28px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow-x: auto;
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        h3 {
          font-weight: 500;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        th, td {
          padding: 14px;
          text-align: left;
          font-size: 14px;
        }

        th {
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        tr {
          transition: 0.2s;
        }

        tr:hover {
          background: rgba(255,255,255,0.1);
        }

        .codeBadge {
          background: linear-gradient(135deg, #6dd5fa, #2980b9);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
        }

        .status {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .active {
          background: linear-gradient(135deg, #a1ffce, #faffd1);
          color: #333;
        }

        .used {
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          color: #333;
        }

        .downloadBtn {
          padding: 8px 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff, #e0e0ff);
          transition: 0.3s;
        }

        .downloadBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .downloadAll {
          padding: 10px 20px;
          border-radius: 14px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: white;
          transition: 0.3s;
        }

        .downloadAll:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .emptyState {
          text-align: center;
          margin-top: 20px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}