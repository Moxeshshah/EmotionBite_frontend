import { Suspense } from "react";
import CongratsLogin from "./CongratsLoginClient";
import "./login.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratsLogin />
    </Suspense>
  );
}