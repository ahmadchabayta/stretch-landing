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

            {/* Cycle Button - Hidden on large screens, centered below grid */}
            <div className="mt-6 flex justify-center lg:hidden">
              <button
                onClick={handleNextColumns}
                className={cn(
                  "rounded-xl cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                  "bg-secondary text-white shadow-lg hover:shadow-xl active:scale-95",
                  isArabic ? "font-[Tajawal,sans-serif]" : "font-poppins",
                )}
              >
                {isArabic ? "التالي" : "Next Platform"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CompetitiveEdgeStretch;
