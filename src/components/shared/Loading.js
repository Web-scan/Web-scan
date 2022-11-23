/** @jsxImportSource @emotion/react */

import { LOADING_MESSAGE } from "../../constants/ui";

export default function Loading() {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "26px",
      }}
    >
      {LOADING_MESSAGE}
    </div>
  );
}
