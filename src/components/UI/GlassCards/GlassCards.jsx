import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, PerformanceMonitor } from "@react-three/drei";
import Section from "../Section/Section";
import SectionHeadContainer from "../SectionHeadContainer/SectionHeadContainer";
import Typography from "../Typography/Typography";
import Container from "../Container/Container";
import Scene from "./Scene";
import FrameLimiter from "./FrameLimiter";
import NavigationControls from "./NavigationControls";
import { cardsData, FPS_CAP } from "./constants";

const GlassCards = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card
  const [showStats, setShowStats] = useState(false);
  const [dpr, setDpr] = useState(1.5);

  // Drag State Management
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  // --- Interaction Handlers ---
  const handlePointerDown = (e) => {
    e.preventDefault();
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX || e.touches?.[0]?.clientX;
    dragRef.current.startY = e.clientY || e.touches?.[0]?.clientY;
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    e.preventDefault();

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    const deltaX = (clientX - dragRef.current.startX) / window.innerWidth;
    const deltaY = (clientY - dragRef.current.startY) / window.innerHeight;

    dragRef.current.currentX = deltaX * 2;
    dragRef.current.currentY = deltaY * 2;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    dragRef.current.currentX = 0;
    dragRef.current.currentY = 0;
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardsData.length);
  };

  // Toggle FPS stats overlay with the "s" key
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key.toLowerCase() === "s") {
        setShowStats((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Section className="relative w-full bg-[#020617] overflow-hidden font-sans select-none">
      {/* Section Header */}
      <Container>
        <SectionHeadContainer className="z-500 mb-4 text-white">
          <Typography as="h2" variant="section-title">
            THE STRETCH USER EXPERIENCE
          </Typography>
        </SectionHeadContainer>
      </Container>

      {/* 3D Scene */}
      <div className="relative w-full min-h-[100vh] bottom-0">
        <div
          role="button"
          tabIndex={0}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing select-none"
          style={{ userSelect: "none", WebkitUserSelect: "none" }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Canvas
            style={{ touchAction: "none" }}
            shadows
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            performance={{ min: 0.7, max: 1.5, debounce: 200 }}
            frameloop="demand"
            dpr={dpr}
          >
            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
            <FrameLimiter fps={FPS_CAP} />
            <Scene activeIndex={activeIndex} dragRef={dragRef} />
            {showStats && <Stats />}
          </Canvas>
        </div>

        <NavigationControls onPrevious={handlePrevious} onNext={handleNext} />
      </div>
    </Section>
  );
};

export default GlassCards;
