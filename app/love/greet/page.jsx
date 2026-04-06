import { Suspense } from "react";
import LoveGreet from "./LoveGreetClient";
import "./greet.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveGreet />
    </Suspense>
  );
}