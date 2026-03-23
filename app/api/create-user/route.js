export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.API_BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
    });

  } catch (err) {
    console.error("API ERROR:", err);

    return new Response("Server error", {
      status: 500,
    });
  }
}