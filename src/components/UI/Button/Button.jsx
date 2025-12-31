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
  min-w-[172px] max-w-fit px-8
  h-[45px] text-[18px]
  md:h-[38px] md:text-[20px]
  lg:h-[42px] lg:text-[24px]
  xl:h-[50px] xl:text-[24px] xl:rounded-pill
  2xl:h-[52px] 2xl:text-[30px]
  3xl:h-[57px] 3xl:text-[32px] 3xl:rounded-pill
`;

const buttonVariants = {
  ltr: {
    demo: `bg-primary font-poppins`,
    login: `bg-accent font-poppins`,
    footer_contact: `bg-black font-poppins`,
  },
  rtl: {
    demo: `bg-primary font-poppins`,
    login: `bg-accent font-poppins`,
    footer_contact: `bg-black font-poppins`,
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
