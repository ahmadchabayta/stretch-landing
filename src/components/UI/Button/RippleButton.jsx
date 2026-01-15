import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const RippleButton = ({ children, onClick, className = "", ...props }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rippleId = Date.now();

    // Create multiple layered ripples for depth
    const newRipples = [
      { id: rippleId, x, y, layer: 1 },
      { id: rippleId + 1, x, y, layer: 2 },
      { id: rippleId + 2, x, y, layer: 3 },
    ];

    setRipples((prev) => [...prev, ...newRipples]);

    setTimeout(() => {
      setRipples((prev) =>
        prev.filter(
          (ripple) =>
            ripple.id !== rippleId && ripple.id !== rippleId + 1 && ripple.id !== rippleId + 2,
        ),
      );
    }, 1200);

    onClick?.(e);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
      whileHover={{ scale: 1.1, boxShadow: "0 0 25px 5px rgba(255, 140, 0, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Solar Ambient Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-yellow-300/0 via-yellow-200/20 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence mode="popLayout">
        {ripples.map((ripple) => {
          // Layer-specific configurations for depth
          const layerConfig = {
            1: {
              size: 500,
              duration: 1.2,
              opacity: [0.7, 0.35, 0],
              scale: [0, 0.5, 1],
              blur: "blur(1px)",
              background:
                "radial-gradient(circle, rgba(255,240,150,0.9) 0%, rgba(255,180,60,0.5) 50%, rgba(255,140,0,0) 100%)",
            },
            2: {
              size: 450,
              duration: 1.0,
              opacity: [0.5, 0.25, 0],
              scale: [0, 0.6, 1.1],
              blur: "blur(2px)",
              background:
                "radial-gradient(circle, rgba(255,200,100,0.7) 0%, rgba(255,120,0,0.3) 60%, rgba(255,80,0,0) 100%)",
            },
            3: {
              size: 400,
              duration: 0.85,
              opacity: [0.6, 0.3, 0],
              scale: [0, 0.7, 1.2],
              blur: "blur(3px)",
              background:
                "radial-gradient(circle, rgba(255,220,150,0.6) 0%, rgba(255,160,80,0.2) 70%, rgba(255,100,0,0) 100%)",
            },
          };

          const config = layerConfig[ripple.layer];

          return (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 0,
                height: 0,
                background: config.background,
                filter: config.blur,
                mixBlendMode: "screen", // Changed to screen for better light blending
              }}
              initial={{
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                opacity: config.opacity[0],
                scale: config.scale[0],
              }}
              animate={{
                width: config.size,
                height: config.size,
                x: -config.size / 2,
                y: -config.size / 2,
                opacity: config.opacity,
                scale: config.scale,
              }}
              exit={{
                opacity: 0,
                scale: config.scale[2],
              }}
              transition={{
                duration: config.duration,
                ease: [0.16, 1, 0.3, 1], // Apple's signature spring-like easing
                opacity: { duration: config.duration, ease: "easeOut" },
              }}
            />
          );
        })}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
};

RippleButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default RippleButton;
