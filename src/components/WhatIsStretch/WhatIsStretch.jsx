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
    <Section id={id} className={cn("relative overflow-hidden", className)}>
      <Container>
        <SectionTitle data={sectionLabels} />
      </Container>
      <div className="relative w-full min-h-[80vh]">
        <InteractiveImage data={sectionLabels} />
      </div>
      <Container className="relative bg-red-500">
        <List className="absolute bottom-[123px] text-[14px] font-bold lg:text-[20px] text-end right-0 ">
          {sectionLabels.tagline.map((line) => (
            <List.Item key={line}>{line}</List.Item>
          ))}
        </List>
      </Container>
      {/* <SectionButton>{data.button_label}</SectionButton> */}
    </Section>
  );
};

WhatIsStretch.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default WhatIsStretch;
