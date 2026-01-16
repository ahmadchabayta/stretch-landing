import PropTypes from "prop-types";
import data from "./hero.data.json";
import HeroFeatures from "./HeroFeatures";
import { Button, Container, Section, Typography } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import HeroTitle from "./HeroTitle";

const Hero = ({ id }) => {
  const { language } = useLanguage();
  const sectionLabels = data.languages[language] || data.languages.en;

  const isLTR = language === "en";

  return (
    <Section
      id={id}
      style={{
        backgroundImage: `url(${sectionLabels.hero_img})`,
        backgroundRepeat: "no-repeat",
      }}
      className={`${
        isLTR
          ? "bg-position-[right_-88px_top_180px] xs:bg-position-[right_-79px_top_180px] md:bg-position-[left_90%_top_299px] lg:bg-position-[right_-50px_top_363.33px] xl:bg-position-[right_-236px_top_-43px] 2xl:bg-position-[right_-120px_top_10%] 3xl:bg-position-[right_-50px_top_110px]"
          : "bg-position-[left_-19px_top_180px] md:bg-position-[right_84%_top_299px] lg:bg-position-[left_-41px_top_363.33px] xl:bg-position-[left_-40px_top_-43px] 2xl:bg-position-[left_-120px_top_10%] 3xl:bg-position-[left_-50px_top_110px]"
      } bg-size-[663.568px_auto] md:bg-size-[952px_auto] lg:bg-size-[1352px_auto] 3xl:bg-size-[1364px_auto] relative bg-white! pb-12 min-h-0!`}
    >
      <Container className="3xl:pt-[243px] 2xl:pt-[283px] xl:pt-[209px] lg:pt-[57px]">
        <div className="h-full flex flex-col items-center justify-center xl:items-start xl:justify-center text-center xl:text-start">
          <HeroTitle sectionLabels={sectionLabels} />

          <Button
            variant="demo"
            as="button"
            className="place-self-center xl:place-self-start w-fit! h-fit! mt-[18.26px] lg:mt-[84.5px] xl:mt-[42.6px] 3xl:mt-[63.11px]"
          >
            <Typography as="span" variant="button-text">
              {sectionLabels.button_label}
            </Typography>
          </Button>
        </div>
        <Container className="mt-[278px] md:mt-[470px] lg:mt-[682.71px] xl:mt-[138.7px]">
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
