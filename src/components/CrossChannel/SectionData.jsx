import PropTypes from "prop-types";
import { Typography, Flex } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

const SectionData = ({ labels, language }) => {
  const percentageRef = useAnimatedCounter(labels.percentage.number, {
    duration: 2,
    locale: language,
  });

  return (
    <Flex
      justify="justify-between"
      align="items-bottom xl:items-end"
      className={`xl:flex-col 2xl:absolute border-b-2 border-accent ${
        language === "en" ? "2xl:right-[17px] 3xl:right-0" : "2xl:left-0"
      } 2xl:top-[250px]`}
    >
      <Flex direction="flex-col" align="items-start" className="w-full">
        <Flex
          direction="flex-row"
          align="items-center"
          justify="justify-between"
          className="w-full 2xl:flex-col"
        >
          <Flex direction="flex-col" align="items-start" className="space-y-3">
            <Typography as="h3" variant="section-subtitle" className="text-secondary xl:hidden">
              {labels.subtitle}
            </Typography>
            <Typography
              as="h3"
              variant="section-subtitle"
              className="max-w-[265px] whitespace-pre-line font-normal!"
            >
              {labels.other_subtitle}
            </Typography>
          </Flex>
          <Typography as="h3" className="text-[77px] font-light lg:text-[160px]">
            <span ref={percentageRef} />
            {labels.percentage.suffix}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

SectionData.propTypes = {
  labels: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    other_subtitle: PropTypes.string.isRequired,
    percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionData;
