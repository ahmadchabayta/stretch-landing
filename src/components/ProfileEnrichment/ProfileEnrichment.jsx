import PropTypes from "prop-types";
import data from "./profile_enrichment.data.json";
import { Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import InteractiveCarousel from "./InteractiveCarousel";

const ProfileEnrichment = ({ id }) => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  return (
    <Section
      id={id}
      style={{
        backgroundImage: `url(${data.images.background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      container={true}
      className="relative overflow-hidden"
    >
      <div className="relative z-10">
        <SectionTitle labels={labels} />
      </div>
      <div className="absolute left-0 w-full bottom-0 h-[65%] md:h-[70%] lg:h-[75%]">
        <InteractiveCarousel images={data.images} />
      </div>
    </Section>
  );
};

ProfileEnrichment.propTypes = {
  id: PropTypes.string,
};

export default ProfileEnrichment;
