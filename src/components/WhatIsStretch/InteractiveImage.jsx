import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import data from "./whatIsStretch.data.json";
import { withBase } from "../../utils/withBase";

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

  const iphoneTop = `
    absolute
    bottom-[0]
    lg:bottom-auto
    lg:-translate-y-1/2
    lg:top-[55%]
    lg:-translate-y-1/2
    
  `;

  const iphoneSide = isRTL
    ? `left-[-10%] md:left-[35%] md:translate-x-[-50%] lg:translate-x-0 lg:left-[-10%] xl:left-[clamp(-8%,-3vw,-3%)]`
    : `left-[-10%] md:left-[35%] md:translate-x-[-50%] lg:translate-x-0 lg:left-[-10%] xl:left-[clamp(-8%,-3vw,-3%)]`;

  const iphonePosition = `${iphoneTop} ${iphoneSide}`;

  const iphoneSize = `
  object-contain  
    min-w-[450px]
    xs:min-w-[450px]
    md:w-[624px]
    lg:w-[606px]
    xl:w-[clamp(794px,52.8vw,1014px)]
  `;

  const graphTop = `
        top-[14.5%]
        md:top-[3%] 
        lg:top-[23%]
        xl:top-[clamp(5%,calc(5%+10vw-12.8px),30%)]
      `;

  const graphSide = isRTL
    ? `left-[35px] md:left-1/2 md:-translate-x-1/2 lg:translate-x-0 lg:left-[30%] xl:left-[clamp(40%,38vw,38%)]`
    : `left-[35px] md:left-1/2 md:-translate-x-1/2 lg:translate-x-0 lg:left-[30%] xl:left-[clamp(40%,38vw,38%)]`;

  const graphPosition = `${graphTop} ${graphSide}`;

  const graphSize = `
    object-contain
    w-[283px]
    xs:w-[283px]
    md:w-[400px]
    lg:w-[418px]
    xl:w-[clamp(402px,23.3vw,447px)]
  `;

  const duplicationTop = `
        top-[32.5%]
        md:top-[22%]
        lg:top-[39%]
        xl:top-[55%]
        xl:-translate-y-1/2
      `;

  const duplicationSide = isRTL
    ? `left-[12%] md:left-[27%] lg:left-[45%] xl:left-[clamp(53%,62vw,52%)]`
    : `left-[12%] md:left-[27%] lg:left-[45%] xl:left-[clamp(53%,62vw,52%)]`;
  5;
  const duplicationPosition = `${duplicationTop} ${duplicationSide}`;

  const duplicationSize = `
  object-contain
    min-w-[475px]
    xs:w-[475px]
    md:w-[575px]
    lg:w-[514.378px]
    xl:w-[clamp(304px,28.6vw,549px)]
  `;

  const mapTop = `
        top-[52%]
        md:top-[44%]
        lg:top-[58%]
        xl:top-[clamp(54%,42.4vw,64%)]
      `;

  const mapSide = isRTL
    ? `left-[90px] md:left-[40%] lg:left-[33%] xl:left-[clamp(600px,42.4vw,815px)]`
    : `left-[90px] md:left-[40%] lg:left-[33%] xl:left-[clamp(600px,42.4vw,815px)]`;

  const mapPosition = `${mapTop} ${mapSide}`;

  const mapSize = `
    object-contain
    w-[276px]
    xs:w-[276px]
    md:w-[376px]
    lg:w-[398px]
    xl:w-[clamp(396px,22vw,423.04px)]
  `;

  return (
    <div ref={sectionRef}>
      {/* iPhone - centered vertically on left, slightly protruding */}
      <img
        src={withBase(iphoneSrc)}
        alt="iPhone"
        className={`z-29 ${iphonePosition} ${iphoneSize}`}
      />

      {/* Scatter: Graph - top right (LTR) / top left (RTL) */}
      <img
        className={`absolute z-30 transition-all duration-1000 ${graphPosition} ${graphSize} ${visibilityClass} `}
        style={{ transitionDelay: "600ms" }}
        src={withBase(data.images.graph)}
        alt="Graph"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Scatter: Duplication - center-left (LTR) / center-right (RTL) */}
      <img
        src={withBase(data.images.duplication)}
        alt="Duplication"
        style={{ transitionDelay: "700ms" }}
        className={`absolute z-40 transition-all duration-1000 ${duplicationPosition} ${duplicationSize} ${visibilityClass} `}
      />

      {/* Scatter: Map - right side (LTR) / left side (RTL) */}
      <img
        src={withBase(data.images.map)}
        alt="Map"
        style={{ transitionDelay: "800ms" }}
        className={`absolute z-50 transition-all duration-1000 ${mapPosition} ${mapSize} ${visibilityClass} `}
      />
    </div>
  );
};
export default InteractiveImage;
