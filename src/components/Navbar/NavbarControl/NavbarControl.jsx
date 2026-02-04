import { useRef } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../../context/LanguageContext";
import cn from "../../../utils/cn";
import { Flex, Typography } from "../..";
import { withBase } from "../../../utils/withBase";

const NavbarControl = ({ data, className }) => {
  const rootRef = useRef(null);
  const { languages, currentLanguage, changeLanguage } = useLanguage();

  // Show the opposite language as a way to switch
  const otherLanguage = languages.find((lang) => lang.code !== currentLanguage.code);

  const handleLanguageSwitch = () => {
    changeLanguage(otherLanguage.code);
  };

  return (
    <Flex
      flex={true}
      direction="flex-col xl:flex-row"
      align="items-stretch xl:items-center"
      spaceY="space-y-3 xl:space-y-0"
      ref={rootRef}
      className={cn("gap-x-2", className)}
    >
      <a
        href="https://stretchtag.ai/"
        className="px-4 whitespace-nowrap py-1.5 text-sm md:px-5 md:py-2 lg:px-6 lg:py-2 3xl:px-7 3xl:py-2.5 mx-auto w-full inline-flex items-center justify-center cursor-pointer rounded-lg md:rounded-[0.5rem] lg:rounded-[0.5rem] bg-primary text-white font-semibold shadow-sm transition-all duration-200 ease-out ltr:font-poppins rtl:font-tajawal hover:bg-primary/90 hover:shadow-md active:scale-[0.98] active:bg-primary/80 active:shadow-sm active:brightness-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography as="span" variant="button-text">
          {data.button_label.signup}
        </Typography>
      </a>
      <a
        href="https://stretchtag.ai/"
        className="px-4 py-1.5 text-sm md:px-5 md:py-2 lg:px-6 lg:py-2 3xl:px-7 3xl:py-2.5 mx-auto w-full inline-flex items-center justify-center cursor-pointer rounded-lg md:rounded-[0.5rem] lg:rounded-[0.5rem] bg-accent text-white font-semibold shadow-sm transition-all duration-200 ease-out ltr:font-poppins rtl:font-tajawal hover:bg-accent/90 hover:shadow-md active:scale-[0.98] active:bg-accent/80 active:shadow-sm active:brightness-95 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography as="span" variant="button-text">
          {data.button_label.login}
        </Typography>
      </a>
      <button
        onClick={handleLanguageSwitch}
        className="shrink-0 px-3 py-1.5 md:px-3 md:py-2 lg:px-3 lg:py-2 3xl:px-4 3xl:py-2.5 mx-auto xl:mx-0 w-full xl:w-auto inline-flex items-center justify-center gap-2 cursor-pointer rounded-lg md:rounded-[0.5rem] lg:rounded-[0.5rem] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
        aria-label={`Switch to ${otherLanguage.label}`}
        title={`Switch to ${otherLanguage.label}`}
      >
        <img
          src={withBase(otherLanguage.flag)}
          alt={otherLanguage.label}
          className="w-5 h-4 rounded-sm object-cover shadow-sm"
        />
        <Typography
          as="span"
          variant="button-text"
          className="text-black text-sm font-medium ltr:font-poppins rtl:font-tajawal"
        >
          {otherLanguage.code.toUpperCase()}
        </Typography>
      </button>
    </Flex>
  );
};

NavbarControl.propTypes = {
  data: PropTypes.shape({
    button_label: PropTypes.shape({
      login: PropTypes.string.isRequired,
      signup: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default NavbarControl;
