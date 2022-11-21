/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import Logo from "../components/shared/Logo";
import FileIcon from "../components/shared/FileIcon";
import LandingMessage from "../components/preview/LandingMessage";
import UrlInputBar from "../components/preview/UrlInputBar";

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
