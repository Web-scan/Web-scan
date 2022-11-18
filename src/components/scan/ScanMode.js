/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import axios from "axios";
import PropTypes from "prop-types";

import { ERROR, STYLES_ADVICE } from "../../constants/ui";
import Modal from "../shared/Modal";

import scannedElementComponentCodeState from "../../recoil/scannedElementComponentCode";
import convertToComponent from "../../utils/convertToComponent";
import getStylesWithoutDefaults from "../../utils/getStylesWithoutDefaults";
import checkStyleOptimizationPoint from "../../utils/checkStyleOptimizationPoint";
import SideEditorArea from "./SideEditorArea";
import StyleInfoModal from "./StyleInfoModal";

export default function ScanMode({ websiteUrl }) {
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
      <div
        id="web-frame"
        dangerouslySetInnerHTML={{ __html: htmlString }}
        css={{ flex: 7, width: "100%", height: "100%", overflow: "auto" }}
      ></div>
      <SideEditorArea
        code={scannedElementComponentCode}
        handleChange={handleChange}
      />
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
    </>
  );
}

ScanMode.propTypes = {
  websiteUrl: PropTypes.string,
};
