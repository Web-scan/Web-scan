import HtmlToJsx from "htmltojsx";

function removeEmptyClassAndStyle(html) {
  return html.replaceAll(/class=""|style=""/g, "");
}

export default function convertToComponent(html) {
  const cleanedHtml = removeEmptyClassAndStyle(html);

  const converter = new HtmlToJsx({
    createClass: false,
  });

  const jsx = converter.convert(cleanedHtml);
  const formattedJsxArray = jsx.split("\n").map((code) => "    " + code + "\n");
  formattedJsxArray.pop();

  return `const Component = () => {\n  return (\n${formattedJsxArray.join(
    "",
  )}  );\n};`;
}
