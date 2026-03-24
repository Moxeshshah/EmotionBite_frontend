"use client";

import { Suspense } from "react";
import ApologyLoginInner from "./ApologyLoginInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApologyLoginInner />
    </Suspense>
  );
}