import PropTypes from "prop-types";
import FooterSocialIcons from "./FooterSocialIcons";
import { Flex } from "..";
import { withBase } from "../../utils/withBase";

const FooterLinksColumns = ({ labels, language }) => {
  const allLinks = labels.footer_links;

  const linkClass = `cursor-pointer text-white font-[Poppins] text-[14px] leading-normal lg:text-[18px] hover:underline transition-all ${
    language === "ar" ? "font-[Tajawal,sans-serif]" : ""
  }`;

  const poweredByClass = `cursor-pointer text-white font-[Poppins] text-[12px] font-normal leading-normal md:text-[14px] lg:text-[14px] xl:text-[16px] 3xl:text-[18px] hover:opacity-80 transition-all ${
    language === "ar" ? "font-[Tajawal,sans-serif]" : ""
  }`;

  return (
    <Flex
      direction="flex-col lg:flex-row"
      justify="lg:justify-between"
      className="w-full gap-4 lg:gap-y-[18px] border"
    >
      {/* Left: Privacy Policy & Terms of Service in a row */}
      <Flex
        direction="flex-col lg:flex-row"
        align="items-center lg:items-end"
        className="gap-4 lg:gap-6 text-center lg:text-start"
      >
        <a href={allLinks[0].url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {allLinks[0].label}
        </a>

        <a href={allLinks[1].url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {allLinks[1].label}
        </a>
      </Flex>

      {/* Right: Powered by & Social Icons in a column */}
      <Flex
        direction="flex-col"
        align="items-center lg:items-end"
        justify="justify-end"
        className="lg:gap-6 text-center lg:text-end"
      >
        <a
          href={labels.powered_by.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex flex-row items-center gap-2 md:gap-3"
        >
          <span className={poweredByClass}>{labels.powered_by.powered_by}</span>
          <img
            src={withBase(labels.powered_by.logo)}
            alt="Memob logo"
            className="w-24 lg:w-[141px] "
          />
        </a>

        <Flex flex="hidden lg:flex">
          <FooterSocialIcons />
        </Flex>
      </Flex>

      {/* Powered by on mobile */}
      <Flex
        flex="flex lg:hidden"
        direction="flex-col"
        align="items-center"
        className="gap-4 text-center"
      >
        <a href={labels.powered_by.url} target="_blank" rel="noopener noreferrer">
          <Flex direction="flex-row" align="items-center" gap="gap-2 md:gap-3">
            <span className={poweredByClass}>{labels.powered_by.powered_by}</span>
            <img
              src={withBase(labels.powered_by.logo)}
              alt="Memob logo"
              className="w-24 lg:w-[161px] 3xl:w-[214px]"
            />
          </Flex>
        </a>
      </Flex>

      {/* Social icons on mobile */}
      <Flex flex="flex lg:hidden" direction="flex-col" align="items-center" className="text-center">
        <FooterSocialIcons />
      </Flex>
    </Flex>
  );
};

FooterLinksColumns.propTypes = {
  labels: PropTypes.shape({
    footer_links: PropTypes.arrayOf(PropTypes.string).isRequired,
    powered_by: PropTypes.shape({
      powered_by: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default FooterLinksColumns;
