import {
  AudienceMirroring,
  Capabilities,
  CrossChannel,
  Hero,
  Navbar,
  OfflineAttribution,
  StretchUserExperience,
  WhatIsStretch,
  WhyDoYouNeedStretch,
  ProfileEnrichment,
  ProvenToPerform,
  CompetitiveEdgeStretch,
  ImplementationOptions,
  Footer,
  Typography,
  Button,
} from "./components";
import { useLanguage } from "./context/LanguageContext";
import url_links_data from "../src/components/Navbar/navbar.data.json";
import { capability_url_links } from "./components/Capabilities/capabilities.data";

const buttonLabels = {
  en: "Book a Demo",
  ar: "احجز عرضاً توضيحياً",
};

const App = () => {
  const { language } = useLanguage();

  const floatingButtonClass = `primary-btn fixed xl:opacity-50! px-2 py-2 hover:opacity-100! transition-all duration-75 linear bottom-10 z-10000 ${
    language === "ar" ? "font-tajawal left-5" : "right-5 font-poppins"
  }`;

  return (
    <div className="overflow-x-hidden">
      <Button variant="demo" className={floatingButtonClass}>
        <Typography as="span" variant="button-text">
          {buttonLabels[language]}
        </Typography>
      </Button>
      <>
        <Navbar />
        <Hero id={url_links_data.link_urls[0]} />
        <WhatIsStretch id={url_links_data.link_urls[1]} />
        <WhyDoYouNeedStretch id={url_links_data.link_urls[2]} />
        <StretchUserExperience />
        <Capabilities />
        <CrossChannel id={capability_url_links[0]} />
        <AudienceMirroring id={capability_url_links[2]} />
        <OfflineAttribution id={capability_url_links[3]} />
        <ProfileEnrichment id={capability_url_links[1]} />
        <ProvenToPerform />
        <CompetitiveEdgeStretch />
        <ImplementationOptions />
        <Footer id={url_links_data.link_urls[3]} />
      </>
    </div>
  );
};

export default App;
