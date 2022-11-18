/** @jsxImportSource @emotion/react */

import { GREY_150 } from "../../constants/color";
import { LANDING_MESSAGE } from "../../constants/ui";

export default function LandingMessage() {
  return (
    <div
      css={{
        textAlign: "center",
        fontSize: "18px",
        color: GREY_150,
      }}
    >
      {LANDING_MESSAGE}
    </div>
  );
}
