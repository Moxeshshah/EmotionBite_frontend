// export async function GET(req) {
//   const token = req.headers.get("authorization");

//   const res = await fetch(
//     "http://localhost:8084/api/ebs/v1/messages?page=0&size=1",
//     {
//       headers: {
//         Authorization: token,
//       },
//     }
//   );

//   const data = await res.json();
//   return Response.json(data);
// }

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   const res = await fetch(
//     `http://localhost:8084/api/ebs/v1/messages/view/${code}`
//   );

//   const data = await res.json();

//   return Response.json(data);
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/messages/view/${code}`
  );

  const data = await res.json();

  return Response.json(data);
}