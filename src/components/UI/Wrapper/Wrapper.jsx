import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const Wrapper = ({ children, className, ...props }) => (
  <div className={cn(className)} {...props}>
    {children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Wrapper;
