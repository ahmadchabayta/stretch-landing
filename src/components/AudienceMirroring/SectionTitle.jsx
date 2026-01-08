import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels, dir }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title" dir={dir}>
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle" dir={dir} className="">
      {labels.subtitle}
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,
  dir: PropTypes.string,
};

export default SectionTitle;
