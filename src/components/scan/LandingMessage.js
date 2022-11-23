/** @jsxImportSource @emotion/react */

import { LANDING_MESSAGE } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";

export default function LandingMessage() {
  return (
    <div
      css={{
        textAlign: "center",
        fontSize: "18px",
        color: GREY_150,
      }}
    >
      {LANDING_MESSAGE.SCAN}
    </div>
  );
}
