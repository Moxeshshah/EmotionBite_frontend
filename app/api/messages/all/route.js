export async function GET(req) {
  const token = req.headers.get("authorization");

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || 0;
  const size = searchParams.get("size") || 10;

  const res = await fetch(
      `${process.env.API_BASE_URL}/messages?page=${page}&size=${size}`, // ✅ dynamic
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}