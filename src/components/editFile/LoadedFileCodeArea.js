/** @jsxImportSource @emotion/react */

import { useCallback, useRef } from "react";

import fs from "fs";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "../shared/Button";
import Editor from "../shared/Editor";
import FileOpenButton from "./FileOpenButton";

import { useModal } from "../../hooks/useModal";
import localFilePathState from "../../recoil/localFilePath";
import loadedFileCodeState from "../../recoil/loadedFileCode";

import { BUTTON, CODE_AREA, MODAL_HEADER, SAVE_CODE } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";

export default function LoadedFileCodeArea() {
  const [filePath, setFilePath] = useRecoilState(localFilePathState);
  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);

  const [SaveResultModal, openModal, handleContent] = useModal(
    MODAL_HEADER.SAVE_RESULT,
  );
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleCodeChange = useCallback((code) => {
    setLoadedFileCode(code);
  }, []);

  const handleFileChange = (e) => {
    const filePath = e.target.files[0].path;
    const fileCode = fs.readFileSync(filePath, "utf8");

    setFilePath(filePath);
    handleCodeChange(fileCode);
  };

  const handleSaveClick = async () => {
    try {
      await fs.writeFile(filePath, loadedFileCode, (err) => {
        if (err) {
          handleContent(SAVE_CODE.FAIL);
          openModal();
          return;
        }

        handleContent(SAVE_CODE.SUCCESS);
        openModal();
      });
    } catch (e) {
      handleContent(SAVE_CODE.FAIL);
      openModal();
    }
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
        <div css={{ fontSize: "16px", color: GREY_150 }}>
          {CODE_AREA.LOADED_FILE_CODE}
        </div>
        <div>
          <FileOpenButton
            ref={fileInput}
            handleChange={handleFileChange}
            handleClick={() => fileInput.current.click()}
          />
          <Button
            text={BUTTON.SAVE}
            handleClick={handleSaveClick}
            marginRight="16px"
          />
          <Button
            text={BUTTON.PREVIEW}
            handleClick={() => navigate("/preview")}
          />
        </div>
      </div>
      <Editor
        code={loadedFileCode}
        handleChange={handleCodeChange}
        width={(window.innerWidth * 0.5 - 36).toString() + "px"}
      />
      <SaveResultModal />
    </>
  );
}
