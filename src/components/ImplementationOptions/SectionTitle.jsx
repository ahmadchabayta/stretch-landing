import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ labels, language }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title">
      {labels.title.part1}
      <br />
      <Typography.Text>{labels.title.part2}</Typography.Text>
    </Typography>
    <Typography
      as="h3"
      variant="section-subtitle"
      className={`${language === "ar" ? "font-[Tajawal,sans-serif]" : ""} `}
    >
      <Typography.Text>{`${labels.subtitle.line1} `}</Typography.Text>
      <Typography.Text accent bold>
        {labels.subtitle.line_highlight}
      </Typography.Text>
      <br />
      <Typography.Text>{` ${labels.subtitle.line2} `}</Typography.Text>
      <Typography.Text bold>{labels.subtitle.line_bold}</Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.shape({
      part1: PropTypes.string.isRequired,
      part2: PropTypes.string.isRequired,
    }).isRequired,
    subtitle: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      line_highlight: PropTypes.string.isRequired,
      line2: PropTypes.string.isRequired,
      line_bold: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionTitle;
