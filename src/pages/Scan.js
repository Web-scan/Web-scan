/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import { useRecoilValue } from "recoil";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";

import SideEditorArea from "../components/scan/SideEditorArea";
import UrlInput from "../components/scan/UrlInput";
import Logo from "../components/shared/Logo";

import websiteUrlState from "../recoil/websiteUrl";

import { LANDING_MESSAGE } from "../constants/ui";
import { GREY_150 } from "../constants/color";

export default function Scan() {
  const navigate = useNavigate();
  const WebsiteUrl = useRecoilValue(websiteUrlState);
  const code = `const component = () => {\n <div>hello</div>\n}`;

  return (
    <>
      <Header>
        <Logo />
        <UrlInput />
        <TfiFiles
          size="42"
          color={GREY_150}
          onClick={() => navigate("/edit")}
        />
      </Header>
      <ContentBox>
        {!WebsiteUrl && (
          <div
            css={{
              textAlign: "center",
              fontSize: "18px",
              color: GREY_150,
            }}
          >
            {LANDING_MESSAGE}
          </div>
        )}
        {WebsiteUrl && (
          <>
            <div
              css={{
                flex: 7,
              }}
            >
              Website rendering
            </div>
            <SideEditorArea code={code} />
          </>
        )}
      </ContentBox>
    </>
  );
}
