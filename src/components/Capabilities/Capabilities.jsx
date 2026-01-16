import PropTypes from "prop-types";
import { useState } from "react";
import { capability_data as data } from "./capabilities.data";
import { useLanguage } from "../../context/LanguageContext";
import { Container, Section } from "../../components";
import SectionHeader from "./SectionHeader";
import CardsContainer from "./CardsContainer";

const Capabilities = ({ id }) => {
  const [activeCard, setActiveCard] = useState("cross-channel");
  const { language } = useLanguage();
  const labels = data.languages[language] || data.languages.en;

  // Merge card labels with card icons and sizes
  const cards = data.cards.map((card, idx) => ({
    ...card,
    title: labels.cards[idx]?.title || card.title,
  }));

  const handleCardClick = (cardId) => {
    setActiveCard(cardId);
  };

  return (
    <Section
      style={{
        backgroundImage: "url(./assets/capabilities/grid.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "100% 399px",
      }}
      id={id}
      className="relative min-h-0!"
      containerClassName="flex flex-col min-h-0!"
    >
      <Container>
        <SectionHeader
          title={labels.title}
          subtitle={labels.subtitle}
          subtitleHighlighted={labels.subtitle_highlighted}
        />
      </Container>
      <div className="pb-8">
        <CardsContainer cards={cards} activeCard={activeCard} onCardClick={handleCardClick} />
      </div>
    </Section>
  );
};

Capabilities.propTypes = {
  id: PropTypes.string,
};

export default Capabilities;

// Helper style to add since we removed the inline style
const style = document.createElement("style");
style.innerHTML = `
  .bg-grid-pattern {
    background-image: url(./assets/capabilities/grid.webp);
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
  }
`;
document.head.appendChild(style);
