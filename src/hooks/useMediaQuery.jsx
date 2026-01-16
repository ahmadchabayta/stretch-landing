import { useSyncExternalStore } from "react";

// Tailwind-like breakpoints (px). Adjust if your Tailwind config differs.
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
};

const buildQuery = (input) => {
  if (!input) return null;

  // direct object: { min, max }
  if (typeof input === "object") {
    const parts = [];
    if (input.min !== undefined) parts.push(`(min-width: ${input.min}px)`);
    if (input.max !== undefined) parts.push(`(max-width: ${input.max}px)`);
    return parts.join(" and ") || null;
  }

  // string: could be "md" or a raw media query like "(max-width: 600px)"
  if (typeof input === "string") {
    const v = input.trim();
    // support comparator forms: "<=md", "<md", ">=md", ">md"
    // and prefix forms: "max-md", "min-md", "upTo-md"
    const cmpMatch = v.match(/^([<>]=?)(\s*)([a-z0-9-]+)$/i);
    if (cmpMatch) {
      const op = cmpMatch[1];
      const key = cmpMatch[3];
      if (BREAKPOINTS[key] !== undefined) {
        if (op.startsWith("<")) return `(max-width: ${BREAKPOINTS[key]}px)`;
        return `(min-width: ${BREAKPOINTS[key]}px)`;
      }
    }

    const prefixMatch = v.match(/^(max|min|upTo|from)[-_]?(.*)$/i);
    if (prefixMatch) {
      const prefix = prefixMatch[1].toLowerCase();
      const key = prefixMatch[2];
      if (BREAKPOINTS[key] !== undefined) {
        if (prefix === "max" || prefix === "upto") return `(max-width: ${BREAKPOINTS[key]}px)`;
        return `(min-width: ${BREAKPOINTS[key]}px)`;
      }
    }

    // bare token like "md" defaults to min-width (mobile-first)
    if (BREAKPOINTS[v] !== undefined) return `(min-width: ${BREAKPOINTS[v]}px)`;
    return v; // treat as raw query
  }

  return String(input);
};

export default function useMediaQuery(query) {
  const mediaQuery = buildQuery(query);

  const getSnapshot = () => {
    if (typeof window === "undefined" || !mediaQuery) return false;
    try {
      return window.matchMedia(mediaQuery).matches;
    } catch {
      return false;
    }
  };

  const subscribe = (callback) => {
    if (typeof window === "undefined" || !mediaQuery) return () => {};
    const mql = window.matchMedia(mediaQuery);
    const handler = () => callback();

    if (!mql.addEventListener) return () => {};

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
