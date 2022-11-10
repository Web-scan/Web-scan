/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import PropTypes from "prop-types";

export default function ContentBox({ children }) {
  return (
    <div
      css={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "6px",
        width: "100%",
        height: "calc(100vh - 92px)",
      })}
    >
      {children}
    </div>
  );
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
