import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export const useCarousel3D = (slidesLength, intervalMs = 4000) => {
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, slidesLength]);

  const getPosition = (index) => {
    const diff = (index - currentSlide + slidesLength) % slidesLength;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    return "prev";
  };

  const variants = useMemo(() => {
    const radiusX = isXl ? 450 : isLg ? 380 : 280; // Horizontal distance
    const radiusY = isXl ? 250 : isLg ? 200 : 150; // Vertical distance (upward arc)
    const tilt = isLg ? -12 : -8; // Base tilt
    const zDepth = isXl ? 200 : isLg ? 150 : 100; // How far back in 3D space
    const scaleSide = isLg ? 0.7 : 0.8;

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
      const y = -Math.abs(Math.cos(radians) - 1) * radiusY; // Negative for upward arc
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
  }, [isLg, isXl]);

  return { currentSlide, setCurrentSlide, getPosition, variants, isLg, isXl };
};

export default useCarousel3D;
