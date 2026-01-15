import PropTypes from "prop-types";
import { Button } from "../Button/Button";

const NavigationControls = ({ onPrevious, onNext }) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center items-end z-20 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        <Button variant="circle" onClick={onPrevious}>
          ←
        </Button>
        <Button variant="circle" onClick={onNext}>
          →
        </Button>
      </div>
    </div>
  );
};

NavigationControls.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default NavigationControls;
