import PropTypes from "prop-types";
import { Container, Flex, Section, Wrapper } from "../../components";
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
    <Container>
      <Section id={id} padding="none" className="relative flex flex-col">
        <SectionTitle labels={labels} dir={dir} />
        <Flex flex="true" direction="flex-col">
          <Wrapper className="my-6">
            <InteractiveImage data={labels} />
          </Wrapper>
          <MappedDescription labels={labels} dir={dir} />
        </Flex>
      </Section>
    </Container>
  );
};

AudienceMirroring.propTypes = {
  id: PropTypes.string,
};

export default AudienceMirroring;
