import data from "./proven_to_perform.data.json";
import { Container, Flex, Glass, Section, Typography } from "../../components";
import { TrueGlassContainer } from "../UI/Glass/TrueGlassContainer";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "./SectionTitle";
// import ImageCard from "./ImageCard";
import AppBoundary from "../UI/Glass/GlassBoundary";

const ProvenToPerform = () => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages?.en;
  const isArabic = language === "ar";

  return (
    <Section className="relative bg-white! min-h-0!">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${data.grid})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Container className="touch-none select-none pointer-events-none">
        <SectionTitle labels={labels} />
      </Container>

      <AppBoundary>
        {/* Container is now centered by default */}
        <div className="flex items-center justify-center">
          <TrueGlassContainer className="flex justify-self-center items-center! justify-center! overflow-hidden text-gray-500/30">
            <Flex
              direction="flex-col xl:flex-row"
              justify="justify-center"
              align="items-center"
              spaceX="xl:space-x-2 2xl:space-x-4"
            >
              <Glass
                accentColor="#FFFFFF"
                className="mb-[80px] flex flex-col touch-none select-none items-center justify-center min-h-[152px] max-h-[172px] w-full max-w-[75vw] xl:max-w-[40vw] z-50 will-change-transform transform-[translate3d(0,0,0)] backface-hidden"
              >
                <div
                  className={`absolute -z-50 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 pointer-events-none bg-primary rounded-full flex items-center justify-center will-change-transform backface-hidden ${isArabic ? "right-0 top-0 translate-y-[-50%] translate-x-[50%]" : "left-0 top-0 translate-y-[-50%] translate-x-[-50%]"}`}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 97 61"
                  >
                    <path d="M75.625 60.501C87.2229 60.501 96.8 50.9178 96.8 39.326C96.8 34.0322 95.3662 29.4463 92.6195 25.9494C90.6109 23.3903 87.6403 21.9988 84.7545 20.5044C84.5972 15.6705 84.8755 14.3455 88.7475 6.58943C90.7863 2.51173 86.2125 -1.68697 82.3224 0.690681C61.7221 13.3715 54.4501 28.2363 54.4501 39.326C54.4501 50.9178 64.0272 60.501 75.625 60.501ZM21.175 60.501C32.7729 60.501 42.3501 50.9178 42.3501 39.326C42.3501 34.0322 40.9162 29.4463 38.1695 25.9494C36.1609 23.3903 33.1903 21.9988 30.3045 20.5044C30.1472 15.6705 30.4255 14.3455 34.2975 6.58943C36.3363 2.51173 31.7626 -1.68697 27.8724 0.690681C7.27216 13.3715 5.34058e-05 28.2363 5.34058e-05 39.326C5.34058e-05 50.9178 9.5772 60.501 21.175 60.501Z" />
                  </svg>
                </div>
                <Typography
                  as="h3"
                  variant="proven-to-perform-card-title"
                  className="flex items-center justify-center min-w-[300px] lg:min-w-[600px] max-w-[90%] min-h-40 px-4 py-6 md:px-6 md:py-8 text-gray-700/50 "
                >
                  {labels.images.img_1.text}
                </Typography>
                <Typography
                  as="p"
                  variant="proven-to-perform-card-quotedBy"
                  className="max-w-[90%] absolute right-[6%] -bottom-12 sm:-bottom-14 md:-bottom-16 lg:-bottom-10 xl:-bottom-18 text-black"
                >
                  {labels.images.img_1.by}
                </Typography>
              </Glass>
              <Glass
                accentColor="#FFFFFF"
                className="flex flex-col touch-none select-none items-center justify-center min-h-[152px] w-full max-w-[75vw] xl:max-w-[40vw] z-50 will-change-transform transform-[translate3d(0,0,0)] backface-hidden relative"
              >
                <div
                  className={`absolute -z-50 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 pointer-events-none bg-primary rounded-full flex items-center justify-center will-change-transform backface-hidden ${isArabic ? "left-0 top-0 translate-y-[50%] translate-x-[-50%]" : "right-0 bottom-0 translate-y-[50%] translate-x-[50%]"}`}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 97 61"
                  >
                    <path d="M75.625 60.501C87.2229 60.501 96.8 50.9178 96.8 39.326C96.8 34.0322 95.3662 29.4463 92.6195 25.9494C90.6109 23.3903 87.6403 21.9988 84.7545 20.5044C84.5972 15.6705 84.8755 14.3455 88.7475 6.58943C90.7863 2.51173 86.2125 -1.68697 82.3224 0.690681C61.7221 13.3715 54.4501 28.2363 54.4501 39.326C54.4501 50.9178 64.0272 60.501 75.625 60.501ZM21.175 60.501C32.7729 60.501 42.3501 50.9178 42.3501 39.326C42.3501 34.0322 40.9162 29.4463 38.1695 25.9494C36.1609 23.3903 33.1903 21.9988 30.3045 20.5044C30.1472 15.6705 30.4255 14.3455 34.2975 6.58943C36.3363 2.51173 31.7626 -1.68697 27.8724 0.690681C7.27216 13.3715 5.34058e-05 28.2363 5.34058e-05 39.326C5.34058e-05 50.9178 9.5772 60.501 21.175 60.501Z" />
                  </svg>
                </div>
                <Typography
                  as="h3"
                  variant="proven-to-perform-card-title"
                  className="flex items-center justify-center min-w-[300px] lg:min-w-[600px] max-w-[90%] min-h-40  px-4 py-6 md:px-6 md:py-8 text-gray-700/50 "
                >
                  {labels.images.img_2.text}
                </Typography>
                <Typography
                  as="p"
                  variant="proven-to-perform-card-quotedBy"
                  className="max-w-[90%] absolute right-[6%] -bottom-12 sm:-bottom-14 md:-bottom-16 lg:-bottom-10 xl:-bottom-18 text-black"
                >
                  {labels.images.img_2.by}
                </Typography>
              </Glass>
            </Flex>
          </TrueGlassContainer>
        </div>
      </AppBoundary>
    </Section>
  );
};

ProvenToPerform.propTypes = {
  // no external props currently
};

export default ProvenToPerform;
