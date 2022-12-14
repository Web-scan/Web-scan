import { useState } from "react";
import { useSetRecoilState } from "recoil";

import UrlInput from "../shared/UrlInput";

import localhostUrlState from "../../recoilStates/localhostUrlState";
import validateUrl from "../../utils/validateUrl";
import { ERROR, HEADER_INPUT } from "../../constants/ui";

export default function UrlInputBar() {
  const [urlInputValue, setUrlInputValue] = useState("");
  const setLocalhostUrl = useSetRecoilState(localhostUrlState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!urlInputValue || !validateUrl(urlInputValue)) {
      alert(ERROR.INVALID_URL);
      return setUrlInputValue("");
    }

    setLocalhostUrl(urlInputValue);
  };

  return (
    <UrlInput
      value={urlInputValue}
      onChange={(e) => setUrlInputValue(e.target.value)}
      onSubmit={handleSubmit}
      onFocus={() => setUrlInputValue("")}
      placeholder={HEADER_INPUT.LOCALHOST}
    />
  );
}
