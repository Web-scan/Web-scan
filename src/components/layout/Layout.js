import PropTypes from "prop-types";

export default function Layout({ children }) {
  return <div>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
