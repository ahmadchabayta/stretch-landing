import { createElement } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../../context/LanguageContext";
import cn from "../../../utils/cn";

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
 cursor-pointer 
 rounded-pill-small
 
 w-[172px]
 3xl:w-full
`;

const buttonVariants = {
  ltr: {
    demo: `bg-primary [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    login: `bg-accent [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    footer_contact: `bg-black [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    fixed: `font-tajawal right-5 primary-btn fixed xl:opacity-50! px-2 py-2 hover:opacity-100! transition-all duration-300 linear bottom-10 z-10000 `,
  },
  rtl: {
    demo: `bg-primary [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    login: `bg-accent [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    footer_contact: `bg-black [direction:ltr]:font-poppins [direction:rtl]:font-tajawal`,
    fixed: `left-5 font-tajawal primary-btn fixed xl:opacity-50! px-2 py-2 hover:opacity-100! transition-all duration-300 linear bottom-10 z-10000 `,
  },
};

const htmlElements = ["button", "a", "div", "span"];

export const Button = ({
  variant = "demo",
  as = "button",
  className,
  children,
  onClick,
  ...rest
}) => {
  const { isRTL } = useLanguage();
  const element = htmlElements.includes(as) ? as : "button";
  const direction = isRTL ? "rtl" : "ltr";
  const variantClass = buttonVariants[direction]?.[variant] || buttonVariants.ltr.demo;

  // Combine base styles with variant-specific styles
  const combinedClassName = cn(baseButtonStyles, variantClass, className);

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
