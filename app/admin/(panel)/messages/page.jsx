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
    <div className="container">
      <h1 className="title">Messages Management</h1>

      <div className="card">
        <h3>All Messages</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>QR ID</th>
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
        <span className="qrBadge">N/A</span>
      </td>

      <td>
        <span className="senderBadge">
          {msg.senderName || "Anonymous"}
        </span>
      </td>

      <td>
        <span className="receiverBadge">
          {msg.receiverName}
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

        {messages.length === 0 && (
          <div className="emptyState">
            No messages found
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

        h3 {
          margin-bottom: 15px;
          font-weight: 500;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          min-width: 900px;
        }

        th, td {
          padding: 14px;
          text-align: left;
          font-size: 14px;
        }

        th {
          border-bottom: 1px solid rgba(255,255,255,0.3);
          font-weight: 600;
        }

        tr {
          transition: 0.2s;
        }

        tr:hover {
          background: rgba(255,255,255,0.1);
        }

        .qrBadge {
          background: linear-gradient(135deg, #6dd5fa, #2980b9);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .senderBadge {
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #333;
        }

        .receiverBadge {
          background: linear-gradient(135deg, #a1ffce, #faffd1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #333;
        }

        .messageBox {
          background: rgba(255,255,255,0.2);
          padding: 10px;
          border-radius: 12px;
          max-width: 250px;
          word-wrap: break-word;
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