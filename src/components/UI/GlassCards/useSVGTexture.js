import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

// Convert SVG string to Texture
export const useSVGTexture = (svgString, color) => {
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

    // Set a timeout to ensure immediate rendering attempt
    const timeoutId = setTimeout(() => {
      invalidate();
    }, 0);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1024, 1024);

      // Apply color overlay composite
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1024, 1024);

      texture.needsUpdate = true;
      invalidate(); // Force re-render when texture is ready
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      console.error("Failed to load SVG texture");
      URL.revokeObjectURL(url);
    };

    img.src = url;

    return () => {
      clearTimeout(timeoutId);
      URL.revokeObjectURL(url);
    };
  }, [svgString, color, texture, invalidate]);

  return texture;
};
