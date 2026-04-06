// "use client";

// import { Suspense } from "react";
// import FirstMessageInner from "./FirstMessageInner";

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <FirstMessageInner />
//     </Suspense>
//   );
// }
"use client";

import { Suspense } from "react";
import FirstMessageInner from "./FirstMessageInner";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <h2 className="loading-title">
        Someone is reaching out to you...
      </h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FirstMessageInner />
    </Suspense>
  );
}