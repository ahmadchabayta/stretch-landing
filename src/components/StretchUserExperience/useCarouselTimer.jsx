import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for managing carousel auto-advance timer
 * @param {number} itemCount - Total number of items in carousel
 * @param {number} interval - Auto-advance interval in milliseconds
 * @returns {Object} { currentIndex, handleNext }
 */
export const useCarouselTimer = (itemCount, interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, interval);
  }, [itemCount, interval]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
    startTimer();
  }, [itemCount, startTimer]);

  return { currentIndex, handleNext };
};
