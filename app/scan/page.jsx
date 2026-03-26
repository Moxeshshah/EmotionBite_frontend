import { Suspense } from "react";
import ScanPage from "./ScanClient";
import LoadingSpinner from "./LoadingSpinner";


export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScanPage />
    </Suspense>
  );
}