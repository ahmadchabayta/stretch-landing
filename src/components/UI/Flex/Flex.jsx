import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const Flex = ({
  children,
  className,
  flex = true,
  direction,
  align,
  justify,
  gap,
  wrap,
  spaceX,
  spaceY,
  container = false,
  as: Component = "div",
  ...props
}) => {
  const flexClasses = cn(
    typeof flex === "string" ? flex : flex === true && "flex",
    direction,
    align,
    justify,
    gap,
    wrap,
    spaceX,
    spaceY,
    container && "app_container",
    className,
  );

  return (
    <Component className={flexClasses} {...props}>
      {children}
    </Component>
  );
};

export default Flex;

Flex.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  gap: PropTypes.string,
  wrap: PropTypes.string,
  spaceX: PropTypes.string,
  spaceY: PropTypes.string,
  container: PropTypes.bool,
  as: PropTypes.elementType,
};
