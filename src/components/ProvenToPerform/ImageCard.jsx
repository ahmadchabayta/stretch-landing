import PropTypes from "prop-types";
import cn from "../../utils/cn";
import { withBase } from "../../utils/withBase";

const ImageCard = ({ className, image, isSecondCard = false }) => {
  return (
    <img
      className={cn(
        className,
        "z-10 object-contain",
        isSecondCard
          ? "w-[370px] lg:w-[850px] 2xl:w-[650px] 3xl:w-[850px]"
          : "w-[370px] lg:w-[850px] 2xl:w-[650px] 3xl:w-[850px]",
      )}
      src={withBase(image.img)}
      alt={image.by}
    />
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
  isSecondCard: PropTypes.bool,
};

export default ImageCard;
