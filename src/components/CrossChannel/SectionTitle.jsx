import PropTypes from "prop-types";
import { Typography } from "../../components";

const SectionTitle = ({ labels }) => (
  <div className="section_head_container mb-0!">
    <Typography as="h2" variant="section-title" className="max-w-[808px]!">
      {labels.title}
    </Typography>

    <Typography
      as="h3"
      variant="section-subtitle"
      className="text-secondary hidden font-bold [direction:rtl] 2xl:block"
    >
      {labels.subtitle}
    </Typography>
  </div>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default SectionTitle;
