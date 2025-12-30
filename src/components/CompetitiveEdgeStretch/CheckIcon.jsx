import PropTypes from "prop-types";

const CheckIcon = ({ size = 27, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 22) / 27}
    viewBox="0 0 27 22"
    fill="none"
    className={className}
  >
    <path
      d="M8.68344 21.7296L0 13.0461L3.95719 9.08894L8.68344 13.8292L22.4986 0L26.4558 3.95719L8.68344 21.7296Z"
      fill="white"
    />
  </svg>
);

CheckIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default CheckIcon;
