import PropTypes from "prop-types";
import rawData from "./cross_channel.data.json";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../../context/LanguageContext";
import { Flex, Section, Container } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { withBase } from "../../utils/withBase";
import Description from "./Description";

const CrossChannel = ({ id }) => {
  const { language } = useLanguage();
  const labels = rawData.languages?.[language] || rawData.languages?.en;
  const percentageRef = useAnimatedCounter(labels.percentage, { duration: 2 });

  return (
    <Section id={id} className="relative overflow-hidden flex items-center justify-center">
      <Container>
        <Flex direction="flex-col" align="items-end" className="relative">
          <SectionTitle labels={labels} language={language} />
          <SectionData labels={labels} language={language} percentageRef={percentageRef} />
        </Flex>
      </Container>

      {/* Image Container */}
      <Flex
        direction="flex-col"
        align="justify-center xl:items-start"
        justify="justify-center xl:justify-start"
        className="min-h-full"
      >
        <img
          src={withBase(labels.img)}
          alt="Cross Channel Background"
          className={`w-[592px] md:w-[900px] lg:w-[1299px] ${language === "ar" ? "translate-x-[5%] xl:translate-x-[18%] 2xl:translate-x-[5%]" : "translate-x-[-5%] xl:translate-x-[-18%] 2xl:translate-x-[-24%]"}`}
        />
        <Description
          labels={labels}
          language={language}
          className="block xl:hidden text-balance min-w-[342px] max-w-[587px] text-center! z-50 mx-auto"
        />
      </Flex>
    </Section>
  );
};

CrossChannel.propTypes = {
  id: PropTypes.string,
};

export default CrossChannel;
