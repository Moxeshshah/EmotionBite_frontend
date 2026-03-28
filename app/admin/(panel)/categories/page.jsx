// "use client";

// import { useEffect, useState } from "react";
// import { getCookie } from "cookies-next";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [qrCategory, setQrCategory] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [generated, setGenerated] = useState([]);

//   useEffect(() => {
//     loadCategories();
//   }, []);

// const loadCategories = async () => {
//   try {
// const token = getCookie("authToken");
//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     const res = await fetch("/api/categories?page=0&size=20", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.status === 401) {
//       localStorage.removeItem("token");
//       alert("Session expired");
//       return;
//     }

//     const data = await res.json();
//     setCategories(data.content || []);

//   } catch (err) {
//     console.error(err);
//     alert("Failed to load categories");
//   }
// };

// const createCategory = async () => {
//   if (!name || !code) {
//     alert("Enter name & code");
//     return;
//   }

//   try {
// const token = getCookie("authToken");

//     const res = await fetch("/api/categories", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         code: code,
//         name: name,
//         route: name,
//         description: `${name} category`,
//         themeColor: "#FF5734",
//         iconPath: "/icons/default.png"
//       })
//     });

//     if (res.status === 401) {
//       localStorage.removeItem("token");
//       alert("Session expired");
//       return;
//     }

//     const data = await res.json();

//     // reload list (better than manual push)
//     loadCategories();

//     setName("");
//     setCode("");

//   } catch (err) {
//     console.error(err);
//     alert("Failed to create category");
//   }
// };

// const generateQr = async () => {
//   if (!qrCategory) {
//     alert("Select category");
//     return;
//   }

//   try {
// const token = getCookie("authToken");

//     const res = await fetch("/api/qr", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         categoryCode: qrCategory,
//         quantity: Number(quantity)
//       })
//     });

//     if (res.status === 401) {
//       localStorage.removeItem("token");
//       alert("Session expired");
//       return;
//     }

//     // 👇 convert to blob
//     const blob = await res.blob();

//     // 👇 create download link
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");

//     a.href = url;
//     a.download = "qr-codes.zip";
//     document.body.appendChild(a);
//     a.click();

//     a.remove();
//     window.URL.revokeObjectURL(url);

//   } catch (err) {
//     console.error(err);
//     alert("Failed to generate QR");
//   }
// };

// return (
//   <div className="page">
//     <div className="header">
//       <h1>Categories</h1>
//       <p>Manage categories and generate QR codes</p>
//     </div>

//     {/* Create Category */}
//     <div className="card">
//       <h3>Create Category</h3>

//       <div className="formRow">
//         <input
//           placeholder="Category Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />

//         <input
//           placeholder="Category Code (APR, LOVE)"
//           value={code}
//           onChange={e => setCode(e.target.value.toUpperCase())}
//         />

//         <button onClick={createCategory}>Create</button>
//       </div>
//     </div>

//     {/* Generate QR */}
//     <div className="card">
//       <h3>Generate QR</h3>

//       <div className="formRow">
//         <select
//           value={qrCategory}
//           onChange={e => setQrCategory(e.target.value)}
//         >
//           <option value="">Select Category</option>
//           {categories.map(c => (
//             <option key={c.id} value={c.code}>
//               {c.name} ({c.code})
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           min="1"
//           value={quantity}
//           onChange={e => setQuantity(e.target.value)}
//         />

//         <button onClick={generateQr}>Generate</button>
//       </div>
//     </div>

//     {/* Table */}
//     <div className="card">
//       <h3>All Categories</h3>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Code</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map(c => (
//             <tr key={c.id}>
//               <td>{c.id}</td>
//               <td>{c.name}</td>
//               <td>
//                 <span className="badge">{c.code}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     <style jsx>{`
//       .page {
//         font-family: Inter, sans-serif;
//       }

//       .header {
//         margin-bottom: 24px;
//       }

//       h1 {
//         font-size: 26px;
//         font-weight: 700;
//         margin-bottom: 4px;
//       }

//       .header p {
//         color: #64748b;
//         font-size: 14px;
//       }

//       .card {
//         background: white;
//         border-radius: 14px;
//         padding: 20px;
//         margin-bottom: 20px;
//         box-shadow: 0 8px 25px rgba(0,0,0,0.05);
//       }

//       h3 {
//         margin-bottom: 16px;
//         font-size: 16px;
//         font-weight: 600;
//       }

//       .formRow {
//         display: flex;
//         gap: 12px;
//         flex-wrap: wrap;
//       }

//       input, select {
//         padding: 12px;
//         border-radius: 8px;
//         border: 1px solid #e2e8f0;
//         outline: none;
//         font-size: 14px;
//         min-width: 180px;
//       }

//       input:focus, select:focus {
//         border-color: #6366f1;
//       }

//       button {
//         padding: 12px 16px;
//         border-radius: 8px;
//         border: none;
//         background: #6366f1;
//         color: white;
//         font-weight: 600;
//         cursor: pointer;
//         transition: 0.2s;
//       }

//       button:hover {
//         background: #4f46e5;
//       }

//       table {
//         width: 100%;
//         border-collapse: collapse;
//         margin-top: 10px;
//       }

//       th, td {
//         padding: 12px;
//         text-align: left;
//       }

//       th {
//         font-size: 13px;
//         color: #64748b;
//         border-bottom: 1px solid #e2e8f0;
//       }

//       tr:hover {
//         background: #f8fafc;
//       }

//       .badge {
//         background: #eef2ff;
//         color: #4f46e5;
//         padding: 6px 10px;
//         border-radius: 20px;
//         font-size: 12px;
//         font-weight: 500;
//       }
//     `}</style>
//   </div>
// );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { getCookie } from "cookies-next";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [qrCategory, setQrCategory] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [generated, setGenerated] = useState([]);

//   useEffect(() => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";

//     loadCategories();

//     return () => {
//       document.body.style.margin = "";
//       document.body.style.padding = "";
//       document.body.style.overflowX = "";
//     };
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const token = getCookie("authToken");
//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       const res = await fetch("/api/categories?page=0&size=20", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         alert("Session expired");
//         return;
//       }

//       const data = await res.json();
//       setCategories(data.content || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load categories");
//     }
//   };

//   const createCategory = async () => {
//     if (!name || !code) {
//       alert("Enter name & code");
//       return;
//     }

//     try {
//       const token = getCookie("authToken");

//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           code: code,
//           name: name,
//           route: name,
//           description: `${name} category`,
//           themeColor: "#FF5734",
//           iconPath: "/icons/default.png",
//         }),
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         alert("Session expired");
//         return;
//       }

//       await res.json();
//       loadCategories();
//       setName("");
//       setCode("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create category");
//     }
//   };

//   const generateQr = async () => {
//     if (!qrCategory) {
//       alert("Select category");
//       return;
//     }

//     try {
//       const token = getCookie("authToken");

//       const res = await fetch("/api/qr", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           categoryCode: qrCategory,
//           quantity: Number(quantity),
//         }),
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("token");
//         alert("Session expired");
//         return;
//       }

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");

//       a.href = url;
//       a.download = "qr-codes.zip";
//       document.body.appendChild(a);
//       a.click();

//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to generate QR");
//     }
//   };

//   return (
//     <div className="page">
//       <div className="content">
//         <div className="header">
//           <h1>Categories</h1>
//           <p>Manage categories and generate QR codes</p>
//         </div>

//         <div className="card">
//           <h3>Create Category</h3>
//           <div className="formRow">
//             <input
//               placeholder="Category Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               placeholder="Category Code (APR, LOVE)"
//               value={code}
//               onChange={(e) => setCode(e.target.value.toUpperCase())}
//             />
//             <button onClick={createCategory}>Create</button>
//           </div>
//         </div>

//         <div className="card">
//           <h3>Generate QR</h3>
//           <div className="formRow">
//             <select value={qrCategory} onChange={(e) => setQrCategory(e.target.value)}>
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.code}>
//                   {c.name} ({c.code})
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />

//             <button onClick={generateQr}>Generate</button>
//           </div>
//         </div>

//         <div className="card">
//           <h3>All Categories</h3>

//           <div className="tableWrap">
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Code</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.id}</td>
//                     <td>{c.name}</td>
//                     <td>
//                       <span className="badge">{c.code}</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         * {
//           box-sizing: border-box;
//           margin: 0;
//           padding: 0;
//         }

//         :global(html),
//         :global(body) {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           overflow-x: hidden;
//           background: #f8fafc;
//         }

//         .page {
//           min-height: 100vh;
//           width: 100vw;
//           font-family: Inter, sans-serif;
//           background: #f8fafc;
//           padding: 24px 16px 40px;
//         }

//         .content {
//           width: 100%;
//           max-width: 1100px;
//           margin: 0 auto;
//         }

//         .header {
//           margin-bottom: 24px;
//         }

//         h1 {
//           font-size: 26px;
//           font-weight: 700;
//           margin-bottom: 4px;
//           color: #0f172a;
//         }

//         .header p {
//           color: #64748b;
//           font-size: 14px;
//         }

//         .card {
//           background: white;
//           border-radius: 14px;
//           padding: 20px;
//           margin-bottom: 20px;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
//           overflow: hidden;
//         }

//         h3 {
//           margin-bottom: 16px;
//           font-size: 16px;
//           font-weight: 600;
//           color: #0f172a;
//         }

//         .formRow {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//         }

//         input,
//         select {
//           padding: 12px;
//           border-radius: 8px;
//           border: 1px solid #e2e8f0;
//           outline: none;
//           font-size: 14px;
//           min-width: 180px;
//           flex: 1 1 180px;
//           background: white;
//         }

//         input:focus,
//         select:focus {
//           border-color: #6366f1;
//         }

//         button {
//           padding: 12px 16px;
//           border-radius: 8px;
//           border: none;
//           background: #6366f1;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//           transition: 0.2s;
//           flex: 0 0 auto;
//         }

//         button:hover {
//           background: #4f46e5;
//         }

//         .tableWrap {
//           width: 100%;
//           overflow-x: auto;
//         }

//         table {
//           width: 100%;
//           min-width: 520px;
//           border-collapse: collapse;
//           margin-top: 10px;
//         }

//         th,
//         td {
//           padding: 12px;
//           text-align: left;
//         }

//         th {
//           font-size: 13px;
//           color: #64748b;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         tr:hover {
//           background: #f8fafc;
//         }

//         .badge {
//           background: #eef2ff;
//           color: #4f46e5;
//           padding: 6px 10px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         @media (max-width: 768px) {
//           .page {
//             padding: 18px 12px 30px;
//           }

//           h1 {
//             font-size: 24px;
//           }

//           .formRow {
//             flex-direction: column;
//           }

//           input,
//           select,
//           button {
//             width: 100%;
//             min-width: 0;
//           }

//           button {
//             padding: 12px;
//           }

//           .card {
//             padding: 18px;
//           }
//         }

//         @media (max-width: 480px) {
//           .page {
//             padding: 12px;
//           }

//           h1 {
//             font-size: 22px;
//           }

//           .header p {
//             font-size: 13px;
//           }

//           h3 {
//             font-size: 15px;
//           }

//           input,
//           select {
//             padding: 11px;
//             font-size: 13px;
//           }

//           .badge {
//             padding: 5px 8px;
//             font-size: 11px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qrCategory, setQrCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    loadCategories();

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const loadCategories = async () => {
    try {
      const token = getCookie("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await fetch("/api/categories?page=0&size=20", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired");
        return;
      }

      const data = await res.json();
      setCategories(data.content || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    }
  };

  const createCategory = async () => {
    if (!name || !code) {
      alert("Enter name & code");
      return;
    }

    try {
      const token = getCookie("authToken");

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: code,
          name: name,
          route: name,
          description: `${name} category`,
          themeColor: "#FF5734",
          iconPath: "/icons/default.png",
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired");
        return;
      }

      await res.json();
      loadCategories();
      setName("");
      setCode("");
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

const generateQr = async () => {
    if (!qrCategory) {
      alert("Select category");
      return;
    }

    try {
      const token = getCookie("authToken");

      const res = await fetch("/api/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryCode: qrCategory,
          quantity: Number(quantity),
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      // Find selected category to get name
      const selectedCategory = categories.find(cat => cat.code === qrCategory);
      const categoryName = selectedCategory ? selectedCategory.name : "qr-codes";
      
      // Sanitize filename (remove invalid characters, limit length)
      const sanitizedName = categoryName
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .trim()
        .substring(0, 50)
        .replace(/\s+/g, '-')
        .toLowerCase();

      a.href = url;
      a.download = `${sanitizedName}-qr-codes.zip`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate QR");
    }
  };

  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <h1>Categories</h1>
          <p>Manage categories and generate QR codes</p>
        </div>

        {/* Create Category */}
        <div className="card">
          <h3>Create Category</h3>
          <div className="formSection">
            <div className="inputGroup">
              <input
                className="textInput"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <input
                className="textInput"
                placeholder="Category Code (APR, LOVE)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
            </div>

            <div className="inputGroup">
              <button className="createBtn" onClick={createCategory}>
                Create
              </button>
            </div>
          </div>
        </div>

        {/* Generate QR */}
        <div className="card">
          <h3>Generate QR</h3>
          <div className="formSection">
            <div className="inputGroup">
              <select
                className="textInput"
                value={qrCategory}
                onChange={(e) => setQrCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <input
                className="textInput"
                type="number"
                min="1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <button className="generateBtn" onClick={generateQr}>
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <h3>All Categories ({categories.length})</h3>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>
                      <span className="badge">{c.code}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          max-width: 1100px;
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
          padding: 24px;
          margin-bottom: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
        }

        h3 {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }

        .formSection {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .inputGroup {
          width: 100%;
        }

        .textInput {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s ease;
          background: white;
        }

        .textInput:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .createBtn,
        .generateBtn {
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .createBtn {
          background: #10b981;
          color: white;
        }

        .createBtn:hover {
          background: #059669;
        }

        .generateBtn {
          background: #6366f1;
          color: white;
        }

        .generateBtn:hover {
          background: #4f46e5;
        }

        .tableWrap {
          width: 100%;
          overflow-x: auto;
          margin-top: 12px;
        }

        table {
          width: 100%;
          min-width: 520px;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 14px 12px;
          text-align: left;
        }

        th {
          font-size: 13px;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
        }

        tr:hover {
          background: #f8fafc;
        }

        .badge {
          background: #eef2ff;
          color: #4f46e5;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .page {
            padding: 18px 12px 30px;
          }

          h1 {
            font-size: 24px;
          }

          .card {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding: 12px;
          }

          h1 {
            font-size: 22px;
          }

          .header p {
            font-size: 13px;
          }

          .card {
            padding: 16px;
          }

          .textInput {
            padding: 13px 14px;
            font-size: 14px;
          }

          .createBtn,
          .generateBtn {
            padding: 13px 14px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}