import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.API_BASE_URL}/messages/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new NextResponse(text, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    console.error("Message Proxy Error:", err);

    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}