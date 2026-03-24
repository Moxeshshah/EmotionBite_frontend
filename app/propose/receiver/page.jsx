import { Suspense } from "react";
import CongratsReceiverClient from "@/components/CongratsReceiverClient";
import LoveReceiver from "./LoveReceiverClient";
import ProposalReceiver from "./ProposeReceiverClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalReceiver />
    </Suspense>
  );
}