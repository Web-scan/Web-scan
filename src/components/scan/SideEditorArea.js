/** @jsxImportSource @emotion/react */

import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import Editor from "../shared/Editor";

import { BUTTON, COPY } from "../../constants/ui";
import { GREY_100, GREY_150 } from "../../constants/color";

export default function SideEditorArea({ code, handleChange }) {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      alert(COPY.FAIL);
    }
  };

  return (
    <div
      css={{
        flex: 3,
        width: "100%",
        height: "100%",
        padding: "10px",
        borderLeft: `1px solid ${GREY_100}`,
        animation: `${slide} 1s 1`,
        zIndex: 999,
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "8px",
        }}
      >
        <span css={{ color: GREY_150 }}>Component Code</span>
        <Button text={BUTTON.COPY} handleClick={handleClick} />
      </div>
      <Editor
        code={code}
        width={(window.innerWidth * 0.3 - 20).toString() + "px"}
        handleChange={handleChange}
      />
    </div>
  );
}

SideEditorArea.propTypes = {
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const slide = keyframes`
  from {
    flex: 1;
  }
  to {
    flex: 3;
  }
`;
