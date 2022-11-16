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

export default function StyleInfoModal({
  isModalOpen,
  modalCoordinate,
  styleInfo,
}) {
  if (!isModalOpen) return null;
  return (
    <ModalPortal>
      <div
        css={{
          position: "fixed",
          top: modalCoordinate.y,
          left: modalCoordinate.x,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          width: "300px",
          backgroundColor: DARK_NAVY_50,
          borderRadius: "18px",
          zIndex: 999,
        }}
      >
        <div
          css={{ paddingBottom: "10px", borderBottom: `1px solid ${GREY_50}` }}
        >
          <div css={{ fontSize: "18px", fontWeight: "bold", color: GREEN_50 }}>
            {styleInfo.tagName}
          </div>
          <small css={{ color: GREEN_50 }}>
            {styleInfo.className ? `.${styleInfo.className}` : ""}
          </small>
        </div>
        <div
          css={{
            paddingTop: "10px",
          }}
        >
          {Object.entries(styleInfo.computedStyle).map(([key, value]) => {
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

StyleInfoModal.propTypes = {
  modalCoordinate: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  styleInfo: PropTypes.object.isRequired,
};
