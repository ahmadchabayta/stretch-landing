import PropTypes from "prop-types";
import cn from "../../utils/cn";
import { Flex, Typography } from "../UI";

const MobileSectionTitle = ({ className, labels }) => {
  return (
    <Flex
      direction="flex-col"
      spaceY="space-y-[15px] lg:space-y-0"
      className={cn("w-full", className)}
    >
      <Typography as="h2" variant="section-title" className="max-w-[808px]!">
        {labels.title}
      </Typography>
      <Typography as="h3" variant="section-subtitle" className="text-secondary font-bold prose">
        {labels.subtitle}
      </Typography>
    </Flex>
  );
};
MobileSectionTitle.propTypes = {
  labels: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default MobileSectionTitle;
