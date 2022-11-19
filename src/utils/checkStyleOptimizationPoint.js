import { STYLES_ADVICE } from "../constants/ui";

export default function checkStyleOptimizationPoint(
  elementStyle,
  openModal,
  handleContent,
) {
  if (elementStyle.getPropertyValue("visibility") === "hidden") {
    handleContent(STYLES_ADVICE.VISIBILITY);
    openModal();
  }

  if (elementStyle.getPropertyValue("table-layout") === "auto") {
    handleContent(STYLES_ADVICE.TABLE_LAYOUT);
    openModal();
  }

  if (
    elementStyle.getPropertyValue("animation-name") !== "none" &&
    (elementStyle.getPropertyValue("display") !== "absolute" ||
      elementStyle.getPropertyValue("display") !== "fixed")
  ) {
    handleContent(STYLES_ADVICE.ANIMATION_DISPLAY);
    openModal();
  }
}
