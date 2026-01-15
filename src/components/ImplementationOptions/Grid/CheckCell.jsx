import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import CheckIcon from "../CheckIcon";
import { CELL_BASE_CLASSES } from "./constants";

const CheckCell = ({ isChecked, className = "" }) => (
  <div className={cn(CELL_BASE_CLASSES, className)}>
    <span
      className={
        isChecked
          ? `
            w-[25.367px] h-[25.367px]
            lg:w-[27.859px] lg:h-[27.859px ] 
            xl:w-[30.899px] xl:h-[30.899px] 
            2xl:w-[41.198px] 2xl:h-[41.198px] 
            3xl:w-[47px] 3xl:h-[47px]`
          : "pointer-events-none opacity-0"
      }
    >
      <CheckIcon />
    </span>
  </div>
);

CheckCell.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default CheckCell;
