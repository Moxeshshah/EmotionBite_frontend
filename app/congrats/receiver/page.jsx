import { Suspense } from "react";
import CongratsReceiver from "./CongratsReceiverClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratsReceiver />
    </Suspense>
  );
}