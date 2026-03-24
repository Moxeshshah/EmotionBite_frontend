import { Suspense } from "react";

import ProposalReceiver from "./ProposeReceiverClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalReceiver />
    </Suspense>
  );
}