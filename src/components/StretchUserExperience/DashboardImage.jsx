import PropTypes from "prop-types";
import { motion } from "framer-motion";

const DashboardImage = ({
  item,
  angle,
  radius,
  onClick,
  isActive,
  isVertical,
  offsetMultiplier = 1,
}) => {
  // Convert angle to radians for positioning
  const rad = (angle * Math.PI) / 180;

  // Calculate position on the elliptical path
  const offset = Math.sin(rad) * radius;
  const z = Math.cos(rad) * radius - radius;

  // Vertical: use Y axis, Horizontal: use X axis
  const x = isVertical ? 0 : offset;
  const y = isVertical ? offset * offsetMultiplier : 0;

  // Scale and opacity based on whether this is the active/front item
  const scale = isActive ? 1 : 0.6;
  const opacity = isActive ? 1 : 0.35;
  const zIndex = isActive ? 100 : Math.round(50 + z / 10);

  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Show next dashboard image, current: ${item.alt}`}
      className="cursor-pointer col-start-1 row-start-1"
      animate={{
        x,
        y,
        z,
        scale,
        opacity,
        zIndex,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-[420px] md:w-[650px] lg:w-[903px] xl:w-[860px] 2xl:w-[908px] 3xl:w-[919.36px] h-auto object-contain pointer-events-none max-w-[85vw] md:max-w-none"
        draggable={false}
      />
    </motion.div>
  );
};

DashboardImage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  angle: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isVertical: PropTypes.bool,
  offsetMultiplier: PropTypes.number,
};

export default DashboardImage;
