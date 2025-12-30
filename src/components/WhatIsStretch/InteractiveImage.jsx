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
        top-[0%]
        left-1/2
        -translate-x-1/2
        md:top-[2%]
        lg:top-[3%]
        xl:top-[5%]
        xl:left-[6%]
        xl:translate-x-0
        2xl:top-[5%]
        2xl:left-[8%]
        3xl:top-[5%]
        3xl:left-[10%]
      `
    : `
        top-[0%]
        left-1/2
        -translate-x-1/2
        md:top-[2%]
        lg:top-[3%]
        xl:top-[5%]
        xl:left-auto
        xl:right-[12%]
        xl:translate-x-0
        2xl:top-[5%]
        2xl:right-[14%]
        3xl:top-[5%]
        3xl:right-[10%]
      `;

  const graphSize = `
    h-[180px]
    w-auto
    md:h-[220px]
    lg:h-[280px]
    xl:h-[340px]
    2xl:h-[360px]
    3xl:h-[500px]
  `;

  const duplicationPosition = isRTL
    ? `
        top-[20%]
        left-1/2
        -translate-x-1/2
        md:top-[22%]
        lg:top-[23%]
        xl:top-[25%]
        xl:left-auto
        xl:right-[5%]
        xl:translate-x-0
        2xl:top-[25%]
        2xl:right-[6%]
        3xl:top-[25%]
        3xl:right-[7%]
      `
    : `
        top-[20%]
        left-1/2
        -translate-x-1/2
        md:top-[22%]
        lg:top-[23%]
        xl:top-[25%]
        xl:left-[2%]
        xl:translate-x-0
        2xl:top-[25%]
        2xl:left-[3%]
        3xl:top-[25%]
        3xl:left-[7%]
      `;

  const duplicationSize = `
    h-[160px]
    w-auto
    md:h-[200px]
    lg:h-[250px]
    xl:h-[300px]
    2xl:h-[320px]
    3xl:h-[440px]
  `;

  const mapPosition = isRTL
    ? `
        top-[40%]
        left-1/2
        -translate-x-1/2
        md:top-[42%]
        lg:top-[43%]
        xl:top-[45%]
        xl:left-[4%]
        xl:translate-x-0
        2xl:top-[45%]
        2xl:left-[5%]
        3xl:top-[45%]
        3xl:left-[7%]
      `
    : `
        top-[40%]
        left-1/2
        -translate-x-1/2
        md:top-[42%]
        lg:top-[43%]
        xl:top-[45%]
        xl:left-auto
        xl:right-[8%]
        xl:translate-x-0
        2xl:top-[45%]
        2xl:right-[10%]
        3xl:top-[45%]
        3xl:right-[7%]
      `;

  const mapSize = `
    h-[170px]
    w-auto
    md:h-[210px]
    lg:h-[270px]
    xl:h-[320px]
    2xl:h-[350px]
    3xl:h-[480px]
  `;

  return (
    <div
      ref={sectionRef}
      className="relative mt-8 min-h-[600px] md:mt-12 md:min-h-[700px] lg:min-h-[800px]"
    >
      {/* iPhone positioned below the other images on y-axis */}
      <div
        className="absolute top-[65%] left-1/2 w-full -translate-x-1/2 
        md:top-[67%] 
        lg:top-[68%] 
        xl:top-[70%] xl:left-[3%] xl:translate-x-0 
        2xl:top-[70%] 2xl:left-[3%] 
        3xl:top-[70%]"
      >
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
