import PropTypes from "prop-types";
import { Flex, Typography } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

// eslint-disable-next-line no-unused-vars
const SectionData = ({ labels, language }) => {
  const parsedNumber = Number(String(labels.number).replace(/,/g, ""));
  const locale = language === "ar" ? "ar-EG" : "en-US";
  const counterRef = useAnimatedCounter(parsedNumber, {
    duration: 2,
    dependencies: [parsedNumber],
    locale,
  });

  return (
    <Flex
      align="items-end xl:items-center"
      justify="xl:justify-between"
      className="mx-0! w-full xl:max-w-[510px] 2xl:max-w-[600px] 3xl:max-w-[720px] space-x-3 xl:space-x-0"
    >
      <Typography
        as="h3"
        ref={counterRef}
        className="text-[77px] md:text-[120px] lg:text-[160px] font-light 2xl:mr-0 z-20"
      />
      <Typography
        as="p"
        className="text-black text-left text-sm lg:text-[20px] 3xl:text-[24px] mb-6 xl:mb-0"
      >
        {labels.description.desc}
        <br />
        <Typography.Text className="font-bold">{labels.description.highlight}</Typography.Text>
      </Typography>
    </Flex>
  );
};

SectionData.propTypes = {
  labels: PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.shape({
      desc: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionData;
