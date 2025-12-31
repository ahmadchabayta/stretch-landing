import PropTypes from "prop-types";
import { Flex } from "..";
import cn from "../../../utils/cn";

const SectionHeadContainer = ({ children, className, ...props }) => (
  <Flex
    container={true}
    flex={true}
    direction="flex-col xl:flex-row"
    align="items-start xl:items-end"
    justify="xl:justify-between"
    gap="xl:gap-x-16"
    spaceY="space-y-[15px] xl:space-y-0"
    className={cn("w-full", "lg:pr-[30px]! 3xl:pr-[63px]! my-10", className)}
    {...props}
  >
    {children}
  </Flex>
);

export default SectionHeadContainer;

SectionHeadContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
