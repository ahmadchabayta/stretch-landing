import { useState } from "react";
import PropTypes from "prop-types";
import data from "./offline_attribution.data.json";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import { Section, Typography } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import cn from "../../utils/cn";

const SectionTitle = ({ labels, dir }) => (
  <div className="section_head_container app_container">
    <Typography as="h2" variant="section-title" dir={dir}>
      {labels.title}
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="xl:[direction:rtl]" dir={dir}>
      {labels.subtitles.subtitle}{" "}
      <Typography.Text accent>{labels.subtitles.subtitle_highlight}</Typography.Text>
    </Typography>
  </div>
);

SectionTitle.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitles: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      subtitle_highlight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dir: PropTypes.string.isRequired,
};

// 2. Your Main Component
const SectionData = ({ labels, dir, language }) => {
  // Remove commas and parse as number for animation
  const parsedNumber = Number(String(labels.number).replace(/,/g, ""));
  const counterRef = useAnimatedCounter(parsedNumber, {
    duration: 2,
    dependencies: [parsedNumber],
  });
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        "app_container z-50",
        "2xl:absolute 2xl:top-[151px]",
        language === "en" ? "2xl:right-[111px]" : "2xl:left-[111px]",
        "3xl:w-[920px]! 2xl:w-[620px]!",
      )}
      style={{
        flexDirection: language === "en" ? "row" : "row-reverse",
      }}
    >
      <Typography
        as="h3"
        ref={counterRef}
        className="text-[77px] font-light 2xl:mr-0 2xl:text-[160px]"
        dir={dir}
      />
      <Typography as="p" className="text-black [direction:ltr] xl:[direction:rtl]" dir={dir}>
        {labels.description.desc}
        <br />
        <Typography.Text className="font-bold">{labels.description.highlight}</Typography.Text>
      </Typography>
    </div>
  );
};

SectionData.propTypes = {
  labels: PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.shape({
      desc: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dir: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

const OfflineAttribution = ({ id }) => {
  const { language, currentLanguage } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;

  const dir = currentLanguage?.dir || "rtl";
  const [isRevealed, setIsRevealed] = useState(false);

  const hidden_on_small_styles = `
    hidden
    lg:flex
    absolute
    w-full
    min-w-[738px]
    lg:min-w-[1583px]
    ${
      language === "en"
        ? `left-[-38%]
           md:left-0
           lg:left-[-49%]
           xl:left-[-50%]
           2xl:left-[-40%]
           3xl:left-[-45%]`
        : `right-[-38%]
           md:right-0
           lg:right-[-92%]
           xl:right-[-50%]
           2xl:right-[-40%]
           3xl:right-[-45%]
           scale-x-[-1]
           `
    }
  `;
  const hidden_on_large_styles = `
    flex
    lg:hidden
    absolute
    w-full
    min-w-[738px]
    md:w-[1582px]
    ${
      language === "en"
        ? `left-[-150px]
           md:translate-x-[-50%]
           md:left-[50%]
           lg:left-[-42%]
           xl:left-[-70%]
           2xl:left-[-80%]
           3xl:left-[-50%]`
        : `left-[0]
           md:translate-x-[-50%]
           md:right-[50%]
           lg:right-[-92%]
           xl:right-[-70%]
           2xl:right-[-80%]
           3xl:right-[-50%]`
    }
  `;

  return (
    <Section id={id} container={false} padding="none" className="relative overflow-hidden">
      <SectionTitle labels={labels} dir={dir} />
      <SectionData labels={labels} dir={dir} language={language} />
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsRevealed((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsRevealed((prev) => !prev);
          }
        }}
        className="relative min-h-[515px] w-[738px] cursor-pointer lg:h-[815px]"
      >
        {isRevealed ? (
          <>
            <img
              className={hidden_on_small_styles}
              src={data.images.large.orange}
              alt="orange map"
            />
            <img
              className={hidden_on_large_styles}
              src={data.images.small.orange}
              alt="orange map mobile"
            />
          </>
        ) : (
          <>
            <img
              className={hidden_on_small_styles}
              src={data.images.large.purple}
              alt="purple map"
            />
            <img
              className={hidden_on_large_styles}
              src={data.images.small.purple}
              alt="purple map mobile"
            />
          </>
        )}
      </div>
    </Section>
  );
};

OfflineAttribution.propTypes = {
  id: PropTypes.string,
};

export default OfflineAttribution;
