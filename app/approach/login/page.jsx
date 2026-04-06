"use client";

import { Suspense } from "react";
import FirstStepLoginInner from "./FirstStepLoginInner";
import "./login.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FirstStepLoginInner />
    </Suspense>
  );
}