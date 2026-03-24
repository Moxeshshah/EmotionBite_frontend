import { Suspense } from "react";
import LoveGreet from "./LoveGreetClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveGreet />
    </Suspense>
  );
}