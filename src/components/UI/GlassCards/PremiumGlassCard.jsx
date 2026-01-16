import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import PropTypes from "prop-types";
import { useSVGTexture } from "./useSVGTexture";
import { FONT_URL } from "./constants";

const PremiumGlassCard = ({ data, index, activeIndex, dragRef }) => {
  const meshRef = useRef();
  const glassRef = useRef();
  const frontGroupRef = useRef();
  const backGroupRef = useRef();
  const iconTexture = useSVGTexture(data.icon, data.accentColor);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const animationProgress = useRef(0);
  const { viewport } = useThree();

  // Responsive card scale based on viewport width
  const cardScale = Math.min(1.3, Math.max(0.9, viewport.width / 10));

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

    // Premium Entry Animation with stagger
    const staggerDelay = index * 0.15; // Stagger each card by 150ms
    const animationDuration = 1.2;

    if (!hasAnimatedIn) {
      animationProgress.current += delta;
      const adjustedProgress = Math.max(0, animationProgress.current - staggerDelay);
      const t = Math.min(1, adjustedProgress / animationDuration);

      // Premium easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - t, 3);

      if (t >= 1) {
        setHasAnimatedIn(true);
      }

      // Animate from below and behind with rotation
      const startY = -8;
      const startZ = -10;
      const startRotX = Math.PI * 0.3;
      const startScale = 0.3;
      const startOpacity = 0;

      // Calculate current animation values
      const animY = THREE.MathUtils.lerp(startY, 0, eased);
      const animZ = THREE.MathUtils.lerp(startZ, targetZ, eased);
      const animRotX = THREE.MathUtils.lerp(startRotX, 0, eased);
      const animScale = THREE.MathUtils.lerp(startScale, targetScale, eased);
      const animOpacity = THREE.MathUtils.lerp(startOpacity, 1, eased);

      // Apply animation values
      meshRef.current.position.y = animY;
      meshRef.current.position.z = animZ;
      meshRef.current.position.x = THREE.MathUtils.lerp(0, targetX, eased);
      meshRef.current.rotation.x = animRotX;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(0, targetRotY, eased);
      meshRef.current.scale.setScalar(animScale);

      // Animate opacity on all materials
      if (glassRef.current) {
        glassRef.current.material.opacity = animOpacity * 0.25;
      }

      return; // Skip normal animation during entry
    }

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

      // When dragging, allow free rotation
      if (dragRef.current.isDragging) {
        finalRotY = meshRef.current.rotation.y + dragInfluence * delta * 8;
        finalRotX += dragRef.current.currentY * 1.2;
      } else {
        // When drag is released, snap to nearest stable state
        const currentRotY = meshRef.current.rotation.y;

        // Normalize rotation to -PI to PI range
        let normalizedRot = ((currentRotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (normalizedRot > Math.PI) normalizedRot -= Math.PI * 2;

        // Calculate which side is closer: front (0) or back (PI)
        const distToFront = Math.abs(normalizedRot);
        const distToBack = Math.abs(Math.abs(normalizedRot) - Math.PI);

        if (distToBack < distToFront) {
          // Closer to back - snap to back
          setIsFlipped(true);
          finalRotY = targetRotY + (normalizedRot > 0 ? Math.PI : -Math.PI);
        } else {
          // Closer to front - snap to front
          setIsFlipped(false);
          finalRotY = targetRotY;
        }
      }
    } else if (isFlipped && wrappedOffset === 0) {
      // Maintain the current flip direction when not dragging
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

    // Control visibility of front/back based on rotation to prevent text overlap
    if (frontGroupRef.current && backGroupRef.current) {
      const currentRotY = meshRef.current.rotation.y;
      // Normalize rotation to 0-2PI range
      const normalizedRot = ((currentRotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

      // Front is visible when rotation is between -PI/4 and PI/4 (or equivalent in 0-2PI)
      const isFrontVisible = normalizedRot < Math.PI / 2 || normalizedRot > (3 * Math.PI) / 2;

      frontGroupRef.current.visible = isFrontVisible;
      backGroupRef.current.visible = !isFrontVisible;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Content Layer */}
      <group ref={frontGroupRef} position={[0, 0, 0]}>
        {/* Glass card base with gradient effect */}
        <RoundedBox
          ref={glassRef}
          args={[3.2 * cardScale, 4 * cardScale, 0.1]}
          radius={0.2}
          smoothness={12}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color={new THREE.Color(data.accentColor).multiplyScalar(0.4)}
            roughness={0.1}
            metalness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.02}
            transparent
            opacity={hasAnimatedIn ? 0.25 : 0}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Accent border glow */}
        <RoundedBox
          args={[3.25 * cardScale, 4.05 * cardScale, 0.05]}
          radius={0.21}
          smoothness={12}
          position={[0, 0, -0.06]}
        >
          <meshBasicMaterial color={data.accentColor} transparent opacity={0.15} />
        </RoundedBox>

        {/* Icon with backdrop */}
        <group position={[0, 0.8 * cardScale, 0.15]}>
          {/* Icon backdrop circle */}
          <mesh position={[0, 0, -0.02]}>
            <circleGeometry args={[0.75 * cardScale, 64]} />
            <meshBasicMaterial
              color={new THREE.Color(data.accentColor)}
              transparent
              opacity={0.2}
            />
          </mesh>
          <mesh>
            <planeGeometry args={[1 * cardScale, 1 * cardScale]} />
            <meshBasicMaterial map={iconTexture} transparent opacity={1} />
          </mesh>
        </group>

        {/* Text - Using 3D Text for crispness */}
        <group position={[0, -1 * cardScale, 0.15]}>
          {/* Main label - Bold and centered */}
          <Text
            font={FONT_URL}
            fontSize={0.24 * cardScale}
            color="white"
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0]}
            maxWidth={2.7 * cardScale}
            fontWeight="bold"
            letterSpacing={0.01}
            textAlign="center"
            lineHeight={1.3}
          >
            {data.label}
          </Text>

          {/* Subtext with accent color - only show if exists */}
          {data.subtext && (
            <Text
              font={FONT_URL}
              fontSize={0.16 * cardScale}
              color={data.accentColor}
              anchorX="center"
              anchorY="middle"
              position={[0, -0.4 * cardScale, 0]}
              maxWidth={2.7 * cardScale}
              letterSpacing={0.01}
              textAlign="center"
            >
              {data.subtext}
            </Text>
          )}
        </group>
      </group>

      {/* Back of Card */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        {/* Glass card base - back */}
        <RoundedBox
          args={[3.2 * cardScale, 4 * cardScale, 0.1]}
          radius={0.2}
          smoothness={12}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color={new THREE.Color(data.accentColor).multiplyScalar(0.3)}
            roughness={0.15}
            metalness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.03}
            transparent
            opacity={0.3}
          />
        </RoundedBox>

        {/* Accent border glow */}
        <RoundedBox
          args={[3.25 * cardScale, 4.05 * cardScale, 0.05]}
          radius={0.21}
          smoothness={12}
          position={[0, 0, -0.06]}
        >
          <meshBasicMaterial color={data.accentColor} transparent opacity={0.2} />
        </RoundedBox>

        {/* Back content */}
        <group ref={backGroupRef} position={[0, 0, 0.1]}>
          {/* Step Number Badge with enhanced styling */}
          <group position={[0, 1.2 * cardScale, 0]}>
            {/* Outer glow ring */}
            <mesh position={[0, 0, -0.02]}>
              <circleGeometry args={[0.5 * cardScale, 64]} />
              <meshBasicMaterial color={data.accentColor} transparent opacity={0.2} />
            </mesh>
            {/* Main badge */}
            <mesh>
              <circleGeometry args={[0.4 * cardScale, 64]} />
              <meshBasicMaterial color={data.accentColor} transparent opacity={0.95} />
            </mesh>
            {/* Number */}
            <Text
              font={FONT_URL}
              fontSize={0.45 * cardScale}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.01]}
              fontWeight="bold"
            >
              {data.id + 1}
            </Text>
          </group>

          {/* Text group - premium layout */}
          <group position={[0, -0.3 * cardScale, 0]}>
            <Text
              font={FONT_URL}
              fontSize={0.32 * cardScale}
              color={data.accentColor}
              anchorX="center"
              anchorY="middle"
              position={[0, 0.2 * cardScale, 0]}
              maxWidth={2.8 * cardScale}
              fontWeight="bold"
              letterSpacing={0.04}
            >
              STEP {data.id + 1}
            </Text>

            {/* Divider */}
            <mesh position={[0, -0.05 * cardScale, 0]}>
              <planeGeometry args={[2.2 * cardScale, 0.012]} />
              <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>

            <Text
              font={FONT_URL}
              fontSize={0.2 * cardScale}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.4 * cardScale, 0]}
              maxWidth={2.6 * cardScale}
              textAlign="center"
              lineHeight={1.4}
              fontWeight="600"
            >
              {data.label}
            </Text>

            {data.subtext && (
              <Text
                font={FONT_URL}
                fontSize={0.16 * cardScale}
                color="#cbd5e1"
                anchorX="center"
                anchorY="middle"
                position={[0, -0.7 * cardScale, 0]}
                maxWidth={2.6 * cardScale}
                textAlign="center"
                lineHeight={1.3}
              >
                {data.subtext}
              </Text>
            )}
          </group>
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

export default PremiumGlassCard;
