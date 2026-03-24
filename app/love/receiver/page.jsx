import { Suspense } from "react";
import CongratsReceiverClient from "@/components/CongratsReceiverClient";
import LoveReceiver from "./LoveReceiverClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveReceiver />
    </Suspense>
  );
}