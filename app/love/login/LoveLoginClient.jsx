// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function LoveLogin() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const code = params.get("code");
// const [step, setStep] = useState("mobile"); 
// // mobile → otp → profile → done

// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [token, setToken] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Step 1 → Send OTP (Demo)
// const handleSendOtp = async () => {
//   if (!/^[0-9]{10}$/.test(mobile)) {
//     alert("Enter valid number");
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
//     router.push(`/love/home?code=${code}`);
//   } else {
//     setStep("profile");
//   }

//   setLoading(false);
// };
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

//   router.push(`/love/home?code=${code}`);
// };

//   return (
//     <div className="body">
//       <div className="card">

//         <div className="avatar-section">
//           <div className="avatar promo">
//             <img src="https://randomuser.me/api/portraits/women/44.jpg" />
//             <div className="tag">Promo 🔥</div>
//           </div>

//           <div className="avatar you">
//             <img src="https://randomuser.me/api/portraits/women/65.jpg" />
//             <div className="tag">You 👍</div>
//           </div>
//         </div>

//         <div className="heart-section">
//           <div className="hand left"></div>
//           <div className="heart"></div>
//           <div className="hand right"></div>
//         </div>

//         <h3 className="title">Welcome, Let’s Sign In</h3>

//         {/* Name (replaces email) */}
//        {/* STEP 1 → MOBILE */}
// {step === "mobile" && (
//   <div className="input-group password">
//     <input
//       type="text"
//       placeholder="Mobile Number"
//       value={mobile}
//       onChange={(e) => setMobile(e.target.value)}
//     />
//     <span>📱</span>
//   </div>
// )}

// {/* STEP 2 → OTP */}
// {step === "otp" && (
//   <div className="input-group password">
//     <input
//       type="text"
//       placeholder="Enter OTP"
//       value={otp}
//       onChange={(e) => setOtp(e.target.value)}
//     />
//     <span>🔑</span>
//   </div>
// )}

// {/* STEP 3 → PROFILE */}
// {step === "profile" && (
//   <>
//     <div className="input-group">
//       <input
//         type="text"
//         placeholder="First Name"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />
//     </div>

//     <div className="input-group">
//       <input
//         type="text"
//         placeholder="Last Name"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />
//     </div>
//   </>
// )}

//         {/* OTP dropdown (same style) */}
//         {/* {showOtp && (
//           <div className="input-group password">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <span>🔑</span>
//           </div>
//         )} */}

//         <div className="button-row">
//   {step === "mobile" && (
//     <button className="btn-primary" onClick={handleSendOtp}>
//       Send OTP
//     </button>
//   )}

//   {step === "otp" && (
//     <button className="btn-primary" onClick={handleVerifyOtp}>
//       {loading ? "Please wait..." : "Verify OTP"}
//     </button>
//   )}

//   {step === "profile" && (
//     <button className="btn-primary" onClick={handleCompleteProfile}>
//       Submit
//     </button>
//   )}
// </div>
//         <div className="register">
//           OTP verification is in demo mode
//         </div>

//       </div>

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
//           background:#e7c8d2;
//         }

//         .card{
//           width:360px;
//           background:linear-gradient(180deg,#fbe3ea,#ffffff);
//           border-radius:40px;
//           padding:30px 25px;
//           box-shadow:0 25px 60px rgba(0,0,0,0.08);
//           position:relative;
//           overflow:hidden;
//         }

//         .avatar-section{
//           display:flex;
//           justify-content:space-between;
//           margin-bottom:20px;
//         }

//         .avatar{
//           width:90px;
//           height:90px;
//           border-radius:50%;
//           overflow:hidden;
//           position:relative;
//         }

//         .avatar img{
//           width:100%;
//           height:100%;
//           object-fit:cover;
//         }

//         .promo{
//           border:5px solid #ff2e63;
//         }

//         .you{
//           border:5px solid #f3d4db;
//         }

//         .tag{
//           position:absolute;
//           bottom:-10px;
//           left:50%;
//           transform:translateX(-50%);
//           background:#ff2e63;
//           color:#fff;
//           padding:6px 14px;
//           font-size:12px;
//           border-radius:20px;
//           font-weight:500;
//         }

//         .you .tag{
//           background:#fff;
//           color:#ff2e63;
//           border:1px solid #ffd4df;
//         }

//         .heart-section{
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           margin:30px 0 25px;
//           position:relative;
//           height:120px;
//         }

//         .hand{
//           width:120px;
//           height:70px;
//           background:#f7c6cf;
//           border-radius:50px;
//           position:absolute;
//         }

//         .hand.left{
//           left:-10px;
//           transform:rotate(-10deg);
//         }

//         .hand.right{
//           right:-10px;
//           transform:rotate(10deg);
//         }

//         .heart{
//           width:80px;
//           height:80px;
//           background:#ff2e63;
//           position:relative;
//           transform:rotate(-45deg);
//           box-shadow:0 10px 25px rgba(255,46,99,0.4);
//         }

//         .heart:before,
//         .heart:after{
//           content:"";
//           position:absolute;
//           width:80px;
//           height:80px;
//           background:#ff2e63;
//           border-radius:50%;
//         }

//         .heart:before{
//           top:-40px;
//           left:0;
//         }

//         .heart:after{
//           left:40px;
//           top:0;
//         }

//         .title{
//           text-align:center;
//           color:#ff2e63;
//           font-weight:600;
//           margin-bottom:20px;
//         }

//         .input-group{
//           margin-bottom:15px;
//         }

//         .input-group input{
//           width:100%;
//           padding:14px 15px;
//           border-radius:15px;
//           border:none;
//           background:#f6f6f6;
//           outline:none;
//           font-size:14px;
//           box-shadow:inset 0 3px 8px rgba(0,0,0,0.05);
//         }

//         .password{
//           position:relative;
//         }

//         .password span{
//           position:absolute;
//           right:15px;
//           top:50%;
//           transform:translateY(-50%);
//           color:#999;
//         }

//         .button-row{
//           display:flex;
//           gap:12px;
//           margin-top:15px;
//         }

//         .btn-primary{
//           flex:1;
//           padding:14px;
//           border:none;
//           border-radius:18px;
//           background:linear-gradient(90deg,#ff2e63,#ff6b8f);
//           color:white;
//           font-weight:500;
//           cursor:pointer;
//           box-shadow:0 8px 20px rgba(255,46,99,0.4);
//         }

//         .btn-finger{
//           width:60px;
//           border-radius:18px;
//           border:none;
//           background:#f8d9e0;
//           font-size:22px;
//         }

//         .register{
//           text-align:center;
//           margin-top:25px;
//           font-size:13px;
//           color:#777;
//         }

//         .register span{
//           color:#ff2e63;
//           font-weight:600;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoveLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  const [step, setStep] = useState("mobile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
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
      alert("Enter valid number");
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
      router.push(`/love/home?code=${code}`);
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

    router.push(`/love/home?code=${code}`);
  };

  return (
    <div className="body">
      <div className="card">
        <div className="avatar-section">
          <div className="avatar promo">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Promo" />
            <div className="tag">Promo 🔥</div>
          </div>

          <div className="avatar you">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="You" />
            <div className="tag">You 👍</div>
          </div>
        </div>

        <div className="heart-section">
          <div className="hand left" />
          <div className="heart" />
          <div className="hand right" />
        </div>

        <h3 className="title">Welcome, Let’s Sign In</h3>

        {step === "mobile" && (
          <div className="input-group password">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <span>📱</span>
          </div>
        )}

        {step === "otp" && (
          <div className="input-group password">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span>🔑</span>
          </div>
        )}

        {step === "profile" && (
          <>
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="button-row">
          {step === "mobile" && (
            <button className="btn-primary" onClick={handleSendOtp}>
              {loading ? "Please wait..." : "Send OTP"}
            </button>
          )}

          {step === "otp" && (
            <button className="btn-primary" onClick={handleVerifyOtp}>
              {loading ? "Please wait..." : "Verify OTP"}
            </button>
          )}

          {step === "profile" && (
            <button className="btn-primary" onClick={handleCompleteProfile}>
              {loading ? "Please wait..." : "Submit"}
            </button>
          )}
        </div>

        <div className="register">OTP verification is in demo mode</div>
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
          background: #e7c8d2;
          padding: 16px;
          box-sizing: border-box;
        }

        .card {
          width: min(360px, 100%);
          background: linear-gradient(180deg, #fbe3ea, #ffffff);
          border-radius: 40px;
          padding: 30px 25px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .avatar-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .promo {
          border: 5px solid #ff2e63;
        }

        .you {
          border: 5px solid #f3d4db;
        }

        .tag {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #ff2e63;
          color: #fff;
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 20px;
          font-weight: 500;
          white-space: nowrap;
        }

        .you .tag {
          background: #fff;
          color: #ff2e63;
          border: 1px solid #ffd4df;
        }

        .heart-section {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30px 0 25px;
          position: relative;
          height: 120px;
        }

        .hand {
          width: 120px;
          height: 70px;
          background: #f7c6cf;
          border-radius: 50px;
          position: absolute;
        }

        .hand.left {
          left: -10px;
          transform: rotate(-10deg);
        }

        .hand.right {
          right: -10px;
          transform: rotate(10deg);
        }

        .heart {
          width: 80px;
          height: 80px;
          background: #ff2e63;
          position: relative;
          transform: rotate(-45deg);
          box-shadow: 0 10px 25px rgba(255, 46, 99, 0.4);
        }

        .heart:before,
        .heart:after {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          background: #ff2e63;
          border-radius: 50%;
        }

        .heart:before {
          top: -40px;
          left: 0;
        }

        .heart:after {
          left: 40px;
          top: 0;
        }

        .title {
          text-align: center;
          color: #ff2e63;
          font-weight: 600;
          margin-bottom: 20px;
          font-size: 20px;
          line-height: 1.2;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group input {
          width: 100%;
          padding: 14px 15px;
          border-radius: 15px;
          border: none;
          background: #f6f6f6;
          outline: none;
          font-size: 14px;
          box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.05);
        }

        .password {
          position: relative;
        }

        .password span {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .button-row {
          display: flex;
          gap: 12px;
          margin-top: 15px;
        }

        .btn-primary {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(90deg, #ff2e63, #ff6b8f);
          color: white;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 46, 99, 0.4);
          font-size: 14px;
          transition: 0.3s;
        }

        .register {
          text-align: center;
          margin-top: 25px;
          font-size: 13px;
          color: #777;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .body {
            padding: 14px;
          }

          .card {
            padding: 28px 20px;
            border-radius: 32px;
          }

          .avatar {
            width: 80px;
            height: 80px;
          }

          .heart-section {
            height: 110px;
          }

          .hand {
            width: 100px;
            height: 62px;
          }

          .heart {
            width: 72px;
            height: 72px;
          }

          .heart:before,
          .heart:after {
            width: 72px;
            height: 72px;
          }

          .title {
            font-size: 19px;
          }
        }

        @media (max-width: 480px) {
          .body {
            padding: 12px;
          }

          .card {
            padding: 24px 16px;
            border-radius: 26px;
          }

          .avatar-section {
            gap: 10px;
            margin-bottom: 16px;
          }

          .avatar {
            width: 72px;
            height: 72px;
          }

          .tag {
            font-size: 11px;
            padding: 5px 12px;
          }

          .heart-section {
            height: 96px;
            margin: 22px 0 18px;
          }

          .hand {
            width: 84px;
            height: 52px;
          }

          .hand.left {
            left: -6px;
          }

          .hand.right {
            right: -6px;
          }

          .heart {
            width: 62px;
            height: 62px;
          }

          .heart:before,
          .heart:after {
            width: 62px;
            height: 62px;
          }

          .heart:before {
            top: -31px;
          }

          .heart:after {
            left: 31px;
          }

          .title {
            font-size: 18px;
            margin-bottom: 16px;
          }

          .input-group input {
            padding: 12px 13px;
            font-size: 13px;
          }

          .button-row {
            gap: 10px;
          }

          .btn-primary {
            padding: 13px;
            font-size: 13px;
            border-radius: 16px;
          }

          .register {
            margin-top: 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}