import { useState, useEffect, useRef } from "react";
import data from "./proven_to_perform.data.json";
import { Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import ImageCard from "./ImageCard";

const ProvenToPerform = () => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const isArabic = language === "ar";

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [contentStyle, setContentStyle] = useState({});

  useEffect(() => {
    const calculatePosition = () => {
      if (sectionRef.current && titleRef.current) {
        const sectionHeight = sectionRef.current.offsetHeight;
        const titleHeight = titleRef.current.offsetHeight;
        const availableSpace = sectionHeight - titleHeight;
        const centerOffset = titleHeight + availableSpace / 2;

        setContentStyle({
          position: "absolute",
          top: `${centerOffset}px`,
          left: "50%",
          transform: "translate(-50%, -50%)",
        });
      }
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, []);

  return (
    <Section container className="relative" ref={sectionRef}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${data.grid})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div ref={titleRef}>
        <SectionTitle labels={labels} />
      </div>

      <div className="w-full relative z-10" style={contentStyle}>
        <Flex
          flex={true}
          direction="flex-col xl:flex-row"
          align="xl:items-end"
          justify="justify-center"
          spaceY="space-y-[90px] lg:space-y-[96px] xl:space-y-0"
          spaceX="xl:space-x-8"
          className="mx-auto overflow-visible w-[370px] md:w-[500px] lg:w-[850px] xl:w-[600px] 2xl:w-[1404px] 3xl:w-[1745px]"
        >
          <ImageCard image={labels.images.img_1} isArabic={isArabic} />
          <ImageCard image={labels.images.img_2} isArabic={isArabic} isSecondCard />
        </Flex>
      </div>
    </Section>
  );
};

ProvenToPerform.propTypes = {
  // no external props currently
};

export default ProvenToPerform;
