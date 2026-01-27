import PropTypes from "prop-types";
import data from "./hero.data.json";
import HeroFeatures from "./HeroFeatures";
import { Button, Container, DemoModal, Section, Typography } from "../../components";
import { useLanguage } from "../../context/LanguageContext";
import HeroTitle from "./HeroTitle";
import { useState } from "react";
import { useMediaQuery } from "../../hooks";

const Hero = ({ id }) => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionLabels = data.languages[language] || data.languages.en;

  const isXL = useMediaQuery("(min-width: 1280px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSmall = useMediaQuery("(min-width: 390px)");

  return (
    <div className="bg-white">
      <Section
        id={id}
        style={{
          backgroundImage: `url(${isXL ? sectionLabels.hero_img.large : isLg ? sectionLabels.hero_img.medium : isSmall ? sectionLabels.hero_img.small : sectionLabels.hero_img.small})`,
          backgroundRepeat: "no-repeat",
        }}
        className={`${
          isXL
            ? "xl:bg-position-[right_-236px_top_-43px] 2xl:bg-position-[right_-120px_top_10%] 3xl:bg-position-[right_-50px_top_0]"
            : "bg-position-[right_-50px_top_0px] md:bg-position-[right_0_top_-50px] lg:bg-position-[right_0_top_10px]"
        } bg-size-[auto_516px] md:bg-size-[663.568px_auto] lg:bg-size-[1024px_auto] 2xl:bg-size-[auto_100%] relative bg-white! pb-12 min-h-0! 3xl:max-w-[1920px]`}
      >
        <Container className="">
          <div className="h-full flex flex-col items-start justify-start text-start">
            <HeroTitle sectionLabels={sectionLabels} />

            <Button
              onClick={() => setIsModalOpen(true)}
              variant="demo"
              className="min-w-[180px] place-self-start w-fit! h-fit! mt-[35.26px] lg:mt-[20px] xl:mt-[42.6px] 3xl:mt-[63.11px]"
            >
              <Typography as="span" variant="button-text">
                {sectionLabels.button_label}
              </Typography>
            </Button>
            <Container className="mt-[75px] lg:mt-[30px] xl:mt-[160.7px] 2xl:mt-[80px]">
              <HeroFeatures data={sectionLabels.hero_features} />
            </Container>
            <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </Container>
      </Section>
    </div>
  );
};

Hero.propTypes = {
  id: PropTypes.string,
};

export default Hero;
