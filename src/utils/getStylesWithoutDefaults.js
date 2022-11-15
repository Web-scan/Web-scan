export default function getStylesWithoutDefaults(element) {
  const dummy = document.createElement("element-" + new Date().getTime());
  document.body.appendChild(dummy);

  const defaultStyles = getComputedStyle(dummy);
  const elementStyles = getComputedStyle(element);

  const diff = {};

  for (const key in elementStyles) {
    if (
      elementStyles.hasOwnProperty(key) &&
      defaultStyles[key] !== elementStyles[key]
    ) {
      diff[key] = elementStyles[key];
    }
  }

  dummy.remove();

  return diff;
}
