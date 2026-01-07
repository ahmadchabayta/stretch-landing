import PropTypes from "prop-types";
import { Typography, Flex } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import Description from "./Description";

const SectionData = ({ labels, language }) => {
  const percentageRef = useAnimatedCounter(labels.percentage, {
    duration: 2,
    locale: language === "ar" ? "ar-EG" : "en-US",
  });
  return (
    <Flex
      className="w-full h-full xl:mt-[113px]"
      justify="justify-between"
      align="xl:items-end"
      direction="flex-col"
    >
      <Flex
        direction="xl:flex-col"
        align="items-center xl:items-end"
        justify="justify-between"
        className="w-full"
      >
        <Typography
          as="h3"
          variant="section-subtitle"
          className="hidden xl:flex text-secondary font-bold prose"
        >
          {labels.subtitle}
        </Typography>
        <Typography
          as="h3"
          variant="section-subtitle"
          className="text-start max-w-[153px] xl:max-w-[265px] font-normal!"
        >
          {labels.other_subtitle}
        </Typography>

        <Typography as="h3" className="text-[77px] font-light lg:text-[160px]">
          <span ref={percentageRef} />
          {language === "ar" ? "٪" : "%"}
        </Typography>
      </Flex>
      <Description
        labels={labels}
        language={language}
        className={`hidden absolute bottom-[10%] xl:block min-w-[382px] max-w-[587px] text-end! z-50 ${language === "ar" ? "right-0" : "right-0"}`}
      />
    </Flex>
  );
};

SectionData.propTypes = {
  labels: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    other_subtitle: PropTypes.string.isRequired,
    percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionData;
