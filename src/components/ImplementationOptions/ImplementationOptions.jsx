import { useState } from "react";
import PropTypes from "prop-types";
import data from "./implementation_options.data.json";
import Section from "../UI/Section/Section";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import Grid from "./Grid";
import { Container } from "../UI";

const ImplementationOptions = ({ id }) => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const [activeTab, setActiveTab] = useState("impressions");

  return (
    <Section
      id={id}
      padding="none"
      className="relative overflow-x-hidden flex flex-col justify-center "
    >
      <SectionTitle labels={labels} language={language} />
      <Container className="w-full overflow-x-auto 6 pt-12">
        <Grid
          activeTab={activeTab}
          labels={labels}
          language={language}
          setActiveTab={setActiveTab}
        />
      </Container>
    </Section>
  );
};

ImplementationOptions.propTypes = {
  id: PropTypes.string,
};

export default ImplementationOptions;
