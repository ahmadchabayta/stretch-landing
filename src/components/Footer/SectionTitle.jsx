import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels, language }) => (
  <SectionHeadContainer>
    <Typography
      as="h2"
      variant="section-title"
      className={`${language === "ar" ? "font-[Tajawal,sans-serif]" : ""}`}
    >
      {labels.title}
    </Typography>
    <Typography
      as="h3"
      variant="section-subtitle"
      className={`${language === "ar" ? "font-[Tajawal,sans-serif]" : ""} font-bold `}
    >
      {labels.subtitle.subtitle}
      <Typography.Text accent>{labels.subtitle.highlight}</Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionTitle;
