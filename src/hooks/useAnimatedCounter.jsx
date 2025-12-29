import { useEffect, useRef } from "react";
import { useMotionValue, useInView, animate } from "framer-motion";

export const useAnimatedCounter = (value, { duration = 2, once = true } = {}) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);

  // Using negative margin triggers animation before element enters viewport
  // This is more reliable on touch devices with scroll momentum
  const isInView = useInView(ref, {
    once,
    margin: "-20% 0px -20% 0px",
    amount: 0.3,
  });

  useEffect(() => {
    // 1. Clean the input
    const rawValue = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

    if (isInView) {
      const controls = animate(motionValue, rawValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString("en-US");
          }
        },
      });

      return () => controls.stop();
    } else if (!once) {
      // 2. Reset logic
      motionValue.set(0);
      if (ref.current) ref.current.textContent = "0";
    }
  }, [isInView, value, motionValue, duration, once]);

  return ref;
};
