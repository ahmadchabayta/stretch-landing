import { useEffect } from "react";

/**
 * Hook that handles clicks outside of the passed refs and escape key press
 * @param {Object} options - Configuration options
 * @param {React.RefObject} options.ref - The ref to check clicks against
 * @param {Function} options.onClickOutside - Callback when clicking outside
 * @param {boolean} options.enabled - Whether the hook is enabled
 * @param {string} options.ignoreSelector - CSS selector for elements to ignore clicks on
 */
const useClickOutside = ({ ref, onClickOutside, enabled = true, ignoreSelector }) => {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleOutside = (e) => {
      const target = e.target;

      // Ignore clicks inside the ref
      if (ref.current && ref.current.contains(target)) return;

      // Ignore clicks on elements matching the ignore selector
      if (ignoreSelector && target.closest && target.closest(ignoreSelector)) {
        return;
      }

      onClickOutside();
    };

    const handleKey = (e) => {
      if (e.key === "Escape") onClickOutside();
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, [enabled, onClickOutside, ref, ignoreSelector]);
};

export default useClickOutside;
