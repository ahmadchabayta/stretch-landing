import { useEffect, useRef, useState } from "react";

/**
 * useInViewAnimation - React hook to detect when an element is in view and trigger an animation key
 * @param {Object} options - IntersectionObserver options (e.g., { threshold: 0.3 })
 * @returns {[React.RefObject, boolean, number]} [ref, inView, animationKey]
 */
export default function useInViewAnimation(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Safety: Only run in browser and if IntersectionObserver is available
    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      return;
    }
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        setAnimationKey((k) => k + 1);
      } else {
        setInView(false);
      }
    }, options);
    const node = ref.current;
    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) observer.unobserve(node);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView, animationKey];
}
