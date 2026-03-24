"use client";

import { Suspense } from "react";
import ApologyReceiverInner from "./ApologyReceiverInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApologyReceiverInner />
    </Suspense>
  );
}