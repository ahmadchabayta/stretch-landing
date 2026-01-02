import { useState, useEffect } from "react";
import DashboardImage from "./DashboardImage";
import data from "./stretch_user_experience.data.json";
import { Container, Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import useMediaQuery from "../../hooks/useMediaQuery";
import SectionTitle from "./SectionTitle";
import { withBase } from "../../utils/withBase";

const StretchUserExperience = () => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const circleSrc = withBase(isLargeScreen ? data.images.large : data.images.small);

  const items = [
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

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handleItemClick = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Calculate angle for each item based on its position relative to current
  const getAngle = (index) => {
    const anglePerItem = 360 / items.length; // 120° apart for 3 items
    const relativeIndex = (index - currentIndex + items.length) % items.length;
    // Map: 0 = left (-90°), 1 = right-back, 2 = far-back
    // Start at -90° so front item is on the left
    return -90 + relativeIndex * anglePerItem;
  };

  // Responsive radius - controls how spread out items are
  const radius = isLargeScreen ? 550 : 250;

  const currentStep = currentIndex + 1;

  return (
    <Section container={false} className="stretch_user_experience relative w-full">
      <img
        className={`
                      absolute
                      z-0
                      object-contain
                      top-[307px]
                      right-[-0.5%]
                      w-[clamp(96px,20vw,140px)]
                      md:right-[0.5%]
                      md:w-[clamp(180px,32vw,240px)]
                      lg:w-[clamp(340px,32vw,420px)]
                      xl:top-[366px]
                      xl:left-[41px]
                    `}
        src={circleSrc}
        alt="Blue Circle"
      />

      <Container className="z-50 relative">
        <Flex
          className="mx-auto overflow-visible"
          direction="flex-col"
          align="items-center"
          justify="justify-center"
          gap="gap-10 lg:gap-10"
        >
          <Container>
            <SectionTitle currentStep={currentStep} data={sectionLabels} />
          </Container>

          {/* Carousel container with perspective */}
          <div
            className="relative w-[95%] max-w-[1623px] flex items-center justify-center"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center center",
              height: isLargeScreen ? "500px" : "700px",
            }}
          >
            {/* 3D scene container */}
            <div
              className="relative flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                width: "100%",
                height: "100%",
              }}
            >
              {items.map((item, index) => (
                <DashboardImage
                  key={item.id}
                  item={item}
                  angle={getAngle(index)}
                  radius={radius}
                  onClick={handleItemClick}
                  isActive={index === currentIndex}
                  isVertical={!isLargeScreen}
                />
              ))}
            </div>

            {/* Navigation button */}
            <button
              type="button"
              aria-label="Next slide"
              onClick={handleItemClick}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#FF4200] flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF4200] focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};
export default StretchUserExperience;
