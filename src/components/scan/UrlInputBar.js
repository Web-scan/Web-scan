/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

import UrlInput from "../shared/UrlInput";

import websiteUrlState from "../../recoilStates/websiteUrlState";
import localhostUrlState from "../../recoilStates/localhostUrlState";
import scannedElementComponentCodeState from "../../recoilStates/scannedElementComponentCodeState";
import loadedFileCodeState from "../../recoilStates/localFilePathState";

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
      onChange={setUrlInputValue}
      onSubmit={handleSubmit}
      placeholder={HEADER_INPUT.WEBSITE}
    />
  );
}
