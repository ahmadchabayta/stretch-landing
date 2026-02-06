import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title">
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="max-w-[637px] text-balance">
      {labels.subtitle}
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,
};

export default SectionTitle;
