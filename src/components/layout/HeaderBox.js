/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import { GREY_50, GREY_150 } from "../../constants/color";

export default function HeaderBox({ children }) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        width: "100%",
        height: "86px",
        backgroundColor: GREY_50,
        boxShadow: `0 0 6px ${GREY_150}`,
        zIndex: 999,
      }}
    >
      {children}
    </div>
  );
}

HeaderBox.propTypes = {
  children: PropTypes.node.isRequired,
};
