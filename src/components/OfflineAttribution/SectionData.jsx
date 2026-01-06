import PropTypes from "prop-types";
import { Container, Typography } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import cn from "../../utils/cn";

const SectionData = ({ labels, dir, language }) => {
  const parsedNumber = Number(String(labels.number).replace(/,/g, ""));
  const counterRef = useAnimatedCounter(parsedNumber, {
    duration: 2,
    dependencies: [parsedNumber],
  });

  return (
    <Container
      className={cn(
        "flex items-center justify-between",
        "z-50",
        "2xl:absolute 2xl:top-[300px]",
        "2xl:max-w-[clamp(620px,46.35vw,890px)]!",
        language === "en"
          ? "2xl:right-[58px]  3xl:right-[148px]"
          : "2xl:right-[58px]  3xl:right-[148px]",
      )}
      style={{
        flexDirection: language === "en" ? "row" : "row-reverse",
      }}
    >
      <Typography
        as="h3"
        ref={counterRef}
        className="font-poppins text-[77px] font-light 2xl:mr-0 2xl:text-[160px]"
        dir={dir}
      />
      <Typography
        as="p"
        className="text-black [direction:ltr] xl:[direction:rtl] text-sm lg:text-[20px] 3xl:text-[24px]"
        dir={dir}
      >
        {labels.description.desc}
        <br />
        <Typography.Text className="font-bold">{labels.description.highlight}</Typography.Text>
      </Typography>
    </Container>
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
