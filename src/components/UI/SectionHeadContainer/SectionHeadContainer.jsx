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
    className={cn(
      "w-full",
      "lg:my-12",
      "pl-6",
      "lg:pl-[61px]",
      "2xl:pr-[104px] 2xl:pl-[52px]",
      "3xl:pr-3.5 3xl:pl-[147px]",
      className,
    )}
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
