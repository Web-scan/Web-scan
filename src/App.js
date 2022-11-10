import { HashRouter } from "react-router-dom";

import Layout from "../src/components/layout";
import Router from "./Router";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Router />
      </Layout>
    </HashRouter>
  );
}

export default App;
