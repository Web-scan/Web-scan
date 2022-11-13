/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

import websiteUrlState from "../../recoil/websiteUrl";
import convertedCodeState from "../../recoil/convertedCode";
import loadedFileCodeState from "../../recoil/loadedFileCode";

import validateUrl from "../../utils/validateUrl";
import { WHITE, GREY_150 } from "../../constants/color";
import { HEADER_INPUT } from "../../constants/ui";

export default function UrlInput() {
  const [urlInputValue, setUrlInputValue] = useState("");

  const setUrlState = useSetRecoilState(websiteUrlState);
  const resetConvertedCodeState = useResetRecoilState(convertedCodeState);
  const resetLoadedFileState = useResetRecoilState(loadedFileCodeState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (urlInputValue && validateUrl(urlInputValue)) {
      setUrlState(urlInputValue);
      resetConvertedCodeState();
      resetLoadedFileState();
    }

    setUrlInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={HEADER_INPUT}
        value={urlInputValue}
        onChange={(e) => setUrlInputValue(e.target.value)}
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
