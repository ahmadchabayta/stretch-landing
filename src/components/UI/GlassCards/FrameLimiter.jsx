import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

// Manual invalidation loop to respect the FPS cap while keeping animations smooth
const FrameLimiter = ({ fps }) => {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const frameInterval = 1000 / fps;
    let last = performance.now();
    let rafId;
    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      const now = performance.now();
      if (now - last >= frameInterval) {
        last = now;
        invalidate();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [fps, invalidate]);

  return null;
};

FrameLimiter.propTypes = {
  fps: PropTypes.number.isRequired,
};

export default FrameLimiter;
