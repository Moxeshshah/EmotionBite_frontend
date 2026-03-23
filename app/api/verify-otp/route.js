let otpStore = {}; // same store as above (demo)

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, mobileNumber, otp } = body;

    if (!name || !mobileNumber || !otp) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (otpStore[mobileNumber] !== otp) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // OTP verified → remove it
    delete otpStore[mobileNumber];

    // Demo token (replace with JWT in production)
    const token = Math.random().toString(36).substring(2, 15);

    return new Response(JSON.stringify({ message: "Login successful", token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}