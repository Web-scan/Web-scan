import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

import PropTypes from "prop-types";

export default function Editor({ code, handleChange, width }) {
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
      width={width}
      height={(window.innerHeight - 168).toString() + "px"}
      className="editor"
    />
  );
}

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};
