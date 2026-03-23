import twilio from "twilio";

const accountSid = "ACxxxxxxxxxxxx";
const authToken = "your_auth_token";
const fromNumber = "+1234567890";

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, name } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    await client.messages.create({
      body: `Hi ${name}, your OTP is ${otp}`,
      from: fromNumber,
      to: phone,
    });

    return res.status(200).json({ success: true, otp }); // ✅ must return JSON
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}