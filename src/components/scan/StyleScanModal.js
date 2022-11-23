/** @jsxImportSource @emotion/react */

import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import {
  DARK_NAVY_50,
  GREEN_50,
  GREY_50,
  BLUE_50,
  PURPLE_50,
} from "../../constants/color";

function ModalPortal({ children }) {
  const element = document.getElementById("modal");
  return ReactDOM.createPortal(children, element);
}

export default function StyleScanModal({
  isModalOpen,
  modalCoordinate,
  elementInfo,
}) {
  if (!isModalOpen) return null;

  const { x, y } = modalCoordinate;
  const { tagName, className, customStyles } = elementInfo;

  return (
    <ModalPortal>
      <div
        css={{
          position: "fixed",
          top: y,
          left: x,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          width: "300px",
          borderRadius: "18px",
          backgroundColor: DARK_NAVY_50,
          zIndex: 999,
        }}
        data-testid="style-scan-modal"
      >
        <div
          css={{ paddingBottom: "10px", borderBottom: `1px solid ${GREY_50}` }}
        >
          <div css={{ fontSize: "18px", fontWeight: "bold", color: GREEN_50 }}>
            {tagName}
          </div>
          <small css={{ color: GREEN_50 }}>
            {className ? `.${className}` : ""}
          </small>
        </div>
        <div
          css={{
            paddingTop: "10px",
          }}
        >
          {Object.entries(customStyles).map(([key, value]) => {
            return (
              <div key={key}>
                <span css={{ color: BLUE_50 }}>{key} : </span>
                <span css={{ color: PURPLE_50 }}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </ModalPortal>
  );
}

StyleScanModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalCoordinate: PropTypes.object.isRequired,
  elementInfo: PropTypes.object.isRequired,
};
