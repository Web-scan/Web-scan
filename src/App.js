import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import GlobalStyle from "./styles/global";
import Router from "./Router";

function App() {
  return (
    <HashRouter>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </HashRouter>
  );
}

export default App;
