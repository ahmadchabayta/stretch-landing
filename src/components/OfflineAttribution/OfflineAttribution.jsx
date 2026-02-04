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
    xl:max-w-[903px]
    2xl:max-w-[1131px]
    3xl:max-w-[1231px]
    bottom-[-25%]
    xl:bottom-[-40%]
    2xl:bottom-[-50%]
    3xl:bottom-[-25%]
    dir-ltr:left-[-10%]
    dir-ltr:xxl:left-[-11%]
    dir-ltr:2xl:left-[-13%]
    dir-ltr:3xl:left-[-12%]
    dir-rtl:left-0
    dir-rtl:xxl:right-[-8%]
    dir-rtl:3xl:right-0
    dir-rtl:2xl:right-0
    transition-opacity
    duration-500
    ease-in-out
   `;
  const showSmallImages = `
    flex
    xl:hidden
    absolute
    w-full
    min-w-[538px]
    xs:min-w-[638px]
    md:min-w-[894px]
    lg:min-w-[1283px]
    left-[57%]
    md:left-[55%]
    translate-x-[-50%]
    lg:translate-x-[-60%]
    bottom-0
    transition-opacity
    duration-500
    ease-in-out
  `;

  return (
    <Section
      dir="ltr"
      id={id}
      className="relative overflow-hidden flex flex-col min-h-0!  items-center"
    >
      <Container className="flex flex-col shrink-0 w-full">
        <SectionTitle labels={labels} language={language} />
        <Flex align="items-end" justify="justify-end">
          <SectionData labels={labels} language={language} />
        </Flex>
      </Container>
      <div className="relative flex-1 min-h-[450px] xs:min-h-[500px] md:min-h-[700px] lg:min-h-[900px] xl:min-h-[400px] 3xl:min-h-[500px] lg:w-[1231px] max-w-[1231px] 3xl:max-w-[1920px] cursor-pointer overflow-visible">
        {/* Purple images (default) */}
        <img
          className={`${showLargeImages} ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          src={withBase(labels.images.large.purple)}
          alt="Offline footfall attribution visualization showing ad-exposed store visitors versus competitor visitors on a location map, highlighting measured in-store visits driven by cross-channel advertising without SDKs."
        />
        <img
          className={`${showSmallImages} ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          src={withBase(labels.images.small.purple)}
          alt="Offline footfall attribution visualization showing ad-exposed store visitors versus competitor visitors on a location map, highlighting measured in-store visits driven by cross-channel advertising without SDKs."
        />

        {/* Orange images (revealed on hover) */}
        <img
          className={`${showLargeImages} ${isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          src={withBase(labels.images.large.orange)}
          alt="Offline footfall attribution visualization showing ad-exposed store visitors versus competitor visitors on a location map, highlighting measured in-store visits driven by cross-channel advertising without SDKs."
        />
        <img
          className={`${showSmallImages} ${isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          src={withBase(labels.images.small.orange)}
          alt="Offline footfall attribution visualization showing ad-exposed store visitors versus competitor visitors on a location map, highlighting measured in-store visits driven by cross-channel advertising without SDKs."
        />

        <button
          className="absolute inset-0 cursor-pointer bg-transparent"
          aria-label={isRevealed ? "Hide attribution map" : "Show attribution map"}
          tabIndex={0}
          {...(!isTouchDevice
            ? {
                onMouseEnter: () => setIsRevealed(true),
                onMouseLeave: () => setIsRevealed(false),
              }
            : {
                onClick: () => setIsRevealed((prev) => !prev),
              })}
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
