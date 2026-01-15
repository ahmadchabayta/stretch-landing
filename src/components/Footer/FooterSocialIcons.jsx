import PropTypes from "prop-types";
import { Flex } from "..";

const socialLinks = [
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    iconClass: "fab fa-linkedin",
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    iconClass: "fab fa-instagram",
  },
  {
    href: "https://x.com",
    label: "X",
    iconClass: "fab fa-x-twitter",
  },
  {
    href: "https://www.youtube.com",
    label: "YouTube",
    iconClass: "fab fa-youtube",
  },
  {
    href: "https://www.facebook.com",
    label: "Facebook",
    iconClass: "fab fa-facebook",
  },
];

const FooterSocialIcons = ({ className = "" }) => (
  <Flex
    as="nav"
    direction="flex-row"
    align="items-center"
    gap="gap-4 md:gap-6 xl:gap-8"
    className={`${className}`}
    aria-label="Stretch social media links"
  >
    {socialLinks.map(({ href, label, iconClass }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={`${label} profile`}
        title={`Stretch on ${label}`}
        itemProp="sameAs"
        className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
      >
        <i className={`${iconClass} text-[24px] md:text-[28px] lg:text-[32px]`}></i>
      </a>
    ))}
  </Flex>
);

FooterSocialIcons.propTypes = {
  className: PropTypes.string,
};

export default FooterSocialIcons;
