import { Suspense } from "react";
import LoveReceiver from "./LoveReceiverClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveReceiver />
    </Suspense>
  );
}