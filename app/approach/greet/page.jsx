"use client";

import { Suspense } from "react";
import FirstStepGreetInner from "./FirstStepGreetInner";
import "./greet.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FirstStepGreetInner />
    </Suspense>
  );
}