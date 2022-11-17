import HtmlToJsx from "htmltojsx";

function removeEmptyClassName(html) {
  return html.replaceAll(/class=""/g, "");
}

export default function convertToComponent(html) {
  const cleanedHtml = removeEmptyClassName(html);

  const converter = new HtmlToJsx({
    createClass: false,
  });

  const jsx = converter.convert(cleanedHtml);
  const formattedJsxArray = jsx.split("\n").map((code) => "    " + code + "\n");
  formattedJsxArray.pop();

  return `const component = () => {\n  return (\n${formattedJsxArray.join(
    "",
  )}  );\n};`;
}
