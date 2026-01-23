import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export const useCarousel3D = (slidesLength, intervalMs = 4000) => {
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const is2Xl = useMediaQuery("(min-width: 1536px)");
  const is3Xl = useMediaQuery("(min-width: 1920px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, slidesLength]);

  const handleSetSlide = (index) => {
    setCurrentSlide(index);
  };

  const getPosition = (index) => {
    const diff = (index - currentSlide + slidesLength) % slidesLength;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    return "prev";
  };

  const variants = useMemo(() => {
    const radiusX = 350; // Horizontal distance - fixed value
    const radiusY = is3Xl ? 120 : is2Xl ? 80 : -50; // Vertical distance (upward arc)
    const tilt = -10; // Base tilt
    const zDepth = 150; // How far back in 3D space
    const scaleSide = 0.6;
    const yOffset = is3Xl ? -80 : is2Xl ? -60 : -40; // Vertical offset to raise rotation center

    // Calculate circular positions around the MacBook with upward diagonal arc
    const getCircularPosition = (position) => {
      let angle;
      let scale;
      let zIndex;
      let opacity;
      let blur;
      let rotateY;
      let rotateX;

      if (position === "active") {
        angle = 0; // Center front
        scale = 1;
        zIndex = 30;
        opacity = 1;
        blur = 0;
        rotateY = 0;
        rotateX = tilt;
      } else if (position === "next") {
        angle = 110; // degrees clockwise with upward arc
        scale = scaleSide;
        zIndex = 10;
        opacity = 0.6;
        blur = 1.5;
        rotateY = -35;
        rotateX = tilt - 10;
      } else {
        // prev
        angle = -110; // degrees counter-clockwise with upward arc
        scale = scaleSide;
        zIndex = 10;
        opacity = 0.6;
        blur = 1.5;
        rotateY = 35;
        rotateX = tilt - 10;
      }

      const radians = (angle * Math.PI) / 180;
      // X moves horizontally, Y moves upward (negative = up), Z goes back
      const x = Math.sin(radians) * radiusX;
      const y = -Math.abs(Math.cos(radians) - 1) * radiusY + yOffset; // Added yOffset to raise rotation
      const z = (Math.cos(radians) - 1) * zDepth;

      return {
        x: `${x}px`,
        y: `${y}px`,
        z,
        scale,
        zIndex,
        opacity,
        filter: `blur(${blur}px)`,
        rotateX,
        rotateY,
        rotateZ: 0,
      };
    };

    return {
      active: getCircularPosition("active"),
      next: getCircularPosition("next"),
      prev: getCircularPosition("prev"),
    };
  }, []);

  return { currentSlide, setCurrentSlide: handleSetSlide, getPosition, variants, isLg, isXl };
};

export default useCarousel3D;
