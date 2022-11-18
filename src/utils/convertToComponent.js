import HtmlToJsx from "htmltojsx";
import getStylesWithoutDefaults from "./getStylesWithoutDefaults";

const classNameList = [];

function setInLineStyles(element) {
  element.childNodes.forEach(function (childElement) {
    setInLineStyles(childElement);
  });
  const customStyles = getStylesWithoutDefaults(element);

  if (customStyles) {
    for (const [key, value] of Object.entries(customStyles)) {
      element.style[key] = value;
    }
  }

  if (element.tagName) {
    classNameList.push(element.className);
    element.className = "";
  }
}

function setClassName(element) {
  element.childNodes.forEach(function (childElement) {
    setClassName(childElement);
  });

  if (element.tagName) {
    const targetElementClassName = classNameList.shift();
    if (targetElementClassName) {
      element.className = targetElementClassName;
    }
  }
}

function removeEmptyClassAndStyle(html) {
  return html.replaceAll(/class=""|style=""/g, "");
}

export default function convertToComponent(element) {
  setInLineStyles(element);

  const cleanedHtml = removeEmptyClassAndStyle(element.outerHTML);

  const converter = new HtmlToJsx({
    createClass: false,
  });

  const jsx = converter.convert(cleanedHtml);
  const formattedJsxArray = jsx.split("\n").map((code) => "    " + code + "\n");
  formattedJsxArray.pop();

  setClassName(element);

  return `const Component = () => {\n  return (\n${formattedJsxArray.join(
    "",
  )}  );\n};`;
}
