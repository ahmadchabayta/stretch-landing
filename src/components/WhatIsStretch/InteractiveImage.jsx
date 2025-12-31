import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import data from "./whatIsStretch.data.json";

const InteractiveImage = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [iphoneSrc, setIphoneSrc] = useState(data.images.iphone.small);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateSrc = () => {
      setIphoneSrc(mq.matches ? data.images.iphone.large : data.images.iphone.small);
    };

    updateSrc();
    mq.addEventListener("change", updateSrc);

    return () => mq.removeEventListener("change", updateSrc);
  }, []);

  const visibilityClass = isVisible
    ? "translate-y-0 xl:translate-x-0 opacity-100"
    : "translate-y-8 xl:translate-y-0 xl:-translate-x-8 opacity-0";

  const iphonePosition = `
  ${
    isRTL
      ? ` 
    absolute
    top-[640px] right-0
    md:top-[640px] md:right-0
    lg:top-[727px]
    lg:right-[-6%]
    xl:top-[302px] xl:right-[-6%]
    2xl:top-[385px] 2xl:right-[-3%]
    3xl:top-[385px] 3xl:right-[-3%]
    `
      : ` 
    absolute
    top-[640px] left-0
    md:top-[640px] md:left-0
    lg:top-[727px]
    lg:left-[-6%]
    xl:top-[302px] xl:left-[-6%]
    2xl:top-[385px] 2xl:left-[-3%]
    3xl:top-[385px] 3xl:left-[-3%]
    `
  }
  `;

  const iphoneSize = `
  object-contain
    w-[300px]
    xs:w-[360px]
    md:w-[550px]
    lg:w-[936px]
    lg:h-[457px]
    xl:w-[800px]
    xl:h-[419px]
    2xl:h-[435.165px]
    2xl:w-[832px]
    3xl:h-[519px]
    3xl:w-[1014px]
    ${isRTL ? "scale-x-[-1]" : ""}
  `;

  const graphPosition = isRTL
    ? `
          top-[216px]
        right-[35px]
        md:top-[216px] md:right-1/2 md:-translate-x-1/2
        lg:translate-x-0
        lg:top-[306.38px]
        lg:right-[127.11px]
        xl:top-[225.74px]
        xl:right-[568.47px]

        2xl:top-[314.55px]
        2xl:right-[591.21px]
        3xl:top-[324.55px]
        3xl:right-[729px]
      `
    : `
        top-[216px]
        left-[35px]
        md:top-[216px] md:left-1/2 md:-translate-x-1/2
        lg:translate-x-0
        lg:top-[306.38px]
        lg:left-[127.11px]

        xl:top-[225.74px]
        xl:left-[568.47px]

        2xl:top-[314.55px]
        2xl:left-[591.21px]
        3xl:top-[324.55px]
        3xl:left-[729px]
      `;

  const graphSize = `
  object-contain
    h-[140px]
    w-[235px]
    xs:h-[169.132px]
    xs:w-[283.783px]
    md:h-[220px]
    lg:w-[409.048px]
    lg:h-[243.788px]
    xl:w-[402px]
    xl:h-[240px]
    2xl:h-[249.607px]
    2xl:w-[418.811px]
    3xl:h-[266px]
    3xl:w-[447px]
  `;

  const duplicationPosition = isRTL
    ? `
         top-[327px]
        right-[60px]
        md:top-[327px] md:right-[120px]
        lg:top-[465.13px]
        lg:right-[180.44px]

        xl:top-[352.91px]
        xl:right-[710px]

        2xl:top-[474px]
        2xl:right-[830.19px]
        3xl:top-[474px]
        3xl:right-[1020px]
      `
    : `
        top-[327px]
        left-[60px]
        md:top-[327px] md:left-[120px]
        lg:top-[465.13px]
        lg:left-[180.44px]

        xl:top-[352.91px]
        xl:left-[710px]

        2xl:top-[474px]
        2xl:left-[830.19px]
        3xl:top-[474px]
        3xl:left-[1020px]
      `;

  const duplicationSize = `
  object-contain
    h-[155px]
    w-[390px]
    xs:h-[188px]
    xs:w-[474.642px]
    md:h-[200px]
    lg:w-[684.154px]
    lg:h-[270.985px]
    xl:h-[195px]
    xl:w-[494px]
    2xl:h-[203.739px]
    2xl:w-[514px]
    3xl:h-[217.625px]
    3xl:w-[549px]
  `;

  const mapPosition = isRTL
    ? `
        top-[505px]
        right-[100px]
        md:top-[505px] md:right-[300px]
        lg:top-[721px]
        lg:right-[226px]

        xl:top-[522.47px]
        xl:right-[600px]
        2xl:top-[623.36px]
        2xl:right-[676.47px]
        3xl:top-[653px]
        3xl:right-[815px]
      `
    : `
        top-[505px]
        left-[100px]
        md:top-[505px] md:left-[300px]
        lg:top-[721px]
        lg:left-[226px]

        xl:top-[522.47px]
        xl:left-[600px]
        2xl:top-[623.36px]
        2xl:left-[676.47px]
        3xl:top-[653px]
        3xl:left-[815px]
      `;

  const mapSize = `
    object-contain
    w-[230px]
    h-[126px]
    xs:w-[276px]
    xs:h-[152px]
    w-auto
    md:h-[210px]
    lg:w-[398px]
    lg:h-[219px]
    xl:h-[232px]
    2xl:h-[218px]
    2xl:w-[396.362px]
    3xl:h-[233px]
  `;

  return (
    <div ref={sectionRef}>
      {/* iPhone - centered vertically on left, slightly protruding */}
      <img src={iphoneSrc} alt="iPhone" className={`${iphonePosition} ${iphoneSize}`} />

      {/* Scatter: Graph - top right (LTR) / top left (RTL) */}
      <img
        className={`absolute z-30 transition-all duration-1000 ${graphPosition} ${graphSize} ${visibilityClass} `}
        style={{ transitionDelay: "600ms" }}
        src={data.images.graph}
        alt="Graph"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Scatter: Duplication - center-left (LTR) / center-right (RTL) */}
      <img
        src={data.images.duplication}
        alt="Duplication"
        style={{ transitionDelay: "700ms" }}
        className={`absolute z-40 transition-all duration-1000 ${duplicationPosition} ${duplicationSize} ${visibilityClass} `}
      />

      {/* Scatter: Map - right side (LTR) / left side (RTL) */}
      <img
        src={data.images.map}
        alt="Map"
        style={{ transitionDelay: "800ms" }}
        className={`absolute z-50 transition-all duration-1000 ${mapPosition} ${mapSize} ${visibilityClass} `}
      />
    </div>
  );
};
export default InteractiveImage;
