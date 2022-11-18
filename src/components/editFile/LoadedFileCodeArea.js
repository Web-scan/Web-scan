/** @jsxImportSource @emotion/react */
import { useCallback, useRef, useState } from "react";

import fs from "fs";
import { useRecoilState } from "recoil";

import Button from "../shared/Button";
import Editor from "../shared/Editor";
import Modal from "../shared/Modal";

import { BUTTON, CODE_AREA, MODAL_HEADER, SAVE_CODE } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";
import loadedFileCodeState from "../../recoil/loadedFileCode";
import FileOpenButton from "./FileOpenButton";

export default function LoadedFileCodeArea() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [saveResult, setSaveResult] = useState("");

  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);
  const fileInput = useRef(null);

  const handleCodeChange = useCallback((code) => {
    setLoadedFileCode(code);
  }, []);

  const handleFileChange = (e) => {
    const filePath = e.target.files[0].path;
    const data = fs.readFileSync(filePath, "utf8");

    setFilePath(filePath);
    handleCodeChange(data);
  };

  const handleSaveClick = async () => {
    try {
      await fs.writeFile(filePath, loadedFileCode, (err) => {
        if (err) {
          setIsModalOpen(true);
          setSaveResult(SAVE_CODE.FAIL);
          return;
        }

        setIsModalOpen(true);
        setSaveResult(SAVE_CODE.SUCCESS);
      });
    } catch (e) {
      setIsModalOpen(true);
      setSaveResult(SAVE_CODE.SUCCESS);
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
        <div css={textStyle}>{CODE_AREA.LOADED_FILE_CODE}</div>
        <div>
          <FileOpenButton
            ref={fileInput}
            handleChange={handleFileChange}
            handleClick={() => fileInput.current.click()}
          />
          <Button text={BUTTON.SAVE} handleClick={handleSaveClick} />
        </div>
      </div>
      <Editor
        code={loadedFileCode}
        handleChange={handleCodeChange}
        width={(window.innerWidth * 0.5 - 36).toString() + "px"}
      />
      <Modal
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
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
