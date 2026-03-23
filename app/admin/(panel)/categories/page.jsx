"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qrCategory, setQrCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [generated, setGenerated] = useState([]);

  useEffect(() => {
    loadCategories();
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
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        code: code,
        name: name,
        description: `${name} category`,
        themeColor: "#FF5734",
        iconPath: "/icons/default.png"
      })
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired");
      return;
    }

    const data = await res.json();

    // reload list (better than manual push)
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
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        categoryCode: qrCategory,
        quantity: Number(quantity)
      })
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired");
      return;
    }

    // 👇 convert to blob
    const blob = await res.blob();

    // 👇 create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "qr-codes.zip";
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
    <div className="container">
      <h1 className="title">Categories Management</h1>

      {/* Create Category */}
      <div className="card">
        <h3>Create Category</h3>

        <div className="formRow">
          <input
            placeholder="Category Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="Category Code (APR, LOVE)"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
          />

          <button onClick={createCategory}>Create</button>
        </div>
      </div>

      {/* Generate QR */}
      <div className="card">
        <h3>Generate QR</h3>

        <div className="formRow">
          <select
            value={qrCategory}
            onChange={e => setQrCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <button onClick={generateQr}>Generate</button>
        </div>

        {generated.length > 0 && (
          <div className="resultBox">
            <h4>Generated Codes</h4>
            <div className="codeGrid">
              {generated.map((g, i) => (
                <div key={i} className="codeItem">
                  {g}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Table */}
      <div className="card">
        <h3>All Categories</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  <span className="codeBadge">{c.code}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          margin-bottom: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        h3 {
          margin-bottom: 15px;
          font-weight: 500;
        }

        .formRow {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        input, select {
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          min-width: 200px;
          background: rgba(255,255,255,0.9);
        }

        button {
          padding: 12px 20px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff, #e0e0ff);
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        th, td {
          padding: 12px;
          text-align: left;
        }

        th {
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        tr:hover {
          background: rgba(255,255,255,0.1);
        }

        .codeBadge {
          background: linear-gradient(135deg, #6dd5fa, #2980b9);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
        }

        .resultBox {
          margin-top: 20px;
        }

        .codeGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .codeItem {
          background: rgba(255,255,255,0.2);
          padding: 10px;
          border-radius: 10px;
          text-align: center;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}