import PropTypes from "prop-types";
import { useState } from "react";
import { capability_data as data, capability_url_links } from "./capabilities.data";
import { useLanguage } from "../../context/LanguageContext";
import { Section } from "../../components";
import useScrollToSection from "../../hooks/useScrollToSection";
import SectionHeader from "./SectionHeader";
import CardsContainer from "./CardsContainer";

const Capabilities = ({ id }) => {
  const [activeCard, setActiveCard] = useState("cross-channel");
  const { language } = useLanguage();
  const { scrollToSection } = useScrollToSection();
  const labels = data.languages[language] || data.languages.en;

  // Merge card labels with card icons and sizes
  const cards = data.cards.map((card, idx) => ({
    ...card,
    title: labels.cards[idx]?.title || card.title,
  }));

  const handleCardClick = (cardId, index) => {
    setActiveCard(cardId);
    const targetUrl = capability_url_links[index];
    scrollToSection(targetUrl);
  };

  return (
    <Section
      style={{
        backgroundImage: "url(./assets/capabilities/grid.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "contain",
      }}
      id={id}
      container={true}
      padding="none"
      className="relative flex min-h-0! flex-col items-center"
    >
      <div className="relative mx-auto flex h-auto flex-col items-center justify-center gap-8 lg:items-start lg:gap-16 xl:gap-20">
        <SectionHeader
          title={labels.title}
          subtitle={labels.subtitle}
          subtitleHighlighted={labels.subtitle_highlighted}
        />

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
