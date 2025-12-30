import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer className="mb-0!">
    <Typography as="h2" variant="section-title" className="max-w-[808px]!">
      {labels.title}
    </Typography>

    <Typography
      as="h3"
      variant="section-subtitle"
      className="text-secondary font-bold hidden [direction:rtl] xl:block"
    >
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
