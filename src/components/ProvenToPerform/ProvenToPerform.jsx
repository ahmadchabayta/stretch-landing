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
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      container={true}
      padding="none"
      className="flex flex-col items-start"
    >
      <SectionTitle labels={labels} />

      <Flex
        flex={true}
        direction="flex-col xl:flex-row"
        align="items-center xl:items-center"
        justify="justify-center"
        spaceX="xl:space-x-24"
        spaceY="md:space-y-10 xl:space-y-0"
        className="mx-auto w-full lg:max-w-[1745px] xl:gap-0 h-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
      >
        <ImageCard image={labels.images.img_1} isArabic={isArabic} />

        <ImageCard
          image={labels.images.img_2}
          isArabic={isArabic}
          isSecondCard
          className="translate-y-[20%]"
        />
      </Flex>
    </Section>
  );
};

ProvenToPerform.propTypes = {
  // no external props currently
};

export default ProvenToPerform;
