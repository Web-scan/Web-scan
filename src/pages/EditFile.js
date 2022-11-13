/** @jsxImportSource @emotion/react */

import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import ScannedComponentCode from "../components/editFile/ScannedComponentCode";
import LoadedFileCode from "../components/editFile/LoadedFileCode";
import Logo from "../components/shared/Logo";

import convertedCodeState from "../recoil/convertedCode";
import loadedFileCodeState from "../recoil/loadedFileCode";

import { GREY_50 } from "../constants/color";
import { SAVE_CODE } from "../constants/ui";

export default function EditFile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveResult, setSaveResult] = useState("");
  const [scannedComponentCode, setScannedComponentCode] =
    useRecoilState(convertedCodeState);
  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);

  const handleConvertedCodeChange = useCallback((code) => {
    setScannedComponentCode(code);
  }, []);

  const handleFileCodeChange = useCallback((code) => {
    setLoadedFileCode(code);
  }, []);

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
        <div css={wrapper}>
          <ScannedComponentCode
            code={scannedComponentCode}
            handleChange={handleConvertedCodeChange}
          />
        </div>
        <div
          css={{
            ...wrapper,
            borderLeft: `1px solid ${GREY_50}`,
          }}
        >
          <LoadedFileCode
            code={loadedFileCode}
            handleChange={handleFileCodeChange}
            handleClick={handleSaveClick}
            isModalOpen={isModalOpen}
            handleModalClose={() => setIsModalOpen(false)}
            saveResult={saveResult}
          />
        </div>
      </ContentBox>
    </>
  );
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "18px",
  width: "100%",
  height: "100%",
};
