export async function POST(req) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    const res = await fetch(
      `${process.env.API_BASE_URL}/user/complete-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.text();

    return new Response(data, {
      status: res.status,
    });
  } catch (err) {
    return new Response("Proxy error", { status: 500 });
  }
}