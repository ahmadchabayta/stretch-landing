import data from "./proven_to_perform.data.json";
import { Flex, Section } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
import ImageCard from "./ImageCard";

const ProvenToPerform = () => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const isArabic = language === "ar";

  return (
    <Section
      style={{
        backgroundImage: `url(${data.grid})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "fill",
        backgroundPosition: "center",
      }}
      container={true}
      padding="none"
    >
      <SectionTitle labels={labels} />

      <Flex
        flex={true}
        direction="flex-col xl:flex-row"
        align="items-center xl:items-center"
        justify="justify-center"
        className="mx-auto min-h-screen w-full flex-1 gap-24 lg:max-w-[1745px] xl:gap-0"
      >
        <ImageCard image={labels.images.img_1} isArabic={isArabic} />

        <ImageCard
          image={labels.images.img_2}
          isArabic={isArabic}
          isSecondCard
          className="xl:translate-y-[20%]"
        />
      </Flex>
    </Section>
  );
};

ProvenToPerform.propTypes = {
  // no external props currently
};

export default ProvenToPerform;
