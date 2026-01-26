import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import Typography from "../Typography/Typography";
const GraphChart = ({
  title,
  data,
  color = "#8884d8",
  xDomain = [0, 100],
  barCategoryGap = 10,
  className = "",
  height = 250,
}) => {
  return (
    <div
      className={`p-4 w-full h-full max-w-[95vw] mx-auto glass-card glass-reflection rounded-2xl ${className}`}
    >
      {title && <Typography className="font-semibold text-lg mb-2">{title}</Typography>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          barCategoryGap={barCategoryGap}
        >
          <XAxis
            type="number"
            domain={xDomain}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 13, dy: 0, textAnchor: "middle" }}
            tickLine={false}
            axisLine={true}
            width={40}
            interval={0}
            tickMargin={24}
          />
          <Tooltip formatter={(v) => `${v} %`} />
          <Bar
            dataKey="value"
            fill={color}
            radius={[0, 2, 2, 0]}
            isAnimationActive={false}
            barSize={12}
          >
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => `${v}%`}
              style={{ fontSize: 12, fill: "#333" }}
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
  barCategoryGap: PropTypes.number,
  className: PropTypes.string,
  height: PropTypes.number,
};

export default GraphChart;
