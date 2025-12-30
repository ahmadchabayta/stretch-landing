import PropTypes from "prop-types";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const DashboardImage = ({ item, position, onClick, language = "en" }) => {
  const transitionMs = 600;
  const transitionSec = transitionMs / 1000;
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // 1. Define prominence styles based on position
  const isRTL = language === "ar";
  const prominenceMap = {
    first: {
      opacity: 1,
      scale: 1,
      z: 0,
      x: "0px",
      y: isLargeScreen ? "0px" : "-220px",
      width: "clamp(400px, 70vw, 1100px)",
      zIndex: 30,
    },
    second: {
      opacity: 0.95,
      scale: 0.65,
      z: -50,
      x: isLargeScreen
        ? isRTL
          ? "clamp(-250px, -35vw, -700px)"
          : "clamp(250px, 35vw, 700px)"
        : "0px",
      y: isLargeScreen ? "0px" : "80px",
      width: "clamp(260px, 45vw, 700px)",
      zIndex: 20,
    },
    third: {
      opacity: 0.9,
      scale: 0.65,
      z: -100,
      x: isLargeScreen
        ? isRTL
          ? "clamp(250px, 35vw, 700px)"
          : "clamp(-250px, -35vw, -700px)"
        : "0px",
      y: isLargeScreen ? "0px" : "380px",
      width: "clamp(260px, 45vw, 700px)",
      zIndex: 10,
    },
  };

  const prominence = prominenceMap[position] || prominenceMap.first;

  // Build transform for smooth 3D movement
  const buildTransform = (x, y, z, rotX, rotY, scale) =>
    `translate(-50%, ${isLargeScreen ? "-60%" : "-50%"}) perspective(1400px) translateX(${x}) translateY(${y}) translateZ(${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale})`;

  const currentTransform = buildTransform(
    prominence.x,
    prominence.y,
    prominence.z,
    0,
    0,
    prominence.scale,
  );

  return (
    <div
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
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: prominence.width,
        transformStyle: "preserve-3d",
        zIndex: prominence.zIndex,
        cursor: "pointer",
      }}
      className="flex items-center justify-center"
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        animate={{
          opacity: prominence.opacity,
          transform: currentTransform,
        }}
        transition={{
          duration: transitionSec,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          width: prominence.width,
          height: "auto",
          objectFit: "contain",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
};

DashboardImage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.oneOf(["first", "second", "third"]).isRequired,
  onClick: PropTypes.func,
  language: PropTypes.string,
};

export default DashboardImage;
