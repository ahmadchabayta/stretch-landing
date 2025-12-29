import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import CheckIcon from "../CheckIcon";
import { CELL_BASE_CLASSES } from "./constants";

const CheckCell = ({ isChecked, className = "" }) => (
  <div className={cn(CELL_BASE_CLASSES, className)}>
    <span className={isChecked ? "" : "pointer-events-none opacity-0"}>
      <CheckIcon />
    </span>
  </div>
);

CheckCell.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default CheckCell;
