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

  const iphoneTop = `
    absolute
    top-[clamp(590px,88vh,727px)]
    xl:top-[40vh]
    2xl:top-[42vh]
    3xl:top-[40vh]
  `;

  const iphoneSide = isRTL
    ? `right-[clamp(-25px,-3vw,0px)] lg:right-[-6%] xl:right-[clamp(-6%,-5vw,-3%)]`
    : `left-[clamp(-25px,-3vw,0px)] lg:left-[-6%] xl:left-[clamp(-6%,-5vw,-3%)]`;

  const iphonePosition = `${iphoneTop} ${iphoneSide}`;

  const iphoneSize = `
  object-contain
    w-[clamp(300px,90vw,936px)]
    xl:w-[clamp(800px,62.5vw,1014px)]
    h-auto
    ${isRTL ? "scale-x-[-1]" : "scale-x-[1]"}
  `;

  const graphTop = `
        top-[clamp(216px,44vh,306px)]
        md:-translate-x-1/2
        lg:translate-x-0
        xl:top-[35vh]
        2xl:top-[34vh]
        3xl:top-[34vh]
      `;

  const graphSide = isRTL
    ? `right-[clamp(35px,10vw,127px)] md:right-1/2 lg:translate-x-0 xl:right-[clamp(568px,44vw,729px)]`
    : `left-[clamp(35px,10vw,127px)] md:left-1/2 lg:translate-x-0 xl:left-[clamp(568px,44vw,729px)]`;

  const graphPosition = `${graphTop} ${graphSide}`;

  const graphSize = `
  object-contain
    w-[clamp(235px,70vw,409px)]
    xl:w-[clamp(402px,31vw,447px)]
    h-auto
  `;

  const duplicationTop = `
        top-[clamp(327px,54vh,465px)]
        xl:top-[47vh]
        2xl:top-[52vh]
        3xl:top-[49vh]
      `;

  const duplicationSide = isRTL
    ? `right-[clamp(60px,16vw,180px)] xl:right-[clamp(710px,55vw,1020px)]`
    : `left-[clamp(60px,16vw,180px)] xl:left-[clamp(710px,55vw,1020px)]`;

  const duplicationPosition = `${duplicationTop} ${duplicationSide}`;

  const duplicationSize = `
  object-contain
    w-[clamp(390px,115vw,684px)]
    xl:w-[clamp(494px,38.5vw,549px)]
    h-auto
  `;

  const mapTop = `
        top-[clamp(505px,75vh,721px)]
        xl:top-[69vh]
        2xl:top-[68vh]
        3xl:top-[68vh]
      `;

  const mapSide = isRTL
    ? `right-[clamp(150px,40vw,300px)] lg:right-[226px] xl:right-[clamp(600px,46vw,815px)]`
    : `left-[clamp(150px,40vw,300px)] lg:left-[226px] xl:left-[clamp(600px,46vw,815px)]`;

  const mapPosition = `${mapTop} ${mapSide}`;

  const mapSize = `
    object-contain
    w-[clamp(230px,70vw,398px)]
    xl:w-[clamp(396px,31vw,396px)]
    h-auto
  `;

  return (
    <div ref={sectionRef}>
      {/* iPhone - centered vertically on left, slightly protruding */}
      <img src={iphoneSrc} alt="iPhone" className={`z-28 ${iphonePosition} ${iphoneSize}`} />

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
