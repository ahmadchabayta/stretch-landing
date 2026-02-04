import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import data from "./whatIsStretch.data.json";
import { withBase } from "../../utils/withBase";

const ALT_TEXT = {
  en: "Cross-channel marketing attribution dashboard showing audience duplication by platform, total impressions vs clicks, and offline footfall attribution map, highlighting no-SDK audience matching and real-world performance measurement across Meta, TikTok, Snapchat, and DSPs.",
  ar: "لوحة تحكم لإسناد التسويق عبر القنوات تُظهر تداخل الجماهير حسب المنصّة، إجمالي مرات الظهور مقابل النقرات، وخريطة إسناد الزيارات الفعلية للمتاجر، مع إبراز مطابقة الجماهير بدون SDK وقياس الأداء في العالم الحقيقي عبر Meta وTikTok وSnapchat ومنصّات الـDSP.",
};

const InteractiveImage = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [iphoneSrc, setIphoneSrc] = useState(data.images.iphone.small);
  const { isRTL, language } = useLanguage();

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
    bottom-[-3%]
    xs:bottom-[-3%]
    md:bottom-[-25%]
    lg:bottom-auto
    lg:-translate-y-1/2
    lg:top-[55%]
    lg:-translate-y-1/2
    
  `;

  const iphoneSide = isRTL
    ? `left-[-20%] md:left-[35%] md:translate-x-[-50%] lg:translate-x-0 lg:left-[-10%] xl:left-[clamp(-8%,-3vw,-3%)]`
    : `left-[50%] translate-x-[-50%] md:left-[35%] md:translate-x-[-50%] lg:translate-x-0 lg:left-[-10%] xl:left-[clamp(-8%,-3vw,-3%)] 3xl:left-[-10%]`;

  const iphonePosition = `${iphoneTop} ${iphoneSide}`;

  const iphoneSize = `
    min-w-[360px]
    xs:min-w-[360px]
    xs:max-w-[400px]
    md:w-[724px]
    md:max-w-[750px]
    lg:w-[606px]
    lg:max-w-[650px]
    xl:w-[794px]
    xl:max-w-none
    2xl:w-[800px]
    2xl:max-w-none
    3xl:w-[1100px]
  `;

  const graphTop = `
        top-[-4%]
        xs:top-[-2%]
        md:top-[-1%] 
        lg:top-[23%]
        xl:top-[9%]
        2xl:top-[13%]
        3xl:top-[15%]
      `;

  const graphSide = isRTL
    ? `left-[35px] md:left-1/2 md:-translate-x-1/2 lg:translate-x-0 lg:left-[30%] xl:left-[clamp(40%,38vw,38%)]`
    : `left-[35px] md:left-1/2 md:-translate-x-1/2 lg:translate-x-0 lg:left-[30%] xl:left-[clamp(40%,38vw,38%)] 2xl:left-[35%]`;

  const graphPosition = `${graphTop} ${graphSide}`;

  const graphSize = `
    w-[283px]
    xs:w-[283px]
    md:w-[400px]
    lg:w-[418px]
    xl:w-[clamp(402px,23.3vw,447px)]
    2xl:w-[500px]
    3xl:w-[600px]
  `;

  const duplicationTop = `
        top-[17.5%]
        xs:top-[18.5%]
        md:top-[22%]
        lg:top-[39%]
        xl:top-[50%]
        xl:-translate-y-1/2
        2xl:top-[50%]
      `;

  const duplicationSide = isRTL
    ? `left-[50%] translate-x-[-50%] lg:translate-x-0 lg:left-[45%] xl:left-[clamp(53%,62vw,52%)]`
    : `left-[50%] translate-x-[-50%] lg:translate-x-0 lg:left-[45%] xl:left-[58%] 2xl:left-[clamp(53%,62vw,52%)]`;
  5;
  const duplicationPosition = `${duplicationTop} ${duplicationSide}`;

  const duplicationSize = `
    min-w-[370px]
    xs:w-[370px]
    md:w-[575px]
    lg:w-[514.378px]
    xl:w-[550px]
    2xl:w-[600px]
    3xl:w-[700px]
  `;

  const mapTop = `
        top-[40%]
        xs:top-[38%]
        md:top-[48%]
        lg:top-[58%]
        xl:top-[63%]
        2xl:top-[63%]
      `;

  const mapSide = isRTL
    ? `left-[90px] md:left-[40%] lg:left-[33%] xl:left-[clamp(550px,42.4vw,815px)]`
    : `left-[25%] xs:left-[39%] md:left-[40%] lg:left-[33%] xl:left-[clamp(550px,40.4vw,815px)] 2xl:left-[40%]`;

  const mapPosition = `${mapTop} ${mapSide}`;

  const mapSize = `
    w-[276px]
    xs:w-[276px]
    md:w-[376px]
    lg:w-[398px]
    xl:w-[clamp(396px,22vw,423.04px)]
    2xl:w-[450px]
    3xl:w-[500px]
  `;

  const altText = ALT_TEXT[language];

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
        alt={altText}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Scatter: Duplication - center-left (LTR) / center-right (RTL) */}
      <img
        src={withBase(data.images.duplication)}
        alt={altText}
        style={{ transitionDelay: "700ms" }}
        className={`absolute z-40 transition-all duration-1000 ${duplicationPosition} ${duplicationSize} ${visibilityClass} `}
      />

      {/* Scatter: Map - right side (LTR) / left side (RTL) */}
      <img
        src={withBase(data.images.map)}
        alt={altText}
        style={{ transitionDelay: "800ms" }}
        className={`absolute z-50 transition-all duration-1000 ${mapPosition} ${mapSize} ${visibilityClass} `}
      />
    </div>
  );
};
export default InteractiveImage;
