import { createElement } from "react";
import PropTypes from "prop-types";
import cn from "../../../utils/cn";

/**
 * List component - A flexible list component that supports both ordered and unordered lists
 *
 * @param {Object} props
 * @param {string} props.as - The HTML element to render ('ul' or 'ol') - default: 'ul'
 * @param {string} props.variant - List variant for styling
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - List items to render
 * @param {Object} props.rest - Additional props passed to the element
 *
 * @example
 * <List>
 *   <List.Item>First item</List.Item>
 *   <List.Item>Second item</List.Item>
 * </List>
 *
 * <List as="ol" variant="numbered">
 *   <List.Item>Step 1</List.Item>
 *   <List.Item>Step 2</List.Item>
 * </List>
 */

const listVariants = {
  default: `
    list-none
  `,
  bulleted: `
    list-disc
    pl-5
  `,
  numbered: `
    list-decimal
    pl-5
  `,
  checkbox: `
    list-none
  `,
};

export const List = ({ as = "ul", variant = "default", className, children, ...rest }) => {
  const element = as === "ol" ? "ol" : "ul";

  const variantClass = variant && listVariants[variant] ? listVariants[variant] : "";

  const combinedClassName = cn(variantClass, className);

  return createElement(element, { className: combinedClassName, ...rest }, children);
};

List.propTypes = {
  as: PropTypes.oneOf(["ul", "ol"]),
  variant: PropTypes.oneOf(Object.keys(listVariants)),
  className: PropTypes.string,
  children: PropTypes.node,
};

/**
 * List.Item - List item component for use within List
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.bold - Apply bold font weight
 * @param {boolean} props.accent - Apply accent color
 * @param {string} props.icon - Icon to display before the item
 * @param {Object} props.rest - Additional props passed to the element
 *
 * @example
 * <List>
 *   <List.Item bold>Important item</List.Item>
 *   <List.Item accent>Highlighted item</List.Item>
 * </List>
 */
List.Item = ({ children, className, bold = false, accent = false, icon, ...rest }) => {
  const itemClasses = cn(
    "[direction:ltr]:font-poppins [direction:rtl]:font-tajawal",
    bold && "font-bold",
    accent && "text-accent",
    className,
  );

  return (
    <li className={itemClasses} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </li>
  );
};

List.Item.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
  accent: PropTypes.bool,
  icon: PropTypes.node,
};

List.displayName = "List";
List.Item.displayName = "List.Item";

export default List;
