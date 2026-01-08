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

  // const dir = currentLanguage?.dir || "rtl";
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
    w-full
    min-w-[1583px]
    shrink-0
    xl:bottom-[clamp(16%,7%,14%)]
    2xl:bottom-[clamp(12%,13%,14%)]
    3xl:bottom-[0%]
    left-[-26%]
    lg:left-[-32%]
    xl:left-[-22.1%]
    xxl:left-[-20.1%]
    2xl:left-[-17%]
    3xl:left-[-11%]
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
    md:left-[60%]
    md:left-1/2
    lg:left-[55%]
    translate-x-[-50%]
    bottom-[0%]
   
  `;

  return (
    <Section
      id={id}
      container={false}
      padding="none"
      className="relative overflow-hidden"
      style={{ direction: "ltr" }}
    >
      <Container className="flex flex-col ">
        <SectionTitle labels={labels} />
        <Flex align="items-end" justify="justify-end" className="">
          <SectionData labels={labels} language={language} />
        </Flex>
      </Container>
      <div
        className="min-h-[415px] min-w-[738px] lg:w-[1583px] lg:min-h-[890px] cursor-pointer "
        dir="ltr"
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
