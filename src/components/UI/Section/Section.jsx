import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const PADDING_STYLES = {
  default: "",
  sm: "py-6",
  md: "py-10",
  lg: "py-16",
  xl: "py-24",
};

const BACKGROUND_STYLES = {
  default: "",
  muted: "bg-slate-50",
  dark: "bg-black text-white",
  primary: "bg-primary text-white",
};

/**
 * Reusable layout section that composes Tailwind classes with a clsx-style helper.
 *
 * Props:
 * - as: render different HTML tag (defaults to "section")
 * - id: optional anchor id
 * - padding: "none" | "sm" | "md" | "lg" | "xl"
 * - background: "default" | "muted" | "dark" | "primary"
 * - container: whether to wrap children in the shared `app_container` class
 * - className / containerClassName: additional Tailwind utility classes
 */
const Section = ({
  as: Component = "section",
  id,
  padding = "default",
  background = "default",
  container = false,
  className,
  containerClassName,
  children,
  style,
  ...props
}) => (
  <Component
    id={id}
    className={cn(
      // Base section styles previously defined in global CSS
      "relative mx-auto min-h-screen w-full",
      PADDING_STYLES[padding],
      BACKGROUND_STYLES[background],
      className,
    )}
    style={style}
    {...props}
  >
    <section className={cn(container && "app_container", containerClassName)}>{children}</section>
  </Component>
);

Section.propTypes = {
  as: PropTypes.elementType,
  id: PropTypes.string,
  padding: PropTypes.oneOf(["default", "sm", "md", "lg", "xl"]),
  background: PropTypes.oneOf(["default", "muted", "dark", "primary"]),
  container: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Section;
