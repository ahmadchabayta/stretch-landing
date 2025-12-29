import PropTypes from "prop-types";
import CapabilityCard from "./CapabilityCard";

const CardsContainer = ({ cards, activeCard, onCardClick }) => (
  <div className="relative flex w-full flex-1 items-center justify-center overflow-visible p-0 lg:h-[450px]">
    <div className="relative z-50 flex h-auto w-full cursor-grab snap-x snap-mandatory items-center gap-5 overflow-x-auto overflow-y-hidden p-5 pb-20 lg:mx-auto lg:grid lg:w-full lg:grid-cols-2 lg:place-content-center lg:place-items-center lg:justify-center lg:gap-8 lg:overflow-visible">
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
