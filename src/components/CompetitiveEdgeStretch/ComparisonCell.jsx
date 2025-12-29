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
        "flex w-full items-center justify-center rounded-xl font-bold transition-transform duration-200",
        isArabic && "font-[Tajawal,sans-serif]",
        isSmall
          ? "h-14 rounded-lg text-sm shadow-sm transition-all sm:h-16 sm:text-base"
          : "h-12 max-w-[100px] text-sm hover:scale-105 xl:h-14 xl:text-base",
        isStretch && isSmall && "scale-105 shadow-md",
      )}
      style={getValueStyles(value, isStretch, rowIdx, isSmall)}
    >
      <ValueCell
        value={value}
        isStretch={isStretch}
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
