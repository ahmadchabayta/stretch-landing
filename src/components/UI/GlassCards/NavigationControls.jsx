import PropTypes from "prop-types";

const NavigationControls = ({ onPrevious, onNext }) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center items-end z-20 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        <button
          onClick={onPrevious}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-md"
        >
          ←
        </button>
        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all backdrop-blur-md"
        >
          →
        </button>
      </div>
    </div>
  );
};

NavigationControls.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default NavigationControls;
