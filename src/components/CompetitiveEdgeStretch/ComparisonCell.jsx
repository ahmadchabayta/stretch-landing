import PropTypes from "prop-types";
import cn from "../../utils/cn";
import ValueCell, { getValueStyles } from "./ValueCell";

const ComparisonCell = ({
  value,
  isStretch,
  rowIdx,
  isSmall,
  partialLabel,
  isArabic,
  className,
}) => (
  <div className={cn("flex items-center justify-center", className)}>
    <div
      className={cn(
        "flex items-center justify-center rounded-xl font-bold transition-all duration-200",
        "w-[190px] h-[72px] px-[16.607px] py-[24.156px]",
        "[&:hover]:!bg-black [&:hover]:scale-105",
        isArabic && "font-[Tajawal,sans-serif]",
        isSmall
          ? "rounded-lg text-sm shadow-sm transition-all sm:text-base"
          : "text-sm xl:text-base",
        isStretch && isSmall && "scale-105 shadow-md",
      )}
      style={getValueStyles(value, isStretch, rowIdx, isSmall)}
    >
      <ValueCell
        value={value}
        isStretch={isStretch}
        z
        idx={rowIdx}
        small={isSmall}
        partialLabel={partialLabel}
      />
    </div>
  </div>
);

ComparisonCell.propTypes = {
  value: PropTypes.string.isRequired,
  isStretch: PropTypes.bool.isRequired,
  rowIdx: PropTypes.number.isRequired,
  isSmall: PropTypes.bool,
  partialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isArabic: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default ComparisonCell;
