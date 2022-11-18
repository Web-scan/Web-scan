/** @jsxImportSource @emotion/react */

import { useState, useCallback } from "react";

import fs from "fs";
import { useRecoilState } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import ScannedComponentCode from "../components/editFile/ScannedComponentCode";
import LoadedFileCode from "../components/editFile/LoadedFileCode";
import Logo from "../components/shared/Logo";

import scannedElementComponentCodeState from "../recoil/scannedElementComponentCode";
import loadedFileCodeState from "../recoil/loadedFileCode";

import { GREY_50 } from "../constants/color";
import { SAVE_CODE } from "../constants/ui";

export default function EditFile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [saveResult, setSaveResult] = useState("");
  const [scannedElementComponentCode, setScannedElementComponentCode] =
    useRecoilState(scannedElementComponentCodeState);
  const [loadedFileCode, setLoadedFileCode] =
    useRecoilState(loadedFileCodeState);

  const handleScannedElementCodeChange = useCallback((code) => {
    setScannedElementComponentCode(code);
  }, []);

  const handleFileCodeChange = useCallback((code) => {
    setLoadedFileCode(code);
  }, []);

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
      <Header>
        <Logo />
      </Header>
      <ContentBox>
        <div css={wrapper}>
          <ScannedComponentCode
            code={scannedElementComponentCode}
            handleChange={handleScannedElementCodeChange}
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
            handleFilePath={(path) => setFilePath(path)}
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
