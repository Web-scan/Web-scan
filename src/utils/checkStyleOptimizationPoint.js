import { STYLES_ADVICE } from "../constants/ui";

export default function checkStyleOptimizationPoint(
  elementStyle,
  openModal,
  handleContent,
) {
  if (
    Object.keys(elementStyle).includes("visibility") &&
    elementStyle.visibility === "invisible"
  ) {
    handleContent(STYLES_ADVICE.VISIBILITY);
    openModal();
  }

  if (
    Object.keys(elementStyle).includes("tableLayout") &&
    elementStyle.tableLayout !== "fixed"
  ) {
    handleContent(STYLES_ADVICE.TABLE_LAYOUT);
    openModal();
  }

  if (
    Object.keys(elementStyle).includes("animation") &&
    elementStyle.display !== "fixed" &&
    elementStyle.display !== "absolute"
  ) {
    handleContent(STYLES_ADVICE.ANIMATION_DISPLAY);
    openModal();
  }
}
