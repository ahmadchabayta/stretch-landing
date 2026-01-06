import { motion } from "framer-motion";
import PropTypes from "prop-types";

const CarouselItem = ({ item, position, onClick }) => {
  return (
    <motion.div
      key={item.id}
      onClick={onClick}
      className="absolute cursor-pointer"
      animate={position}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-[90vw] xl:max-w-[600px] 2xl:max-w-[800px] 3xl:max-w-[900px] object-contain pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CarouselItem;
