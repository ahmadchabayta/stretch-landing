import PropTypes from "prop-types";
import XIcon from "./XIcon";
import CheckIcon from "./CheckIcon";

export const STRETCH_OPACITIES = [0.25, 0.5, 0.75, 1];

export const getValueStyles = (value, isStretch, idx, small) => {
  const checkBg = isStretch ? `rgba(59,34,168,${STRETCH_OPACITIES[idx]})` : "#3B22A8";

  return {
    background: value === "Partial" ? "#ff4200" : value === "✓" ? checkBg : "#fff",
    border:
      value === "Partial" || value === "✓" ? "none" : small ? "1.5px solid #000" : "2px solid #000",
    color: value === "Partial" || value === "✓" ? "#fff" : "#000",
  };
};

const ValueCell = ({ value, partialLabel }) => {
  if (value === "Partial") {
    return (
      <span
        className={`
          text-white text-justify font-poppins font-bold leading-normal
          text-[12.021px]
          lg:text-[19.934px]
          xl:text-[19.934px]
          2xl:text-[19.934px]
          3xl:text-[24px]
        `}
      >
        {partialLabel}
      </span>
    );
  }
  if (value === "✓") {
    return (
      <span className="flex items-center justify-center">
        <CheckIcon className="w-[21.84px] h-[17.94px] lg:w-[43.87px] lg:h-[36.033px] xl:w-[55.65px] xl:h-[55.65px] 2xl:w-[43.87px] 2xl:h-[36.033px] 3xl:w-[52.818px] 3xl:h-[43.382px]" />
      </span>
    );
  }
  return (
    <XIcon
      className="w-[28.34px] h-[28.34px] lg:w-[46.995px] lg:h-[46.995px] xl:w-[46.995px] xl:h-[46.995px 2xl:w-[46.995px] 2xl:h-[46.995px]  3xl:w-[47.15px] 3xl:h-[47.15px]"
      color="#ff4200"
    />
  );
};

ValueCell.propTypes = {
  value: PropTypes.string.isRequired,
  isStretch: PropTypes.bool.isRequired,
  idx: PropTypes.number.isRequired,
  small: PropTypes.bool,
  partialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default ValueCell;
