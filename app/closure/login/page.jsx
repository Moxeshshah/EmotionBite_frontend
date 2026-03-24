import { Suspense } from "react";
import ClosureLogin from "./ClosureLoginClient";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClosureLogin />
    </Suspense>
  );
}