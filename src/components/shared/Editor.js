import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

import PropTypes from "prop-types";

export default function Editor({ code, onChange, width }) {
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      width={width.toString() + "px"}
      height={(window.innerHeight - 168).toString() + "px"}
      className="editor"
    />
  );
}

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
