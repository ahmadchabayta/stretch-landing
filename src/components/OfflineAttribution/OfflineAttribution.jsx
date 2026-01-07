import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import data from "./offline_attribution.data.json";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { Container, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import { withBase } from "../../utils/withBase";

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
    shrink-0
    bottom-[-10%]
    left-[-38%]
    md:left-0
    lg:left-[-50%]
    xl:left-[-40%]
    2xl:left-[-40%]
    3xl:left-[-30%]
  `;
  const hidden_on_large_styles = `
    flex
    xl:hidden
    absolute
    w-full
    min-w-[738px]
    md:min-w-[900px]
    lg:min-w-[1400px]
    bottom-[-10%]
    left-[-150px]
    md:translate-x-[-50%]
    md:left-[50%]
    lg:left-[-40%]
    lg:translate-x-0
    xl:left-[-70%]
    2xl:left-[-80%]
    3xl:left-[-50%]
  `;

  return (
    <Section
      id={id}
      container={false}
      padding="none"
      className="relative overflow-hidden min-h-0!"
      style={{ direction: "ltr" }}
    >
      <Container style={{ direction: dir }}>
        <SectionTitle labels={labels} dir={dir} />
        <SectionData labels={labels} dir={dir} language={language} />
      </Container>
      <div
        className="relative min-h-[515px] w-[738px] cursor-pointer lg:h-[815px]"
        dir="ltr"
        {...(!isTouchDevice && {
          onMouseEnter: () => setIsRevealed((prev) => !prev),
          onMouseLeave: () => setIsRevealed((prev) => !prev),
        })}
      >
        {isRevealed ? (
          <>
            <img
              className={hidden_on_small_styles}
              src={withBase(labels.images.large.orange)}
              alt="orange map"
            />
            <img
              className={hidden_on_large_styles}
              src={withBase(labels.images.small.orange)}
              alt="orange map mobile"
            />
          </>
        ) : (
          <>
            <img
              className={hidden_on_small_styles}
              src={withBase(labels.images.large.purple)}
              alt="purple map"
            />
            <img
              className={hidden_on_large_styles}
              src={withBase(labels.images.small.purple)}
              alt="purple map mobile"
            />
          </>
        )}
        <button
          className="absolute inset-0 cursor-pointer bg-transparent"
          aria-label={isRevealed ? "Hide attribution map" : "Show attribution map"}
          tabIndex={0}
          onClick={isTouchDevice ? () => setIsRevealed((prev) => !prev) : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsRevealed((prev) => !prev);
            }
          }}
        />
      </div>
    </Section>
  );
};

OfflineAttribution.propTypes = {
  id: PropTypes.string,
};

export default OfflineAttribution;
