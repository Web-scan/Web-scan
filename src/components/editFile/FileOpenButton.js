/** @jsxImportSource @emotion/react */

import { forwardRef } from "react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import { BUTTON } from "../../constants/ui";

function FileOpenButton({ handleChange, handleClick }, ref) {
  return (
    <>
      <input
        type="file"
        ref={ref}
        onChange={handleChange}
        css={{
          display: "none",
        }}
      />
      <Button text={BUTTON.OPEN} handleClick={handleClick} marginRight="16px" />
    </>
  );
}

export default forwardRef(FileOpenButton);

FileOpenButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
