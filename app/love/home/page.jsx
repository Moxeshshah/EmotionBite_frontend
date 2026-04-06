import { Suspense } from "react";
import LoveMessage from "./LoveMessageClient";
import "./home.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveMessage />
    </Suspense>
  );
}