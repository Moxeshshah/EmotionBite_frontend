import { Suspense } from "react";
import ReceiverLetter from "./ReceiverLetterClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading message...</div>}>
      <ReceiverLetter />
    </Suspense>
  );
}