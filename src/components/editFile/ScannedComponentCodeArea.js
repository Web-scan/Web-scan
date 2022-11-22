/** @jsxImportSource @emotion/react */

import { useCallback } from "react";
import { useRecoilState } from "recoil";

import Editor from "../shared/Editor";

import scannedElementComponentCodeState from "../../recoil/scannedElementComponentCode";
import { CODE_AREA } from "../../constants/ui";
import { GREY_150 } from "../../constants/color";

export default function ScannedComponentCodeArea() {
  const [scannedElementComponentCode, setScannedElementComponentCode] =
    useRecoilState(scannedElementComponentCodeState);

  const handleCodeChange = useCallback((code) => {
    setScannedElementComponentCode(code);
  }, []);

  return (
    <>
      <div css={{ height: "40px", fontSize: "16px", color: GREY_150 }}>
        {CODE_AREA.SCANNED_ELEMENT_COMPONENT_CODE}
      </div>
      <Editor
        code={scannedElementComponentCode}
        handleChange={handleCodeChange}
        width={(window.innerWidth * 0.5 - 36).toString() + "px"}
      />
    </>
  );
}
