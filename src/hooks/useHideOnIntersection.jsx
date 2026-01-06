import { useState, useEffect } from "react";

const useHideOnIntersection = (refs, threshold = 0.1) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const intersectionStates = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionStates.set(entry.target, entry.isIntersecting);
        });

        const isAnyIntersecting = Array.from(intersectionStates.values()).some(
          (isIntersecting) => isIntersecting,
        );

        setIsHidden(isAnyIntersecting);
      },
      { threshold },
    );

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [refs, threshold]);

  return isHidden;
};

export default useHideOnIntersection;
