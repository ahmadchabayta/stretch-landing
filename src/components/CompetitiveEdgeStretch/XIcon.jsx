import PropTypes from "prop-types";

const XIcon = (props) => {
  const { size = 24, color = "#000", style = {}, className = "" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      {...props}
    >
      <path
        d="M21.9614 5.26189L16.9516 0.252045L11.1067 6.09686L5.26192 0.252045L0.252072 5.26189L6.09689 11.1067L0.252072 16.9515L5.26192 21.9614L11.1067 16.1166L16.9516 21.9614L21.9614 16.9515L16.1166 11.1067L21.9614 5.26189Z"
        fill={color}
        stroke={color}
        strokeWidth="0.504136"
        strokeLinejoin="round"
      />
    </svg>
  );
};

XIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default XIcon;
