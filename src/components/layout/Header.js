/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import PropTypes from "prop-types";

import { GREY_50, GREY_100 } from "../../constants/color";

export default function Header({ children }) {
  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        width: "100%",
        height: "86px",
        backgroundColor: GREY_50,
        boxShadow: `0 0 6px ${GREY_100}`,
      })}
    >
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
