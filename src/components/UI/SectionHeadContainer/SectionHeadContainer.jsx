import PropTypes from "prop-types";
import { Flex } from "..";
import cn from "../../../utils/cn";

const SectionHeadContainer = ({ children, className, ...props }) => (
  <Flex
    flex={true}
    direction="flex-col xl:flex-row"
    align="items-start xl:items-end"
    justify="xl:justify-between"
    gap="xl:gap-x-16"
    spaceY="space-y-[15px] xl:space-y-0"
    className={cn("w-full", "lg:my-12", className)}
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
