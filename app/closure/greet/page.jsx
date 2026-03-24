"use client";

import { Suspense } from "react";
import MessageSent from "./MessageSentInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageSent />
    </Suspense>
  );
}