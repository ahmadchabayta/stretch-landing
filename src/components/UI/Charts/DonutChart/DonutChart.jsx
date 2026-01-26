import { Pie, PieChart, Tooltip } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import PropTypes from "prop-types";
import Typography from "../../Typography/Typography";
import Flex from "../../Flex/Flex";
import DonutLegend from "./DonutLegend";
import useMediaQuery from "../../../../hooks/useMediaQuery";

const DonutChart = ({
  isAnimationActive = true,
  defaultIndex,
  data,
  chartTitle,
  landscape = false,
}) => {
  const isLg = useMediaQuery("(min-width: 1024px)");
  return (
    <Flex
      align="items-center"
      justify="justify-center"
      direction={landscape ? "flex-row" : "flex-col lg:flex-row"}
      className={`gap-2 w-full box-border select-none ${landscape ? "" : ""}`}
    >
      <Flex
        direction={landscape ? "flex-row" : "flex-col"}
        align="items-center"
        className={`glass-card glass-reflection rounded-2xl min-h-165 h-full w-full min-w-[310px] max-w-[95vw] py-6 ${landscape ? "flex-row items-stretch" : ""}`}
      >
        <Typography className="font-semibold text-xl tracking-wide text-center">
          {chartTitle}
        </Typography>
        <PieChart
          style={{
            width: "100%",
            maxWidth: "450px",
            minWidth: "250px",
            height: "100%",
            margin: "0 auto",
            overflow: "visible",
          }}
          responsive
        >
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius={isLg ? "75%" : "65%"}
            label
            isAnimationActive={isAnimationActive}
          />
          <Tooltip defaultIndex={defaultIndex} />
          <RechartsDevtools />
        </PieChart>

        {/* Legend to the right in landscape mode, below in portrait */}
        <div
          className={
            landscape
              ? "flex flex-col justify-center flex-1 min-w-[180px] max-w-[420px] p-4 "
              : "min-w-[180px] max-w-[420px] p-4 "
          }
        >
          <DonutLegend data={data} variant={landscape ? "vertical" : "inline"} />
        </div>
      </Flex>
    </Flex>
  );
};

DonutChart.propTypes = {
  isAnimationActive: PropTypes.bool,
  defaultIndex: PropTypes.number,
  data: PropTypes.array.isRequired,
  chartTitle: PropTypes.string,
  landscape: PropTypes.bool,
};
export default DonutChart;
