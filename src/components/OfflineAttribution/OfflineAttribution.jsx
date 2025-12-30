import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import data from "./offline_attribution.data.json";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";

const OfflineAttribution = ({ id }) => {
  const { language, currentLanguage } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;

  const dir = currentLanguage?.dir || "rtl";
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
      );
    };
    checkTouchDevice();
  }, []);

  const hidden_on_small_styles = `
    hidden
    xl:flex
    absolute
    w-full
    min-w-[738px]
    xl:min-w-[1583px]
    pointer-events-none
    shrink-0
    bottom-[-10%]
    ${
      language === "en"
        ? `left-[-38%]
           md:left-0
           lg:left-[-50%]
           xl:left-[-40%]
           2xl:left-[-40%]
           3xl:left-[-30%]`
        : `right-[-38%]
           md:right-0
           lg:right-[-92%]
           xl:right-[-50%]
           2xl:right-[-40%]
           3xl:right-[-45%]
           scale-x-[-1]
           `
    }
  `;
  const hidden_on_large_styles = `
    flex
    xl:hidden
    absolute
    w-full
    min-w-[1038px]
    lg:min-w-[1582px]
    pointer-events-none
    bottom-[-10%]
    ${
      language === "en"
        ? `left-[-150px]
           md:translate-x-[-50%]
           md:left-[50%]
           lg:left-[50%]
           xl:left-[-70%]
           2xl:left-[-80%]
           3xl:left-[-50%]`
        : `left-[0]
           md:translate-x-[-50%]
           md:right-[50%]
           lg:right-[-92%]
           xl:right-[-70%]
           2xl:right-[-80%]
           3xl:right-[-50%]`
    }
  `;

  const containerHandlers = isTouchDevice
    ? {
        onClick: () => setIsRevealed((prev) => !prev),
      }
    : {
        onMouseEnter: () => setIsRevealed(true),
        onMouseLeave: () => setIsRevealed(false),
      };

  return (
    <Section id={id} container={false} padding="none" className="relative overflow-hidden min-h-0!">
      <SectionTitle labels={labels} dir={dir} />
      <SectionData labels={labels} dir={dir} language={language} />
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsRevealed((prev) => !prev);
          }
        }}
        className="relative min-h-[515px] w-[738px] cursor-pointer touch-none lg:h-[815px]"
        {...containerHandlers}
      >
        {isRevealed ? (
          <>
            <img
              className={hidden_on_small_styles}
              src={data.images.large.orange}
              alt="orange map"
            />
            <img
              className={hidden_on_large_styles}
              src={data.images.small.orange}
              alt="orange map mobile"
            />
          </>
        ) : (
          <>
            <img
              className={hidden_on_small_styles}
              src={data.images.large.purple}
              alt="purple map"
            />
            <img
              className={hidden_on_large_styles}
              src={data.images.small.purple}
              alt="purple map mobile"
            />
          </>
        )}
      </div>
    </Section>
  );
};

OfflineAttribution.propTypes = {
  id: PropTypes.string,
};

export default OfflineAttribution;
