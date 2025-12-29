import PropTypes from "prop-types";
import { Typography, Flex } from "../../components";

const SectionData = ({ labels, language, percentageRef }) => (
  <Flex
    justify="justify-between"
    align="items-bottom xl:items-end"
    className={`xl:flex-col 2xl:absolute ${
      language === "en" ? "2xl:right-0" : "2xl:left-0"
    } 2xl:top-[150px]`}
  >
    <Flex direction="flex-col" align="items-start" className="w-full">
      <Flex
        direction="flex-row"
        align="items-center"
        justify="justify-between"
        className="w-full 2xl:flex-col"
      >
        <Flex direction="flex-col" align="items-start" className="space-y-3">
          <Typography
            as="h3"
            variant="section-subtitle"
            className="3xl:mt-0 text-secondary 3xl:text-[24px] 3xl:text-right text-[14px] leading-[21px] font-bold [direction:rtl] 2xl:hidden"
          >
            {labels.subtitle}
          </Typography>
          <Typography
            as="h3"
            variant="section-subtitle"
            className="max-w-[265px] font-normal! 2xl:[direction:rtl]"
          >
            {labels.other_subtitle}
          </Typography>
        </Flex>
        <Typography as="h3" className="text-[77px] font-light lg:text-[160px]">
          <span ref={percentageRef} />%
        </Typography>
      </Flex>
    </Flex>
  </Flex>
);

SectionData.propTypes = {
  labels: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    other_subtitle: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
  percentageRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export default SectionData;
