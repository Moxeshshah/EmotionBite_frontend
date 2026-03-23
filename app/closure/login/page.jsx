// "use client";

// import { useRouter, useParams } from "next/navigation";

// export default function ClosureLogin() {
//   const router = useRouter();
//   const params = useParams(); // get category from URL

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // dynamic redirect
//     router.push(`/clouser/home`);
//   };
//   return (
//     <div className="body">
//       {/* Particles */}
//       <div className="particle" style={{ left: "15%", animationDelay: "0s" }} />
//       <div className="particle" style={{ left: "30%", animationDelay: "2s" }} />
//       <div className="particle" style={{ left: "50%", animationDelay: "4s" }} />
//       <div className="particle" style={{ left: "70%", animationDelay: "1s" }} />
//       <div className="particle" style={{ left: "85%", animationDelay: "3s" }} />

//       <div className="login-card">
//         <div className="avatar">🌙</div>
//         <h2>Find Your Closure</h2>
//         <div className="subtitle">
//           Some endings bring peace. Sign in to send your final message.
//         </div>

//   <form onSubmit={handleLogin}>
//               <div className="input-box">
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" required />
//           </div>

//           <div className="input-box">
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" required />
//           </div>

//           <button className="login-btn">Enter & Reflect</button>
//         </form>

//         <div className="register">
//           Need an account? <a href="#">Create Closure Space</a>
//         </div>
//       </div>

//       <div className="quote">
//         “Sometimes letting go is the most powerful closure.”
//       </div>

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap');

//         .body {
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg,#667eea,#764ba2,#6a11cb);
//           overflow: hidden;
//           position: relative;
//           font-family: 'Inter', sans-serif;
//         }

//         .particle {
//           position: absolute;
//           width: 6px;
//           height: 6px;
//           background: rgba(255,255,255,0.4);
//           border-radius: 50%;
//           animation: float 8s infinite linear;
//         }

//         @keyframes float {
//           0%{ transform:translateY(100vh); opacity:0;}
//           30%{ opacity:0.6;}
//           100%{ transform:translateY(-10vh); opacity:0;}
//         }

//         .login-card {
//           width: 390px;
//           background: rgba(255,255,255,0.12);
//           backdrop-filter: blur(18px);
//           border-radius: 22px;
//           padding: 45px 35px;
//           text-align: center;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.3);
//           border: 1px solid rgba(255,255,255,0.2);
//         }

//         .avatar { font-size:55px; margin-bottom:15px; }

//         h2 {
//           font-family:'Cormorant Garamond',serif;
//           font-size:30px;
//           color:#fff;
//           margin-bottom:10px;
//         }

//         .subtitle {
//           color:#e0e0e0;
//           font-size:14px;
//           margin-bottom:28px;
//         }

//         .input-box { margin-bottom:18px; text-align:left; }

//         .input-box label {
//           font-size:13px;
//           color:#fff;
//           display:block;
//           margin-bottom:6px;
//         }

//         .input-box input {
//           width:100%;
//           padding:12px;
//           border-radius:14px;
//           border:none;
//           outline:none;
//           background:rgba(255,255,255,0.85);
//         }

//         .login-btn {
//           width:100%;
//           padding:13px;
//           border:none;
//           border-radius:30px;
//           background: linear-gradient(to right,#4e73df,#9b59b6);
//           color:#fff;
//           cursor:pointer;
//           margin-top:10px;
//         }

//         .register {
//           margin-top:18px;
//           font-size:13px;
//           color:#ddd;
//         }

//         .register a { color:#fff; text-decoration:underline; }

//         .quote {
//           position:absolute;
//           bottom:30px;
//           font-size:13px;
//           color:rgba(255,255,255,0.6);
//           text-align:center;
//           width:100%;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ClosureLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
const [step, setStep] = useState("mobile");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [mobile, setMobile] = useState("");
const [otp, setOtp] = useState("");
const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 1 → Send OTP (Demo)
const handleSendOtp = async () => {
  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter valid 10 digit mobile number");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/otp/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });

  if (!res.ok) {
    alert("Failed to send OTP");
    setLoading(false);
    return;
  }

  setStep("otp");
  setLoading(false);
};

  // Step 2 → Verify OTP & Login
const handleVerifyOtp = async () => {
  if (!otp) return alert("Enter OTP");

  setLoading(true);

  const res = await fetch("/api/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    setLoading(false);
    return;
  }

  // ✅ Save token
  setToken(data.token);
  localStorage.setItem("token", data.token);
  localStorage.setItem("sender_mobile", mobile);

  // ✅ Next step
  if (data.profileComplete) {
    router.push(`/closure/home?code=${code}`);
  } else {
    setStep("profile");
  }

  setLoading(false);
};
const handleCompleteProfile = async () => {
  if (!firstName || !lastName) {
    alert("Enter full name");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/complete-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName,
      lastName,
    }),
  });

  if (!res.ok) {
    alert("Profile update failed");
    setLoading(false);
    return;
  }

  router.push(`/closure/home?code=${code}`);
};

  return (
    <div className="body">
      {/* Particles */}
      <div className="particle" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle" style={{ left: "85%", animationDelay: "3s" }} />

      <div className="login-card">
        <div className="avatar">🌙</div>
        <h2>Find Your Closure</h2>
        <div className="subtitle">
          Some endings bring peace. Sign in to send your final message.
        </div>

        <form>
          {/* Name (replaces Email) */}
          {/* STEP 1 → MOBILE */}
{step === "mobile" && (
  <div className="input-box">
    <label>Mobile Number</label>
    <input
      type="text"
      placeholder="Enter mobile number"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
    />
  </div>
)}

{/* STEP 2 → OTP */}
{step === "otp" && (
  <div className="input-box">
    <label>Enter OTP</label>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
  </div>
)}

{/* STEP 3 → PROFILE */}
{step === "profile" && (
  <>
    <div className="input-box">
      <label>First Name</label>
      <input
        type="text"
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="input-box">
      <label>Last Name</label>
      <input
        type="text"
        placeholder="Enter last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  </>
)}
          {/* OTP dropdown */}
         

          {/* Button */}
          {step === "mobile" && (
  <button type="button" className="login-btn" onClick={handleSendOtp}>
    Send OTP
  </button>
)}

{step === "otp" && (
  <button type="button" className="login-btn" onClick={handleVerifyOtp}>
    {loading ? "Please wait..." : "Verify OTP"}
  </button>
)}

{step === "profile" && (
  <button type="button" className="login-btn" onClick={handleCompleteProfile}>
    Submit
  </button>
)}
        </form>
      </div>

      <div className="quote">
        “Sometimes letting go is the most powerful closure.”
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap');

        .body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#667eea,#764ba2,#6a11cb);
          overflow: hidden;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          animation: float 8s infinite linear;
        }

        @keyframes float {
          0%{ transform:translateY(100vh); opacity:0;}
          30%{ opacity:0.6;}
          100%{ transform:translateY(-10vh); opacity:0;}
        }

        .login-card {
          width: 390px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(18px);
          border-radius: 22px;
          padding: 45px 35px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .avatar { font-size:55px; margin-bottom:15px; }

        h2 {
          font-family:'Cormorant Garamond',serif;
          font-size:30px;
          color:#fff;
          margin-bottom:10px;
        }

        .subtitle {
          color:#e0e0e0;
          font-size:14px;
          margin-bottom:28px;
        }

        .input-box { margin-bottom:18px; text-align:left; }

        .input-box label {
          font-size:13px;
          color:#fff;
          display:block;
          margin-bottom:6px;
        }

        .input-box input {
          width:100%;
          padding:12px;
          border-radius:14px;
          border:none;
          outline:none;
          background:rgba(255,255,255,0.85);
        }

        .login-btn {
          width:100%;
          padding:13px;
          border:none;
          border-radius:30px;
          background: linear-gradient(to right,#4e73df,#9b59b6);
          color:#fff;
          cursor:pointer;
          margin-top:10px;
        }

        .register {
          margin-top:18px;
          font-size:13px;
          color:#ddd;
        }

        .quote {
          position:absolute;
          bottom:30px;
          font-size:13px;
          color:rgba(255,255,255,0.6);
          text-align:center;
          width:100%;
        }
      `}</style>
    </div>
  );
}