import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionTitle = ({ labels, dir }) => (
  <SectionHeadContainer className="app_container">
    <Typography as="h2" variant="section-title" dir={dir}>
      {labels.title}
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="xl:[direction:rtl]" dir={dir}>
      {labels.subtitles.subtitle}{" "}
      <Typography.Text accent>{labels.subtitles.subtitle_highlight}</Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitles: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      subtitle_highlight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dir: PropTypes.string.isRequired,
};

export default SectionTitle;
