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
        route: name,
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
  <div className="page">
    <div className="header">
      <h1>Categories</h1>
      <p>Manage categories and generate QR codes</p>
    </div>

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
    </div>

    {/* Table */}
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
                <span className="badge">{c.code}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        margin-bottom: 20px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.05);
      }

      h3 {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 600;
      }

      .formRow {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      input, select {
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        outline: none;
        font-size: 14px;
        min-width: 180px;
      }

      input:focus, select:focus {
        border-color: #6366f1;
      }

      button {
        padding: 12px 16px;
        border-radius: 8px;
        border: none;
        background: #6366f1;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s;
      }

      button:hover {
        background: #4f46e5;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      th, td {
        padding: 12px;
        text-align: left;
      }

      th {
        font-size: 13px;
        color: #64748b;
        border-bottom: 1px solid #e2e8f0;
      }

      tr:hover {
        background: #f8fafc;
      }

      .badge {
        background: #eef2ff;
        color: #4f46e5;
        padding: 6px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
      }
    `}</style>
  </div>
);
}