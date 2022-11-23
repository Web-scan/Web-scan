/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";

import HeaderBox from "../components/layout/HeaderBox";
import Logo from "../components/shared/Logo";
import UrlInputBar from "../components/preview/UrlInputBar";
import FileIcon from "../components/shared/FileIcon";

import ContentBox from "../components/layout/ContentBox";
import LandingMessage from "../components/preview/LandingMessage";

import localhostUrlState from "../recoilStates/localhostUrlState";

export default function Preview() {
  const localhostUrl = useRecoilValue(localhostUrlState);

  return (
    <>
      <Header />
      <ContentBox>
        {localhostUrl ? (
          <iframe
            src={localhostUrl}
            css={{ width: "100%", height: "100%" }}
            data-testid="web-frame"
          />
        ) : (
          <LandingMessage />
        )}
      </ContentBox>
    </>
  );
}

const Header = () => {
  return (
    <HeaderBox>
      <Logo />
      <UrlInputBar />
      <FileIcon />
    </HeaderBox>
  );
};
