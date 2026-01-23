import PropTypes from "prop-types";
import { Typography, Flex } from "../UI";
import React from "react";

const StepIndicator = ({ currentStep, subtitle, subtitleBold }) => (
  <Flex
    direction="flex-row"
    align="items-center"
    gap="gap-4"
    spaceY="space-y-3 lg:space-y-0"
    className="mx-0! mb-4 w-full xl:ml-auto xl:w-auto"
  >
    <Flex
      align="items-center"
      justify="justify-center"
      className="bg-black w-[61.291px] h-[61.291px] object-contain shrink-0 rounded-full"
    >
      <Typography
        as="p"
        className="flex items-center justify-center text-[34.59px] font-bold text-white"
      >
        {currentStep}
      </Typography>
    </Flex>
    <Flex
      align="items-center"
      justify="justify-start"
      className="w-full max-w-[314px] 3xl:w-[340.617px]  text-start text-pretty"
    >
      <Typography
        className="[direction:ltr]:font-poppins [direction:rtl]:font-tajawal prose text-balance"
        as="p"
      >
        <Typography.Text bold>
          {subtitleBold.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < subtitleBold.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </Typography.Text>{" "}
        {subtitle}
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
