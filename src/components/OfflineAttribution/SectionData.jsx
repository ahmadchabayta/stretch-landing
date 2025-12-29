import PropTypes from "prop-types";
import { Typography } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import cn from "../../utils/cn";

const SectionData = ({ labels, dir, language }) => {
  const parsedNumber = Number(String(labels.number).replace(/,/g, ""));
  const counterRef = useAnimatedCounter(parsedNumber, {
    duration: 2,
    dependencies: [parsedNumber],
  });

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "app_container z-50",
        "2xl:absolute 2xl:top-[151px]",
        language === "en" ? "2xl:right-[111px]" : "2xl:left-[111px]",
        "3xl:w-[920px]! 2xl:w-[620px]!",
      )}
      style={{
        flexDirection: language === "en" ? "row" : "row-reverse",
      }}
    >
      <Typography
        as="h3"
        ref={counterRef}
        className="text-[77px] font-light 2xl:mr-0 2xl:text-[160px]"
        dir={dir}
      />
      <Typography as="p" className="text-black [direction:ltr] xl:[direction:rtl]" dir={dir}>
        {labels.description.desc}
        <br />
        <Typography.Text className="font-bold">{labels.description.highlight}</Typography.Text>
      </Typography>
    </div>
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
  dir: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionData;
