/** @jsxImportSource @emotion/react */

import { forwardRef } from "react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import { BUTTON } from "../../constants/ui";

function FileOpenButton({ onChange, onClick }, ref) {
  return (
    <>
      <input
        type="file"
        ref={ref}
        onChange={onChange}
        css={{
          display: "none",
        }}
        data-testid="file-input"
      />
      <Button text={BUTTON.OPEN} onClick={onClick} marginRight="16px" />
    </>
  );
}

export default forwardRef(FileOpenButton);

FileOpenButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
