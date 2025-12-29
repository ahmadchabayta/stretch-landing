import PropTypes from "prop-types";
import rawData from "./cross_channel.data.json";
import Description from "./Description";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../../context/LanguageContext";
import { Flex, Section } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

const CrossChannel = ({ id }) => {
  const { language } = useLanguage();
  const labels = rawData.languages?.[language] || rawData.languages?.en;
  const percentageRef = useAnimatedCounter(labels.percentage, { duration: 2 });

  return (
    <Section id={id} container={false} padding="none" className="relative min-h-0! overflow-hidden">
      <Flex direction="flex-col" className="app_container relative">
        <SectionTitle labels={labels} language={language} />
        <SectionData labels={labels} language={language} percentageRef={percentageRef} />
      </Flex>

      {/* Image and Description Container */}
      <Flex
        direction="flex-col 2xl:flex-row"
        align="items-center lg:items-end"
        justify="justify-center lg:justify-end"
        className="3xl:pr-0 2xl:pr-[117px]"
      >
        <img
          src={labels.img}
          alt="Cross Channel Background"
          className={`h-[395px] w-[592px] object-contain md:h-[666px] md:w-[900px] lg:h-[866px] lg:w-[1299px]`}
        />

        <Description
          className="3xl:max-w-[587px]! lg:max-w-[762px]! 2xl:mb-[140px]"
          labels={labels}
          language={language}
        />
      </Flex>
    </Section>
  );
};

CrossChannel.propTypes = {
  id: PropTypes.string,
};

export default CrossChannel;
