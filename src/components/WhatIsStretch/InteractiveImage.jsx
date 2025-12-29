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

  const visibilityClass = isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0";

  const iphoneClass = `
    h-[229px]
    w-auto
    md:h-[333px]
    lg:h-[450px]
    xl:h-[480px]
    2xl:h-[540px]
    3xl:h-[600px]
    ${isRTL ? "scale-x-[-1]" : ""}
  `;

  const graphPosition = isRTL
    ? `
        top-[12%]
        left-[8%]
        md:top-[12%]
        md:left-[8%]
        lg:top-[10%]
        lg:left-[10%]
        xl:top-[8%]
        xl:left-[12%]
        2xl:top-[5%]
        2xl:left-[14%]
        3xl:top-[4%]
        3xl:left-[16%]
      `
    : `
        top-[12%]
        right-[8%]
        md:top-[12%]
        md:right-[8%]
        lg:top-[10%]
        lg:right-[10%]
        xl:top-[8%]
        xl:right-[12%]
        2xl:top-[5%]
        2xl:right-[14%]
        3xl:top-[4%]
        3xl:right-[16%]
      `;

  const graphSize = `
    h-[130px]
    w-auto
    3xl:h-[340px]
    md:h-[140px]
    lg:h-[170px]
    xl:h-[210px]
    2xl:h-[280px]
  `;

  const duplicationPosition = isRTL
    ? `
        top-[28%]
        right-[3%]
        md:top-[26%]
        md:right-[5%]
        lg:top-[24%]
        lg:right-[8%]
        xl:top-[22%]
        xl:right-[10%]
        2xl:top-[20%]
        2xl:right-[11%]
        3xl:top-[18%]
        3xl:right-[12%]
      `
    : `
        top-[28%]
        left-[3%]
        md:top-[26%]
        md:left-[5%]
        lg:top-[24%]
        lg:left-[8%]
        xl:top-[22%]
        xl:left-[10%]
        2xl:top-[20%]
        2xl:left-[11%]
        3xl:top-[18%]
        3xl:left-[12%]
      `;

  const duplicationSize = `
    h-[115px]
    w-auto
    3xl:h-[300px]
    md:h-[125px]
    lg:h-[155px]
    xl:h-[185px]
    2xl:h-[240px]
  `;

  const mapPosition = isRTL
    ? `
        top-[48%]
        left-[4%]
        md:top-[46%]
        md:left-[6%]
        lg:top-[44%]
        lg:left-[8%]
        xl:top-[42%]
        xl:left-[10%]
        2xl:top-[40%]
        2xl:left-[11%]
        3xl:top-[38%]
        3xl:left-[13%]
      `
    : `
        top-[48%]
        right-[4%]
        md:top-[46%]
        md:right-[6%]
        lg:top-[44%]
        lg:right-[8%]
        xl:top-[42%]
        xl:right-[10%]
        2xl:top-[40%]
        2xl:right-[11%]
        3xl:top-[38%]
        3xl:right-[13%]
      `;

  const mapSize = `
    h-[120px]
    w-auto
    3xl:h-80
    md:h-[130px]
    lg:h-[165px]
    xl:h-[200px]
    2xl:h-[260px]
  `;

  return (
    <div
      ref={sectionRef}
      className="relative mt-8 min-h-[600px] md:mt-12 md:min-h-[700px] lg:min-h-[800px]"
    >
      {/* iPhone as the main central anchor, always lower */}
      {/* Only render one iPhone image depending on screen size */}
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 md:bottom-[10%] md:left-[7%] md:translate-x-0 lg:bottom-0 lg:left-[8%]">
        <img src={iphoneSrc} alt="iPhone" className={iphoneClass} />
      </div>

      {/* Scatter: Graph - top right (LTR) / top left (RTL) */}
      <img
        className={`absolute z-40 transition-all duration-1000 ${graphPosition} ${graphSize} ${visibilityClass} `}
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
        className={`absolute z-30 transition-all duration-1000 ${duplicationPosition} ${duplicationSize} ${visibilityClass} `}
      />

      {/* Scatter: Map - right side (LTR) / left side (RTL) */}
      <img
        src={data.images.map}
        alt="Map"
        style={{ transitionDelay: "800ms" }}
        className={`absolute z-20 transition-all duration-1000 ${mapPosition} ${mapSize} ${visibilityClass} `}
      />
    </div>
  );
};
export default InteractiveImage;
