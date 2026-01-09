import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer className="app_container">
    <Typography as="h2" variant="section-title">
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle">
      {labels.subtitles.subtitle}{" "}
      <Typography.Text accent bold>
        {labels.subtitles.subtitle_highlight}
      </Typography.Text>
      {` `}
      <Typography.Text>{labels.subtitles.visits}</Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitles: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      subtitle_highlight: PropTypes.string.isRequired,
      visits: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default SectionTitle;
