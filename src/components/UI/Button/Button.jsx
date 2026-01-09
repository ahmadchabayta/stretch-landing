import { createElement } from "react";
import PropTypes from "prop-types";
import cn from "../../../utils/cn";

/**
 * Button component - Generic, reusable button with primary/secondary variants
 *
 * @param {Object} props
 * @param {string} props.variant - Button variant: 'primary' (blue), 'secondary' (orange), 'outline-primary', 'outline-secondary', 'ghost'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {string} props.as - The HTML element to render (button, a, etc.) - default: 'button'
 * @param {boolean} props.fullWidth - Make button full width
 * @param {boolean} props.disabled - Disable button
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button text/content
 * @param {Function} props.onClick - Click handler
 * @param {Object} props.rest - Additional props passed to the element
 *
 * @example
 * <Button variant="primary">Book a Demo</Button>
 * <Button variant="secondary" size="lg">Get Started</Button>
 * <Button variant="outline-primary" as="a" href="/demo">Learn More</Button>
 */

const baseButtonStyles = `
cursor-pointer
active:scale-95
  inline-flex
  items-center
  justify-center
  font-medium
  rounded-pill-small
  transition-all
  duration-75
  ease-in-out
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:pointer-events-none
  ltr:font-poppins
  rtl:font-tajawal
`;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm 3xl:px-4 3xl:py-2",
  md: "px-4 py-2 text-base 3xl:px-5 3xl:py-2.5",
  lg: "px-6 py-3 text-lg 3xl:px-7 3xl:py-3.5",
};

const variantStyles = {
  primary: `
    bg-primary
    text-white
    hover:bg-primary/90
    active:bg-primary/80
    focus:ring-primary/50
    shadow-sm
    hover:shadow-md
  `,
  secondary: `
    bg-accent
    text-white
    hover:bg-accent/90
    active:bg-accent/80
    focus:ring-accent/50
    shadow-sm
    hover:shadow-md
  `,
  "outline-primary": `
    bg-transparent
    text-primary
    border-2
    border-primary
    hover:bg-primary
    hover:text-white
    active:bg-primary/90
    focus:ring-primary/50
  `,
  "outline-secondary": `
    bg-transparent
    text-accent
    border-2
    border-accent
    hover:bg-accent
    hover:text-white
    active:bg-accent/90
    focus:ring-accent/50
  `,
  ghost: `
    bg-transparent
    text-primary
    hover:bg-primary/10
    active:bg-primary/20
    focus:ring-primary/30
  `,
  circle: `
    rounded-full
    w-12
    h-12
    p-0
    bg-white/5
    border
    border-white/10
    text-white
    hover:bg-white/10
    active:bg-white/15
    focus:ring-white/20
    backdrop-blur-md
  `,
};

// Legacy variant mapping for backwards compatibility
const legacyVariantMap = {
  demo: "primary",
  login: "secondary",
  footer_contact: "primary",
};

const htmlElements = ["button", "a", "div", "span"];

export const Button = ({
  variant = "primary",
  size = "md",
  as = "button",
  fullWidth = false,
  disabled = false,
  className,
  children,
  onClick,
  ...rest
}) => {
  const element = htmlElements.includes(as) ? as : "button";

  // Map legacy variants to new variants
  const mappedVariant = legacyVariantMap[variant] || variant;

  // Get variant and size styles
  const variantClass = variantStyles[mappedVariant] || variantStyles.primary;
  const sizeClass = sizeStyles[size] || sizeStyles.md;
  const widthClass = fullWidth ? "w-full" : "";

  // Combine all styles
  const combinedClassName = cn(baseButtonStyles, variantClass, sizeClass, widthClass, className);

  // Add default button props
  const elementProps = {
    className: combinedClassName,
    onClick,
    ...rest,
  };

  // Add type="button" and disabled for button elements
  if (element === "button") {
    if (!rest.type) {
      elementProps.type = "button";
    }
    elementProps.disabled = disabled;
  }

  // Add aria-disabled for non-button elements
  if (element !== "button" && disabled) {
    elementProps["aria-disabled"] = "true";
    elementProps.className = cn(combinedClassName, "pointer-events-none");
  }

  return createElement(element, elementProps, children);
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline-primary",
    "outline-secondary",
    "ghost",
    "circle",
    // Legacy variants for backwards compatibility
    "demo",
    "login",
    "footer_contact",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  as: PropTypes.oneOf(htmlElements),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
