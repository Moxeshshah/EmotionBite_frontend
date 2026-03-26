

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function ForeverStartLogin() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");

//   const [name, setName] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [step, setStep] = useState("mobile"); // mobile → otp → profile
// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [mobile, setMobile] = useState("");
// const [otp, setOtp] = useState("");
// const [token, setToken] = useState("");
// const [loading, setLoading] = useState(false);

//   // Step 1 → Send OTP (Demo)
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
//     body: JSON.stringify({mobile: "+91" + mobile, otp }),
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
//     router.push(`/propose/home?code=${code}`);
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

// //   router.push(`/propose/home?code=${code}`);
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

//   // ✅ IMPORTANT
//   localStorage.setItem("sender_name", firstName + " " + lastName);

//   router.push(`/propose/home?code=${code}`);
// };

//   return (
//     <div className="body">

//       <div className="heart-bg one">❤️</div>
//       <div className="heart-bg two">💖</div>

//       <div className="card">

//         <div className="avatar">💕</div>

//         <div className="title">Ready to Propose?</div>
//         <div className="subtitle">
//           Log in to plan your special proposal and send a heartfelt message.
//         </div>

//         {/* Name (replaces Email) */}
        

//         {/* Mobile (replaces Password) */}
//         {/* STEP 1 → MOBILE */}
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

//         {/* OTP dropdown */}
//         {showOtp && (
//           <div className="input-group">
//             <label>Enter OTP</label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </div>
//         )}

//         {/* Button */}
//        {step === "mobile" && (
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

//       {/* CSS remains EXACTLY same */}
//       <style jsx>{`
//         *{
//           margin:0;
//           padding:0;
//           box-sizing:border-box;
//           font-family:'Poppins',sans-serif;
//         }

//         .body{
//           height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           background:linear-gradient(135deg,#3a0d2e,#7b1e3b,#c72c41);
//           overflow:hidden;
//           position:relative;
//         }

//         .heart-bg{
//           position:absolute;
//           font-size:60px;
//           opacity:0.08;
//           animation:float 12s infinite ease-in-out;
//         }

//         .heart-bg.one{ top:15%; left:10%; }
//         .heart-bg.two{ bottom:20%; right:15%; }

//         @keyframes float{
//           0%{ transform:translateY(0px);}
//           50%{ transform:translateY(-30px);}
//           100%{ transform:translateY(0px);}
//         }

//         .card{
//           width:420px;
//           padding:45px 40px;
//           border-radius:30px;
//           background:rgba(255,255,255,0.15);
//           backdrop-filter:blur(20px);
//           box-shadow:0 30px 80px rgba(0,0,0,0.4);
//           color:#fff;
//           text-align:center;
//           position:relative;
//         }

//         .card::before{
//           content:"💍";
//           position:absolute;
//           font-size:55px;
//           top:-30px;
//           left:-20px;
//         }

//         .card::after{
//           content:"🌹";
//           position:absolute;
//           font-size:50px;
//           bottom:-30px;
//           right:-20px;
//         }

//         .avatar{
//           width:95px;
//           height:95px;
//           border-radius:50%;
//           margin:0 auto 20px;
//           background:linear-gradient(135deg,#ff758c,#ff7eb3);
//           display:flex;
//           align-items:center;
//           justify-content:center;
//           font-size:40px;
//           box-shadow:0 10px 30px rgba(0,0,0,0.4);
//         }

//         .title{
//           font-size:26px;
//           font-weight:700;
//           margin-bottom:8px;
//         }

//         .subtitle{
//           font-size:14px;
//           opacity:0.9;
//           margin-bottom:30px;
//         }

//         .input-group{
//           margin-bottom:18px;
//           text-align:left;
//         }

//         .input-group label{
//           font-size:13px;
//           font-weight:500;
//         }

//         .input-group input{
//           width:100%;
//           margin-top:6px;
//           padding:14px;
//           border-radius:14px;
//           border:none;
//           background:rgba(255,255,255,0.25);
//           color:white;
//           outline:none;
//         }

//         .input-group input::placeholder{
//           color:rgba(255,255,255,0.8);
//         }

//         .btn-login{
//           width:100%;
//           padding:15px;
//           border:none;
//           border-radius:25px;
//           background:linear-gradient(90deg,#ff758c,#ff7eb3);
//           color:white;
//           font-weight:600;
//           cursor:pointer;
//           margin-top:10px;
//           transition:0.3s;
//           box-shadow:0 10px 30px rgba(0,0,0,0.4);
//         }

//         .btn-login:hover{
//           transform:translateY(-3px);
//         }

//         .footer{
//           margin-top:25px;
//           font-size:13px;
//           opacity:0.9;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ForeverStartLogin() {
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
      router.push(`/propose/home?code=${code}`);
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
    router.push(`/propose/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="heart-bg one">❤️</div>
      <div className="heart-bg two">💖</div>

      <div className="card">
        <div className="avatar">💕</div>

        <div className="title">Ready to Propose?</div>
        <div className="subtitle">
          Log in to plan your special proposal and send a heartfelt message.
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
          background: linear-gradient(135deg, #3a0d2e, #7b1e3b, #c72c41);
          overflow: hidden;
          position: relative;
          padding: 16px;
          box-sizing: border-box;
          color: #fff;
        }

        .heart-bg {
          position: absolute;
          font-size: 60px;
          opacity: 0.08;
          animation: float 12s infinite ease-in-out;
          pointer-events: none;
        }

        .heart-bg.one {
          top: 15%;
          left: 10%;
        }

        .heart-bg.two {
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
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          color: #fff;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .card::before {
          content: "💍";
          position: absolute;
          font-size: 55px;
          top: -30px;
          left: -20px;
        }

        .card::after {
          content: "🌹";
          position: absolute;
          font-size: 50px;
          bottom: -30px;
          right: -20px;
        }

        .avatar {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #ff758c, #ff7eb3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.2;
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
          background: rgba(255, 255, 255, 0.25);
          color: white;
          outline: none;
          font-size: 14px;
        }

        .input-group input::placeholder {
          color: rgba(255, 255, 255, 0.8);
        }

        .btn-login {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          font-size: 14px;
        }

        .btn-login:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .card {
            padding: 36px 24px;
            border-radius: 24px;
          }

          .avatar {
            width: 84px;
            height: 84px;
            font-size: 36px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          .card {
            padding: 28px 18px;
            border-radius: 20px;
          }

          .heart-bg {
            font-size: 44px;
          }

          .card::before,
          .card::after {
            font-size: 40px;
          }

          .avatar {
            width: 76px;
            height: 76px;
            font-size: 32px;
          }

          .title {
            font-size: 22px;
          }

          .subtitle {
            font-size: 12.5px;
            margin-bottom: 24px;
          }

          .input-group input {
            padding: 12px;
            font-size: 13px;
          }

          .btn-login {
            padding: 13px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}