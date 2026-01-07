import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";
import cn from "../../utils/cn";
import { withBase } from "../../utils/withBase";

const SectionTitle = ({ labels, className }) => (
  <SectionHeadContainer className={cn("mb-6 xl:mb-12 items-start! h-full", className)}>
    <Typography as="h2" variant="section-title" className="max-w-[808px]!">
      {labels.title}
    </Typography>
    <img
      src={withBase(labels.images.large)}
      alt="Cross Channel Background"
      className="hidden min-w-[80vw] 3xl:min-w-[1500px] w-full xl:flex translate-x-[-30%]"
    />
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    images: PropTypes.shape({
      large: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
