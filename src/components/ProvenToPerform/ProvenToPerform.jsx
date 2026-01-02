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
    <Section container className="flex flex-col items-center justify-between relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${data.grid})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <SectionTitle labels={labels} />

      <div className="flex-1 flex items-center w-full relative z-10 mt-[20%]">
        <Flex
          flex={true}
          direction="flex-col xl:flex-row"
          align="xl:items-end"
          justify="justify-center"
          spaceY="space-y-[90px] lg:space-y-[96px] xl:space-y-0"
          className="mx-auto overflow-visible w-[370px] md:w-[500px] lg:w-[850px] xl:w-[1360px] 2xl:w-[1404px] 3xl:w-[1745px]"
        >
          <ImageCard image={labels.images.img_1} isArabic={isArabic} />
          <ImageCard image={labels.images.img_2} isArabic={isArabic} isSecondCard />
        </Flex>
      </div>
    </Section>
  );
};

ProvenToPerform.propTypes = {
  // no external props currently
};

export default ProvenToPerform;
