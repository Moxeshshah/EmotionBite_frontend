"use client";

import { Suspense } from "react";
import FirstMessageInner from "./FirstMessageInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FirstMessageInner />
    </Suspense>
  );
}