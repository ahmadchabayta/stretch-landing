import { useState } from "react";
import DashboardImage from "./DashboardImage";
import DecorativeCircle from "./DecorativeCircle";
import data from "./stretch_user_experience.data.json";
import { Container, Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import { withBase } from "../../utils/withBase";

const StretchUserExperience = () => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  const initialItems = [
    {
      id: "tags",
      src: withBase("assets/stretch_user_experience/tags.webp"),
      alt: "Dashboard campaigns view with Tags",
    },
    {
      id: "reports",
      src: withBase("assets/stretch_user_experience/graphs.webp"),
      alt: "Dashboard reports stack",
    },
    {
      id: "platforms",
      src: withBase("assets/stretch_user_experience/nav.webp"),
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

      <Container>
        <Flex
          className="relative mx-auto overflow-visible py-10 lg:py-14"
          direction="flex-col"
          align="items-center"
          justify="justify-center"
          gap="gap-10 lg:gap-10"
        >
          <SectionTitle currentStep={currentStep} data={sectionLabels} />

          <div
            className="relative mt-[200px] lg:mt-0 flex w-full items-start justify-center"
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

            <button
              type="button"
              aria-label="Next experience image"
              onClick={handleItemClick}
              className="3xl:right-[147px] absolute top-1/2 right-[-147px] z-[9999] hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-[#FF4200] shadow-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-[#FF4200] focus:ring-offset-2 focus:outline-none lg:hidden xl:right-[1.9px] xl:flex 2xl:right-[62px]"
            />
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

StretchUserExperience.propTypes = {
  // no external props currently
};

export default StretchUserExperience;
