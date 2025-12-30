import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Flex } from "../../components";
import useCarousel3D from "../../hooks/useCarousel3D";

const InteractiveCarousel = ({ images }) => {
  const slides = [
    { id: 1, src: images.screen_1, alt: "Profile Enrichment 1" },
    { id: 2, src: images.screen_3, alt: "Profile Enrichment 3" },
    { id: 3, src: images.screen_2, alt: "Profile Enrichment 2" },
  ];

  const { currentSlide, setCurrentSlide, getPosition, variants, isLg, isXl } = useCarousel3D(
    slides.length,
    4000,
  );

  return (
    <Flex
      direction="flex-col"
      align="items-center"
      justify="justify-center"
      className="relative mx-auto w-full mb-[20%]"
    >
      <Flex
        align="items-center"
        justify="justify-center"
        className={`relative h-[450px] w-full overflow-visible md:h-[650px] lg:h-[800px] xl:h-[950px] ${
          isXl ? "perspective-[2200px]" : isLg ? "perspective-[1800px]" : "perspective-distant"
        }`}
      >
        <img
          src={images.macbook}
          className="pointer-events-none absolute bottom-[-2%] left-1/2 z-10 w-full max-w-[1200px] -translate-x-1/2 object-contain"
          alt="Macbook Base"
        />

        {slides.map((slide, index) => (
          <motion.img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            variants={variants}
            initial={false}
            animate={getPosition(index)}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              mass: 1,
            }}
            className="absolute max-h-[75%] max-w-[85%] origin-center rounded-lg border-none object-contain shadow-none lg:max-w-[75%]"
            draggable={false}
          />
        ))}
      </Flex>

      <Flex
        direction="flex-row lg:flex-col"
        align="items-center"
        justify="justify-center"
        gap="gap-6"
        className="z-40 mt-10 lg:absolute lg:right-10 lg:mt-0 xl:right-20"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className="group relative flex items-center justify-center transition-all duration-300 focus:outline-none"
            aria-label={`Show slide ${index + 1}`}
          >
            {currentSlide === index && (
              <motion.div
                layoutId="activeRing"
                className="border-secondary absolute h-8 w-8 rounded-full border-2"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div
              className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                currentSlide === index
                  ? "bg-secondary"
                  : "bg-secondary/20 group-hover:bg-secondary/40"
              }`}
            />
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

InteractiveCarousel.propTypes = {
  images: PropTypes.shape({
    screen_1: PropTypes.string.isRequired,
    screen_2: PropTypes.string.isRequired,
    screen_3: PropTypes.string.isRequired,
    macbook: PropTypes.string.isRequired,
  }).isRequired,
};

export default InteractiveCarousel;
