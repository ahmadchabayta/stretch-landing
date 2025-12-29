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
    const tilt = isLg ? -10 : -6;
    const yaw = isLg ? -18 : -10;
    const depth = isXl ? 90 : isLg ? 70 : 30;
    const sideOffset = isLg ? 10 : 4;
    const verticalOffset = isLg ? 42 : 32;
    const scaleSide = isLg ? 0.8 : 0.9;

    return {
      active: {
        x: isLg ? "-6%" : "-3%",
        y: isLg ? "-2%" : "0%",
        z: depth,
        scale: 1,
        zIndex: 24,
        opacity: 1,
        filter: "blur(0px)",
        rotateX: tilt,
        rotateY: yaw,
        rotateZ: isLg ? -2 : -1,
      },
      next: {
        x: `${sideOffset}%`,
        y: `${verticalOffset}%`,
        z: -depth / 1.5,
        scale: scaleSide,
        zIndex: 6,
        opacity: 0.45,
        filter: "blur(2px)",
        rotateX: Math.abs(tilt) / 1.2,
        rotateY: yaw,
        rotateZ: isLg ? -1 : 0,
      },
      prev: {
        x: `-${sideOffset}%`,
        y: `-${verticalOffset}%`,
        z: -depth / 1.5,
        scale: scaleSide,
        zIndex: 6,
        opacity: 0.45,
        filter: "blur(2px)",
        rotateX: tilt * 1.8,
        rotateY: yaw,
        rotateZ: isLg ? -3 : -1,
      },
    };
  }, [isLg, isXl]);

  return { currentSlide, setCurrentSlide, getPosition, variants, isLg, isXl };
};

export default useCarousel3D;
