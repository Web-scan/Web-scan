import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

import PropTypes from "prop-types";

const editorHeight = (window.innerHeight - 168).toString() + "px";

export default function Editor({ code, handleChange }) {
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={[javascript({ jsx: true })]}
      height={editorHeight}
      onChange={handleChange}
    />
  );
}

Editor.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func,
};
