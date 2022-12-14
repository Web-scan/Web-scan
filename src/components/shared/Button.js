/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import { GREY_50, GREY_100, GREY_150 } from "../../constants/color";

export default function Button({
  text,
  onClick,
  marginRight,
  width,
  height,
  borderRadius,
  backgroundColor,
}) {
  return (
    <button
      onClick={onClick}
      css={{
        marginRight,
        width,
        height,
        borderRadius,
        backgroundColor,
        "&:hover": {
          backgroundColor: GREY_100,
        },
        "&:active": {
          backgroundColor: GREY_150,
        },
        fontSize: "12px",
      }}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  marginRight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  marginRight: "0px",
  width: "80px",
  height: "30px",
  borderRadius: "10px",
  backgroundColor: GREY_50,
};
