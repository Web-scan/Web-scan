import { useState } from "react";
import { useSetRecoilState } from "recoil";

import UrlInput from "../shared/UrlInput";

import localhostUrlState from "../../recoil/localhostUrl";
import validateUrl from "../../utils/validateUrl";
import { ERROR, HEADER_INPUT } from "../../constants/ui";

export default function UrlInputBar() {
  const [urlInputValue, setUrlInputValue] = useState("");
  const setLocalhostUrl = useSetRecoilState(localhostUrlState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (urlInputValue && !validateUrl(urlInputValue)) {
      alert(ERROR.INVALID_URL);
      return setUrlInputValue("");
    }

    setLocalhostUrl(urlInputValue);
  };

  return (
    <UrlInput
      value={urlInputValue}
      handleChange={setUrlInputValue}
      handleSubmit={handleSubmit}
      placeholder={HEADER_INPUT.LOCALHOST}
    />
  );
}
