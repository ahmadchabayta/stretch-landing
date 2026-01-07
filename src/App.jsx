import { useRef } from "react";
import { useInView } from "framer-motion";
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
import GlassCards from "./components/UI/GlassCards/GlassCards";

const buttonLabels = {
  en: "Book a Demo",
  ar: "احجز عرضاً توضيحياً",
};

const App = () => {
  const { language } = useLanguage();
  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.1 });
  const footerInView = useInView(footerRef, { amount: 0.1 });
  const hideButton = heroInView || footerInView;

  const floatingButtonClass = `primary-btn fixed xl:opacity-50! px-2 py-2 hover:opacity-100! transition-all duration-300 linear bottom-10 z-10000 ${
    language === "ar" ? "font-tajawal left-5" : "right-5 font-poppins"
  } ${hideButton ? `${language === "ar" ? "translate-x-[-150%]" : "translate-x-[150%]"} pointer-events-none opacity-0!` : ""}`;

  return (
    <div className="overflow-x-hidden">
      {/* 
      for testing purpooses - to test title */}
      {/* <div className="fixed h-[90vh] w-[76.1vw] z-99999 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] border-x-2 border-black" /> */}

      <Button variant="fixed" className={floatingButtonClass}>
        <Typography as="span" variant="button-text">
          {buttonLabels[language]}
        </Typography>
      </Button>
      <>
        <Navbar />
        <div ref={heroRef}>
          <Hero id={url_links_data.link_urls[0]} />
        </div>
        <WhatIsStretch id={url_links_data.link_urls[1]} />
        <WhyDoYouNeedStretch id={url_links_data.link_urls[2]} />
        <StretchUserExperience />

        <GlassCards />

        <Capabilities />
        <CrossChannel id={capability_url_links[0]} />
        <AudienceMirroring id={capability_url_links[2]} />
        <OfflineAttribution id={capability_url_links[3]} />
        <ProfileEnrichment id={capability_url_links[1]} />
        <ProvenToPerform />
        <CompetitiveEdgeStretch />
        <ImplementationOptions />
        <div ref={footerRef}>
          <Footer id={url_links_data.link_urls[3]} />
        </div>
      </>
    </div>
  );
};

export default App;
