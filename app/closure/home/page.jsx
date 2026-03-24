import { Suspense } from "react";
import ClosureSpace from "./ClosureSpaceClient";

// export const dynamic = "force-dynamic"; // 🔥 IMPORTANT

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClosureSpace />
    </Suspense>
  );
}