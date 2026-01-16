import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CapabilityCard from "./CapabilityCard";

const CardsContainer = ({ cards, activeCard, onCardClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      // Find the card closest to center
      const cardElements = container.querySelectorAll("[data-card-id]");
      let closestCard = null;
      let minDistance = Infinity;

      cardElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = element;
        }
      });

      if (closestCard) {
        const cardId = closestCard.getAttribute("data-card-id");
        const cardIndex = cards.findIndex((c) => c.id === cardId);
        if (cardId !== activeCard) {
          onCardClick(cardId, cardIndex);
        }
      }
    };

    // Only add scroll listener on mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      container.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cards, activeCard, onCardClick]);

  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-visible p-0 min-h-[300px] lg:min-h-[450px] ">
      {/* Left gradient fade - only visible when scrolling is active */}
      <div className="pointer-events-none absolute left-0 top-0 z-60 h-full w-20 bg-linear-to-r from-white to-transparent md:hidden" />

      {/* Right gradient fade - only visible when scrolling is active */}
      <div className="pointer-events-none absolute right-0 top-0 z-60 h-full w-20 bg-linear-to-l from-white to-transparent md:hidden" />

      <div
        ref={containerRef}
        className="relative z-50 flex min-h-[340px] pb-12 w-screen cursor-grab items-center gap-5 overflow-x-auto overflow-y-hidden py-7 px-[calc(50vw-80.84px)] md:px-5 md:justify-center lg:mx-auto lg:grid lg:grid-cols-2 lg:place-items-center lg:gap-x-5 lg:gap-y-24 md:overflow-visible xl:flex xl:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none"
      >
        {cards.map((card, index) => (
          <CapabilityCard
            key={card.id}
            card={card}
            isActive={activeCard === card.id}
            onClick={() => onCardClick(card.id, index)}
            data-card-id={card.id}
          />
        ))}
      </div>
    </div>
  );
};

CardsContainer.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      sizeClassName: PropTypes.string,
    }),
  ).isRequired,
  activeCard: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default CardsContainer;
