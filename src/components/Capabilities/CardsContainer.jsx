import PropTypes from "prop-types";
import CapabilityCard from "./CapabilityCard";

const CardsContainer = ({ cards, activeCard, onCardClick }) => (
  <div className="relative flex w-full flex-1 items-center justify-center overflow-visible p-0 min-h-[300px] lg:h-[450px]">
    {/* Left gradient fade - only visible when scrolling is active */}
    <div className="pointer-events-none absolute left-0 top-0 z-60 h-full w-20 bg-linear-to-r from-white to-transparent md:hidden" />

    {/* Right gradient fade - only visible when scrolling is active */}
    <div className="pointer-events-none absolute right-0 top-0 z-60 h-full w-20 bg-linear-to-l from-white to-transparent md:hidden" />

    <div className="relative z-50 flex h-auto w-screen cursor-grab items-center gap-5 overflow-x-auto overflow-y-hidden py-5 px-5 md:justify-center lg:mx-auto lg:gap-x-0 lg:gap-y-12 lg:space-y-0 md:overflow-visible 2xl:flex">
      {cards.map((card, index) => (
        <CapabilityCard
          key={card.id}
          card={card}
          isActive={activeCard === card.id}
          onClick={() => onCardClick(card.id, index)}
        />
      ))}
    </div>
  </div>
);

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
