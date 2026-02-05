import PropTypes from "prop-types";
import cn from "../../../utils/cn";

const Burger = ({ onClick, isOpen, className }) => (
  <button
    type="button"
    onClick={onClick}
    data-button-name="nav_mobile_menu_burger"
    className={cn(
      "relative z-50 flex h-6 w-6 cursor-pointer items-center justify-center",
      className,
    )}
    aria-label="Toggle menu"
    aria-expanded={isOpen}
  >
    {/* Top bar: moves to center and rotates 45deg when open */}
    <span
      aria-hidden
      className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 transform rounded bg-black transition-all duration-200 ease-in-out ${
        isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1.5"
      }`}
    />

    {/* Middle bar: centered and fades/scale out on open */}
    <span
      aria-hidden
      className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 transform rounded bg-black transition-all duration-200 ease-in-out ${
        isOpen ? "top-1/2 scale-x-0 opacity-0" : "top-1/2 -translate-y-1/2 scale-x-100 opacity-100"
      }`}
    />

    {/* Bottom bar: moves to center and rotates -45deg when open */}
    <span
      aria-hidden
      className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 transform rounded bg-black transition-all duration-200 ease-in-out ${
        isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1.5"
      }`}
    />
  </button>
);

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Burger;
