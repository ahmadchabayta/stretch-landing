import PropTypes from "prop-types";
import { Pie, PieChart, Tooltip } from "recharts";

import Flex from "../../Flex/Flex";
import Typography from "../../Typography/Typography";
import DonutLegend from "./DonutLegend";
import { useInViewAnimation, useMediaQuery } from "../../../../hooks";

const DonutChart = ({
  // isAnimationActive = true,
  defaultIndex,
  data,
  chartTitle,
  landscape = false,
}) => {
  const isXl = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isXs = useMediaQuery("(min-width: 390px)");
  const [chartRef, inView, animationKey] = useInViewAnimation({ threshold: 0.3 });

  const donutSize = isXl ? 500 : isTablet ? 400 : isXs ? 350 : 300;

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
        justify="justify-center"
        className={`glass-card glass-reflection rounded-2xl min-h-165 h-full w-full min-w-[330px] max-w-[95vw] py-6 ${landscape ? "flex-row items-stretch" : ""}`}
        ref={chartRef}
      >
        <Typography className="font-semibold text-xl tracking-wide text-center">
          {chartTitle}
        </Typography>
        {/* Use key to force remount and re-trigger animation */}
        <PieChart
          key={animationKey}
          style={{
            width: donutSize,
            height: donutSize,
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius={isXl ? "72%" : "65%"}
            label
            isAnimationActive={inView}
          />
          <Tooltip defaultIndex={defaultIndex} />
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
