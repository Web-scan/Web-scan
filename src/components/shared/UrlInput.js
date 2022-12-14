/** @jsxImportSource @emotion/react */

import PropTypes from "prop-types";
import { GREY_150, WHITE } from "../../constants/color";

export default function UrlInput({
  value,
  onChange,
  onSubmit,
  onFocus,
  placeholder,
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
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
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
