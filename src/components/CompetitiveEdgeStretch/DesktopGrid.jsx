import PropTypes from "prop-types";
import { Typography } from "../../components";
import cn from "../../utils/cn";
import ComparisonCell from "./ComparisonCell";

const DesktopGrid = ({
  features,
  boxes,
  columnsLength,
  partialLabel,
  isArabic,
  columnOffset = 0,
}) => {
  const getVisibleBoxes = (rowBoxes) => [
    ...rowBoxes.slice(columnOffset),
    ...rowBoxes.slice(0, columnOffset),
  ];

  return (
    <div>
      {features.map((feature, rowIdx) => {
        const visibleBoxes = getVisibleBoxes(boxes[rowIdx]);

        return (
          <div
            key={feature}
            className={cn(
              "grid items-center gap-2 px-3 py-4 transition-colors duration-200 sm:gap-3 sm:px-4 sm:py-5 lg:gap-4 lg:px-6 lg:py-6 xl:py-7",
              "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
              rowIdx !== features.length - 1 && "border-b border-gray-100",
              isArabic ? "direction-rtl" : "",
            )}
            style={{
              direction: isArabic ? "rtl" : "ltr",
            }}
          >
            {/* Feature name */}
            <div className={cn("flex items-center", isArabic ? "justify-end" : "justify-start")}>
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
                {feature}
              </Typography.Text>
            </div>

            {/* Values */}
            {visibleBoxes.map((value, colIdx) => {
              const isStretch = (colIdx + columnOffset) % columnsLength === columnsLength - 1;
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
                    colIdx === 2 && "hidden sm:flex",
                    colIdx === 3 && "hidden md:flex",
                    colIdx === 4 && "hidden lg:flex",
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
