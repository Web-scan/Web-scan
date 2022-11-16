/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

import websiteUrlState from "../../recoil/websiteUrl";
import scannedElementCodeState from "../../recoil/scannedElementCode";
import loadedFileCodeState from "../../recoil/loadedFileCode";

import validateUrl from "../../utils/validateUrl";
import { WHITE, GREY_150 } from "../../constants/color";
import { HEADER_INPUT, ERROR } from "../../constants/ui";

export default function UrlInput() {
  const [urlInputValue, setUrlInputValue] = useState("");

  const setUrlState = useSetRecoilState(websiteUrlState);
  const resetScannedCodeState = useResetRecoilState(scannedElementCodeState);
  const resetLoadedFileState = useResetRecoilState(loadedFileCodeState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateUrl(urlInputValue)) {
      alert(ERROR.INVALID_URL);
      return setUrlInputValue("");
    }

    if (urlInputValue && validateUrl(urlInputValue)) {
      setUrlState(urlInputValue);
      resetScannedCodeState();
      resetLoadedFileState();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={HEADER_INPUT}
        value={urlInputValue}
        onChange={(e) => setUrlInputValue(e.target.value)}
        onFocus={() => setUrlInputValue("")}
        css={{
          padding: "14px 20px",
          width: "800px",
          height: "100%",
          backgroundColor: WHITE,
          borderRadius: "40px",
          fontSize: "16px",
          color: GREY_150,
        }}
      />
    </form>
  );
}
