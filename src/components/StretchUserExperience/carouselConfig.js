/**
 * Get spread and z-depth values based on screen size
 * @param {Object} breakpoints - Object containing screen size booleans
 * @returns {Object} { x, y, z } spread values
 */
export const getCarouselSpread = ({
  is3XLScreen,
  is2XLScreen,
  isXLScreen,
  isLgScreen,
  isMdScreen,
}) => {
  // Desktop: horizontal spread (using viewport-based z values)
  if (is3XLScreen) return { x: 20, z: -280 };
  if (is2XLScreen) return { x: 18, z: -260 };
  if (isXLScreen) return { x: 15, z: -220 };

  // Tablet/Mobile: vertical spread
  if (isLgScreen) return { y: 18, z: -160 };
  if (isMdScreen) return { y: 20, z: -140 };

  return { y: 22, z: -100 }; // Small mobile
};

/**
 * Get carousel item positions based on layout mode
 * @param {Object} spread - Spread values from getCarouselSpread
 * @param {boolean} isLargeScreen - Desktop layout flag
 * @param {boolean} isMobile - Mobile layout flag
 * @returns {Array} Array of position objects
 */
export const getCarouselPositions = (spread, isLargeScreen, isMobile) => {
  if (isLargeScreen) {
    return [
      { x: `-${spread.x}%`, y: 0, z: 0, scale: 1, opacity: 1, zIndex: 30 },
      { x: `${spread.x * 3}%`, y: 0, z: spread.z, scale: 0.7, opacity: 0.4, zIndex: 20 },
      { x: `${spread.x * 6}%`, y: 0, z: spread.z * 1.5, scale: 0.3, opacity: 0.3, zIndex: 10 },
    ];
  }

  if (isMobile) {
    return [
      { x: 0, y: `${spread.y + 20}%`, z: 0, scale: 1, opacity: 1, zIndex: 30 },
      { x: 0, y: `${spread.y * 10}%`, z: spread.z, scale: 0.7, opacity: 0.4, zIndex: 20 },
      { x: 0, y: `${spread.y * 20}%`, z: spread.z * 1.5, scale: 0.3, opacity: 0.3, zIndex: 10 },
    ];
  }

  // Tablet
  return [
    { x: 0, y: `${spread.y + 20}%`, z: 0, scale: 1, opacity: 1, zIndex: 30 },
    { x: 0, y: `${spread.y * 12}%`, z: spread.z, scale: 0.7, opacity: 0.4, zIndex: 20 },
    { x: 0, y: `${spread.y * 15}%`, z: spread.z * 1.5, scale: 0.3, opacity: 0.3, zIndex: 10 },
  ];
};

/**
 * Calculate circular position index for carousel item
 * @param {number} itemIndex - Current item index
 * @param {number} currentIndex - Active carousel index
 * @param {number} totalItems - Total number of items
 * @returns {number} Position index (0-2)
 */
export const getPositionIndex = (itemIndex, currentIndex, totalItems) => {
  return (itemIndex - currentIndex + totalItems) % totalItems;
};
