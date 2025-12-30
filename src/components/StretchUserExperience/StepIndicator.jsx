import PropTypes from "prop-types";
import { Typography, Flex } from "../UI";

const StepIndicator = ({ currentStep, subtitle, subtitleBold }) => (
  <Flex
    direction="flex-row"
    align="items-center"
    spaceX="space-x-4"
    spaceY="space-y-3 lg:space-y-0"
    className="stretch_step_indicator mx-0! mb-4 w-full xl:ml-auto xl:w-auto"
  >
    <div className="stretch_step_circle 3xl:w-[61.291px] 3xl:h-[61.291px] shrink-0">
      <Typography
        as="p"
        className="flex h-[61px] w-[61px] items-center justify-center rounded-full bg-black text-[34.59px] font-bold text-white"
      >
        {currentStep}
      </Typography>
    </div>
    <Flex
      align="items-center"
      justify="justify-center"
      className="3xl:w-[340.617px] 3xl:h-[88.42px] text-center lg:text-left"
    >
      <Typography className="font-poppins" as="p">
        <Typography.Text bold>{subtitleBold}</Typography.Text> {subtitle}
      </Typography>
    </Flex>
  </Flex>
);

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  subtitleBold: PropTypes.string.isRequired,
};

export default StepIndicator;
