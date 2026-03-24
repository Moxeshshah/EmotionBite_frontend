import { Suspense } from "react";
import ProposalGreet from "./ProposeGreetClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalGreet />
    </Suspense>
  );
}