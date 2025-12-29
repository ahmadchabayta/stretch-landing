import PropTypes from "prop-types";
import WhyDoYouNeedStretchIcons from "./WhyDoYouNeedStretchIcons";
import _data from "./whyYouNeedStretch.data.json";
import { Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";

const WhyDoYouNeedStretch = ({ id }) => {
  const { language } = useLanguage();
  const sectionLabels = _data.languages[language] || _data.languages.en;
  return (
    <div className="bg-[#FAFAFB]">
      <Section
        id={id}
        padding="none"
        container={true}
        className="flex flex-col items-center justify-center"
      >
        <SectionTitle data={sectionLabels} />

        <Flex
          flex="flex lg:grid lg:grid-cols-2 "
          direction="flex-col"
          align="items-center"
          justify="justify-center"
          spaceY="space-y-[25px] lg:space-y-0"
          gap="lg:gap-y-20"
          className="w-full pb-12"
        >
          <WhyDoYouNeedStretchIcons data={sectionLabels} />
        </Flex>
      </Section>
    </div>
  );
};

WhyDoYouNeedStretch.propTypes = {
  id: PropTypes.string,
};

export default WhyDoYouNeedStretch;
