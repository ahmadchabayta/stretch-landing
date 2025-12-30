import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const Container = ({ children, appContainer = true, className }) => {
  return (
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
};
export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  appContainer: PropTypes.bool,
  className: PropTypes.string,
};
