import { atom } from "recoil";

const localFilePathState = atom({
  key: "localFilePathState",
  default: "",
});

export default localFilePathState;
