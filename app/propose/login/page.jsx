import { Suspense } from "react";
import ForeverStartLogin from "./ProposeLoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForeverStartLogin />
    </Suspense>
  );
}