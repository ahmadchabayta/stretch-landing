import { createElement } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../../context/LanguageContext";

/**
 * Button component - Reusable button with variant support
 *
 * @param {Object} props
 * @param {string} props.variant - Button variant: 'demo' (primary blue) or 'login' (accent orange)
 * @param {string} props.as - The HTML element to render (button, a, etc.) - default: 'button'
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button text/content
 * @param {Function} props.onClick - Click handler
 * @param {Object} props.rest - Additional props passed to the element
 *
 * @example
 * <Button variant="demo">Book a Demo</Button>
 * <Button variant="login">Log in</Button>
 * <Button variant="demo" as="a" href="/demo">Book a Demo</Button>
 */

const baseButtonStyles = `
  !cursor-pointer z-[9999] text-white text-center font-bold
  rounded-pill-small transition-all hover:brightness-90 active:scale-95
  w-[172px] h-[33.4px] text-[18px]
  sm:w-[172px] sm:h-[33.4px] sm:text-[18px]
  md:text-[20px]
  lg:text-[24px]
  xl:text-[24px]
  2xl:text-[30px]
  3xl:text-[32px] 3xl:rounded-pill
`;

const buttonVariants = {
  ltr: {
    demo: `
      bg-primary font-poppins
      w-[172px]
      md:w-[190px] md:h-[38px]
      lg:w-[210px] lg:h-[42px]
      xl:w-[266px] xl:h-[50px]
      2xl:w-[270px] 2xl:h-[52px]
      3xl:w-[303px] 3xl:h-[57px]
    `,
    login: `
      bg-accent font-poppins
      md:w-[190px] md:h-[38px]
      lg:w-[210px] lg:h-[42px]
      xl:w-[234px] xl:h-[57px] xl:rounded-pill
      2xl:w-[234px] 2xl:h-[57px] 2xl:rounded-pill
      3xl:w-[234px] 3xl:h-[57px] 3xl:rounded-pill
    `,
    footer_contact: `
      bg-black font-poppins
      w-[247px] h-[40px]
      md:w-[247px] md:h-[40px]
      lg:w-[247px] lg:h-[40px]
      xl:h-[57px] xl:w-auto xl:rounded-pill
      2xl:h-[57px] 2xl:w-auto 2xl:rounded-pill
      3xl:h-[57px] 3xl:w-auto 3xl:rounded-pill
    `,
  },
  rtl: {
    demo: `
      bg-primary font-poppins
      md:w-[190px] md:h-[38px]
      lg:w-[210px] lg:h-[42px]
      xl:w-[266px] xl:h-[50px]
      2xl:w-[270px] 2xl:h-[52px]
      3xl:w-[432px] 3xl:h-[72px] 3xl:p-[0_74px]
      3xl:font-[Tajawal] 3xl:font-black 3xl:leading-[38px] 3xl:text-justify
    `,
    login: `
      bg-accent font-poppins
      md:w-[190px] md:h-[38px]
      lg:w-[210px] lg:h-[42px]
      xl:w-[220px] xl:h-[48px]
      2xl:w-[227px] 2xl:h-[52px]
      3xl:w-[392px] 3xl:h-[72px] 3xl:px-[74px] 3xl:gap-[10px]
    `,
    footer_contact: `
      bg-black font-poppins
      w-[247px] h-[40px]
      md:w-[247px] md:h-[40px]
      lg:w-[247px] lg:h-[40px]
      xl:h-[57px] xl:w-auto xl:rotate-[-90deg] xl:rounded-pill
      2xl:h-[57px] 2xl:w-auto 2xl:rounded-pill
      3xl:h-[57px] 3xl:w-auto 3xl:rounded-pill
    `,
  },
};

const htmlElements = ["button", "a", "div", "span"];

export const Button = ({
  variant = "demo",
  as = "button",
  className = "",
  children,
  onClick,
  ...rest
}) => {
  const { isRTL } = useLanguage();
  const element = htmlElements.includes(as) ? as : "button";
  const direction = isRTL ? "rtl" : "ltr";
  const variantClass = buttonVariants[direction]?.[variant] || buttonVariants.ltr.demo;

  // Combine base styles with variant-specific styles
  const combinedClassName = `${baseButtonStyles} ${variantClass} ${className}`.trim();

  // Add default button props
  const elementProps = {
    className: combinedClassName,
    onClick,
    ...rest,
  };

  // Add type="button" for button elements if not specified
  if (element === "button" && !rest.type) {
    elementProps.type = "button";
  }

  return createElement(element, elementProps, children);
};

Button.propTypes = {
  variant: PropTypes.oneOf(["demo", "login", "footer_contact"]),
  as: PropTypes.oneOf(htmlElements),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
