import { useState, useRef, useEffect, createContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Context to share light and surface registrations
export const LightContext = createContext(null);

/**
 * REUSABLE LIGHT CONTAINER
 * The full-screen engine that manages the single light source.
 */
export const TrueGlassContainer = ({ children, className = "", minHeight = "min-h-[600px]" }) => {
  const containerRef = useRef(null);
  const [inputType, setInputType] = useState("mouse");
  const [borderRadius, setBorderRadius] = useState(32);
  const [surfaces, setSurfaces] = useState([]);

  // Use ref for light position - Glass reads this directly via RAF (no re-renders)
  const lightPosRef = useRef({ x: -500, y: -500 });

  const registerSurface = useCallback((id, bounds) => {
    setSurfaces((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return [...filtered, { id, ...bounds }];
    });
  }, []);

  const unregisterSurface = useCallback((id) => {
    setSurfaces((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const physics = useRef({ x: -500, y: -500, targetX: -500, targetY: -500 });

  useEffect(() => {
    let raf;

    const updatePhysics = () => {
      const p = physics.current;
      const easing = inputType === "touch" ? 0.08 : 0.15;

      p.x += (p.targetX - p.x) * easing;
      p.y += (p.targetY - p.y) * easing;

      // Update the ref directly - no state update needed
      lightPosRef.current.x = p.x;
      lightPosRef.current.y = p.y;

      raf = requestAnimationFrame(updatePhysics);
    };

    // Update border radius based on viewport width
    const updateBorderRadius = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setBorderRadius(64); // 4rem
      } else if (width >= 768) {
        setBorderRadius(48); // 3rem
      } else {
        setBorderRadius(32); // 2rem
      }
    };

    updateBorderRadius();
    window.addEventListener("resize", updateBorderRadius, { passive: true });
    raf = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateBorderRadius);
    };
  }, [inputType]);

  const handleInputMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const isTouch = e.type.startsWith("touch");
    setInputType(isTouch ? "touch" : "mouse");

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    physics.current.targetX = clientX - rect.left;
    physics.current.targetY = clientY - rect.top;
  }, []);

  const lightSize = inputType === "touch" ? 320 : 200;
  const lightBlur = inputType === "touch" ? 50 : 30;

  // Stable context value - lightPosRef is passed so Glass can read it directly
  const contextValue = useMemo(
    () => ({
      lightPosRef,
      inputType,
      registerSurface,
      unregisterSurface,
      containerRef,
    }),
    [inputType, registerSurface, unregisterSurface],
  );

  return (
    <LightContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`relative w-full overflow-x-hidden ${minHeight} ${className}`}
        onMouseMove={handleInputMove}
        onTouchMove={handleInputMove}
        style={{ transform: "translateZ(0)" }}
      >
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="glass-clip-mask" clipPathUnits="userSpaceOnUse">
              {surfaces.map((s) => (
                <rect key={s.id} x={s.left} y={s.top} width={s.w} height={s.h} rx={borderRadius} />
              ))}
            </clipPath>
          </defs>
        </svg>

        <LightOrb lightPosRef={lightPosRef} lightSize={lightSize} lightBlur={lightBlur} />

        <div className="relative z-20 w-full h-full">{children}</div>
      </div>
    </LightContext.Provider>
  );
};

// Separate component for light orb with its own RAF - no re-renders needed
const LightOrb = ({ lightPosRef, lightSize, lightBlur }) => {
  const orbRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let rafId;

    const updatePosition = () => {
      const { x, y } = lightPosRef.current;

      if (orbRef.current) {
        orbRef.current.style.left = `${x}px`;
        orbRef.current.style.top = `${y}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top = `${y}px`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, [lightPosRef]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{ clipPath: "url(#glass-clip-mask)", transform: "translateZ(0)" }}
    >
      <div
        ref={orbRef}
        className="absolute rounded-full"
        style={{
          width: `${lightSize}px`,
          height: `${lightSize}px`,
          background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(59,130,246,0.8) 30%, transparent 75%)`,
          transform: "translate(-50%, -50%) translateZ(0)",
          filter: `blur(${lightBlur}px)`,
          opacity: 0.9,
          mixBlendMode: "screen",
          willChange: "left, top",
        }}
      />

      <div
        ref={glowRef}
        className="absolute rounded-full"
        style={{
          width: `${lightSize * 2.5}px`,
          height: `${lightSize * 2.5}px`,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%) translateZ(0)",
          filter: "blur(80px)",
          opacity: 0.4,
          willChange: "left, top",
        }}
      />
    </div>
  );
};

LightOrb.propTypes = {
  lightPosRef: PropTypes.shape({
    current: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  lightSize: PropTypes.number.isRequired,
  lightBlur: PropTypes.number.isRequired,
};

TrueGlassContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  minHeight: PropTypes.string,
};
