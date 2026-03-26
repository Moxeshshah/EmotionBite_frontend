// LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4ca2cd, #67b26f)",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          marginBottom: "20px",
          border: "3px solid rgba(255,255,255,0.6)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            animation: "scan 2s linear infinite",
          }}
        />
      </div>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "white",
          lineHeight: "1.2",
        }}
      >
        Verifying QR Code
      </h2>
      <p
        style={{
          fontSize: "14px",
          opacity: "0.9",
          color: "white",
          lineHeight: "1.6",
          textAlign: "center",
          maxWidth: "280px",
        }}
      >
        Please wait while we prepare your surprise...
      </p>
      
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}