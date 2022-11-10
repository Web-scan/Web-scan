import PropTypes from "prop-types";

export default function ContentBox({ children }) {
  return <div>{children}</div>;
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
