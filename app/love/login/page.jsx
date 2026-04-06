import { Suspense } from "react";
import LoveLogin from "./LoveLoginClient";
import "./login.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoveLogin />
    </Suspense>
  );
}