import PropTypes from "prop-types";
import data from "./footer.data.json";
import { useLanguage } from "../../context/LanguageContext";
import FooterCTA from "./FooterCTA";
import FooterLinksColumns from "./FooterLinksColumns";
import SectionTitle from "./SectionTitle";

const Footer = ({ id }) => {
  const { language } = useLanguage();
  const labels = data.languages?.[language] || data.languages.en;

  return (
    <footer id={id} className="w-full overflow-x-hidden">
      {/* Top section with CTA and net background with built-in side gradients */}
      <div
        style={{
          backgroundImage: `linear-gradient(to right, white 0%, transparent 20%, transparent 80%, white 100%), url(${data.background_net})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 60%",
          backgroundSize: "cover",
        }}
        className="app_container mx-auto flex min-h-screen flex-col justify-between"
      >
        <SectionTitle labels={labels} language={language} />
        <FooterCTA labels={labels} language={language} />
      </div>

      {/* Bottom section with logo and links */}
      <div className="flex w-full flex-1 flex-col items-center bg-black pt-8 pb-16">
        <img
          className="mt-[26px] mb-[38.22px] w-[200px] max-w-full object-contain p-8 md:w-[260px] lg:w-[320px] xl:mt-0 xl:mb-10 xl:w-[362px]"
          src={data.footer_logo}
          alt="Stretch logo"
        />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-[120px]">
          <FooterLinksColumns labels={labels} language={language} />
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  id: PropTypes.string,
};

export default Footer;
