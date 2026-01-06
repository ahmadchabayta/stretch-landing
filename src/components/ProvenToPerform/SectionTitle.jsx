import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer className="relative z-50">
    <Typography className="text-white" as="h2" variant="section-title">
      {labels.title}
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
