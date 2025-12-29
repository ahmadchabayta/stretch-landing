import PropTypes from "prop-types";

const SectionButton = ({ children, className, ...props }) => {
  const baseStyles =
    "absolute bottom-[113px] right-0 flex w-[172px] h-[57px] justify-center items-center gap-[22.544px] text-white text-justify font-sans text-[18px] font-bold leading-normal rounded-pill-small bg-primary 3xl:inline-flex 3xl:px-11 3xl:gap-2.5 3xl:rounded-pill 3xl:w-[304px] 3xl:h-[57px] 3xl:text-[32px]";
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

SectionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SectionButton;
