export async function GET(req) {
  try {
    console.log("ENV:", process.env.NEXT_PUBLIC_API_BASE_URL);

    const token = req.headers.get("authorization");
    console.log("TOKEN:", token);

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "0";
    const size = searchParams.get("size") || "10";

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/master/categories?page=${page}&size=${size}`;
    console.log("FETCH URL:", url);

    const res = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    console.log("STATUS:", res.status);

    const data = await res.json();

    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error("Proxy error FULL:", err);
    return Response.json({ message: "Proxy error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/master/categories`,
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