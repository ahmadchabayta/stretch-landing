import data from "./stretch_user_experience.data.json";
import { Container, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import useMediaQuery from "../../hooks/useMediaQuery";
import SectionTitle from "./SectionTitle";
import { withBase } from "../../utils/withBase";
import { RippleButton } from "../UI";
import { useCarouselTimer } from "./useCarouselTimer";
import { getCarouselSpread, getCarouselPositions, getPositionIndex } from "./carouselConfig";
import CarouselItem from "./CarouselItem";

const StretchUserExperience = () => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  // Media queries
  const isMdScreen = useMediaQuery("(min-width: 740px)");
  const isLgScreen = useMediaQuery("(min-width: 1024px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const isXLScreen = useMediaQuery("(min-width: 1280px)");
  const is2XLScreen = useMediaQuery("(min-width: 1440px)");
  const is3XLScreen = useMediaQuery("(min-width: 1920px)");

  // Get carousel items from JSON and add withBase to src
  const items = data.carouselItems.map((item) => ({
    ...item,
    src: withBase(item.src),
  }));

  const { currentIndex, handleNext } = useCarouselTimer(items.length);

  // Calculate spread and positions based on screen size
  const spread = getCarouselSpread({
    is3XLScreen,
    is2XLScreen,
    isXLScreen,
    isLgScreen,
    isMdScreen,
  });
  const isMobile = !isMdScreen && !isLgScreen && !isLargeScreen;
  const positions = getCarouselPositions(spread, isLargeScreen, isMobile);

  const backgroundImage = isLargeScreen
    ? data.images.backgroundHorizontal
    : data.images.backgroundVertical;

  return (
    <Section
      container={false}
      className="stretch_user_experience relative w-full overflow-hidden"
      style={{
        backgroundImage: `url('${withBase(backgroundImage)}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <img
        className="absolute -z-0 object-contain top-[307px] right-[-0.5%] w-[clamp(96px,20vw,140px)] md:right-[0.5%] md:w-[clamp(180px,32vw,240px)] lg:w-[clamp(340px,32vw,420px)] xl:top-[366px] xl:left-[41px]"
        src={withBase(isLargeScreen ? data.images.large : data.images.small)}
        alt="Blue Circle"
      />

      <Container className="mb-8 md:mb-12 lg:mb-16 xl:mb-20">
        <SectionTitle currentStep={currentIndex + 1} data={sectionLabels} />
      </Container>

      {/* Carousel Section - Centered in Container */}
      <Container className="flex flex-col xl:flex-row xl:items-center justify-center gap-6 lg:gap-10 mt-8 md:mt-12">
        {/* 3D Carousel */}
        <div
          className="relative w-full h-[clamp(500px,60vh,700px)] md:h-[clamp(550px,65vh,750px)] xl:h-[clamp(500px,55vh,800px)] flex items-center justify-center origin-center"
          style={{ perspective: "1000px" }}
        >
          {items.map((item, index) => {
            const posIndex = getPositionIndex(index, currentIndex, items.length);
            return (
              <CarouselItem
                key={item.id}
                item={item}
                position={positions[posIndex]}
                onClick={handleNext}
              />
            );
          })}
        </div>

        {/* Navigation Button */}
        <RippleButton
          type="button"
          aria-label="Next slide"
          onClick={handleNext}
          className="hidden xl:flex shrink-0 w-[clamp(3.5rem,4vw,4rem)] h-[clamp(3.5rem,4vw,4rem)] rounded-full bg-[#FF4200] items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF4200] focus:ring-offset-2"
        />
      </Container>
    </Section>
  );
};

export default StretchUserExperience;
