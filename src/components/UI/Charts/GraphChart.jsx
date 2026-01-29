import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
// Color palette for bars
import Typography from "../Typography/Typography";
import { useInViewAnimation, useMediaQuery } from "../../../hooks";

const GraphChart = ({
  title,
  data,
  color = "#8884d8",
  xDomain = [0, 50],
  xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  barCategoryGap = 10,
  className = "",
  height = 275,
  layout = "vertical",
}) => {
  const [chartRef, inView, animationKey] = useInViewAnimation({ threshold: 0.3 });
  // Axis and bar config based on layout
  const isVertical = layout === "vertical";

  const is2Xl = useMediaQuery("(min-width: 1536px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  // Responsive font size for graph labels
  const labelFontSize = is2Xl ? 16 : isXl ? 14 : isLg ? 12 : isTablet ? 10 : 8;
  return (
    <div
      ref={chartRef}
      className={`p-4 w-full h-full max-w-[95vw] mx-auto glass-card glass-reflection rounded-2xl ${className}`}
    >
      {title && <Typography className="font-semibold text-lg mb-2">{title}</Typography>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart key={animationKey} data={data} layout={layout} barCategoryGap={barCategoryGap}>
          {isVertical ? (
            <>
              <XAxis
                type="number"
                domain={xDomain}
                ticks={xTicks}
                tick={{ fontSize: labelFontSize }}
                tickLine={false}
                axisLine={true}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: labelFontSize, dy: 0, textAnchor: "middle" }}
                tickLine={false}
                axisLine={true}
                width={60}
                interval={0}
                tickMargin={24}
              />
            </>
          ) : (
            <>
              <XAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: labelFontSize - 2, dy: 0, textAnchor: "middle" }}
                tickLine={false}
                axisLine={true}
                interval={0}
                tickMargin={12}
                angle={0}
                textAnchor="end"
              />
              <YAxis
                type="number"
                domain={xDomain}
                ticks={xTicks}
                tick={{ fontSize: labelFontSize }}
                tickLine={false}
                axisLine={true}
                width={60}
                interval={0}
              />
            </>
          )}
          <Tooltip formatter={(v) => `${v} %`} />
          <Bar
            dataKey="value"
            radius={isVertical ? [0, 2, 2, 0] : [2, 2, 0, 0]}
            isAnimationActive={inView}
            barSize={30}
            fill={color} // Let recharts use color from data.color
          >
            <LabelList
              dataKey="value"
              position={isVertical ? "right" : "top"}
              formatter={(v) => `${v}%`}
              style={{ fontSize: labelFontSize, fill: "#333" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

GraphChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  xDomain: PropTypes.array,
  xTicks: PropTypes.array,
  barCategoryGap: PropTypes.number,
  className: PropTypes.string,
  height: PropTypes.number,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default GraphChart;
