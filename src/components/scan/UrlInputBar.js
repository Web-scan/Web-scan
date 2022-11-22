/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

import UrlInput from "../shared/UrlInput";

import websiteUrlState from "../../recoil/websiteUrl";
import localhostUrlState from "../../recoil/localhostUrl";
import scannedElementComponentCodeState from "../../recoil/scannedElementComponentCode";
import loadedFileCodeState from "../../recoil/loadedFileCode";

import validateUrl from "../../utils/validateUrl";
import { HEADER_INPUT, ERROR } from "../../constants/ui";

export default function UrlInputBar() {
  const [urlInputValue, setUrlInputValue] = useState("");

  const setUrlState = useSetRecoilState(websiteUrlState);
  const resetScannedElementComponentCodeState = useResetRecoilState(
    scannedElementComponentCodeState,
  );
  const resetLoadedFileCodeState = useResetRecoilState(loadedFileCodeState);
  const resetLocalhostUrlState = useResetRecoilState(localhostUrlState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!urlInputValue || !validateUrl(urlInputValue)) {
      alert(ERROR.INVALID_URL);
      return setUrlInputValue("");
    }

    setUrlState(urlInputValue);
    resetScannedElementComponentCodeState();
    resetLoadedFileCodeState();
    resetLocalhostUrlState();
  };

  return (
    <UrlInput
      value={urlInputValue}
      handleChange={setUrlInputValue}
      handleSubmit={handleSubmit}
      placeholder={HEADER_INPUT.WEBSITE}
    />
  );
}
