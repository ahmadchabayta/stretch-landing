import { useContext, useEffect, useId, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { LightContext } from "./TrueGlassContainer";

const Glass = memo(({ children, distortion = 65, className = "", accentColor = "#FF6B35" }) => {
  const context = useContext(LightContext);
  const surfaceRef = useRef(null);
  const boundsRef = useRef({ left: 0, top: 0, w: 0, h: 0 });
  const [lightSize, setLightSize] = useState(100);
  const [blueLightSize, setBlueLightSize] = useState(300);
  const id = useId();

  // Motion values for GPU-accelerated animations
  const clipRadius = useMotionValue(0);
  const clipX = useMotionValue(0);
  const clipY = useMotionValue(0);
  const filterScale = useMotionValue(0);
  const bgGradient = useMotionValue("transparent");

  // Transform clipPath as a motion value
  const clipPath = useTransform(
    [clipRadius, clipX, clipY],
    ([r, x, y]) => `circle(${r}px at ${x}px ${y}px)`,
  );

  // Setup bounds measurement (only on resize/scroll)
  useEffect(() => {
    if (!context) return;

    const { registerSurface, unregisterSurface, containerRef } = context;

    const update = () => {
      if (surfaceRef.current && containerRef?.current) {
        const rect = surfaceRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        boundsRef.current = {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          w: rect.width,
          h: rect.height,
        };
        registerSurface(id, boundsRef.current);

        // Update light size based on viewport width
        const width = window.innerWidth;
        if (width < 640) {
          setLightSize(140);
          setBlueLightSize(50);
        } else if (width < 768) {
          setLightSize(80);
          setBlueLightSize(200);
        } else if (width < 1024) {
          setLightSize(100);
          setBlueLightSize(250);
        } else if (width < 1280) {
          setLightSize(120);
          setBlueLightSize(300);
        } else {
          setLightSize(140);
          setBlueLightSize(350);
        }
      }
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true, capture: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      unregisterSurface(id);
    };
  }, [context, id]);

  // RAF-based light position tracking (no React re-renders)
  useEffect(() => {
    if (!context) return;

    const { lightPosRef } = context;
    let rafId;
    const trackLight = () => {
      const lightPos = lightPosRef.current;
      const bounds = boundsRef.current;

      const relX = lightPos.x - bounds.left;
      const relY = lightPos.y - bounds.top;
      const isOver = relX > -200 && relX < bounds.w + 200 && relY > -200 && relY < bounds.h + 200;

      clipX.set(relX);
      clipY.set(relY);
      clipRadius.set(isOver ? lightSize : 0);
      filterScale.set(isOver ? distortion : 0);
      bgGradient.set(
        isOver
          ? `radial-gradient(circle ${blueLightSize}px at ${relX}px ${relY}px, rgba(255,255,255,0.04) 0%, transparent 100%)`
          : "transparent",
      );

      rafId = requestAnimationFrame(trackLight);
    };

    rafId = requestAnimationFrame(trackLight);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    context,
    lightSize,
    blueLightSize,
    distortion,
    clipX,
    clipY,
    clipRadius,
    filterScale,
    bgGradient,
  ]);

  if (!context) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={surfaceRef}
      className={`relative overflow-visible rounded-[2rem] shadow-lg shadow-white/40 md:rounded-[3rem] lg:rounded-[4rem] ${className}`}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <svg className="absolute w-0 h-0">
        <filter id={`etch-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise" />
          <motion.feDisplacementMap in="SourceGraphic" in2="noise" scale={filterScale} />
        </filter>
      </svg>

      <motion.div
        className="absolute inset-0 z-10 bg-transparent rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem]"
        style={{
          backdropFilter: `blur(50px) url(#etch-${id})`,
          WebkitBackdropFilter: `blur(50px) url(#etch-${id})`,
          background: bgGradient,
          transform: "translateZ(0)",
        }}
      />

      <div className="relative z-30 select-none" style={{ transform: "translateZ(0)" }}>
        <div className="relative flex flex-col justify-center items-center">{children}</div>
        <motion.div
          className="absolute flex flex-col justify-center items-center inset-0 [&_*]:!text-gray-950 "
          style={{
            "--accent-color": accentColor,
            clipPath,
            transform: "translateZ(0)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
});

Glass.displayName = "Glass";

Glass.propTypes = {
  children: PropTypes.node.isRequired,
  distortion: PropTypes.number,
  className: PropTypes.string,
  accentColor: PropTypes.string,
};

export default Glass;
