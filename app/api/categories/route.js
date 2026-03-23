export async function GET(req) {
  try {
    const token = req.headers.get("authorization");

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "0";
    const size = searchParams.get("size") || "10";

    const res = await fetch(
      `http://localhost:8084/api/ebs/v1/master/categories?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "Invalid JSON response" };
    }

    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Proxy error:", err);
    return Response.json({ message: "Proxy error" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(
      `${process.env.API_BASE_URL}/master/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      }
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "Invalid JSON response" };
    }

    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Proxy POST error:", err);
    return Response.json({ message: "Proxy error" }, { status: 500 });
  }
}