"use client";

import { Suspense } from "react";
import ApproachReceiverInner from "./ApproachReceiverInner";
import "./receiver.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading message...</div>}>
      <ApproachReceiverInner />
    </Suspense>
  );
}