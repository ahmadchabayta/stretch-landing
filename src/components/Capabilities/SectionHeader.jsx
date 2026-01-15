import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionHeader = ({ title, subtitle, subtitleHighlighted }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title" className="max-w-sm md:max-w-xl lg:max-w-4xl">
      {title.part1}
      <br />
      <Typography.Text>{title.part2}</Typography.Text>
    </Typography>
    <Typography as="h2" variant="section-subtitle" className="">
      {subtitle}{" "}
      <Typography.Text accent bold>
        {subtitleHighlighted}
      </Typography.Text>
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
