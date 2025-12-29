import PropTypes from "prop-types";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const DashboardImage = ({ item, position, onClick, language = "en" }) => {
  const transitionMs = 600;
  const transitionSec = transitionMs / 1000;
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isXLScreen = useMediaQuery("(min-width: 1440px)");
  const isMidScreen = useMediaQuery("(min-width: 1024px) and (max-width: 1280px)");

  // 1. Define prominence styles based on position
  const isRTL = language === "ar";
  const prominenceMap = {
    first: {
      opacity: 1,
      scale: 1,
      z: 0,
      x: isLargeScreen
        ? isRTL
          ? isMidScreen
            ? "clamp(150px, 30vw, 280px)"
            : isXLScreen
              ? "clamp(200px, 45vw, 320px)"
              : "clamp(150px, 38vw, 380px)"
          : isMidScreen
            ? "clamp(-150px, -30vw, -280px)"
            : isXLScreen
              ? "clamp(-320px, -45vw, -550px)"
              : "clamp(-150px, -38vw, -380px)"
        : "0px",
      y: isLargeScreen ? "0px" : "-220px", // Top on small screens
      width: "clamp(260px, 55vw, 830px)",
      zIndex: 30,
    },
    second: {
      opacity: 0.7,
      scale: 0.88,
      z: -100,
      x: "0px", // Center position
      y: "0px", // Center on all screens
      width: "clamp(220px, 48vw, 760px)",
      zIndex: 20,
    },
    third: {
      opacity: 0.45,
      scale: 0.72,
      z: -200,
      x: isLargeScreen
        ? isRTL
          ? isMidScreen
            ? "clamp(-150px, -30vw, -280px)"
            : isXLScreen
              ? "clamp(-500px, -45vw, -550px)"
              : "clamp(-150px, -38vw, -380px)"
          : isMidScreen
            ? "clamp(150px, 30vw, 280px)"
            : isXLScreen
              ? "clamp(200px, 45vw, 550px)"
              : "clamp(150px, 38vw, 380px)"
        : "0px",
      y: isLargeScreen ? "0px" : "180px", // Bottom on small screens
      width: "clamp(180px, 40vw, 560px)",
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
