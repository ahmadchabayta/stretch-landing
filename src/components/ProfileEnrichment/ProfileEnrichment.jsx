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
      padding="none"
      className="relative overflow-hidden"
    >
      <SectionTitle labels={labels} />
      <InteractiveCarousel images={data.images} />
    </Section>
  );
};

ProfileEnrichment.propTypes = {
  id: PropTypes.string,
};

export default ProfileEnrichment;
