import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Layout from "../src/components/layout";
import GlobalStyle from "./styles/global";
import Router from "./Router";

function App() {
  return (
    <HashRouter>
      <RecoilRoot>
        <GlobalStyle />
        <Layout>
          <Router />
        </Layout>
      </RecoilRoot>
    </HashRouter>
  );
}

export default App;
