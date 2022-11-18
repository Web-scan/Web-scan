/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import { useRecoilValue } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import ScanMode from "../components/scan/ScanMode";
import LandingMessage from "../components/scan/LandingMessage";
import UrlInputBar from "../components/scan/UrlInputBar";
import Logo from "../components/shared/Logo";

import websiteUrlState from "../recoil/websiteUrl";
import { GREY_150 } from "../constants/color";

export default function Scan() {
  const websiteUrl = useRecoilValue(websiteUrlState);
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Logo />
        <UrlInputBar />
        <TfiFiles
          size="42"
          color={GREY_150}
          onClick={() => navigate("/edit")}
        />
      </Header>
      <ContentBox>
        {!websiteUrl && <LandingMessage />}
        {websiteUrl && <ScanMode websiteUrl={websiteUrl} />}
      </ContentBox>
    </>
  );
}
