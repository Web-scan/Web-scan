export default function getStylesWithoutDefaults(element) {
  const styles = window.getComputedStyle(element);
  const inlineStyles = element.getAttribute("style");

  const diff = {};
  for (let i = 0; i < styles.length; i++) {
    const key = styles[i];
    const value = styles.getPropertyValue(key);

    element.style.setProperty(key, "unset");

    const unsetValue = styles.getPropertyValue(key);

    if (inlineStyles) element.setAttribute("style", inlineStyles);
    else element.removeAttribute("style");

    if (unsetValue !== value) diff[key] = value;
  }

  return diff;
}
