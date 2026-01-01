import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const Container = ({ children, appContainer = true, className }) => (
  <div
    className={cn(
      {
        app_container: appContainer,
      },
      className,
    )}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  appContainer: PropTypes.bool,
  className: PropTypes.string,
};

export default Container;
