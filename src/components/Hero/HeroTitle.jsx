import PropTypes from "prop-types";
import { Typography } from "..";

const HeroTitle = ({ sectionLabels }) => (
  <>
    <Typography as="h1" variant="hero-title" className="mb-6 lg:mb-7">
      {sectionLabels.title}
    </Typography>

    {/* Hero Subtitle - 3 lines stacked */}
    <Typography
      as="h2"
      variant="hero-subtitle"
      className="mb-6 max-w-[370px] space-y-1 lg:mb-8 lg:max-w-[761px] 2xl:max-w-none"
    >
      <Typography.Text br>{sectionLabels.subtitle}</Typography.Text>
      <Typography.Text br>{sectionLabels.subtitle_2}</Typography.Text>
      <Typography.Text accent>{sectionLabels.highlighted_subtitle}</Typography.Text>
    </Typography>

    {/* Hero Description */}
    <Typography
      as="p"
      variant="hero-description"
      className="3xl:max-w-[855px] mb-8 max-w-[350px] md:max-w-[450px] lg:mb-20"
    >
      {sectionLabels.description}
    </Typography>
  </>
);

HeroTitle.propTypes = {
  sectionLabels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    subtitle_2: PropTypes.string.isRequired,
    highlighted_subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeroTitle;
