// "use client";

// import { Suspense } from "react";
// import FirstStepLoginInner from "./FirstStepLoginInner";

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <FirstStepLoginInner />
//     </Suspense>
//   );
// }
"use client";

import { Suspense } from "react";
import FirstStepLoginInner from "./FirstStepLoginInner";

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
        Preparing your moment...
      </h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FirstStepLoginInner />
    </Suspense>
  );
}