// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("Verify request body:", body);

//     const res = await fetch(
//       "http://localhost:8084/api/ebs/v1/otp/verify",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const text = await res.text();
//     console.log("Verify backend response:", text);

//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       return new NextResponse(text, { status: res.status });
//     }

//     const response = NextResponse.json(data, { status: res.status });

//     // ✅ NOW THIS WORKS
//     if (data.token) {
//       response.cookies.set("token", data.token, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "lax",
//       });
//     }

//     return response;

//   } catch (err) {
//     console.error("Verify Proxy Error:", err);

//     return NextResponse.json(
//       { message: err.message || "Proxy verify failed" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Verify request body:", body);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/otp/verify` ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();
    console.log("Verify backend response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new NextResponse(text, { status: res.status });
    }

    const response = NextResponse.json(data, { status: res.status });

    // ✅ NOW THIS WORKS
    if (data.token) {
      response.cookies.set("token", data.token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;

  } catch (err) {
    console.error("Verify Proxy Error:", err);

    return NextResponse.json(
      { message: err.message || "Proxy verify failed" },
      { status: 500 }
    );
  }
}