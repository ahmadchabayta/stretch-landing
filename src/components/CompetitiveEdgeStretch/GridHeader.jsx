import PropTypes from "prop-types";
import { Typography } from "../../components";
import cn from "../../utils/cn";

const GridHeader = ({ columns, isArabic, columnOffset = 0 }) => {
  const getVisibleColumns = () => {
    // Stretch is always last in the array
    const stretchColumn = columns[columns.length - 1];
    const competitorColumns = columns.slice(0, -1);

    // Rotate through competitors based on offset
    const rotatedCompetitors = [
      ...competitorColumns.slice(columnOffset),
      ...competitorColumns.slice(0, columnOffset),
    ];

    // Return competitors first, then Stretch (Stretch will be reordered to last via CSS)
    return [...rotatedCompetitors, stretchColumn];
  };

  const visibleColumns = getVisibleColumns();
  const stretchIdx = visibleColumns.length - 1; // Stretch is last in array

  return (
    <div
      className={cn(
        "grid gap-2 px-3 py-4 sm:gap-3 sm:px-4 lg:gap-4 lg:px-6",
        "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
      )}
    >
      {/* Empty corner for feature names column */}
      <div />

      {/* Platform names */}
      {visibleColumns.map((col, idx) => {
        const isStretch = idx === stretchIdx;
        return (
          <div
            key={`${col}-${idx}`}
            className={cn(
              "flex items-center justify-center px-1 text-center",
              // Hide columns based on breakpoint (competitors only)
              !isStretch && idx === 1 && "hidden sm:flex",
              !isStretch && idx === 2 && "hidden md:flex",
              !isStretch && idx === 3 && "hidden lg:flex",
              // Stretch: always visible, ordered last at each breakpoint
              isStretch && "order-2 sm:order-3 md:order-4 lg:order-5",
            )}
          >
            <Typography.Text
              className={cn(
                "text-[12.021px] font-bold text-black leading-normal text-justify",
                "lg:text-[20px]",
                "xl:text-[20px]",
                "2xl:text-[20px]",
                "3xl:text-[24px]",
                isArabic ? "font-[Tajawal,sans-serif]" : "font-poppins",
              )}
            >
              {col}
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
};
export default GridHeader;

GridHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  isArabic: PropTypes.bool.isRequired,
  columnOffset: PropTypes.number,
};
