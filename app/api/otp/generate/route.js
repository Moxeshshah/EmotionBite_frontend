// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const res = await fetch(
//       "http://localhost:8084/api/ebs/v1/otp/generate",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const text = await res.text(); // 👈 always safe

//     return new Response(text, {
//       status: res.status,
//       headers: {
//         "Content-Type": "text/plain", // 👈 IMPORTANT
//       },
//     });

//   } catch (err) {
//     return new Response("Proxy failed", { status: 500 });
//   }
// }
export async function POST(req) {
  try {
    const body = await req.json();

    // 👇 PASTE HERE
    console.log("ENV CHECK:", process.env.API_BASE_URL);

    const res = await fetch(
      `${process.env.API_BASE_URL}/otp/generate`, // 👈 use env here
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": "text/plain",
      },
    });

  } catch (err) {
    console.error("ERROR:", err); // 👈 also helpful
    return new Response("Proxy failed", { status: 500 });
  }
}