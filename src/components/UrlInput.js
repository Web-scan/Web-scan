/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { GREY_100, WHITE } from "../constants/color";
import { HEADER_INPUT } from "../constants/ui";

export default function UrlInput() {
  return (
    <input
      placeholder={HEADER_INPUT}
      css={css({
        padding: "14px 20px",
        width: "800px",
        height: "100%",
        backgroundColor: WHITE,
        borderRadius: "40px",
        fontSize: "16px",
        color: GREY_100,
      })}
    />
  );
}
