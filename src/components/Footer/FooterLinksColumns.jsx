import PropTypes from "prop-types";
import FooterSocialIcons from "./FooterSocialIcons";
import { Flex } from "..";
import { withBase } from "../../utils/withBase";

const FooterLinksColumns = ({ labels, language }) => {
  const allLinks = labels.footer_links;

  const linkClass = `cursor-pointer text-white font-[Poppins] text-[14px] font-bold leading-normal md:text-[22px] lg:text-[22px] xl:text-[22px] 3xl:text-[28px] ${
    language === "ar" ? "font-[Tajawal,sans-serif]" : ""
  }`;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-[18px] lg:gap-x-12 lg:gap-y-[18px] xl:gap-x-16">
      {/* Column 1 Row 1: Company Info */}
      <div className="flex flex-col gap-[18px] text-center lg:text-start items-center lg:items-start">
        <span className={linkClass}>{allLinks[0]}</span>
      </div>

      {/* Column 2 Row 1: Privacy & Terms */}
      <div className="flex flex-col gap-[18px] text-center lg:text-end xl:text-center items-center lg:items-end xl:items-center">
        <span className={linkClass}>{allLinks[1]}</span>
      </div>

      {/* Column 3 Row 1: Powered by (only on xl+) */}
      <div className="hidden xl:flex flex-row items-center justify-end gap-2 md:gap-3">
        <span className={linkClass}>{labels.powered_by.powered_by}</span>
        <img
          src={withBase(labels.powered_by.logo)}
          alt="Memob logo"
          className="w-24 lg:w-[161px] 3xl:w-[214px]"
        />
      </div>

      {/* Column 1 Row 2: Contact */}
      <div className="flex flex-col gap-[18px] text-center lg:text-start items-center lg:items-start">
        <span className={linkClass}>{allLinks[3]}</span>

        {/* Powered by on lg (2 columns), hidden on mobile and xl+ */}
        <Flex
          direction="flex-row"
          align="items-center"
          gap="gap-2 md:gap-3"
          className="hidden lg:flex xl:hidden"
        >
          <span className={linkClass}>{labels.powered_by.powered_by}</span>
          <img
            src={withBase(labels.powered_by.logo)}
            alt="Memob logo"
            className="w-24 lg:w-[161px] 3xl:w-[214px]"
          />
        </Flex>
      </div>

      {/* Column 2 Row 2: Support */}
      <div className="flex flex-col gap-[18px] text-center lg:text-end xl:text-center items-center lg:items-end xl:items-center">
        <span className={linkClass}>{allLinks[2]}</span>

        {/* Social icons on lg (2 columns), hidden on mobile and xl+ */}
        <div className="hidden lg:flex xl:hidden">
          <FooterSocialIcons />
        </div>
      </div>

      {/* Column 3 Row 2: Social icons (only on xl+) */}
      <div className="hidden xl:flex flex-col text-end items-end">
        <FooterSocialIcons />
      </div>

      {/* Powered by on mobile only */}
      <div className="flex lg:hidden flex-col gap-4 text-center items-center">
        <Flex direction="flex-row" align="items-center" gap="gap-2 md:gap-3">
          <span className={linkClass}>{labels.powered_by.powered_by}</span>
          <img
            src={withBase(labels.powered_by.logo)}
            alt="Memob logo"
            className="w-24 lg:w-[161px] 3xl:w-[214px]"
          />
        </Flex>
      </div>

      {/* Social icons on mobile only */}
      <div className="flex lg:hidden flex-col text-center items-center">
        <FooterSocialIcons />
      </div>
    </div>
  );
};

FooterLinksColumns.propTypes = {
  labels: PropTypes.shape({
    footer_links: PropTypes.arrayOf(PropTypes.string).isRequired,
    powered_by: PropTypes.shape({
      powered_by: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default FooterLinksColumns;
