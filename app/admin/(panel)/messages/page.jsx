// "use client";

// import { useEffect, useState } from "react";
// import { getCookie } from "cookies-next";

// export default function MessagesPage() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const token = getCookie("authToken");

//     if (!token) {
//       alert("Not logged in");
//       return;
//     }

//     fetch("/api/messages/all?page=0&size=20", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed API");
//         return res.json();
//       })
//       .then((data) => {
//         setMessages(data.content || []);
//       })
//       .catch((err) => {
//         console.error("Message API error:", err);
//         alert("Failed to load messages");
//       });
//   }, []);

//   return (
//     <div className="page">
//       {/* Header */}
//       <div className="header">
//         <h1>Messages</h1>
//         <p>View and manage all user messages</p>
//       </div>

//       <div className="card">
//         <h3>All Messages</h3>

//         {/* DESKTOP TABLE */}
//         <div className="tableWrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>QR</th>
//                 <th>Sender</th>
//                 <th>Receiver</th>
//                 <th>Message</th>
//                 <th>Created</th>
//               </tr>
//             </thead>

//             <tbody>
//               {messages.map((msg, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>

//                   <td>
//                     <span className="badge neutral">N/A</span>
//                   </td>

//                   <td>
//                     <span className="badge sender">
//                       {msg.senderName || "Anonymous"}
//                     </span>
//                   </td>

//                   <td>
//                     <span className="badge receiver">
//                       {msg.receiverName || "-"}
//                     </span>
//                   </td>

//                   <td>
//                     <div className="messageBox">
//                       {msg.messageText}
//                     </div>
//                   </td>

//                   <td>-</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* MOBILE CARDS */}
//         <div className="mobileList">
//           {messages.map((msg, index) => (
//             <div key={index} className="mobileCard">
//               {/* Top ID */}
//               <div className="topRow">
//                 <span className="id">#{index + 1}</span>
//               </div>

//               {/* Sender → Receiver */}
//               <div className="userRow">
//                 <span className="badge sender">
//                   {msg.senderName || "Anonymous"}
//                 </span>

//                 <span className="arrow">→</span>

//                 <span className="badge receiver">
//                   {msg.receiverName || "-"}
//                 </span>
//               </div>

//               {/* Message */}
//               <div className="messageBox">
//                 {msg.messageText}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* EMPTY */}
//         {messages.length === 0 && (
//           <div className="emptyState">No messages found</div>
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
//           margin-bottom: 4px;
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
//           min-width: 900px;
//         }

//         th, td {
//           padding: 12px;
//           text-align: left;
//           font-size: 14px;
//         }

//         th {
//           color: #64748b;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         tr:hover {
//           background: #f8fafc;
//         }

//         /* BADGES */
//         .badge {
//           padding: 6px 10px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .neutral {
//           background: #f1f5f9;
//           color: #475569;
//         }

//         .sender {
//           background: #ede9fe;
//           color: #5b21b6;
//         }

//         .receiver {
//           background: #dcfce7;
//           color: #166534;
//         }

//         /* MESSAGE */
//         .messageBox {
//           background: #f1f5f9;
//           padding: 10px;
//           border-radius: 10px;
//           font-size: 14px;
//           word-break: break-word;
//         }

//         /* MOBILE */
//         .mobileList {
//           display: none;
//         }

//         .mobileCard {
//           background: #ffffff;
//           border-radius: 14px;
//           padding: 14px;
//           margin-bottom: 14px;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.06);
//         }

//         .topRow {
//           display: flex;
//           justify-content: flex-end;
//           font-size: 12px;
//           color: #64748b;
//           margin-bottom: 8px;
//         }

//         .id {
//           font-weight: 600;
//         }

//         .userRow {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 10px;
//         }

//         .arrow {
//           color: #94a3b8;
//           font-size: 14px;
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
import { getCookie } from "cookies-next";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const token = getCookie("authToken");

    if (!token) {
      alert("Not logged in");
      return;
    }

    fetch("/api/messages/all?page=0&size=20", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed API");
        return res.json();
      })
      .then((data) => {
        setMessages(data.content || []);
      })
      .catch((err) => {
        console.error("Message API error:", err);
        alert("Failed to load messages");
      });

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <h1>Messages</h1>
          <p>View and manage all user messages</p>
        </div>

        <div className="card">
          <h3>All Messages</h3>

          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>QR</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Message</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="badge neutral">N/A</span>
                    </td>
                    <td>
                      <span className="badge sender">
                        {msg.senderName || "Anonymous"}
                      </span>
                    </td>
                    <td>
                      <span className="badge receiver">
                        {msg.receiverName || "-"}
                      </span>
                    </td>
                    <td>
                      <div className="messageBox">{msg.messageText}</div>
                    </td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobileList">
            {messages.map((msg, index) => (
              <div key={index} className="mobileCard">
                <div className="topRow">
                  <span className="id">#{index + 1}</span>
                </div>

                <div className="userRow">
                  <span className="badge sender">
                    {msg.senderName || "Anonymous"}
                  </span>

                  <span className="arrow">→</span>

                  <span className="badge receiver">
                    {msg.receiverName || "-"}
                  </span>
                </div>

                <div className="messageBox">{msg.messageText}</div>
              </div>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="emptyState">No messages found</div>
          )}
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
          background: #f8fafc;
          padding: 24px 16px 40px;
          font-family: Inter, sans-serif;
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
          margin-bottom: 4px;
          color: #0f172a;
        }

        .header p {
          color: #64748b;
          font-size: 14px;
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
          min-width: 900px;
        }

        th,
        td {
          padding: 12px;
          text-align: left;
          font-size: 14px;
          vertical-align: top;
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
          max-width: 100%;
          word-break: break-word;
        }

        .neutral {
          background: #f1f5f9;
          color: #475569;
        }

        .sender {
          background: #ede9fe;
          color: #5b21b6;
        }

        .receiver {
          background: #dcfce7;
          color: #166534;
        }

        .messageBox {
          background: #f1f5f9;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          word-break: break-word;
          line-height: 1.5;
        }

        .mobileList {
          display: none;
        }

        .mobileCard {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 14px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        }

        .topRow {
          display: flex;
          justify-content: flex-end;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .id {
          font-weight: 600;
        }

        .userRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .arrow {
          color: #94a3b8;
          font-size: 14px;
          flex: 0 0 auto;
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

          .messageBox {
            font-size: 13px;
            padding: 9px;
          }
        }
      `}</style>
    </div>
  );
}