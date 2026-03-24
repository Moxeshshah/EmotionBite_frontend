"use client";

import { Suspense } from "react";
import LoveSpaceInner from "./LoveSpaceInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveSpaceInner />
    </Suspense>
  );
}