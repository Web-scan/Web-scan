import { atom } from "recoil";

const websiteUrlState = atom({
  key: "websiteUrlState",
  default: "",
});

export default websiteUrlState;
