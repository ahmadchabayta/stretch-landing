import PropTypes from "prop-types";
import { Flex } from "..";
import cn from "../../../utils/cn";

const SectionHeadContainer = ({ children, className, ...props }) => {
  return (
    <Flex
      flex="flex"
      direction="flex-col xl:flex-row xl:rtl:flex-row-reverse"
      align="items-start xl:items-end"
      justify="justify-start xl:justify-between"
      spaceY="space-y-[15px] xl:space-y-0"
      className={cn("w-full py-10", className)}
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
