import PropTypes from "prop-types";
import data from "./hero.data.json";
import HeroFeatures from "./HeroFeatures";
import { Button, Container, Flex, Section, Typography } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import HeroTitle from "./HeroTitle";

const Hero = ({ id }) => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  return (
    <Section
      id={id}
      padding="none"
      container={false}
      style={{
        backgroundImage: `url(${data.images.hero_img})`,
        backgroundRepeat: "no-repeat",
      }}
      className="md:bg-md:bg-position-[center_top_50px] bg-cover bg-center lg:bg-position-[right_top_43px] xl:bg-position-[right_top_-75px] 2xl:bg-position-[right_top_-0px] 3xl:bg-contain 3xl:bg-positiion-[right_top_0px] flex flex-col justify-center"
    >
      <Container>
        <Flex
          flex="flex"
          direction="flex-col"
          align="items-center text-center"
          justify="justify-center"
          className={`h-full  ${language === "ar" ? "xl:items-start xl:text-right" : "xl:items-start xl:text-left"}`}
        >
          <HeroTitle sectionLabels={sectionLabels} />
          <Button
            as="button"
            className="mx-auto lg:mx-0 hidden xl:block"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <Typography as="span" variant="button-text">
              {sectionLabels.button_label}
            </Typography>
          </Button>
        </Flex>
        <Flex
          flex="flex"
          direction="flex-col"
          align="items-center"
          justify="justify-between!"
          spaceY="space-y-[60px] md:space-y-[80px] lg:space-y-0"
          className={`mx-auto w-fit lg:mt-[-45px] xl:absolute xl:mx-0 xl:my-0  ${
            language === "en"
              ? "3xl:right-[405px] 3xl:top-[310px] xl:right-[15%] xl:top-[200px] 2xl:top-[306px]"
              : "xl:left-[15%] xl:top-[230px] 2xl:top-[306px] 3xl:left-[405px] 3xl:top-[310px]"
          }`}
        >
          <Button
            as="button"
            className="mx-auto lg:mx-0 xl:hidden lg:mb-[195px] xl:mb-0"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <Typography as="span" variant="button-text">
              {sectionLabels.button_label}
            </Typography>
          </Button>
          <img
            className="w-[135px] md:w-[180px] lg:w-[220px] xl:w-[245px] 2xl:w-[245px] 3xl:w-[278px]"
            src={data.images.stretch_s}
            alt="Stretch S"
            width={384}
            height={384}
            loading="eager"
            style={{ objectFit: "contain" }}
          />
        </Flex>
        <Container className="3xl:bottom-0 absolute bottom-0 left-[50%] w-full translate-x-[-50%] xl:-bottom-2.5 2xl:bottom-2.5">
          <HeroFeatures data={sectionLabels.hero_features} />
        </Container>
      </Container>
    </Section>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
