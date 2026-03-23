"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    qrs: 0,
    users: 0,
    messages: 0
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/category"),
      fetch("http://localhost:8080/api/qr/all"),
      fetch("http://localhost:8080/api/user/all"),
      fetch("http://localhost:8080/api/message/all")
    ])
      .then(async ([c, q, u, m]) => {
        setStats({
          categories: (await c.json()).length,
          qrs: (await q.json()).length,
          users: (await u.json()).length,
          messages: (await m.json()).length
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Categories" value={stats.categories} />
        <Card title="QR Codes" value={stats.qrs} />
        <Card title="Users" value={stats.users} />
        <Card title="Messages" value={stats.messages} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: 20,
      borderRadius: 8,
      width: 180,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}