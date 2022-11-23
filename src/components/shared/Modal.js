/** @jsxImportSource @emotion/react */

import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import { keyframes } from "@emotion/react";

import Button from "./Button";

import { BUTTON } from "../../constants/ui";
import { GREY_50, GREY_100 } from "../../constants/color";

function ModalPortal({ children }) {
  const element = document.getElementById("modal");
  return ReactDOM.createPortal(children, element);
}

export default function Modal({ isModalOpen, onClick, header, content }) {
  if (!isModalOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px",
          minWidth: "320px",
          minHeight: "120px",
          backgroundColor: GREY_50,
          borderRadius: "15px",
          fontSize: "14px",
          wordBreak: "break-all",
          animation: `${slide} 1s 1`,
          zIndex: 999,
        }}
      >
        <div
          css={{
            marginBottom: "14px",
            paddingBottom: "6px",
            textAlign: "center",
            width: "100%",
            borderBottom: `1px solid ${GREY_100}`,
          }}
        >
          {header}
        </div>
        <div css={{ marginBottom: "14px" }}>{content}</div>
        <Button
          text={BUTTON.CLOSE}
          onClick={onClick}
          width="60px"
          height="25px"
          backgroundColor={GREY_100}
        />
      </div>
    </ModalPortal>
  );
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const slide = keyframes`
  from {
    transform: translate(-50%, -30%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;
