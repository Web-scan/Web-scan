/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";

import Editor from "../shared/Editor";

import { CODE_AREA } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";

export default function ScannedComponentCode({ code, handleChange }) {
  return (
    <>
      <div css={{ ...textStyle, height: "40px" }}>
        {CODE_AREA.SCANNED_ELEMENT_COMPONENT_CODE}
      </div>
      <Editor
        code={code}
        handleChange={handleChange}
        width={(window.innerWidth * 0.5 - 36).toString() + "px"}
      />
    </>
  );
}

const textStyle = {
  fontSize: "16px",
  color: GREY_150,
};

ScannedComponentCode.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
