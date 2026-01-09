import PropTypes from "prop-types";
import { Typography } from "../../components";
import cn from "../../utils/cn";
import ComparisonCell from "./ComparisonCell";

const DesktopGrid = ({ features, boxes, partialLabel, isArabic, columnOffset = 0 }) => {
  const getVisibleBoxes = (rowBoxes) => {
    // Stretch is always last in the array
    const stretchBox = rowBoxes[rowBoxes.length - 1];
    const competitorBoxes = rowBoxes.slice(0, -1);

    // Rotate through competitors based on offset
    const rotatedCompetitors = [
      ...competitorBoxes.slice(columnOffset),
      ...competitorBoxes.slice(0, columnOffset),
    ];

    // Return competitors first, then Stretch (Stretch will be reordered to last via CSS)
    return [...rotatedCompetitors, stretchBox];
  };

  return (
    <div>
      {features.map((feature, rowIdx) => {
        const visibleBoxes = getVisibleBoxes(boxes[rowIdx]);
        const stretchIdx = visibleBoxes.length - 1; // Stretch is last in array

        return (
          <div
            key={feature}
            className={cn(
              "grid items-center gap-2 px-3 py-4 transition-colors duration-200 sm:gap-3 sm:px-4 sm:py-5 lg:gap-4 lg:px-6 lg:py-6 xl:py-7",
              "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
              rowIdx !== features.length - 1 && "border-b border-gray-100",
            )}
          >
            {/* Feature name */}
            <div className={cn("flex items-center justify-start")}>
              <Typography.Text
                className={cn(
                  "text-[12.021px] font-bold text-black leading-normal text-pretty ",
                  "lg:text-[20px]",
                  "xl:text-[20px]",
                  "2xl:text-[20px]",
                  "3xl:text-[24px]",
                  isArabic ? "font-[Tajawal,sans-serif]" : "font-poppins",
                )}
              >
                {feature}
              </Typography.Text>
            </div>

            {/* Values */}
            {visibleBoxes.map((value, colIdx) => {
              const isStretch = colIdx === stretchIdx;
              return (
                <ComparisonCell
                  key={`${feature}-${colIdx}`}
                  value={value}
                  isStretch={isStretch}
                  rowIdx={rowIdx}
                  isSmall={false}
                  partialLabel={partialLabel}
                  isArabic={isArabic}
                  className={cn(
                    // Hide columns based on breakpoint (competitors only)
                    !isStretch && colIdx === 1 && "hidden sm:flex",
                    !isStretch && colIdx === 2 && "hidden md:flex",
                    !isStretch && colIdx === 3 && "hidden lg:flex",
                    // Stretch: always visible, ordered last at each breakpoint
                    isStretch && "order-2 sm:order-3 md:order-4 lg:order-5",
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

DesktopGrid.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  boxes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  columnsLength: PropTypes.number.isRequired,
  partialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isArabic: PropTypes.bool.isRequired,
  columnOffset: PropTypes.number,
};

export default DesktopGrid;
