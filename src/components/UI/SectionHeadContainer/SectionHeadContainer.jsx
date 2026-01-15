import PropTypes from "prop-types";
import { Flex } from "..";
import cn from "../../../utils/cn";

const SectionHeadContainer = ({ children, className, ...props }) => {
  return (
    <Flex
      flex={true}
      direction="flex-col xl:flex-row"
      align="items-start xl:items-center"
      justify="xl:justify-between"
      spaceY="space-y-[15px] xl:space-y-0"
      className={cn("w-full pt-10", className)}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default SectionHeadContainer;

SectionHeadContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
