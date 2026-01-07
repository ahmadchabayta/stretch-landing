import React from "react";
import PropTypes from "prop-types";
import cn from "../../utils/cn";

/**
 * GlassCircle - A reusable liquid glass component with SVG filters
 *
 * Liquid Glass builds on two physical ideas:
 * 1. REFRACTION - Light bending through glass creating distortion effects
 * 2. REFLECTION - Light bouncing off surfaces creating highlights and depth
 *
 * @param {Object} props
 * @param {string} props.size - Size of the circle (e.g., '200px', '10rem')
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.blur - Blur intensity (default: 20)
 * @param {number} props.noiseIntensity - Noise intensity (default: 0.15)
 * @param {number} props.distortionScale - Distortion scale for refraction (default: 10)
 * @param {number} props.reflectionIntensity - Reflection highlight intensity (default: 0.4)
 * @param {string} props.glassColor - Glass color with opacity (default: 'rgba(255, 255, 255, 0.1)')
 * @param {string} props.borderColor - Border color (default: 'rgba(255, 255, 255, 0.2)')
 * @param {number} props.borderWidth - Border width in pixels (default: 1)
 * @param {React.ReactNode} props.children - Content inside the circle
 */
const GlassCircle = ({
  size = "",
  className = "",
  blur = 20,
  noiseIntensity = 0.15,
  distortionScale = 10,
  reflectionIntensity = 0.4,
  glassColor = "rgba(255, 255, 255, 0.1)",
  borderColor = "rgba(255, 255, 255, 0.2)",
  borderWidth = 1,
  children,
  ...props
}) => {
  // Generate unique IDs for filters to avoid conflicts when using multiple instances
  const filterId = React.useId();
  const noiseFilterId = `glass-noise-${filterId}`;
  const refractionFilterId = `glass-refraction-${filterId}`;
  const reflectionFilterId = `glass-reflection-${filterId}`;
  const glassFilterId = `glass-combined-${filterId}`;

  return (
    <div
      className={cn("glass-circle-container", className)}
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
      {...props}
    >
      {/* SVG Filters Definition */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          {/* Noise Filter - Adds texture to glass */}
          <filter id={noiseFilterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.15 0"
              result="noiseOpacity"
            />
          </filter>

          {/* REFRACTION Filter - Light bending through glass */}
          <filter id={refractionFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="2"
              result="turbulence"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="refraction"
            />
          </filter>

          {/* REFLECTION Filter - Light bouncing off glass surface */}
          <filter id={reflectionFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1.5 0 0 0 0
                      0 1.5 0 0 0
                      0 0 1.5 0 0
                      0 0 0 1 0"
              result="brightReflection"
            />
          </filter>

          {/* Combined Glass Filter */}
          <filter id={glassFilterId} x="-50%" y="-50%" width="200%" height="200%">
            {/* Blur for glass effect */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />

            {/* Noise texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />

            {/* Adjust noise opacity */}
            <feColorMatrix
              in="noise"
              type="matrix"
              values={`1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 ${noiseIntensity} 0`}
              result="noiseWithOpacity"
            />

            {/* Refraction - Light bending */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015"
              numOctaves="2"
              result="distortNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="distortNoise"
              scale={distortionScale * 0.5}
              xChannelSelector="R"
              yChannelSelector="G"
              result="refracted"
            />

            {/* Composite everything together */}
            <feBlend in="refracted" in2="noiseWithOpacity" mode="overlay" result="combined" />
            <feGaussianBlur in="combined" stdDeviation={blur * 0.5} result="finalBlur" />
          </filter>
        </defs>
      </svg>

      {/* Glass Circle */}
      <div
        className="glass-circle"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: glassColor,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Noise Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            filter: `url(#${noiseFilterId})`,
            opacity: 0.4,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* REFRACTION Layer - Light bending through the glass */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 50%)",
            filter: `url(#${refractionFilterId})`,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* REFLECTION Layer - Primary glossy highlight (light bouncing off surface) */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "40%",
            height: "40%",
            background: `radial-gradient(circle, rgba(255, 255, 255, ${reflectionIntensity}), transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />

        {/* REFLECTION Layer - Secondary reflection at bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            width: "30%",
            height: "30%",
            background: `radial-gradient(circle, rgba(255, 255, 255, ${reflectionIntensity * 0.5}), transparent 60%)`,
            borderRadius: "50%",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        {/* Edge reflection - Rim light effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "50%",
            background: `linear-gradient(135deg, rgba(255, 255, 255, ${reflectionIntensity * 0.3}), transparent 40%)`,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

GlassCircle.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  blur: PropTypes.number,
  noiseIntensity: PropTypes.number,
  distortionScale: PropTypes.number,
  reflectionIntensity: PropTypes.number,
  glassColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  children: PropTypes.node,
};

export default GlassCircle;
