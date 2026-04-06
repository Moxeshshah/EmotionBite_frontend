// "use client";

// import { Suspense } from "react";
// import ApproachReceiverInner from "./ApproachReceiverInner";

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading message...</div>}>
//       <ApproachReceiverInner />
//     </Suspense>
//   );
// }

"use client";

import { Suspense } from "react";
import ApproachReceiverInner from "./ApproachReceiverInner";

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
        Opening your message...
      </h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ApproachReceiverInner />
    </Suspense>
  );
}