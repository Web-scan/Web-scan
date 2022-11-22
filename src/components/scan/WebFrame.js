/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import StyleScanModal from "./StyleScanModal";

import { useModal } from "../../hooks/useModal";
import getStylesWithoutDefaults from "../../utils/getStylesWithoutDefaults";
import checkStyleOptimizationPoint from "../../utils/checkStyleOptimizationPoint";
import convertToComponent from "../../utils/convertToComponent";

import { MODAL_HEADER } from "../../constants/ui";

export default function WebFrame({ htmlString, handleChange }) {
  const [isStyleScanModalOpen, setIsStyleScanModalOpen] = useState(false);
  const [modalCoordinate, setModalCoordinate] = useState({ x: 0, y: 0 });
  const [elementInfo, setElementInfo] = useState({
    tagName: "",
    className: "",
    customStyles: {},
  });
  const [StyleAdviceModal, openModal, handleContent] = useModal(
    MODAL_HEADER.STYLES_ADVICE,
  );

  useEffect(() => {
    if (!htmlString) return;

    const showHighlightOnMousemove = (e) => {
      const targetElement = e.target;

      if (targetElement.classList.contains("highlight")) return;

      setIsStyleScanModalOpen(true);
      setModalCoordinate({ x: e.x + 100, y: e.y - 100 });
      setElementInfo({
        tagName: targetElement.tagName.toLowerCase(),
        className: targetElement.className,
        customStyles: getStylesWithoutDefaults(targetElement),
      });

      targetElement.classList.add("highlight");
    };

    const removeHighlightOnMouseout = (e) => {
      setIsStyleScanModalOpen(false);
      e.target.classList.remove("highlight");
    };

    const getElementInformation = (e) => {
      const targetElement = e.target;

      setIsStyleScanModalOpen(false);
      targetElement.classList.remove("highlight");

      checkStyleOptimizationPoint(targetElement, openModal, handleContent);

      handleChange(convertToComponent(targetElement));
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
  }, [htmlString]);

  return (
    <>
      <div
        id="web-frame"
        dangerouslySetInnerHTML={{ __html: htmlString }}
        css={{ flex: 7, width: "100%", height: "100%", overflow: "auto" }}
      />
      <StyleScanModal
        isModalOpen={isStyleScanModalOpen}
        modalCoordinate={modalCoordinate}
        elementInfo={elementInfo}
      />
      <StyleAdviceModal />
    </>
  );
}

WebFrame.propTypes = {
  htmlString: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
