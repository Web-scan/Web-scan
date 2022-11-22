/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";

import Header from "../components/layout/Header";
import Logo from "../components/shared/Logo";
import UrlInputBar from "../components/preview/UrlInputBar";
import FileIcon from "../components/shared/FileIcon";

import ContentBox from "../components/layout/ContentBox";
import LandingMessage from "../components/preview/LandingMessage";

import localhostUrlState from "../recoil/localhostUrl";

export default function Preview() {
  const localhostUrl = useRecoilValue(localhostUrlState);

  return (
    <>
      <Header>
        <Logo />
        <UrlInputBar />
        <FileIcon />
      </Header>
      <ContentBox>
        {!localhostUrl && <LandingMessage />}
        {localhostUrl && (
          <iframe
            src={localhostUrl}
            css={{ width: "100%", height: "100%" }}
            data-testid="web-frame"
          />
        )}
      </ContentBox>
    </>
  );
}
