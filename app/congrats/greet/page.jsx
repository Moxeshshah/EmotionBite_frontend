import { Suspense } from "react";
import CongratsGreet from "./CongratsGreetClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratsGreet />
    </Suspense>
  );
}