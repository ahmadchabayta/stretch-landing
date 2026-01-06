import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, Stats, PerformanceMonitor } from "@react-three/drei";

import PropTypes from "prop-types";
import Section from "../Section/Section";
import SectionHeadContainer from "../SectionHeadContainer/SectionHeadContainer";
import Typography from "../Typography/Typography";
import Container from "../Container/Container";

// --- Assets & Constants ---

// Using a crisp font for the 3D text
const FONT_URL =
  "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff";

const SVGIcons = {
  platforms: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 L206,50 L206,206 L50,206 Z" fill="none" stroke="white" stroke-width="15" rx="20"/><rect x="85" y="85" width="86" height="86" rx="10" fill="white" opacity="0.9"/></svg>`,
  tags: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M110,30 L30,110 L146,226 L226,146 L146,30 Z" fill="none" stroke="white" stroke-width="15"/><circle cx="110" cy="80" r="15" fill="white"/></svg>`,
  reports: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="40" width="176" height="176" rx="16" fill="none" stroke="white" stroke-width="15"/><path d="M80,180 L80,140" stroke="white" stroke-width="15" stroke-linecap="round"/><path d="M128,180 L128,100" stroke="white" stroke-width="15" stroke-linecap="round"/><path d="M176,180 L176,120" stroke="white" stroke-width="15" stroke-linecap="round"/></svg>`,
};

const cardsData = [
  {
    id: 0,
    label: "PLATFORMS",
    subtext: "Unified Graph",
    description: "Connect channels.",
    accentColor: "hsl(217, 91%, 50%)", // Blue
    icon: SVGIcons.platforms,
    imageUrl: "city.png",
  },
  {
    id: 1,
    label: "ANALYTICS",
    subtext: "Deep Insights",
    description: "Real-time data flow.",
    accentColor: "#a855f7", // Purple
    icon: SVGIcons.tags,
    imageUrl: "eye.png",
  },
  {
    id: 2,
    label: "REPORTS",
    subtext: "Auto Generated",
    description: "Daily deliverables.",
    accentColor: "#f97316", // Orange
    icon: SVGIcons.reports,
    imageUrl: "reports.png",
  },
];

// Cap FPS to reduce GPU/CPU load while keeping motion smooth enough for the scene
const FPS_CAP = 45;

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

// --- Helper Functions ---

// Convert SVG string to Texture
const useSVGTexture = (svgString, color) => {
  const invalidate = useThree((state) => state.invalidate);

  // Use useMemo to create the initial texture object once
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    // Return a blank texture initially
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []); // Empty dependency array means we reuse the same texture instance

  // Use useEffect to handle the async drawing/update
  useEffect(() => {
    const canvas = texture.image;
    const ctx = canvas.getContext("2d");

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgEl = doc.documentElement;
    svgEl.setAttribute("width", "1024");
    svgEl.setAttribute("height", "1024");

    const s = new XMLSerializer().serializeToString(svgEl);
    const img = new Image();
    const blob = new Blob([s], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.clearRect(0, 0, 1024, 1024);
      ctx.drawImage(img, 0, 0, 1024, 1024);

      // Apply color overlay composite
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1024, 1024);

      texture.needsUpdate = true;
      invalidate(); // Force re-render when texture is ready
      URL.revokeObjectURL(url);
    };
    img.src = url;

    // Optional: Dispose if the component unmounts, though shared textures should be careful
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [svgString, color, texture, invalidate]);

  return texture;
};

// --- Components ---

const PremiumGlassCard = ({ data, index, activeIndex, dragRef }) => {
  const meshRef = useRef();
  const glassRef = useRef();
  const iconTexture = useSVGTexture(data.icon, data.accentColor);
  const [isFlipped, setIsFlipped] = useState(false);
  const { viewport } = useThree();

  // Responsive card scale based on viewport width
  const cardScale = Math.min(1.5, Math.max(1, viewport.width / 10));

  // Create noise texture for glass distortion
  // const noiseTexture = useMemo(() => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = 512;
  //   canvas.height = 512;
  //   const ctx = canvas.getContext("2d");
  //   const imageData = ctx.createImageData(512, 512);

  //   for (let i = 0; i < imageData.data.length; i += 4) {
  //     const value = Math.random() * 255;
  //     imageData.data[i] = value;
  //     imageData.data[i + 1] = value;
  //     imageData.data[i + 2] = value;
  //     imageData.data[i + 3] = 255;
  //   }

  //   ctx.putImageData(imageData, 0, 0);
  //   const texture = new THREE.CanvasTexture(canvas);
  //   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  //   texture.repeat.set(4, 4);
  //   return texture;
  // }, []);

  // Calculate Target Position based on circular carousel logic
  // We want the active card at [0,0,0], left at [-x, -z], right at [x, -z]
  const positionOffset = index - activeIndex;

  // Handle wrapping for infinite feel (simple 3-card logic)
  let wrappedOffset = positionOffset;
  if (positionOffset > 1) wrappedOffset -= 3;
  if (positionOffset < -1) wrappedOffset += 3;

  // Responsive card spacing based on viewport
  const cardSpacing = 4.5 * cardScale;
  const cardDepth = 2 * cardScale;

  const targetX = wrappedOffset * cardSpacing;
  const targetZ = Math.abs(wrappedOffset) * -cardDepth;
  const targetRotY = wrappedOffset * -0.3;
  const targetScale = wrappedOffset === 0 ? 1 : 0.85;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Smooth Interpolation to target position
    const lerpSpeed = 4 * delta;

    // Position
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      lerpSpeed,
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      lerpSpeed,
    );

    // Rotation (Base + Drag interaction)
    let finalRotY = targetRotY;
    let finalRotX = 0;

    // Add drag influence if this is the active card
    if (wrappedOffset === 0 && dragRef.current) {
      const dragInfluence = dragRef.current.currentX * 4.5;
      finalRotY += dragInfluence;
      finalRotX += dragRef.current.currentY * 1.2;

      // Snap to flipped state when dragged far enough
      if (!dragRef.current.isDragging) {
        const currentRotY = meshRef.current.rotation.y;

        // Determine the drag direction based on the rotation change from target
        const rotationChange = currentRotY - targetRotY;

        // Normalize to -PI to PI range
        let normalizedChange = rotationChange % (Math.PI * 2);
        if (normalizedChange > Math.PI) normalizedChange -= Math.PI * 2;
        if (normalizedChange < -Math.PI) normalizedChange += Math.PI * 2;

        // Check if rotation is past the halfway point (PI/2)
        if (Math.abs(normalizedChange) > Math.PI / 2) {
          setIsFlipped(true);
          // Snap in the direction of the drag
          if (normalizedChange > 0) {
            finalRotY = targetRotY + Math.PI;
          } else {
            finalRotY = targetRotY - Math.PI;
          }
        } else {
          setIsFlipped(false);
          finalRotY = targetRotY;
        }
      }
    } else if (isFlipped && wrappedOffset === 0) {
      // Maintain the current flip direction
      const currentRotY = meshRef.current.rotation.y;
      let normalizedRot = currentRotY % (Math.PI * 2);
      if (normalizedRot > Math.PI) normalizedRot -= Math.PI * 2;
      if (normalizedRot < -Math.PI) normalizedRot += Math.PI * 2;

      if (normalizedRot > 0) {
        finalRotY = targetRotY + Math.PI;
      } else {
        finalRotY = targetRotY - Math.PI;
      }
    }

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      finalRotY,
      lerpSpeed,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      finalRotX,
      lerpSpeed,
    );

    // Scale
    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpSpeed);
    meshRef.current.scale.setScalar(nextScale);

    // Subtle floating animation for idle state
    if (wrappedOffset === 0) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, lerpSpeed);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Content Layer */}
      <group position={[0, 0, 0]}>
        {/* Glass card base */}
        <RoundedBox
          ref={glassRef}
          args={[2.9 * cardScale, 3.6 * cardScale, 0.08]}
          radius={0.18}
          smoothness={8}
          position={[0, 0.2, 0]}
        >
          <meshPhysicalMaterial
            color={new THREE.Color(data.accentColor).multiplyScalar(1.5)}
            roughness={0.3}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Icon - larger and more visible */}
        <mesh position={[0, 0.9 * cardScale, 0.15]}>
          <planeGeometry args={[1.2 * cardScale, 1.2 * cardScale]} />
          <meshBasicMaterial map={iconTexture} transparent opacity={1} />
        </mesh>

        {/* Text - Using 3D Text for crispness */}
        <group position={[0, -0.5 * cardScale, 0.15]}>
          <Text
            font={FONT_URL}
            fontSize={0.25 * cardScale}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.2 * cardScale, 0]}
            maxWidth={2.5 * cardScale}
          >
            {data.label}
          </Text>

          <Text
            font={FONT_URL}
            fontSize={0.15 * cardScale}
            color={data.accentColor}
            anchorX="center"
            anchorY="middle"
            position={[0, -0.1 * cardScale, 0]}
          >
            {data.subtext}
          </Text>

          <Text
            font={FONT_URL}
            fontSize={0.12 * cardScale}
            color="#94a3b8"
            anchorX="center"
            anchorY="top"
            position={[0, -0.35 * cardScale, 0]}
            maxWidth={2.4 * cardScale}
            textAlign="center"
          >
            {data.description}
          </Text>
        </group>
      </group>

      {/* Back of Card */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        {/* Glass card base - back */}
        <RoundedBox
          args={[2.9 * cardScale, 3.6 * cardScale, 0.08]}
          radius={0.18}
          smoothness={8}
          position={[0, 0.2, 0]}
        >
          <meshPhysicalMaterial
            color={new THREE.Color(data.accentColor).multiplyScalar(0.8)}
            roughness={0.4}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.4}
          />
        </RoundedBox>

        {/* Back content */}
        <group position={[0, 0.2 * cardScale, 0.1]}>
          <Text
            font={FONT_URL}
            fontSize={0.3 * cardScale}
            color={data.accentColor}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.5 * cardScale, 0]}
            maxWidth={2.4 * cardScale}
          >
            PREMIUM
          </Text>

          <Text
            font={FONT_URL}
            fontSize={0.18 * cardScale}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0]}
            maxWidth={2.4 * cardScale}
            textAlign="center"
          >
            {data.label}
          </Text>
        </group>
      </group>
    </group>
  );
};

PremiumGlassCard.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  dragRef: PropTypes.object.isRequired,
};

// --- Scene Setup ---

const Scene = ({ activeIndex, dragRef }) => {
  return (
    <>
      {/* Environment for reflections */}
      <color attach="background" args={["#020617"]} />
      {/* Perspective grid floor at bottom of viewport */}
      <gridHelper
        args={[100, 100, 0x444444, 0x222222]}
        position={[0, -3.5, -20]}
        rotation={[0, 0, 0]}
      />

      {/* Premium Lighting Setup */}
      <ambientLight intensity={0.4} />

      {/* Key light - main dramatic lighting */}
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />

      {/* Rim lights for edge highlights */}
      <pointLight position={[-8, 5, -5]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[8, 5, -5]} intensity={1.5} color="#a855f7" />

      {/* Fill light from below */}
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#3b82f6" />

      {/* Accent lights for glass reflections */}
      <spotLight position={[0, 8, 8]} intensity={2} color="#ffffff" />
      <spotLight position={[-6, 6, 0]} intensity={1.5} color="#8b5cf6" />

      {/* Render Cards */}
      <group position={[0, -0.5, 0]}>
        {cardsData.map((data, index) => (
          <PremiumGlassCard
            key={data.id}
            data={data}
            index={index}
            activeIndex={activeIndex}
            dragRef={dragRef}
          />
        ))}
      </group>
    </>
  );
};

Scene.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  dragRef: PropTypes.object.isRequired,
};

// --- Main App Component ---

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
    // Always prevent default to stop any scroll/selection
    e.preventDefault();
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX || e.touches?.[0]?.clientX;
    dragRef.current.startY = e.clientY || e.touches?.[0]?.clientY;
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;

    // Prevent scroll on all platforms during active drag
    e.preventDefault();

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    const deltaX = (clientX - dragRef.current.startX) / window.innerWidth;
    const deltaY = (clientY - dragRef.current.startY) / window.innerHeight;

    // Store localized rotation for the card tilt
    dragRef.current.currentX = deltaX * 2;
    dragRef.current.currentY = deltaY * 2;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.isDragging) return;

    // Reset physics (no card switching on drag, only rotation)
    dragRef.current.isDragging = false;
    dragRef.current.currentX = 0;
    dragRef.current.currentY = 0;
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
    <Section className="relative w-full bg-slate-950 overflow-hidden font-sans select-none">
      {/* Section Header */}
      <Container>
        <SectionHeadContainer className="z-500 text-white">
          <Typography as="h2" variant="section-title">
            Audience Mirroring
          </Typography>
          <Typography as="h3" variant="section-subtitle" className="text-white">
            Stretch captures conversion audiences and enables their reactivation across different
            platforms.
          </Typography>
        </SectionHeadContainer>
      </Container>
      {/* 3D Scene */}
      <div className="relative w-full h-[70vh] bottom-0">
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
            style={{
              touchAction: "none",
            }}
            shadows
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            performance={{ min: 0.7, max: 1.5, debounce: 200 }}
            frameloop="demand"
            dpr={dpr} // Sharp on Retina
          >
            {/* Background Color within Canvas */}
            <PerformanceMonitor
              onIncline={() => setDpr(2)}
              onDecline={() => setDpr(1)}
            ></PerformanceMonitor>
            <FrameLimiter fps={FPS_CAP} />
            <color attach="background" args={["#020617"]} />
            <Scene activeIndex={activeIndex} dragRef={dragRef} />
            {showStats && <Stats />}
          </Canvas>
        </div>

        {/* Footer Controls */}
        <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center items-end z-20 pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <button
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length)
              }
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-md"
            >
              ←
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % cardsData.length)}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-md"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GlassCards;
