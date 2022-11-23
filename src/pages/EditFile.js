/** @jsxImportSource @emotion/react */

import HeaderBox from "../components/layout/HeaderBox";
import Logo from "../components/shared/Logo";

import ContentBox from "../components/layout/ContentBox";
import ScannedComponentCodeArea from "../components/editFile/ScannedComponentCodeArea";
import LoadedFileCodeArea from "../components/editFile/LoadedFileCodeArea";

export default function EditFile() {
  return (
    <>
      <Header />
      <ContentBox>
        <ScannedComponentCodeArea />
        <LoadedFileCodeArea />
      </ContentBox>
    </>
  );
}

const Header = () => {
  return (
    <HeaderBox>
      <Logo />
    </HeaderBox>
  );
};
