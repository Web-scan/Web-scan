/** @jsxImportSource @emotion/react */

import { AiFillFolderOpen } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";
import Logo from "../components/Logo";

import { GREY_50, GREY_100 } from "../constants/color";
import { CODE_AREA } from "../constants/ui";

export default function EditFile() {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <ContentBox>
        <div css={editorWrapper}>
          <div css={{ ...textStyle, height: "40px" }}>
            {CODE_AREA.AUTOCOMPLETE_COMPONENT_CODE}
          </div>
        </div>
        <div
          css={{
            ...editorWrapper,
            borderLeft: `1px solid ${GREY_50}`,
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              height: "40px",
            }}
          >
            <div css={textStyle}>{CODE_AREA.LOADED_FILE_CODE}</div>
            <div>
              <AiFillFolderOpen size="26" color={GREY_100} css={iconStyle} />
              <CiSaveDown2 size="26" color={GREY_100} css={iconStyle} />
            </div>
          </div>
        </div>
      </ContentBox>
    </>
  );
}

const editorWrapper = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "18px",
  width: "100%",
  height: "100%",
};

const textStyle = {
  fontSize: "14px",
  color: GREY_100,
};

const iconStyle = {
  marginRight: "16px",
};
