"use client";

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";

export default function Dashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    qrs: 0,
    users: 0,
    messages: 0,
  });

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const token = getCookie("authToken");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch("/api/categories?page=0&size=1", { headers }),
      fetch("/api/users?page=0&size=1", { headers }),
      fetch("/api/messages/all?page=0&size=1", { headers }),
    ])
      .then(async ([catRes, userRes, msgRes]) => {
        if (
          catRes.status === 401 ||
          userRes.status === 401 ||
          msgRes.status === 401
        ) {
          deleteCookie("authToken");
          window.location.href = "/admin/login";
          return;
        }

        const catData = await catRes.json();
        const userData = await userRes.json();
        const msgData = await msgRes.json();

        setStats({
          categories: catData.totalElements || 0,
          users: userData.totalElements || 0,
          messages: msgData.totalElements || 0,
          qrs: 0,
        });
      })
      .catch((err) => console.error(err));

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="page">
      <div className="content">
        <h1 className="heading">Dashboard</h1>

        <div className="grid">
          <div className="module-box">
            <div className="label">Categories</div>
            <div className="value">{stats.categories}</div>
          </div>

          <div className="module-box">
            <div className="label">QR Codes</div>
            <div className="value">{stats.qrs}</div>
          </div>

          <div className="module-box">
            <div className="label">Users</div>
            <div className="value">{stats.users}</div>
          </div>

          <div className="module-box">
            <div className="label">Messages</div>
            <div className="value">{stats.messages}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 1.5rem 1rem 2rem;
          font-family: Inter, sans-serif;
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .heading {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #0f172a;
        }

        /* Perfect responsive grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .module-box {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 120px;
        }

        .module-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .label {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .value {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
        }

        /* Mobile: 1 column, more breathing room */
        @media (max-width: 768px) {
          .page {
            padding: 1rem 0.75rem 1.5rem;
          }

          .heading {
            font-size: 1.5rem;
            margin-bottom: 1.25rem;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .module-box {
            padding: 1.25rem;
            min-height: 100px;
          }

          .value {
            font-size: 1.75rem;
          }
        }

        /* Extra small screens */
        @media (max-width: 400px) {
          .page {
            padding: 0.75rem 0.5rem 1rem;
          }

          .heading {
            font-size: 1.375rem;
          }

          .module-box {
            padding: 1rem;
          }

          .value {
            font-size: 1.625rem;
          }
        }
      `}</style>
    </div>
  );
}