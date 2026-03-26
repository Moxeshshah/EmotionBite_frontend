// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function FirstStepLogin() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   const [name, setName] = useState("");
//   const [showOtp, setShowOtp] = useState(false);

//   const [step, setStep] = useState("mobile");
// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [mobile, setMobile] = useState("");
// const [otp, setOtp] = useState("");
// const [token, setToken] = useState("");
// const [loading, setLoading] = useState(false);

//   // Step 1 → Show OTP field
// const handleSendOtp = async () => {
//   if (!/^[0-9]{10}$/.test(mobile)) {
//     alert("Enter valid 10 digit mobile number");
//     return;
//   }

//   setLoading(true);

//   const res = await fetch("/api/otp/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ mobile: "+91" +mobile }),
//   });

//   if (!res.ok) {
//     alert("Failed to send OTP");
//     setLoading(false);
//     return;
//   }

//   setStep("otp");
//   setLoading(false);
// };

//   // Step 2 → Verify OTP & Login
// const handleVerifyOtp = async () => {
//   if (!otp) return alert("Enter OTP");

//   setLoading(true);

//   const res = await fetch("/api/otp/verify", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ mobile: "+91" +mobile, otp }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     alert(data.message);
//     setLoading(false);
//     return;
//   }

//   // ✅ Save token
//   setToken(data.token);
//   localStorage.setItem("token", data.token);
//   localStorage.setItem("sender_mobile", mobile);

//   // ✅ Decide next step
//   if (data.profileComplete) {
//     router.push(`/approach/home?code=${code}`);
//   } else {
//     setStep("profile");
//   }

//   setLoading(false);
// };
// // const handleCompleteProfile = async () => {
// //   if (!firstName || !lastName) {
// //     alert("Enter full name");
// //     return;
// //   }

// //   setLoading(true);

// //   const res = await fetch("/api/complete-profile", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${token}`,
// //     },
// //     body: JSON.stringify({
// //       firstName,
// //       lastName,
// //     }),
// //   });

// //   if (!res.ok) {
// //     alert("Profile update failed");
// //     setLoading(false);
// //     return;
// //   }

// //   router.push(`/approach/home?code=${code}`);
// // };
// const handleCompleteProfile = async () => {
//   if (!firstName || !lastName) {
//     alert("Enter full name");
//     return;
//   }

//   setLoading(true);

//   const res = await fetch("/api/complete-profile", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       firstName,
//       lastName,
//     }),
//   });

//   if (!res.ok) {
//     alert("Profile update failed");
//     setLoading(false);
//     return;
//   }

//   // ✅ FIX
//   localStorage.setItem("sender_name", firstName + " " + lastName);

//   router.push(`/approach/home?code=${code}`);
// };
//   return (
//     <div className="body">
//       <div className="shape one"></div>
//       <div className="shape two"></div>

//       <div className="card">
//         <div className="avatar">😊</div>

//         <div className="title">Take Your First Step</div>
//         <div className="subtitle">
//           Enter your details to send your first message.
//         </div>

//         {/* Name */}
//        {/* STEP 1 → MOBILE */}
// {step === "mobile" && (
//   <div className="input-group">
//     <label>Mobile Number</label>
//     <input
//       type="text"
//       placeholder="Enter mobile number"
//       value={mobile}
//       onChange={(e) => setMobile(e.target.value)}
//     />
//   </div>
// )}

// {/* STEP 2 → OTP */}
// {step === "otp" && (
//   <div className="input-group">
//     <label>Enter OTP</label>
//     <input
//       type="text"
//       placeholder="Enter OTP"
//       value={otp}
//       onChange={(e) => setOtp(e.target.value)}
//     />
//   </div>
// )}

// {/* STEP 3 → PROFILE */}
// {step === "profile" && (
//   <>
//     <div className="input-group">
//       <label>First Name</label>
//       <input
//         type="text"
//         placeholder="Enter first name"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />
//     </div>

//     <div className="input-group">
//       <label>Last Name</label>
//       <input
//         type="text"
//         placeholder="Enter last name"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />
//     </div>
//   </>
// )}
//   {step === "mobile" && (
//   <button className="btn-login" onClick={handleSendOtp}>
//     Send OTP
//   </button>
// )}

// {step === "otp" && (
//   <button className="btn-login" onClick={handleVerifyOtp}>
//     {loading ? "Please wait..." : "Verify OTP"}
//   </button>
// )}

// {step === "profile" && (
//   <button className="btn-login" onClick={handleCompleteProfile}>
//     Submit
//   </button>
// )}
//       </div>

//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }

//         .body {
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg,#89f7fe,#66a6ff,#a18cd1);
//           overflow: hidden;
//           position: relative;
//         }

//         .shape {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.2;
//           animation: float 10s infinite ease-in-out;
//         }

//         .shape.one {
//           width: 120px;
//           height: 120px;
//           background: #ffffff;
//           top: 15%;
//           left: 10%;
//         }

//         .shape.two {
//           width: 90px;
//           height: 90px;
//           background: #ffdee9;
//           bottom: 20%;
//           right: 15%;
//         }

//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-30px); }
//           100% { transform: translateY(0px); }
//         }

//         .card {
//           width: 420px;
//           padding: 45px 40px;
//           border-radius: 30px;
//           background: rgba(255,255,255,0.2);
//           backdrop-filter: blur(20px);
//           box-shadow: 0 30px 80px rgba(0,0,0,0.25);
//           color: #fff;
//           text-align: center;
//         }

//         .avatar {
//           width: 90px;
//           height: 90px;
//           border-radius: 50%;
//           margin: 0 auto 20px;
//           background: linear-gradient(135deg,#ff9a9e,#fad0c4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 38px;
//         }

//         .title {
//           font-size: 26px;
//           font-weight: 700;
//           margin-bottom: 8px;
//         }

//         .subtitle {
//           font-size: 14px;
//           opacity: 0.9;
//           margin-bottom: 30px;
//         }

//         .input-group {
//           margin-bottom: 18px;
//           text-align: left;
//           animation: fadeDown 0.4s ease;
//         }

//         .input-group label {
//           font-size: 13px;
//           font-weight: 500;
//         }

//         .input-group input {
//           width: 100%;
//           margin-top: 6px;
//           padding: 14px;
//           border-radius: 14px;
//           border: none;
//           background: rgba(255,255,255,0.3);
//           color: white;
//           outline: none;
//         }

//         .input-group input::placeholder {
//           color: rgba(255,255,255,0.8);
//         }

//         .btn-login {
//           width: 100%;
//           padding: 15px;
//           border: none;
//           border-radius: 20px;
//           background: linear-gradient(90deg,#ff9a9e,#fad0c4);
//           color: #333;
//           font-weight: 600;
//           cursor: pointer;
//           margin-top: 10px;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.3);
//         }

//         .footer {
//           margin-top: 20px;
//           font-size: 12px;
//           opacity: 0.8;
//         }

//         @keyframes fadeDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function FirstStepLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [name, setName] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [step, setStep] = useState("mobile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/otp/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "+91" + mobile }),
    });

    if (!res.ok) {
      alert("Failed to send OTP");
      setLoading(false);
      return;
    }

    setStep("otp");
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    const res = await fetch("/api/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "+91" + mobile, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      setLoading(false);
      return;
    }

    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("sender_mobile", mobile);

    if (data.profileComplete) {
      router.push(`/approach/home?code=${code}`);
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

    localStorage.setItem("sender_name", firstName + " " + lastName);
    router.push(`/approach/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="shape one"></div>
      <div className="shape two"></div>

      <div className="card">
        <div className="avatar">😊</div>

        <div className="title">Take Your First Step</div>
        <div className="subtitle">
          Enter your details to send your first message.
        </div>

        {step === "mobile" && (
          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}

        {step === "otp" && (
          <div className="input-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {step === "profile" && (
          <>
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input-group">
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

        {step === "mobile" && (
          <button className="btn-login" onClick={handleSendOtp}>
            {loading ? "Please wait..." : "Send OTP"}
          </button>
        )}

        {step === "otp" && (
          <button className="btn-login" onClick={handleVerifyOtp}>
            {loading ? "Please wait..." : "Verify OTP"}
          </button>
        )}

        {step === "profile" && (
          <button className="btn-login" onClick={handleCompleteProfile}>
            {loading ? "Please wait..." : "Submit"}
          </button>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #89f7fe, #66a6ff, #a18cd1);
          overflow: hidden;
          position: relative;
          padding: 16px;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          animation: float 10s infinite ease-in-out;
          pointer-events: none;
        }

        .shape.one {
          width: 120px;
          height: 120px;
          background: #ffffff;
          top: 15%;
          left: 10%;
        }

        .shape.two {
          width: 90px;
          height: 90px;
          background: #ffdee9;
          bottom: 20%;
          right: 15%;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .card {
          width: min(420px, 100%);
          padding: 45px 40px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
          color: #fff;
          text-align: center;
          z-index: 2;
          position: relative;
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .input-group {
          margin-bottom: 18px;
          text-align: left;
          animation: fadeDown 0.4s ease;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          margin-top: 6px;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          outline: none;
        }

        .input-group input::placeholder {
          color: rgba(255, 255, 255, 0.8);
        }

        .btn-login {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 20px;
          background: linear-gradient(90deg, #ff9a9e, #fad0c4);
          color: #333;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          opacity: 0.8;
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .card {
            padding: 36px 26px;
            border-radius: 24px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 24px;
          }

          .avatar {
            width: 80px;
            height: 80px;
            font-size: 34px;
          }

          .shape.one {
            width: 90px;
            height: 90px;
          }

          .shape.two {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 22px;
          }

          .title {
            font-size: 22px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 20px;
          }

          .avatar {
            width: 72px;
            height: 72px;
            font-size: 30px;
          }

          .input-group input {
            padding: 12px;
            font-size: 13px;
          }

          .btn-login {
            padding: 13px;
            font-size: 14px;
          }

          .shape.one {
            top: 10%;
            left: 4%;
          }

          .shape.two {
            bottom: 10%;
            right: 6%;
          }
        }
      `}</style>
    </div>
  );
}