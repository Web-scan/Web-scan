/** @jsxImportSource @emotion/react */
import { useRef } from "react";

import PropTypes from "prop-types";

import Button from "../shared/Button";
import Editor from "../shared/Editor";
import Modal from "../shared/Modal";

import { BUTTON, CODE_AREA, MODAL_HEADER } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";
import FileOpenButton from "./FileOpenButton";

export default function LoadedFileCode({
  code,
  handleChange,
  handleClick,
  isModalOpen,
  handleModalClose,
  saveResult,
}) {
  const fileInput = useRef(null);
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <div css={textStyle}>{CODE_AREA.LOADED_FILE_CODE}</div>
        <div>
          <FileOpenButton
            ref={fileInput}
            handleChange={handleFileChange}
            handleClick={() => fileInput.current.click()}
          />
          <Button text={BUTTON.SAVE} handleClick={handleClick} />
        </div>
      </div>
      <Editor
        code={code}
        handleChange={handleChange}
        width={(window.innerWidth * 0.5 - 36).toString() + "px"}
      />
      <Modal
        isModalOpen={isModalOpen}
        handleClose={handleModalClose}
        header={MODAL_HEADER.SAVE_RESULT}
        content={saveResult}
      />
    </>
  );
}

const textStyle = {
  fontSize: "16px",
  color: GREY_150,
};

LoadedFileCode.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  saveResult: PropTypes.string,
};
