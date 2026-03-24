import { Suspense } from "react";
import CongratsConnect from "./CongratsConnectClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratsConnect />
    </Suspense>
  );
}