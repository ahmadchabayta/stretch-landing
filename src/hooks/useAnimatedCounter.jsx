import { useEffect, useRef } from "react";
import { useMotionValue, useInView, animate } from "framer-motion";

export const useAnimatedCounter = (value, { duration = 2, once = true, locale = "en-US" } = {}) => {
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
    // Convert Arabic numerals to English for parsing
    const convertArabicToEnglish = (str) => {
      if (typeof str !== "string") return str;
      return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    };

    // Convert English numerals to Arabic
    const convertEnglishToArabic = (str) => {
      return str.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    };

    const convertedValue = convertArabicToEnglish(value);
    const rawValue =
      typeof convertedValue === "string"
        ? parseFloat(convertedValue.replace(/,/g, ""))
        : convertedValue;

    if (isInView) {
      const controls = animate(motionValue, rawValue, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const formatted = Math.round(latest).toLocaleString("en-US");
            ref.current.textContent =
              locale === "ar" ? convertEnglishToArabic(formatted) : formatted;
          }
        },
      });

      return () => controls.stop();
    } else if (!once) {
      // 2. Reset logic
      motionValue.set(0);
      if (ref.current) ref.current.textContent = locale === "ar" ? "٠" : "0";
    }
  }, [isInView, value, motionValue, duration, once, locale]);

  return ref;
};
