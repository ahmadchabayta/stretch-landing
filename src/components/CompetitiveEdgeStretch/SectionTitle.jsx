import PropTypes from "prop-types";
import { Typography } from "../../components";

const SectionTitle = ({ title }) => (
  <Typography as="h2" variant="section-title">
    {title.part1}
    <br />
    <Typography.Text>{title.part2}</Typography.Text>
  </Typography>
);

SectionTitle.propTypes = {
  title: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionTitle;
