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
    <Section id={id}>
      <Container>
        <SectionTitle labels={labels} dir={dir} />
        <Flex className="" flex="true" direction="flex-col" spaceY="space-y-12">
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
