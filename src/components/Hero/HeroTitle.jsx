import PropTypes from "prop-types";
import { Flex, Typography } from "..";

const HeroTitle = ({ sectionLabels }) => (
  <Flex direction="flex-col" align="items-start" className="text-start">
    <Typography as="h1" variant="hero-title" className="mb-[12.37px] lg:mb-6 3xl:mb-7">
      {sectionLabels.title}
    </Typography>

    {/* Hero Subtitle - 3 lines stacked */}
    <Typography
      as="h2"
      variant="hero-subtitle"
      className="mb-[11.71px] max-w-[370px] md:max-w-[500px] space-y-1 lg:mb-[21.2px] xl:mb-[68.2px] 2xl:mb-[24.7px] 3xl:mb-7 lg:max-w-[761px] 2xl:max-w-none"
    >
      <Typography.Text br>{sectionLabels.subtitle}</Typography.Text>
      <Typography.Text br>{sectionLabels.subtitle_2}</Typography.Text>
      <Typography.Text accent>{sectionLabels.highlighted_subtitle}</Typography.Text>
    </Typography>

    {/* Hero Description */}
    <Typography
      as="p"
      variant="hero-description"
      className="max-w-[350px] lg:max-w-[754.359px] 3xl:max-w-[855px]"
    >
      {sectionLabels.description}
    </Typography>
  </Flex>
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
