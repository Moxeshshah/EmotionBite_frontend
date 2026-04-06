import { Suspense } from "react";
import LoveReceiver from "./LoveReceiverClient";
import "./receiver.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveReceiver />
    </Suspense>
  );
}