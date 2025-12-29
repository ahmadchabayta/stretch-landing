import { useState } from "react";
import DashboardImage from "./DashboardImage";
import DecorativeCircle from "./DecorativeCircle";
import data from "./stretch_user_experience.data.json";
import { Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";

const StretchUserExperience = () => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  const initialItems = [
    {
      id: "tags",
      src: "/assets/stretch_user_experience/tags.webp",
      alt: "Dashboard campaigns view with Tags",
    },
    {
      id: "reports",
      src: "/assets/stretch_user_experience/graphs.webp",
      alt: "Dashboard reports stack",
    },
    {
      id: "platforms",
      src: "/assets/stretch_user_experience/nav.webp",
      alt: "Platform list",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = () => {
    setCurrentIndex((prev) => (prev + 1) % initialItems.length);
  };

  const getPosition = (itemIndex) => {
    const relativePos = (itemIndex - currentIndex + initialItems.length) % initialItems.length;
    return relativePos === 0 ? "first" : relativePos === 1 ? "second" : "third";
  };

  const currentStep = currentIndex + 1;

  return (
    <Section container={false} padding="none" className="stretch_user_experience relative">
      <DecorativeCircle type="background" />
      <DecorativeCircle type="blueGradient" />
      <DecorativeCircle type="shadow" />
      <DecorativeCircle type="orange" onClick={handleItemClick} />

      <Flex
        className="app_container relative mx-auto overflow-visible py-10 lg:py-14"
        direction="flex-col"
        align="items-center"
        justify="justify-center"
        gap="gap-10 lg:gap-10"
      >
        <SectionTitle currentStep={currentStep} data={sectionLabels} />

        <div
          className="relative mt-[200px] flex w-full items-center justify-center lg:mt-0"
          style={{ height: "clamp(350px, 65vw, 950px)" }}
        >
          {initialItems.map((item, index) => (
            <DashboardImage
              key={item.id}
              item={item}
              position={getPosition(index)}
              onClick={handleItemClick}
              language={language}
            />
          ))}
        </div>
      </Flex>
    </Section>
  );
};

StretchUserExperience.propTypes = {
  // no external props currently
};

export default StretchUserExperience;
