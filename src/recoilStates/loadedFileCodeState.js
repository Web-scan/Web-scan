import { atom } from "recoil";

const loadedFileCodeState = atom({
  key: "loadedFileCodeState",
  default: "",
});

export default loadedFileCodeState;
