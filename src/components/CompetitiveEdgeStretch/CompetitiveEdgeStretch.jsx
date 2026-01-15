import { useState } from "react";
import data from "./competitive_edge_stretch.data.json";
import { Container, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import GridHeader from "./GridHeader";
import DesktopGrid from "./DesktopGrid";
import cn from "../../utils/cn";

const CompetitiveEdgeStretch = () => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const isArabic = language === "ar";
  const [columnOffset, setColumnOffset] = useState(0);

  const handleNextColumns = () => {
    // Cycle through competitors only (exclude Stretch which is always shown)
    const competitorsCount = labels.columns.length - 1;
    setColumnOffset((prev) => (prev + 1) % competitorsCount);
  };

  return (
    <div className="relative">
      <Section
        style={{
          backgroundImage: "url('./assets/capabilities/grid.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "contain",
        }}
        padding="none"
        container={false}
        className="relative flex min-h-0! flex-col overflow-hidden"
      >
        <Container className="relative z-10 pt-8 pb-8 lg:pt-16 lg:pb-12">
          <SectionTitle title={labels.title} language={language} />
        </Container>

        {/* Premium Comparison Grid */}
        <div className="relative z-10 w-full px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto w-full max-w-7xl">
            {/* Cycle Button - Hidden on large screens */}
            <button
              onClick={handleNextColumns}
              className={cn(
                "mb-4 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 lg:hidden",
                "bg-secondary text-white shadow-lg hover:shadow-xl active:scale-95",
                isArabic ? "font-[Tajawal,sans-serif]" : "font-poppins",
              )}
            >
              {isArabic ? "التالي" : "Next Platform"} →
            </button>

            {/* Grid Container */}
            <div className="overflow-hidden rounded-2xl py-4 lg:py-6">
              <GridHeader
                columns={labels.columns}
                isArabic={isArabic}
                columnOffset={columnOffset}
              />

              <DesktopGrid
                features={labels.features}
                boxes={data.boxes}
                columnsLength={labels.columns.length}
                partialLabel={labels.partial}
                isArabic={isArabic}
                columnOffset={columnOffset}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CompetitiveEdgeStretch;
