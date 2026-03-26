export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/qr/scan/${code}`,
      {
        method: "GET",
        cache: "no-store", // 🔥 VERY IMPORTANT (fixes your issue)
      }
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "API failed" }), {
        status: res.status,
      });
    }

    const data = await res.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store", // 🔥 prevent caching on Vercel
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}