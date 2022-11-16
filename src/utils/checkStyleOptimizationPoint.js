import { STYLES_ADVICE } from "../constants/ui";

export default function checkStyleOptimizationPoint(
  elementStyle,
  openModal,
  handleMessage,
) {
  if (
    Object.keys(elementStyle).includes("visibility") &&
    elementStyle.visibility === "invisible"
  ) {
    handleMessage(STYLES_ADVICE.VISIBILITY);
    openModal(true);
  }

  if (
    Object.keys(elementStyle).includes("tableLayout") &&
    elementStyle.tableLayout !== "fixed"
  ) {
    handleMessage(STYLES_ADVICE.TABLE_LAYOUT);
    openModal(true);
  }

  if (
    Object.keys(elementStyle).includes("animation") &&
    elementStyle.display !== "fixed" &&
    elementStyle.display !== "absolute"
  ) {
    handleMessage(STYLES_ADVICE.ANIMATION_DISPLAY);
    openModal(true);
  }
}
