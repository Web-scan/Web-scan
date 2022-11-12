import { atom } from "recoil";

const convertedCodeState = atom({
  key: "convertedCodeState",
  default: "",
});

export default convertedCodeState;
