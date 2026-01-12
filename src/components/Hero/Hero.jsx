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
      style={{
        backgroundImage: `url(${data.images.hero_img})`,
        backgroundRepeat: "no-repeat",
      }}
      className="bg-position-[right_-86px_top_299px] md:bg-position-[left_100%_top_299px] lg:bg-position-[right_-26px_top_363.33px] xl:bg-position-[right_-236px_top_-43px] 2xl:bg-position-[right_-120px_top_10%] 3xl:bg-position-[right_-50px_top_110px] bg-size-[663.568px_auto] md:bg-size-[952px_auto] lg:bg-size-[1352px_auto] 3xl:bg-size-[1364px_auto] h-screen relative"
    >
      <Container className="3xl:pt-[243px] 2xl:pt-[283px] xl:pt-[209px] lg:pt-[57px]">
        <div className="h-full flex flex-col items-center justify-center xl:items-start xl:justify-center text-center xl:text-start">
          <HeroTitle sectionLabels={sectionLabels} />

          <Flex className="mt-[84.5px] lg:mt-[42.6px]">
            <Button variant="demo" as="button" className="place-self-start px-11 w-fit! h-fit!">
              <Typography as="span" variant="button-text">
                {sectionLabels.button_label}
              </Typography>
            </Button>
          </Flex>
        </div>
        <Container className="absolute bottom-0 lg:bottom-[57px] left-1/2 translate-x-[-50%]">
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
