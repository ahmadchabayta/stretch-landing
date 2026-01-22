import PropTypes from "prop-types";
import WhyDoYouNeedStretchIcons from "./WhyDoYouNeedStretchIcons";
import _data from "./whyYouNeedStretch.data.json";
import { Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import { withBase } from "../../utils/withBase";

const WhyDoYouNeedStretch = ({ id }) => {
  const { language } = useLanguage();
  const sectionLabels = _data.languages[language] || _data.languages.en;
  return (
    <Section
      id={id}
      container={true}
      className="overflow-hidden flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('${withBase(_data.backgroundImage)}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top right",
      }}
    >
      <SectionTitle data={sectionLabels} />

      <WhyDoYouNeedStretchIcons data={sectionLabels} />
    </Section>
  );
};

WhyDoYouNeedStretch.propTypes = {
  id: PropTypes.string,
};

export default WhyDoYouNeedStretch;
