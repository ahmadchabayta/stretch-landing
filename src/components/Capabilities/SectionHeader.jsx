import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionHeader = ({ title, subtitle, subtitleHighlighted }) => (
  <SectionHeadContainer className="section_head_container">
    <Typography as="h2" variant="section-title" className="max-w-sm md:max-w-xl lg:max-w-4xl">
      {title}
    </Typography>
    <Typography
      as="h2"
      variant="section-subtitle"
      className="font-poppins text-justify text-sm font-normal lg:text-right lg:text-2xl"
    >
      {subtitle}{" "}
      <Typography.Text accent bold>
        {subtitleHighlighted}
      </Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  subtitleHighlighted: PropTypes.string.isRequired,
};

export default SectionHeader;
