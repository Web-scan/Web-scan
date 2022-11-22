/** @jsxImportSource @emotion/react */

import { Suspense, lazy, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Header from "../components/layout/Header";
import Logo from "../components/shared/Logo";
import UrlInputBar from "../components/scan/UrlInputBar";
import FileIcon from "../components/shared/FileIcon";

import ContentBox from "../components/layout/ContentBox";
import LandingMessage from "../components/scan/LandingMessage";

import websiteUrlState from "../recoil/websiteUrl";

const lazyWithPreload = (importFunction) => {
  const Component = lazy(importFunction);
  Component.preload = importFunction;
  return Component;
};
const ScanMode = lazyWithPreload(() => import("../components/scan/ScanMode"));

export default function Scan() {
  const websiteUrl = useRecoilValue(websiteUrlState);

  useEffect(() => {
    ScanMode.preload();
  }, []);

  return (
    <>
      <Header>
        <Logo />
        <UrlInputBar />
        <FileIcon />
      </Header>
      <ContentBox>
        {!websiteUrl && <LandingMessage />}
        {websiteUrl && (
          <Suspense fallback={null}>
            <ScanMode websiteUrl={websiteUrl} />
          </Suspense>
        )}
      </ContentBox>
    </>
  );
}
