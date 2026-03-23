// app/api/users/route.js

export async function GET(req) {
  try {
    const token = req.headers.get("authorization");

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "0";
    const size = searchParams.get("size") || "10";

    const res = await fetch(
      `${process.env.API_BASE_URL}/user?page=${page}&size=${size}`,
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
    console.error("Users API Proxy Error:", err);
    return Response.json({ message: "Proxy error" }, { status: 500 });
  }
}
// import apiClient from "./apiClient";
// export function api_getUsers(page = 0, size = 10) {
//   return apiClient.get(`/user?page=${page}&size=${size}`);
// }