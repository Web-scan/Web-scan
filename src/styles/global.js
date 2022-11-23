import { Global } from "@emotion/react";

const style = {
  "*, ::after, ::before": {
    boxSizing: "border-box",
  },
  "*": {
    margin: 0,
    padding: 0,
    border: 0,
  },
  "html, body, #root": {
    height: "100%",
    overflow: "hidden",
  },
  ".highlight": {
    backgroundColor: "#fcddec",
    boxShadow: "#fcddec 0px 0px 0px 2px",
  },
};

export default function GlobalStyle() {
  return <Global styles={style} />;
}
