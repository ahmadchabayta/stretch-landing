import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionTitle = ({ title, language }) => (
  <SectionHeadContainer>
    <Typography
      as="h2"
      variant="section-title"
      className={language === "ar" ? "font-[Tajawal,sans-serif] font-bold" : ""}
    >
      {title}
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionTitle;
