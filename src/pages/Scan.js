/** @jsxImportSource @emotion/react */

import { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";

import HeaderBox from "../components/layout/HeaderBox";
import Logo from "../components/shared/Logo";
import UrlInputBar from "../components/scan/UrlInputBar";
import FileIcon from "../components/shared/FileIcon";

import ContentBox from "../components/layout/ContentBox";
import LandingMessage from "../components/scan/LandingMessage";

import websiteUrlState from "../recoilStates/websiteUrlState";
import lazyWithPreload from "../utils/lazyWithPreload";

const ScanMode = lazyWithPreload(() => import("../components/scan/ScanMode"));

export default function Scan() {
  const websiteUrl = useRecoilValue(websiteUrlState);

  useEffect(() => {
    ScanMode.preload();
  }, []);

  return (
    <>
      <HeaderBox>
        <Logo />
        <UrlInputBar />
        <FileIcon />
      </HeaderBox>
      <ContentBox>
        {websiteUrl ? (
          <Suspense fallback={null}>
            <ScanMode websiteUrl={websiteUrl} />
          </Suspense>
        ) : (
          <LandingMessage />
        )}
      </ContentBox>
    </>
  );
}
