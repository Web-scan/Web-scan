import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Scan = lazy(() => import("./pages/Scan"));
const EditFile = lazy(() => import("./pages/EditFile"));
const Preview = lazy(() => import("./pages/Preview"));
import Loading from "../src/components/shared/Loading";

export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Scan />} />
        <Route path="/edit" element={<EditFile />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Suspense>
  );
}
