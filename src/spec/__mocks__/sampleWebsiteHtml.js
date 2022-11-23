const sampleWebsiteHtml = `<!DOCTYPE html><html><head><title>Sample website to check style optimization points</title><style type="text/css">#animation-p {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slidein 3s 1;
  height: 200px;
  background-color: #A0D468;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 120%
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}</style></head><body><h1>Sample website</h1><div style="width: 200px; height: 200px"><p id="animation-p">animation + display is block</p></div><div style="display: flex; flex-direction: column; justify-content: center; width: 400px; height: 200px"><table style="width: 100%; border: 1px solid black; table-layout: auto"><tr><th>table</th><th>layout</th><th>auto</th></tr></table></div><div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 200px; height: 200px; background-color: #77aa03"><div>To do list</div><ul><li style="color: white">shopping</li><li style="color: white">exercise</li><li style="color: white">study</li></ul></div></body></html>`;

export default sampleWebsiteHtml;
