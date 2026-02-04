import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title">
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="w-[400px]">
      {labels.subtitle.subtitle}{" "}
      <Typography.Text bold accent>
        {labels.subtitle.highlighted}
      </Typography.Text>{" "}
      {labels.subtitle.subtitle_2}{" "}
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      highlighted: PropTypes.string.isRequired,
      subtitle_2: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SectionTitle;
