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
          <Container className="mx-auto w-full">
            {/* Grid Container */}
            <div className="overflow-hidden">
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
            <div className="mt-6 mr-3 flex justify-end lg:hidden">
              <button
                onClick={handleNextColumns}
                data-button-name="competitive_next_platform_mobile"
                className={cn(
                  "rounded-[7px] w-44 cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-200 flex items-center justify-between gap-2",
                  "bg-black text-white shadow-lg hover:shadow-xl active:scale-95",
                  isArabic ? "font-[Tajawal,sans-serif]" : "font-poppins",
                )}
              >
                {isArabic ? "التالي" : "Next Platform"}
                <svg
                  className={isArabic ? "rotate-180" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.867"
                  height="13.186"
                  viewBox="0 0 11 14"
                  fill="none"
                >
                  <path
                    d="M0 12.0094V1.17833C0 0.820555 0.118612 0.534722 0.355834 0.320833C0.592084 0.106944 0.868195 0 1.18417 0C1.28333 0 1.38687 0.0136109 1.49479 0.0408332C1.60174 0.0670832 1.70431 0.107431 1.8025 0.161875L10.3235 5.60583C10.5044 5.73222 10.6405 5.87708 10.7319 6.04042C10.8223 6.20278 10.8675 6.38701 10.8675 6.59312C10.8675 6.79924 10.8223 6.98347 10.7319 7.14583C10.6415 7.30819 10.5053 7.45306 10.3235 7.58042L1.8025 13.0244C1.70431 13.0778 1.60076 13.1182 1.49187 13.1454C1.38299 13.1726 1.27944 13.1862 1.18125 13.1862C0.864306 13.1862 0.588194 13.0793 0.352916 12.8654C0.117638 12.6515 0 12.3662 0 12.0094Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </div>
      </Section>
    </div>
  );
};

export default CompetitiveEdgeStretch;
