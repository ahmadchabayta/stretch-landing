import { createElement } from "react";
import PropTypes from "prop-types";
import cn from "../../../utils/cn";

/**
 * Typography component - A flexible text component that supports both HTML elements and custom typography variants
 *
 * @param {Object} props
 * @param {string} props.as - The HTML element to render (h1-h6, p, span, div, etc.)
 * @param {string} props.variant - Typography variant for styling
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to render
 * @param {Object} props.rest - Additional props passed to the element
 *
 * Custom variants:
 * - 'hero-title': Large hero titles (48px → 112px)
 * - 'hero-subtitle': Hero subtitle (18px, ExtraBold, centered)
 * - 'hero-description': Hero description (14px → 24px, responsive alignment)
 * - 'section-title': Section headings (40px → 72px)
 * - 'section-subtitle': Section subtitles (23px)
 * - 'menu-link': Navigation menu links (16px → 23px)
 * - 'p6': Small paragraph (14px)
 * - 'p6-bold': Small bold paragraph (14px)
 * - 'p4': Medium paragraph (24px)
 * - 'p4-bold': Medium bold paragraph (24px)
 * - 'p3-title': Title paragraph (28px)
 * - 'hero-feature': Hero feature text with opacity (14px → 20px)
 * - 'button-text': Button text (18px → 32px)
 *
 * @example
 * <Typography as="h1" variant="hero-title">Title</Typography>
 * <Typography as="h2" variant="section-title">Section</Typography>
 * <Typography as="p" variant="p4">Body text</Typography>
 */

const typographyVariants = {
  "hero-title": `
    font-poppins font-extrabold
    text-[48px] leading-[72px]
    md:text-[60px] md:leading-[90px]
    lg:text-[72px] lg:leading-[108px]
    xl:text-[84px] xl:leading-auto
    2xl:text-[96px]
    3xl:text-[112px]
  `,
  "hero-subtitle": `
    font-poppins font-extrabold
    text-[18px] leading-[27px]
    md:text-[24px] md:leading-[36px]
    lg:text-[35px] lg:leading-[53px]
    xl:text-[35px] xl:leading-[56px]
    2xl:text-[35px] 2xl:leading-[57px]
    3xl:text-[40px] 3xl:leading-[60px]
  `,
  "hero-description": `
    font-poppins font-normal
    text-[14px] leading-[21px]
    sm:text-[16px] sm:leading-[24px]
    md:text-[18px] md:leading-[27px]
    lg:text-[21.175px] lg:leading-[32px]
    xl:text-[22px] xl:leading-[33px]
    2xl:text-[23px] 2xl:leading-[35px]
    3xl:text-[24px] 3xl:leading-[36px]
  `,
  "section-title": `
    font-poppins font-extrabold
    text-[40px] leading-[108.457%]
    xl:text-[64px]
    2xl:text-[64px]
    3xl:text-[72px]
  `,
  "section-subtitle": `
    font-poppins font-normal
    text-[14px] leading-normal
    xl:text-[20px] xl:font-normal xl:leading-[108.457%]
    2xl:text-[20px] 2xl:leading-normal 2xl:text-right
    3xl:text-[24px] 3xl:text-right
  `,
  "section-desc": `
    font-poppins font-normal text-justify
    text-[14px] leading-normal
    xl:text-[20px]
    2xl:text-[20px]
    3xl:text-[24px]
  `,
  "menu-link": `
    font-manrope font-normal
    text-[16px] leading-[22px]
    md:text-[17px] md:leading-[24px]
    lg:text-[19px] lg:leading-[27px]
    xl:text-[21px] xl:leading-[30px]
    2xl:text-[22px] 2xl:leading-[32px]
    3xl:text-[23px] 3xl:leading-[34px] 3xl:font-poppins 3xl:font-semibold
  `,
  "footer-desc": `
    font-poppins font-bold text-center
    text-[14px] leading-normal
    xl:text-[28px]
    2xl:text-[28px]
    3xl:text-[28px]
  `,
  "hero-feature": `
    font-poppins font-normal opacity-50
    text-[14px] leading-[21px]
    md:text-[15px] md:leading-[23px]
    lg:text-[17px] lg:leading-[26px]
    xl:text-[18px] xl:leading-[27px]
    2xl:text-[19px] 2xl:leading-[29px]
    3xl:text-[20px] 3xl:leading-[30px]
  `,
  "button-text": `
    font-poppins font-bold text-white
    text-[18px] leading-normal text-justify
    md:text-[18px] md:leading-normal md:text-justify
    lg:text-[18px] lg:leading-normal lg:text-justify
    xl:text-[32px] xl:leading-normal xl:text-center
    2xl:text-[32px] 2xl:leading-normal 2xl:text-center
    3xl:text-[32px] 3xl:leading-normal 3xl:text-center
  `,
  "audience-mirroring-list": `
    font-poppins font-normal text-justify text-accent
    text-[14px] leading-normal
    lg:text-[20px]
    xl:text-[20px]
    2xl:text-[20px]
    3xl:text-[24px]
  `,
};

const htmlElements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "div",
  "section",
  "article",
  "label",
  "strong",
  "em",
  "small",
  "blockquote",
];

export const Typography = ({ as = "p", variant, className, children, ...rest }) => {
  // Determine the HTML element to render (always from 'as' prop)
  const element = htmlElements.includes(as) ? as : "p";

  // Determine the typography class to apply (from variant prop)
  const variantClass = variant && typographyVariants[variant] ? typographyVariants[variant] : "";

  // Combine classes - ensure variant class comes first for proper CSS specificity
  const combinedClassName =
    variantClass && className ? `${variantClass} ${className}` : variantClass || className || "";

  return createElement(element, { className: combinedClassName, ...rest }, children);
};

Typography.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(typographyVariants)),
  className: PropTypes.string,
  children: PropTypes.node,
};

/**
 * Typography.Text - Inline text component for custom styling within typography
 *
 * @param {Object} props
 * @param {string} props.as - The HTML element to render (span, strong, em, small, etc.) - default: 'span'
 * @param {React.ReactNode} props.children - Content to render
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.bold - Apply bold font weight
 * @param {boolean} props.semibold - Apply semibold font weight
 * @param {boolean} props.accent - Apply accent color
 * @param {boolean} props.primary - Apply primary color
 * @param {boolean} props.muted - Apply muted opacity
 * @param {boolean} props.br - Add a line break after the text
 * @param {string} props.color - Custom color class
 *
 * @example
 * <Typography as="p">
 *   Regular text <Typography.Text accent bold>highlighted</Typography.Text>
 * </Typography>
 *
 * <Typography as="section-title">
 *   <Typography.Text br>First line</Typography.Text>
 *   <Typography.Text accent>Second line</Typography.Text>
 * </Typography>
 */
Typography.Text = ({
  as = "span",
  children,
  className,
  bold = false,
  semibold = false,
  accent = false,
  primary = false,
  muted = false,
  br = false,
  color,
  ...rest
}) => {
  const textClasses = cn(
    bold && "font-bold",
    semibold && "font-semibold",
    accent && "text-accent",
    primary && "text-primary",
    muted && "opacity-50",
    color,
    className,
  );

  const inlineElements = [
    "span",
    "strong",
    "em",
    "small",
    "b",
    "i",
    "u",
    "mark",
    "code",
    "kbd",
    "samp",
    "var",
    "sub",
    "sup",
    "abbr",
    "cite",
    "q",
    "time",
  ];
  const element = inlineElements.includes(as) ? as : "span";

  return (
    <>
      {createElement(element, { className: textClasses, ...rest }, children)}
      {br && <br />}
    </>
  );
};

Typography.Text.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
  semibold: PropTypes.bool,
  accent: PropTypes.bool,
  primary: PropTypes.bool,
  muted: PropTypes.bool,
  br: PropTypes.bool,
  color: PropTypes.string,
};
Typography.displayName = "Typography";
Typography.Text.displayName = "Typography.Text";

export default Typography;
