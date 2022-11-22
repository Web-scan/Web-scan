/** @jsxImportSource @emotion/react */

import Header from "../components/layout/Header";
import Logo from "../components/shared/Logo";

import ContentBox from "../components/layout/ContentBox";
import ScannedComponentCodeArea from "../components/editFile/ScannedComponentCodeArea";
import LoadedFileCodeArea from "../components/editFile/LoadedFileCodeArea";

import { GREY_50 } from "../constants/color";

export default function EditFile() {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <ContentBox>
        <div css={wrapper}>
          <ScannedComponentCodeArea />
        </div>
        <div
          css={{
            ...wrapper,
            borderLeft: `1px solid ${GREY_50}`,
          }}
        >
          <LoadedFileCodeArea />
        </div>
      </ContentBox>
    </>
  );
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "18px",
  width: "100%",
  height: "100%",
};
