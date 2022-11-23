/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";

import WebFrame from "./WebFrame";
import SideEditorArea from "./SideEditorArea";

import scannedElementComponentCodeState from "../../recoilStates/scannedElementComponentCodeState";
import manipulateDom from "../../utils/manipulateDom";
import { ERROR } from "../../constants/ui";

export default function ScanMode({ websiteUrl }) {
  const [htmlString, setHtmlString] = useState("");
  const [scannedElementComponentCode, setScannedElementComponentCode] =
    useRecoilState(scannedElementComponentCodeState);

  useEffect(() => {
    if (!websiteUrl) return;

    const getHtml = async () => {
      try {
        const { data } = await axios.get(websiteUrl);
        const sourceDomain = websiteUrl
          .slice(`https://`.length)
          .split("/")
          .shift();
        const manipulatedHtml = manipulateDom(data, sourceDomain);

        setHtmlString(manipulatedHtml);
      } catch (e) {
        alert(ERROR.OPEN_WEBSITE);
      }
    };

    getHtml();
  }, [websiteUrl]);

  return (
    <>
      <WebFrame
        htmlString={htmlString}
        handleChange={(code) => setScannedElementComponentCode(code)}
      />
      <SideEditorArea
        code={scannedElementComponentCode}
        handleChange={(code) => setScannedElementComponentCode(code)}
      />
    </>
  );
}

ScanMode.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
};
