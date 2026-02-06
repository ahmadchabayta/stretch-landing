import PropTypes from "prop-types";
import { Flex, SectionHeadContainer, Typography } from "../../components";
import cn from "../../utils/cn";
import { withBase } from "../../utils/withBase";

const SectionTitle = ({ labels, className }) => (
  <SectionHeadContainer className={cn("mb-6 xl:mb-12 items-start! h-full w-full", className)}>
    <Flex justify="justify-between" align="items-center" className="w-full ">
      <Typography as="h2" variant="section-title" className="max-w-[808px]!">
        {labels.title.part1}
        <br />
        <Typography.Text>{labels.title.part2}</Typography.Text>
      </Typography>
    </Flex>
    <img
      src={withBase(labels.images.large)}
      alt="Cross Channel Background"
      className="hidden xl:flex min-w-[1500px] w-full translate-x-[-33%]"
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
