import PropTypes from "prop-types";

const ArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="13"
    fill="none"
    viewBox="0 0 9 13"
    {...props}
  >
    <path fill="#000" d="M0 6.365 6.363 0l2.12 2.123-4.241 4.241 4.242 4.243-2.121 2.122z"></path>
  </svg>
);

ArrowIcon.propTypes = {
  className: PropTypes.string,
};

export default ArrowIcon;
