import PropTypes from "prop-types";
import { Typography } from "../../components";

const SectionTitle = ({ title, language }) => (
  <Typography
    as="h2"
    variant="section-title"
    className={language === "ar" ? "font-[Tajawal,sans-serif] font-bold" : ""}
  >
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
