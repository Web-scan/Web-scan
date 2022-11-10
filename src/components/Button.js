/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import PropTypes from "prop-types";

import { GREY_50 } from "../constants/color";

export default function Button({ text, width, height, borderRadius }) {
  return (
    <button
      css={css({
        width,
        height,
        borderRadius,
        backgroundColor: GREY_50,
      })}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
};
