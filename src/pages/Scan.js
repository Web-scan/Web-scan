/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import StyleInfoModal from "../components/scan/StyleInfoModal";
import SideEditorArea from "../components/scan/SideEditorArea";
import UrlInput from "../components/scan/UrlInput";
import Logo from "../components/shared/Logo";
import Modal from "../components/shared/Modal";

import websiteUrlState from "../recoil/websiteUrl";
import scannedElementComponentCodeState from "../recoil/scannedElementComponentCode";

import getStylesWithoutDefaults from "../utils/getStylesWithoutDefaults";
import checkStyleOptimizationPoint from "../utils/checkStyleOptimizationPoint";
import convertToComponent from "../utils/convertToComponent";

import { LANDING_MESSAGE, ERROR, STYLES_ADVICE } from "../constants/ui";
import { GREY_150 } from "../constants/color";

export default function Scan() {
  const websiteUrl = useRecoilValue(websiteUrlState);
  const [scannedElementComponentCode, setScannedElementComponentCode] =
    useRecoilState(scannedElementComponentCodeState);
  const [htmlString, setHtmlString] = useState("");
  const [isStyleInfoModalOpen, setIsStyleInfoModalOpen] = useState(false);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [modalCoordinate, setModalCoordinate] = useState({ x: 0, y: 0 });
  const [styleInfo, setStyleInfo] = useState({
    tagName: "",
    className: "",
    computedStyle: {},
  });
  const [adviceContent, setAdviceContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!websiteUrl) return;

    const getHtml = async () => {
      try {
        const { data } = await axios.get(websiteUrl);
        setHtmlString(data);
      } catch (e) {
        alert(ERROR.OPEN_WEBSITE);
      }
    };

    getHtml();
  }, [websiteUrl]);

  useEffect(() => {
    if (!websiteUrl || !htmlString) return;

    const showHighlightOnMousemove = (e) => {
      const targetElement = e.target;

      if (targetElement.classList.contains("highlight")) return;

      setIsStyleInfoModalOpen(true);
      setModalCoordinate({ x: e.x + 100, y: e.y - 100 });
      setStyleInfo({
        tagName: targetElement.tagName.toLowerCase(),
        className: targetElement.className,
        computedStyle: getStylesWithoutDefaults(targetElement),
      });
      targetElement.classList.add("highlight");
    };

    const removeHighlightOnMouseout = (e) => {
      setIsStyleInfoModalOpen(false);
      e.target.classList.remove("highlight");
    };

    const getElementInformation = (e) => {
      const targetElement = e.target;

      setIsStyleInfoModalOpen(false);
      targetElement.classList.remove("highlight");

      checkStyleOptimizationPoint(
        getStylesWithoutDefaults(targetElement),
        setIsAdviceModalOpen,
        setAdviceContent,
      );

      setScannedElementComponentCode(convertToComponent(targetElement));
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
  }, [websiteUrl, htmlString]);

  const handleChange = useCallback((code) => {
    setScannedElementComponentCode(code);
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
        {!websiteUrl && (
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
        {websiteUrl && (
          <>
            <div
              id="web-frame"
              dangerouslySetInnerHTML={{ __html: htmlString }}
              css={{ flex: 7, width: "100%", height: "100%", overflow: "auto" }}
            ></div>
            <SideEditorArea
              code={scannedElementComponentCode}
              handleChange={handleChange}
            />
          </>
        )}
        <StyleInfoModal
          isModalOpen={isStyleInfoModalOpen}
          modalCoordinate={modalCoordinate}
          styleInfo={styleInfo}
        />
        <Modal
          isModalOpen={isAdviceModalOpen}
          handleClose={() => setIsAdviceModalOpen(false)}
          header={STYLES_ADVICE.HEADER}
          content={adviceContent}
        />
      </ContentBox>
    </>
  );
}
