export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const res = await fetch(
      `https://emotionbite-app.onrender.com/api/ebs/v1/qr/scan/${code}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "API failed" }), {
        status: res.status,
      });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}