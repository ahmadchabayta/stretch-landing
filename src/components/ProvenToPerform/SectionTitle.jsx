import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer className="relative z-50">
    <Typography as="h2" variant="section-title">
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="text-secondary font-bold prose">
      {labels.subtitle}
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};
export default SectionTitle;
