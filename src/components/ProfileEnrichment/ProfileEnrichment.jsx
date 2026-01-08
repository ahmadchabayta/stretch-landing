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
      className="relative overflow-hidden h-screen"
    >
      <SectionTitle labels={labels} />
      <div className="absolute max-h-[80vh] left-0 w-full bottom-0">
        <InteractiveCarousel images={data.images} />
      </div>
    </Section>
  );
};

ProfileEnrichment.propTypes = {
  id: PropTypes.string,
};

export default ProfileEnrichment;
