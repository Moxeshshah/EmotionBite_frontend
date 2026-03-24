import { Suspense } from "react";
import ProposalPlanner from "./ProposeMessageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalPlanner />
    </Suspense>
  );
}