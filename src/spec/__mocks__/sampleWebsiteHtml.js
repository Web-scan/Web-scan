const sampleWebsiteHtml =
  '<!DOCTYPE html><html><head><title>Sample website to check style optimization points</title><style type="text/css">#animation-p {\n' +
  "  animation: slidein 3s 1;\n" +
  "  height: 200px;\n" +
  "  background-color: blue;\n" +
  "}\n" +
  "\n" +
  "@keyframes slidein {\n" +
  "  from {\n" +
  "    margin-left: 100%;\n" +
  "    width: 120%\n" +
  "  }\n" +
  "\n" +
  "  to {\n" +
  "    margin-left: 0%;\n" +
  "    width: 100%;\n" +
  "  }\n" +
  '}</style></head><body><h1>Sample website</h1><div style="width: 200px; height: 200px"><p id="animation-p">tag which is sliding in the body and display is block</p></div><div style="width: 400px; height: 100px"></div><div style="width: 400px; height: 200px"><table style="width: 100%; border: 1px solid black; table-layout: auto"><tr><th>table</th><th>layout</th><th>auto</th></tr></table></div><div style="width: 400px; height: 400px"><div style="visibility: hidden; width: 200px; height: 200px;">visibility: hidden</div></div></body></html>';

export default sampleWebsiteHtml;
