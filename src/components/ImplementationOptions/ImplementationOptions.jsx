import { useState } from "react";
import PropTypes from "prop-types";
import data from "./implementation_options.data.json";
import Section from "../Section/Section";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import ButtonGroup from "./ButtonGroup";
import Grid from "./Grid";

const ImplementationOptions = ({ id }) => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const [activeTab, setActiveTab] = useState("impressions");

  return (
    <Section
      id={id}
      container={true}
      padding="none"
      className="relative mb-20 min-h-0! overflow-x-hidden"
    >
      <SectionTitle labels={labels} language={language} />
      <div className="w-full overflow-x-auto text-sm">
        {/* Tab Switcher for mobile */}
        <ButtonGroup
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={labels}
          language={language}
        />

        <Grid activeTab={activeTab} labels={labels} language={language} />
      </div>
    </Section>
  );
};

ImplementationOptions.propTypes = {
  id: PropTypes.string,
};

export default ImplementationOptions;
