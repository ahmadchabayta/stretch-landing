import PropTypes from "prop-types";
import { Container, Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import rawData from "./audience_mirroring.data.json";
import InteractiveImage from "./InteractiveImage";
import MappedDescription from "./MappedDescription";
import SectionTitle from "./SectionTitle";

const AudienceMirroring = ({ id }) => {
  const { language } = useLanguage();
  const labels = rawData.languages?.[language] || rawData.languages?.en;

  return (
    <Section id={id} className="bg-white! min-h-0! pb-6">
      <Container className="flex flex-col space-y-8">
        <SectionTitle labels={labels} />
        <Flex className="" flex="true" direction="flex-col" align="items-center">
          <InteractiveImage data={labels} />
          <MappedDescription labels={labels} />
        </Flex>
      </Container>
    </Section>
  );
};

AudienceMirroring.propTypes = {
  id: PropTypes.string,
};

export default AudienceMirroring;
