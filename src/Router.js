import { Routes, Route } from "react-router-dom";

import Scan from "./pages/Scan";
import EditFile from "./pages/EditFile";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Scan />} />
      <Route path="/edit" element={<EditFile />} />
    </Routes>
  );
}
