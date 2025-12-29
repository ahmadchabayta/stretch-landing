import PropTypes from "prop-types";
import { Typography } from "../../components";
import cn from "../../utils/cn";

const GridHeader = ({ columns, isArabic, columnOffset = 0 }) => {
  const getVisibleColumns = () => {
    // Mobile: 2 columns, Small: 3, Medium: 4, Large: all 5
    const rotatedColumns = [...columns.slice(columnOffset), ...columns.slice(0, columnOffset)];
    return rotatedColumns;
  };

  const visibleColumns = getVisibleColumns();

  return (
    <div
      className={cn(
        "grid gap-2 border-b border-gray-200 bg-linear-to-br from-gray-50 to-white px-3 py-4 sm:gap-3 sm:px-4 lg:gap-4 lg:px-6",
        "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
        isArabic ? "direction-rtl" : "",
      )}
      style={{
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* Empty corner for feature names column */}
      <div />

      {/* Platform names */}
      {visibleColumns.map((col, idx) => (
        <div
          key={`${col}-${idx}`}
          className={cn(
            "flex items-center justify-center px-1 text-center",
            idx === 2 && "hidden sm:flex",
            idx === 3 && "hidden md:flex",
            idx === 4 && "hidden lg:flex",
          )}
        >
          <Typography.Text
            className={cn(
              "text-[11px] leading-tight font-bold text-gray-800 sm:text-xs lg:text-sm xl:text-base",
              isArabic && "font-[Tajawal,sans-serif]",
            )}
          >
            {col}
          </Typography.Text>
        </div>
      ))}
    </div>
  );
};
export default GridHeader;

GridHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  isArabic: PropTypes.bool.isRequired,
  columnOffset: PropTypes.number,
};
