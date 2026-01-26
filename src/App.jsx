import { useRef, useState } from "react";
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
  ProvenToPerform,
  CompetitiveEdgeStretch,
  ImplementationOptions,
  Footer,
  Typography,
  Button,
  DemoModal,
} from "./components";
import { useLanguage } from "./context/LanguageContext";
import url_links_data from "../src/components/Navbar/navbar.data.json";
import ProfileEnrichmentAlternative from "./components/ProfileEnrichmentAlternative/ProfileEnrichmentAlternative";

const buttonLabels = {
  en: "Book a Demo",
  ar: "احجز عرضاً توضيحياً",
};

const App = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.1 });
  const footerInView = useInView(footerRef, { amount: 0.1 });
  const hideButton = heroInView || footerInView;

  const floatingButtonClass = `bg-primary fixed xl:opacity-50! px-2 py-2 hover:opacity-100! transition-all duration-300 linear bottom-10 z-10000 ${
    language === "ar" ? "font-tajawal left-5" : "right-5 font-poppins"
  } ${hideButton ? `${language === "ar" ? "translate-x-[-150%]" : "translate-x-[150%]"} pointer-events-none opacity-0!` : ""}`;

  return (
    <div className="overflow-x-hidden bg-[#FAFBFC]">
      {/* for testing purpooses - to test title*/}
      {/* <Container className="fixed h-[90vh] pointer-events-none z-99999 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] border-x-2 border-black" /> */}
      <Button onClick={() => setIsModalOpen(true)} variant="fixed" className={floatingButtonClass}>
        <Typography as="span" variant="button-text">
          {buttonLabels[language]}
        </Typography>
      </Button>
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <>
        <Navbar />
        <div ref={heroRef}>
          <Hero className="bg-white" id={url_links_data.link_urls[0]} />
        </div>
        <WhatIsStretch className="bg-white" id="what-is-stretch" />
        <WhyDoYouNeedStretch className="bg-white" />
        <StretchUserExperience className="bg-[#FAFBFC]" />
        <Capabilities className="bg-white" id="capabilities" />
        <CrossChannel className="bg-[#FAFBFC]" />
        <AudienceMirroring className="bg-white" />
        <OfflineAttribution className="bg-[#FAFBFC]" />
        {/* <ProfileEnrichment className="bg-white" /> */}
        <ProfileEnrichmentAlternative className="bg-white" />
        <ProvenToPerform className="bg-[#FAFBFC]" />
        <CompetitiveEdgeStretch className="bg-white" />
        <ImplementationOptions className="bg-[#FAFBFC]" />
        <div ref={footerRef}>
          <Footer id={url_links_data.link_urls[3]} />
        </div>
      </>
    </div>
  );
};

export default App;
