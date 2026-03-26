import { Suspense } from "react";
import ScanPage from "./ScanClient";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScanPage />
    </Suspense>
  );
}