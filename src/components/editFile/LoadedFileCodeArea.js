/** @jsxImportSource @emotion/react */

import { useState, useRef } from "react";

import fs from "fs";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "../shared/Button";
import Editor from "../shared/Editor";
import Modal from "../shared/Modal";

import CodeAreaWrapper from "./CodeAreaWrapper";
import FileOpenButton from "./FileOpenButton";

import localFilePathState from "../../recoilStates/localFilePathState";
import loadedFileCodeState from "../../recoilStates/loadedFileCodeState";

import { BUTTON, CODE_AREA, MODAL_HEADER, SAVE_CODE } from "../../constants/ui";
import { GREY_150, GREY_50 } from "../../constants/color";

export default function LoadedFileCodeArea() {
  const [filePath, setFilePath] = useRecoilState(localFilePathState);
  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveResult, setSaveResult] = useState("");

  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleCodeChange = (code) => {
    setLoadedFileCode(code);
  };

  const handleFileChange = (e) => {
    const filePath = e.target.files[0].path;
    const fileCode = fs.readFileSync(filePath, "utf8");

    setFilePath(filePath);
    handleCodeChange(fileCode);
  };

  const handleSaveClick = async () => {
    try {
      await fs.promises.writeFile(filePath, loadedFileCode);
      setSaveResult(SAVE_CODE.SUCCESS);
      setIsModalOpen(true);
    } catch (e) {
      setSaveResult(SAVE_CODE.FAIL);
      setIsModalOpen(true);
    }
  };

  return (
    <CodeAreaWrapper borderLeft={`1px solid ${GREY_50}`}>
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
            onChange={handleFileChange}
            onClick={() => fileInput.current.click()}
          />
          <Button
            text={BUTTON.SAVE}
            onClick={handleSaveClick}
            marginRight="16px"
          />
          <Button text={BUTTON.PREVIEW} onClick={() => navigate("/preview")} />
        </div>
      </div>
      <Editor
        code={loadedFileCode}
        onChange={handleCodeChange}
        width={window.innerWidth * 0.5 - 36}
      />
      <Modal
        isModalOpen={isModalOpen}
        onClick={() => setIsModalOpen(false)}
        header={MODAL_HEADER.SAVE_RESULT}
        content={saveResult}
      />
    </CodeAreaWrapper>
  );
}
