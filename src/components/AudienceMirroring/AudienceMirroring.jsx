import PropTypes from "prop-types";
import { Container, Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import rawData from "./audience_mirroring.data.json";
import InteractiveImage from "./InteractiveImage";
import MappedDescription from "./MappedDescription";
import SectionTitle from "./SectionTitle";

const AudienceMirroring = ({ id }) => {
  const { language, currentLanguage } = useLanguage();
  const labels = rawData.languages?.[language] || rawData.languages?.en;
  const dir = currentLanguage?.dir || "ltr";

  return (
    <Section id={id} className="bg-white!">
      <Container className="flex flex-col h-full space-y-[10%]">
        <SectionTitle labels={labels} dir={dir} />
        <Flex className="" flex="true" direction="flex-col">
          <InteractiveImage data={labels} />
          <MappedDescription labels={labels} dir={dir} />
        </Flex>
      </Container>
    </Section>
  );
};

AudienceMirroring.propTypes = {
  id: PropTypes.string,
};

export default AudienceMirroring;
