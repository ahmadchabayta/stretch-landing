import { useState } from "react";
import PropTypes from "prop-types";
import data from "./implementation_options.data.json";
import Section from "../Section/Section";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
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
        <Grid
          activeTab={activeTab}
          labels={labels}
          language={language}
          setActiveTab={setActiveTab}
        />
      </div>
    </Section>
  );
};

ImplementationOptions.propTypes = {
  id: PropTypes.string,
};

export default ImplementationOptions;
