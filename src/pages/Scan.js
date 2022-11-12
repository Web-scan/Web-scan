/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { TfiFiles } from "react-icons/tfi";

import Header from "../components/layout/Header";
import ContentBox from "../components/layout/ContentBox";
import UrlInput from "../components/UrlInput";
import Button from "../components/Button";
import Logo from "../components/Logo";

import { LANDING_MESSAGE, BUTTON } from "../constants/ui";
import { GREY_150 } from "../constants/color";

export default function Scan() {
  const navigate = useNavigate();

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
        <div css={{ fontSize: "18px", color: GREY_150 }}>{LANDING_MESSAGE}</div>
        <Button text={BUTTON.copy} handleClick={() => console.log("copy")} />
      </ContentBox>
    </>
  );
}
