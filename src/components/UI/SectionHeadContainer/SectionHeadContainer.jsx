import PropTypes from "prop-types";
import { Flex } from "..";
import { useLanguage } from "../../../context/LanguageContext";
import cn from "../../../utils/cn";

const SectionHeadContainer = ({ children, className, ...props }) => {
  const { currentLanguage } = useLanguage() || {};
  const dir = currentLanguage?.dir || "ltr";
  const paddingClass = dir === "rtl" ? "lg:pl-[30px]" : "lg:pr-[30px]";

  return (
    <Flex
      flex={true}
      direction="flex-col xl:flex-row"
      align="items-start xl:items-end"
      justify="xl:justify-between"
      gap="xl:gap-x-16"
      spaceY="space-y-[15px] xl:space-y-0"
      className={cn("w-full my-10", paddingClass, className)}
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
