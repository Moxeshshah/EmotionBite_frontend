"use client";

import { Suspense } from "react";
import ApproachReceiverInner from "./ApproachReceiverInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading message...</div>}>
      <ApproachReceiverInner />
    </Suspense>
  );
}