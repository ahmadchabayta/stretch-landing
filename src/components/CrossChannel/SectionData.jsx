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
      justify="justify-between"
      align="items-bottom xl:items-end"
      className={`xl:flex-col 2xl:absolute min-w-[282px] w-full xl:max-w-[587px] min-h-full ${
        language === "en" ? "2xl:right-[17px] 3xl:right-4" : "2xl:left-0"
      } 2xl:top-[250px] relative`}
    >
      <Flex
        direction="flex-col"
        align="xl:items-end"
        justify="justify-end"
        className="space-y-3 text-end! w-full"
      >
        <Typography
          as="h3"
          variant="section-subtitle"
          className="3xl:mt-0 text-start! text-secondary 3xl:text-[24px] 3xl:text-end text-[14px] leading-[21px] font-bold xl:hidden"
        >
          {labels.subtitle}
        </Typography>
        <div className="flex xl:flex-col w-full items-center xl:items-end justify-between">
          <Typography
            as="h3"
            variant="section-subtitle"
            className="text-start max-w-[265px] font-normal!"
          >
            {labels.other_subtitle}
          </Typography>

          <Typography as="h3" className="text-[77px] font-light lg:text-[160px]">
            <span ref={percentageRef} />
            {language === "ar" ? "٪" : "%"}
          </Typography>
        </div>
      </Flex>

      {/* Description - shows under percentage in column mode, hidden in row mode */}
      <Description
        labels={labels}
        language={language}
        className="hidden xl:mt-[65%] xl:block min-w-[382px] max-w-[587px] text-end! z-50"
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
