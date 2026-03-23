export async function POST(req) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(
      "http://localhost:8084/api/ebs/v1/qr/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(body)
      }
    );

    // 👇 IMPORTANT: get binary
    const blob = await res.arrayBuffer();

    return new Response(blob, {
      status: res.status,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=qr-codes.zip"
      }
    });

  } catch (err) {
    return Response.json({ message: "QR Proxy error" }, { status: 500 });
  }
}