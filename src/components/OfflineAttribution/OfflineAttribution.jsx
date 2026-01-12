import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import data from "./offline_attribution.data.json";
import SectionData from "./SectionData";
import SectionTitle from "./SectionTitle";
import { Container, Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import { withBase } from "../../utils/withBase";

const OfflineAttribution = ({ id }) => {
  // eslint-disable-next-line no-unused-vars
  const { language, currentLanguage } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;

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

  const showLargeImages = `
    hidden
    xl:flex
    absolute
    min-w-full
    max-w-[1231px]
    bottom-[0]
    translate-y-[75%]
    left-0
    xxl:left-[-10%]
    3xl:left-[-40px]
    
   `;
  const showSmallImages = `
    flex
    xl:hidden
    absolute
    w-full
    min-w-[738px]
    md:min-w-[1324px]
    lg:min-w-[1583px]
    left-[57%]
    md:left-[55%]
    translate-x-[-50%]
    lg:translate-x-[0]
    lg:left-[-195px]
    bottom-0
    translate-y-[100%]
    md:translate-y-[90%]
    2md:translate-y-[90%]
  `;

  return (
    <Section id={id} className="relative overflow-hidden max-h-screen flex flex-col">
      <Container className="flex flex-col shrink-0">
        <SectionTitle labels={labels} />
        <Flex align="items-end" justify="justify-end" className="">
          <SectionData labels={labels} language={language} />
        </Flex>
      </Container>
      <div
        className="relative flex-1 min-h-0 max-h-[417px] md:max-h-[750px] lg:max-h-[890px] lg:w-[1231px] max-w-[1231px] cursor-pointer"
        {...(!isTouchDevice && {
          onMouseEnter: () => setIsRevealed((prev) => !prev),
          onMouseLeave: () => setIsRevealed((prev) => !prev),
        })}
      >
        {isRevealed ? (
          <>
            <img
              className={showLargeImages}
              src={withBase(labels.images.large.orange)}
              alt="orange map"
            />
            <img
              className={showSmallImages}
              src={withBase(labels.images.small.orange)}
              alt="orange map mobile"
            />
          </>
        ) : (
          <>
            <img
              className={showLargeImages}
              src={withBase(labels.images.large.purple)}
              alt="purple map"
            />
            <img
              className={showSmallImages}
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
