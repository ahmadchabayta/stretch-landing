import PropTypes from "prop-types";
import { LinkedInIcon, InstagramIcon, XIcon, YouTubeIcon, FacebookIcon } from "./FooterIcons";
import { Flex } from "..";

const socialLinks = [
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://x.com",
    label: "X",
    Icon: XIcon,
  },
  {
    href: "https://www.youtube.com",
    label: "YouTube",
    Icon: YouTubeIcon,
  },
  {
    href: "https://www.facebook.com",
    label: "Facebook",
    Icon: FacebookIcon,
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
    {socialLinks.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={`${label} profile`}
        title={`Stretch on ${label}`}
        itemProp="sameAs"
        className="flex items-center justify-center"
      >
        <Icon size={28} />
      </a>
    ))}
  </Flex>
);

FooterSocialIcons.propTypes = {
  className: PropTypes.string,
};

export default FooterSocialIcons;
