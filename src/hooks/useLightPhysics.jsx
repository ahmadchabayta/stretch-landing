import { useState, useRef, useEffect } from "react";

/**
 * Custom hook for managing light physics and interactions
 * @param {Object} containerRef - Reference to the container element
 * @returns {Object} - Light position, dragging state, and event handlers
 */
export const useLightPhysics = (containerRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 150, y: 150, vx: 0, vy: 0 });

  const physics = useRef({
    x: 150,
    y: 150,
    vx: 0,
    vy: 0,
    targetX: 150,
    targetY: 150,
  });

  // Update container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [containerRef]);

  // Physics simulation loop
  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    let raf;
    const updatePhysics = () => {
      const p = physics.current;
      if (isDragging) {
        p.x = p.targetX;
        p.y = p.targetY;
        p.vx = 0;
        p.vy = 0;
      } else {
        const DAMPING = 0.85;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        if (Math.abs(p.vx) < 0.01) p.vx = 0;
        if (Math.abs(p.vy) < 0.01) p.vy = 0;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = 0;
        if (p.x > dimensions.width) p.x = dimensions.width;
        if (p.y < 0) p.y = 0;
        if (p.y > dimensions.height) p.y = dimensions.height;
      }
      setLightPos({ x: p.x, y: p.y, vx: p.vx, vy: p.vy });
      raf = requestAnimationFrame(updatePhysics);
    };

    raf = requestAnimationFrame(updatePhysics);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
      cancelAnimationFrame(raf);
    };
  }, [isDragging, dimensions]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    if (isDragging) {
      physics.current.vx = newX - physics.current.targetX;
      physics.current.vy = newY - physics.current.targetY;
    }
    physics.current.targetX = newX;
    physics.current.targetY = newY;
  };

  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - physics.current.x;
    const dy = e.clientY - rect.top - physics.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < 100) {
      setIsDragging(true);
    }
  };

  const setPosition = (x, y) => {
    physics.current.x = x;
    physics.current.y = y;
    physics.current.targetX = x;
    physics.current.targetY = y;
    setLightPos({ x, y, vx: 0, vy: 0 });
  };

  return {
    lightPos,
    isDragging,
    handleMouseMove,
    handleMouseDown,
    setPosition,
  };
};
