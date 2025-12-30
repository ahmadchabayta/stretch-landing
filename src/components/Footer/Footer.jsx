import PropTypes from "prop-types";
import data from "./footer.data.json";
import { useLanguage } from "../../context/LanguageContext";
import FooterCTA from "./FooterCTA";
import FooterLinksColumns from "./FooterLinksColumns";
import SectionTitle from "./SectionTitle";
import { Container, Flex } from "../UI";

const Footer = ({ id }) => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages.en;

  return (
    <footer id={id} className="w-full overflow-x-hidden">
      {/* Top section with CTA and net background with built-in side gradients */}
      <Container
        style={{
          backgroundImage: `linear-gradient(to right, white 0%, transparent 20%, transparent 80%, white 100%), url(${data.background_net})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 60%",
          backgroundSize: "cover",
        }}
        className="mx-auto flex min-h-screen flex-col justify-between items-center"
      >
        <SectionTitle labels={labels} language={language} />
        <FooterCTA labels={labels} language={language} />
      </Container>

      {/* Bottom section with logo and links */}
      <Flex
        flex="flex"
        direction="flex-col"
        align="items-center!"
        justify="justify-between"
        className="w-full flex-1 bg-black pt-16! min-h-[548px] pb-24"
      >
        <img
          className="mt-[26px] mb-[38.22px] w-[200px] max-w-full object-contain p-8 md:w-[260px] lg:w-[320px] xl:mt-0 xl:mb-10 xl:w-[362px]"
          src={data.footer_logo}
          alt="Stretch logo"
        />
        <Container appContainer>
          <Flex
            flex="flex"
            direction="flex-col lg:flex-row"
            align="items-center lg:items-start"
            justify="justify-between"
            className="w-full"
          >
            <FooterLinksColumns labels={labels} language={language} />
          </Flex>
        </Container>
      </Flex>
    </footer>
  );
};

Footer.propTypes = {
  id: PropTypes.string,
};

export default Footer;
