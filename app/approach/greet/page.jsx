// "use client";

// import { Suspense } from "react";
// import FirstStepGreetInner from "./FirstStepGreetInner";

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <FirstStepGreetInner />
//     </Suspense>
//   );
// }
"use client";

import { Suspense } from "react";
import FirstStepGreetInner from "./FirstStepGreetInner";

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
        Someone wants to say hi...
      </h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FirstStepGreetInner />
    </Suspense>
  );
}