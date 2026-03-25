"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <h1>Messages</h1>
        <p>View and manage all user messages</p>
      </div>

      <div className="card">
        <h3>All Messages</h3>

        {/* DESKTOP TABLE */}
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
                    <div className="messageBox">
                      {msg.messageText}
                    </div>
                  </td>

                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="mobileList">
          {messages.map((msg, index) => (
            <div key={index} className="mobileCard">
              {/* Top ID */}
              <div className="topRow">
                <span className="id">#{index + 1}</span>
              </div>

              {/* Sender → Receiver */}
              <div className="userRow">
                <span className="badge sender">
                  {msg.senderName || "Anonymous"}
                </span>

                <span className="arrow">→</span>

                <span className="badge receiver">
                  {msg.receiverName || "-"}
                </span>
              </div>

              {/* Message */}
              <div className="messageBox">
                {msg.messageText}
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {messages.length === 0 && (
          <div className="emptyState">No messages found</div>
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
          margin-bottom: 4px;
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

        h3 {
          margin-bottom: 16px;
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
          min-width: 900px;
        }

        th, td {
          padding: 12px;
          text-align: left;
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

        /* MESSAGE */
        .messageBox {
          background: #f1f5f9;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          word-break: break-word;
        }

        /* MOBILE */
        .mobileList {
          display: none;
        }

        .mobileCard {
          background: #ffffff;
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
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
          margin-bottom: 10px;
        }

        .arrow {
          color: #94a3b8;
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

          .card {
            padding: 16px;
          }

          h1 {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Collapse,
//   Grid,
//   Button,
//   Tooltip,
//   TextField,
//   Chip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   FirstPage as FirstPageIcon,
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   LastPage as LastPageIcon,
// } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import BlankCard from "@/app/components/shared/BlankCard";
// import {
//   IconFilter,
//   IconFilterOff,
//   IconSearch,
//   IconCircleX,
// } from "@tabler/icons-react";

// function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
//   const theme = useTheme();

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <Button onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
//         {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//       </Button>
//       <Button onClick={(e) => onPageChange(e, page - 1)} disabled={page === 0}>
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowRight />
//         ) : (
//           <KeyboardArrowLeft />
//         )}
//       </Button>
//       <Button
//         onClick={(e) => onPageChange(e, page + 1)}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//       >
//         {theme.direction === "rtl" ? (
//           <KeyboardArrowLeft />
//         ) : (
//           <KeyboardArrowRight />
//         )}
//       </Button>
//       <Button
//         onClick={(e) =>
//           onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
//         }
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//       >
//         {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//       </Button>
//     </Box>
//   );
// }

// export default function MessagesPage() {
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [filterVisible, setFilterVisible] = useState(false);
//   const [search, setSearch] = useState("");
//   const [apiSearch, setApiSearch] = useState("");

//   // 🔥 FETCH (via proxy, NO TOKEN HERE)
//   const fetchMessages = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/messages?page=${page}&size=${rowsPerPage}&search=${apiSearch}`,
//         {
//           credentials: "include",
//         }
//       );

//       if (res.status === 401) {
//         window.location.href = "/admin/login";
//         return;
//       }

//       const data = await res.json();

//       setRows(data.data || []);
//       setTotalCount(data.total || 0);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [page, rowsPerPage, apiSearch]);

//   const handleSearch = () => {
//     setApiSearch(search);
//     setPage(0);
//   };

//   const handleClear = () => {
//     setSearch("");
//     setApiSearch("");
//     setPage(0);
//   };

//   return (
//     <Box p={2}>
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <h2>Messages Management</h2>

//         <Tooltip title={filterVisible ? "Hide Filters" : "Show Filters"}>
//           <Button onClick={() => setFilterVisible(!filterVisible)}>
//             {filterVisible ? <IconFilterOff /> : <IconFilter />}
//           </Button>
//         </Tooltip>
//       </Box>

//       {/* FILTERS */}
//       <Collapse in={filterVisible}>
//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={4}>
//             <TextField
//               label="Search Message"
//               fullWidth
//               size="small"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </Grid>

//           <Grid item>
//             <Button variant="contained" onClick={handleSearch}>
//               <IconSearch />
//             </Button>
//           </Grid>

//           <Grid item>
//             <Button color="error" onClick={handleClear}>
//               <IconCircleX />
//             </Button>
//           </Grid>
//         </Grid>
//       </Collapse>

//       {/* TABLE */}
//       {loading ? (
//         <Box textAlign="center" py={5}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <BlankCard>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>QR Code</TableCell>
//                   <TableCell>Sender</TableCell>
//                   <TableCell>Receiver</TableCell>
//                   <TableCell>Message</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {rows.length > 0 ? (
//                   rows.map((msg, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{index + 1}</TableCell>

//                       <TableCell>
//                         <Chip label={msg.qrCode || "N/A"} />
//                       </TableCell>

//                       <TableCell>
//                         <Chip
//                           label={msg.senderName || "Anonymous"}
//                           color="primary"
//                         />
//                       </TableCell>

//                       <TableCell>
//                         <Chip
//                           label={msg.receiverName || "-"}
//                           color="success"
//                         />
//                       </TableCell>

//                       <TableCell>
//                         <Box
//                           sx={{
//                             maxWidth: 250,
//                             wordBreak: "break-word",
//                           }}
//                         >
//                           {msg.messageText}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       No messages found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>

//               <TableFooter>
//                 <TableRow>
//                   <TablePagination
//                     count={totalCount}
//                     page={page}
//                     rowsPerPage={rowsPerPage}
//                     onPageChange={(e, p) => setPage(p)}
//                     onRowsPerPageChange={(e) => {
//                       setRowsPerPage(parseInt(e.target.value, 10));
//                       setPage(0);
//                     }}
//                     ActionsComponent={TablePaginationActions}
//                   />
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </TableContainer>
//         </BlankCard>
//       )}
//     </Box>
//   );
// }