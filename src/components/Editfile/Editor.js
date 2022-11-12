import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { atomone } from "@uiw/codemirror-theme-atomone";

import PropTypes from "prop-types";

export default function Editor({ code, handleChange }) {
  return (
    <CodeMirror
      value={code}
      theme={atomone}
      extensions={[javascript({ jsx: true })]}
      height="620px"
      onChange={handleChange}
    />
  );
}

Editor.propTypes = {
  code: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
