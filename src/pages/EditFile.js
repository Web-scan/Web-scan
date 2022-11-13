/** @jsxImportSource @emotion/react */

import { useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import Logo from "../components/Logo";
import Editor from "../components/Editfile/Editor";
import Button from "../components/Button";
import Modal from "../components/Modal";

import convertedCodeState from "../recoil/convertedCode";
import loadedFileCodeState from "../recoil/loadedFileCode";

import { GREY_50, GREY_150 } from "../constants/color";
import { CODE_AREA, BUTTON, SAVE_CODE, MODAL_HEADER } from "../constants/ui";

export default function EditFile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveResult, setSaveResult] = useState("");
  const [convertedCode, setConvertedCode] = useRecoilState(convertedCodeState);
  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);
  const fileInput = useRef(null);

  const handleAutocompletedCodeChange = useCallback((code) => {
    setConvertedCode(code);
  }, []);

  const handleFileCodeChange = useCallback((code) => {
    setLoadedFileCode(code);
  }, []);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
    setSaveResult(SAVE_CODE.SUCCESS);
  };

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <ContentBox>
        <div css={editorWrapper}>
          <div css={{ ...textStyle, height: "40px" }}>
            {CODE_AREA.SCANNED_ELEMENT_COMPONENT_CODE}
          </div>
          <Editor
            code={convertedCode}
            handleChange={handleAutocompletedCodeChange}
          />
        </div>
        <div
          css={{
            ...editorWrapper,
            borderLeft: `1px solid ${GREY_50}`,
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              height: "40px",
            }}
          >
            <div css={textStyle}>{CODE_AREA.LOADED_FILE_CODE}</div>
            <div>
              <input
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                css={{
                  display: "none",
                }}
              />
              <Button
                text={BUTTON.OPEN}
                handleClick={() => fileInput.current.click()}
                marginRight="16px"
              />
              <Button text={BUTTON.SAVE} handleClick={handleSaveClick} />
            </div>
          </div>
          <Editor code={loadedFileCode} handleChange={handleFileCodeChange} />
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            header={MODAL_HEADER.SAVE_RESULT}
            content={saveResult}
          />
        </div>
      </ContentBox>
    </>
  );
}

const editorWrapper = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "18px",
  width: "100%",
  height: "100%",
};

const textStyle = {
  fontSize: "16px",
  color: GREY_150,
};
