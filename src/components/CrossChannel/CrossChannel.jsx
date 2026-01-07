import PropTypes from "prop-types";
import rawData from "./cross_channel.data.json";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "../../context/LanguageContext";
import { Section, Container } from "../../components";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { withBase } from "../../utils/withBase";
import MobileSectionTitle from "./MobileSectionTitle";
import Description from "./Description";

const CrossChannel = ({ id }) => {
  const { language } = useLanguage();
  const labels = rawData.languages?.[language] || rawData.languages?.en;
  const percentageRef = useAnimatedCounter(labels.percentage, { duration: 2 });

  return (
    <Section id={id} className="flex flex-col relative overflow-hidden">
      <Container>
        <div dir="ltr" className="flex flex-col xl:grid xl:grid-cols-2 items-start relative h-full">
          {/* // desktop */}
          <SectionTitle className="hidden xl:flex flex-col!" labels={labels} language={language} />
          <MobileSectionTitle className="flex xl:hidden" labels={labels} language={language} />
          <SectionData labels={labels} language={language} percentageRef={percentageRef} />
        </div>
      </Container>

      {/* Image Container */}

      <Container className="flex xl:hidden flex-col items-center justify-center w-screen!">
        <img
          src={withBase(labels.images.small)}
          alt="Cross Channel Background"
          className="translate-x-[-13%] w-full h-auto min-w-[625px] md:min-w-[1000px] xl:w-7xl"
        />
        <Description className="mx-auto max-w-[80vw]" labels={labels} language={language} />
      </Container>
    </Section>
  );
};

CrossChannel.propTypes = {
  id: PropTypes.string,
};

export default CrossChannel;
