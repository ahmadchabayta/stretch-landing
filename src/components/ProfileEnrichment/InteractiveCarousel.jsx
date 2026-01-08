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

  const { currentSlide, setCurrentSlide, getPosition, variants, isLg, isXl } = useCarousel3D(
    slides.length,
    4000,
  );

  return (
    <Flex
      direction="flex-col"
      align="items-center"
      justify="justify-center"
      className="relative mx-auto w-full"
    >
      <Flex
        align="items-center"
        justify="justify-center"
        className={`relative h-[450px] w-full overflow-visible md:h-[650px] lg:h-[824px] xl:h-[684px]`}
        style={{
          perspective: isXl ? "2500px" : isLg ? "2000px" : "1500px",
          perspectiveOrigin: "center 60%",
        }}
      >
        <img
          src={withBase(images.macbook)}
          className="pointer-events-none relative z-20 min-w-[225.236px] lg:min-w-[675.708px]"
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
          className={`absolute origin-center border-none 
            w-[302.122px] lg:w-[579.336px] xl:w-[648px] mb-12 2xl:w-[639px] ${getPosition(0) === "next" ? "-z-1" : "z-20"}`}
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
          className={`absolute  origin-center border-none w-[191.788px] lg:w-[421.559px] xl:w-[561.724px] 3xl:w-[682.159px] ${getPosition(1) === "next" ? "-z-1" : "z-20"}`}
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
          className={`absolute origin-center mb-12 border-none w-[242px] lg:w-[752px] xl:w-[716px] ${getPosition(2) === "next" ? "-z-1" : "z-20"}`}
          draggable={false}
        />
      </Flex>

      <Flex
        direction="flex-row lg:flex-col"
        align="items-center"
        justify="justify-center"
        gap="gap-6"
        className="z-40 my-10 lg:my-0 lg:absolute lg:right-10 lg:mt-0 xl:right-20"
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
