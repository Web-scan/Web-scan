import { HashRouter } from "react-router-dom";

import Layout from "../src/components/layout";
import GlobalStyle from "./styles/global";
import Router from "./Router";

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Layout>
        <Router />
      </Layout>
    </HashRouter>
  );
}

export default App;
