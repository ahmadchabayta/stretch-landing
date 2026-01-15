import React from "react";
import PropTypes from "prop-types";

class AppBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <div className="text-white p-10">Something went wrong.</div>;
    return this.props.children;
  }
}

AppBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppBoundary;
