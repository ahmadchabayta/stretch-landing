import PropTypes from "prop-types";
import data from "./hero.data.json";
import HeroFeatures from "./HeroFeatures";
import { Button, Container, Section, Typography } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import HeroTitle from "./HeroTitle";
import { withBase } from "../../utils/withBase";

const Hero = ({ id }) => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  return (
    <Section
      id={id}
      style={{
        backgroundImage: `url(${data.images.hero_img})`,
        backgroundRepeat: "no-repeat",
      }}
      className="bg-position-[right_0_center] bg-size-[641.9px_auto] md:bg-center md:bg-cover flex flex-col justify-start xl:justify-center"
    >
      <Container className="h-full min-h-full">
        <div className="grid items-center justify-center text-center xl:text-start min-h-screen">
          <HeroTitle sectionLabels={sectionLabels} />

          <Button
            variant="demo"
            as="button"
            className="mx-auto mt-[18.26px] mb-[61.85px] xl:mx-0 lg:my-0"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <Typography as="span" variant="button-text">
              {sectionLabels.button_label}
            </Typography>
          </Button>
          <img
            className="w-[135px] mx-auto min-w-[135px] mb-[83px] md:w-[180px] lg:w-[220px] xl:w-[245px] 2xl:w-[245px] 3xl:w-[278px] xl:absolute xl:right-0 xl:top-1/2 xl:translate-y-[-50%]"
            src={withBase(data.images.stretch_s)}
            alt="Stretch S"
            loading="eager"
          />

          <div className="self-end justify-self-center">
            <HeroFeatures data={sectionLabels.hero_features} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
