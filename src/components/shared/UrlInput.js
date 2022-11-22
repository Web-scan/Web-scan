/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import { GREY_150, WHITE } from "../../constants/color";

export default function UrlInput({
  value,
  handleChange,
  handleSubmit,
  placeholder,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => handleChange("")}
        css={{
          padding: "14px 20px",
          width: "800px",
          height: "100%",
          borderRadius: "40px",
          fontSize: "16px",
          color: GREY_150,
          backgroundColor: WHITE,
        }}
      />
    </form>
  );
}

UrlInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
