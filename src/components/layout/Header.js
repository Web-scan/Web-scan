import PropTypes from "prop-types";

export default function Header({ children }) {
  return <div>{children}</div>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
