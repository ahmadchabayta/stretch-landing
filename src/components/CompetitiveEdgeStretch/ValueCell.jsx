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

const ValueCell = ({ value, small, partialLabel }) => {
  const iconSize = small ? 27 : 32;

  if (value === "Partial") return partialLabel;
  if (value === "✓") {
    return (
      <span
        className={`flex items-center justify-center ${
          small ? "h-[22px] w-[27px]" : "h-[26px] w-8"
        } rounded-md bg-transparent`}
      >
        <CheckIcon size={iconSize} />
      </span>
    );
  }
  return <XIcon size={small ? 20 : iconSize} color="#ff4200" />;
};

ValueCell.propTypes = {
  value: PropTypes.string.isRequired,
  isStretch: PropTypes.bool.isRequired,
  idx: PropTypes.number.isRequired,
  small: PropTypes.bool,
  partialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default ValueCell;
