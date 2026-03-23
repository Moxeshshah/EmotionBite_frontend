"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";


export default function UsersPage() {
  const [list, setList] = useState([]);
  const router = useRouter();

useEffect(() => {
  const token = getCookie("authToken");

  if (!token) {
    alert("Please login first");
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
        localStorage.removeItem("token");
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
}, []);

  return (
    <div className="container">
      <h1 className="title">Users Management</h1>

      <div className="card">
        <h3>All Users</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {list.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {u.firstName || "-"} {u.lastName || ""}
                </td>
                <td>
                  <span className="mobileBadge">
                    {u.mobileNo || "-"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="emptyState">
            No users found.
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
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th, td {
          padding: 14px;
          text-align: left;
        }

        th {
          border-bottom: 1px solid rgba(255,255,255,0.3);
          font-weight: 600;
        }

        tr:hover {
          background: rgba(255,255,255,0.1);
        }

        .mobileBadge {
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #333;
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