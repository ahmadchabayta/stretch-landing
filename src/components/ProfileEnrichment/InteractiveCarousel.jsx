import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Flex } from "../../components";
import useCarousel3D from "../../hooks/useCarousel3D";
import { withBase } from "../../utils/withBase";

const InteractiveCarousel = ({ images }) => {
  const slides = [
    { id: 1, src: images.screen_1, alt: "Profile Enrichment 1" },
    { id: 2, src: images.screen_3, alt: "Profile Enrichment 3" },
    { id: 3, src: images.screen_2, alt: "Profile Enrichment 2" },
  ];

  const { currentSlide, setCurrentSlide, getPosition, variants } = useCarousel3D(
    slides.length,
    4000,
  );

  return (
    <Flex
      direction="flex-col"
      align="items-center"
      justify="justify-end"
      className="relative mx-auto w-full h-full"
    >
      <Flex
        align="items-center"
        justify="justify-center"
        className="relative w-full flex-1 overflow-visible"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "center 60%",
        }}
      >
        <img
          src={withBase(images.macbook)}
          className="pointer-events-none relative z-20 w-[90%] sm:w-[75%] md:w-[80%] lg:w-[75%] 3xl:w-full 3xl:max-w-[900px] max-w-[700px] min-w-[200px] h-auto"
          alt="Macbook Base"
        />

        {/* Screen 1 */}
        <motion.img
          src={withBase(images.screen_1)}
          alt="Profile Enrichment 1"
          variants={variants}
          initial={false}
          animate={getPosition(0)}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 25,
            mass: 0.8,
            velocity: 0,
          }}
          className={`absolute origin-center border-none w-full max-w-[550px] min-w-[200px] h-auto ${getPosition(0) === "next" ? "-z-1" : "z-20"}`}
          draggable={false}
        />
        {/* Screen 2 */}
        <motion.img
          src={withBase(images.screen_3)}
          alt="Profile Enrichment 3"
          variants={variants}
          initial={false}
          animate={getPosition(1)}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 25,
            mass: 0.8,
            velocity: 0,
          }}
          className={`absolute origin-center border-none w-full max-w-[550px] min-w-[170px] h-auto ${getPosition(1) === "next" ? "-z-1" : "z-20"}`}
          draggable={false}
        />

        {/* Screen 3 */}
        <motion.img
          src={withBase(images.screen_2)}
          alt="Profile Enrichment 2"
          variants={variants}
          initial={false}
          animate={getPosition(2)}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 25,
            mass: 0.8,
            velocity: 0,
          }}
          className={`absolute origin-center border-none w-full max-w-[620px] min-w-[190px] h-auto ${getPosition(2) === "next" ? "-z-1" : "z-20"}`}
          draggable={false}
        />
      </Flex>

      <Flex
        direction="flex-row lg:flex-col"
        align="items-center"
        justify="justify-center"
        gap="gap-6"
        className="z-40 my-10 lg:my-0 lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 xl:right-20"
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
