import { atom } from "recoil";

const scannedElementCodeState = atom({
  key: "scannedElementCodeState",
  default: "",
});

export default scannedElementCodeState;
