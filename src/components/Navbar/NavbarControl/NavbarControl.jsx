import { useRef } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../../context/LanguageContext";
import cn from "../../../utils/cn";
import { Button, Flex, Typography, Wrapper } from "../..";
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
      spaceX="xl:space-x-4"
      ref={rootRef}
      className={cn(className)}
    >
      <Wrapper className="relative">
        <button
          type="button"
          onClick={handleLanguageSwitch}
          className="flex w-full items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:bg-gray-50"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img
              src={withBase(otherLanguage.flag)}
              alt={otherLanguage.label}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{otherLanguage.label}</span>
        </button>
      </Wrapper>
      <Button variant="login" className="mx-auto w-full xl:w-auto min-w-[204px]">
        <Typography as="span" variant="button-text">
          {data.button_label}
        </Typography>
      </Button>
    </Flex>
  );
};

NavbarControl.propTypes = {
  data: PropTypes.shape({
    button_label: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default NavbarControl;
