import PropTypes from "prop-types";
import InteractiveImage from "./InteractiveImage";
import data from "./whatIsStretch.data.json";
import { Container, List, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import cn from "../../utils/cn";
import SectionTitle from "./SectionTitle";

const WhatIsStretch = ({ className, id }) => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;
  return (
    <Section id={id} container={false} className={cn("relative overflow-hidden", className)}>
      <Container>
        <SectionTitle data={sectionLabels} />
      </Container>
      <div className="relative w-full min-h-screen">
        <InteractiveImage data={sectionLabels} />
      </div>
      <List
        className={`absolute 
        bottom-0
        text-[14px] font-bold [direction:rtl] 
        lg:text-[20px] 
        xl:right-[115px] xl:bottom-6 xl:text-right 
        2xl:right-[111px] 
        3xl:text-[24px] 3xl:right-[156px]
        ${language === "ar" ? "left-[26px] text-left" : "right-[26px] text-right"}

        `}
      >
        {sectionLabels.tagline.map((line) => (
          <List.Item
            className="[direction:ltr]:font-poppins [direction:rtl]:font-tajawal"
            key={line}
          >
            {line}
          </List.Item>
        ))}
      </List>
      {/* <SectionButton>{data.button_label}</SectionButton> */}
    </Section>
  );
};

WhatIsStretch.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default WhatIsStretch;
