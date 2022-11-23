/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";

export default function CodeAreaWrapper({ children, borderLeft }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "18px",
        width: "100%",
        height: "100%",
        borderLeft,
      }}
    >
      {children}
    </div>
  );
}

CodeAreaWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  borderLeft: PropTypes.string,
};
