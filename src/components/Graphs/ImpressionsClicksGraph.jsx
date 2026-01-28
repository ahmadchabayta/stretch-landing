import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * ImpressionsClicksGraph renders a line chart for Impressions and Clicks over time.
 * @param {Object} props
 * @param {Array} props.data - Array of objects with keys: label, Impressions, Clicks
 * @param {string} [props.title] - Chart title
 */
const ImpressionsClicksGraph = ({
  data,
  title = "Total Impressions And Total Clicks",
  intervals = 0,
}) => (
  <div
    className="glass-card glass-reflection rounded-2xl min-h-178.5 h-full w-full min-w-[330px] max-w-[95vw] py-12"
    style={{ width: "100%", height: "714px" }}
  >
    <h3 style={{ textAlign: "center", color: "#888", fontWeight: 400 }}>{title}</h3>
    <ResponsiveContainer width="90%" height="100%" style={{ marginInline: "auto" }}>
      <LineChart responsive data={data} margin={{ top: 30, right: 30, left: 10, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          minTickGap={0}
          interval={intervals}
          angle={-35}
          textAnchor="end"
          fontSize={11}
          tickMargin={15}
        />
        <YAxis fontSize={11} />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="Impressions"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="Clicks"
          stroke="#00C49F"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

ImpressionsClicksGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      Impressions: PropTypes.number.isRequired,
      Clicks: PropTypes.number.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string,
  intervals: PropTypes.number,
};

export default ImpressionsClicksGraph;
