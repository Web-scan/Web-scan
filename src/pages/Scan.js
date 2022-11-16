/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import SideEditorArea from "../components/scan/SideEditorArea";
import UrlInput from "../components/scan/UrlInput";
import Logo from "../components/shared/Logo";

import websiteUrlState from "../recoil/websiteUrl";
import scannedElementCodeState from "../recoil/scannedElementCode";
import getStylesWithoutDefaults from "../utils/getStylesWithoutDefaults";

import { LANDING_MESSAGE, ERROR } from "../constants/ui";
import { GREY_150 } from "../constants/color";

export default function Scan() {
  const [htmlString, setHtmlString] = useState("");
  const navigate = useNavigate();
  const WebsiteUrl = useRecoilValue(websiteUrlState);
  const [scannedElementCode, setScannedElementCode] = useRecoilState(
    scannedElementCodeState,
  );

  useEffect(() => {
    if (!WebsiteUrl) return;

    const getHtml = async () => {
      try {
        const { data } = await axios.get(WebsiteUrl);
        setHtmlString(data);
      } catch (e) {
        alert(ERROR.OPEN_WEBSITE);
      }
    };

    getHtml();
  }, [WebsiteUrl]);

  useEffect(() => {
    if (!WebsiteUrl || !htmlString) return;

    const showHighlightOnMousemove = (e) => {
      e.target.classList.add("highlight");
    };

    const removeHighlightOnMouseout = (e) => {
      e.target.classList.remove("highlight");
    };

    const getElementInformation = (e) => {
      const target = e.target;

      target.classList.remove("highlight");

      const targetTagName = target.tagName.toLowerCase();
      const targetContent = target.textContent;
      const targetCustomStyle = getStylesWithoutDefaults(target);

      const convertedCode = `<${targetTagName}\n style={${JSON.stringify(
        targetCustomStyle,
      )}}\n>\n ${targetContent}\n</${targetTagName}>`;

      setScannedElementCode(convertedCode);
    };

    const webFrame = document.getElementById("web-frame");
    webFrame.addEventListener("mousemove", showHighlightOnMousemove);
    webFrame.addEventListener("mouseout", removeHighlightOnMouseout);
    webFrame.addEventListener("click", getElementInformation);

    return () => {
      webFrame.removeEventListener("mousemove", showHighlightOnMousemove);
      webFrame.removeEventListener("mouseout", removeHighlightOnMouseout);
      webFrame.removeEventListener("click", getElementInformation);
    };
  }, [WebsiteUrl, htmlString]);

  const handleChange = useCallback((code) => {
    setScannedElementCode(code);
  }, []);

  return (
    <>
      <Header>
        <Logo />
        <UrlInput />
        <TfiFiles
          size="42"
          color={GREY_150}
          onClick={() => navigate("/edit")}
        />
      </Header>
      <ContentBox>
        {!WebsiteUrl && (
          <div
            css={{
              textAlign: "center",
              fontSize: "18px",
              color: GREY_150,
            }}
          >
            {LANDING_MESSAGE}
          </div>
        )}
        {WebsiteUrl && (
          <>
            <div
              id="web-frame"
              dangerouslySetInnerHTML={{ __html: htmlString }}
              css={{ flex: 7, width: "100%", height: "100%", overflow: "auto" }}
            ></div>
            <SideEditorArea
              code={scannedElementCode}
              handleChange={handleChange}
            />
          </>
        )}
      </ContentBox>
    </>
  );
}
