import { atom } from "recoil";

const localhostUrlState = atom({
  key: "localhostUrlState",
  default: "",
});

export default localhostUrlState;
