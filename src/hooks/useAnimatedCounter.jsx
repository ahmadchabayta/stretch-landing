import { useEffect, useRef } from "react";
import { useMotionValue, useInView, animate } from "framer-motion";

// Helper function to convert Arabic numerals to Western numerals
const arabicToWestern = (str) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const westernNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str.toString();
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(arabicNumerals[i], "g"), westernNumerals[i]);
  }
  return result;
};

const useAnimatedCounter = (value, { duration = 2, once = true, locale = "en-US" } = {}) => {
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
    // 1. Clean the input - handle both Arabic and Western numerals
    let rawValue;
    if (typeof value === "string") {
      const westernValue = arabicToWestern(value);
      rawValue = parseFloat(westernValue.replace(/,/g, ""));
    } else {
      rawValue = value;
    }

    if (isInView) {
      const controls = animate(motionValue, rawValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString(locale);
          }
        },
      });

      return () => controls.stop();
    } else if (!once) {
      // 2. Reset logic
      motionValue.set(0);
      if (ref.current) ref.current.textContent = "0";
    }
  }, [isInView, value, motionValue, duration, once, locale]);

  return ref;
};
export default useAnimatedCounter;
