import { Suspense } from "react";
import LoveMessage from "./LoveMessageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveMessage />
    </Suspense>
  );
}