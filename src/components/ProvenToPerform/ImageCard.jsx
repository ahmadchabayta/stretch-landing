import PropTypes from "prop-types";
import { Typography } from "../../components";
import cn from "../../utils/cn";

const ImageCard = ({ className, image, isArabic, isSecondCard = false }) => {
  const getCaptionClasses = () => {
    const baseClasses = cn(
      "absolute md:p-2 lg:p-0 max-w-[241px] w-fit text-center text-[14px] font-bold",
      "lg:max-w-none lg:text-xl",
      "3xl:text-2xl",
    );

    const horizontalPosition = isArabic
      ? cn(
          "left-1/2 translate-x-[-50%]",
          "md:left-auto md:right-0 md:translate-x-0",
          "2xl:left-auto",
          "3xl:translate-x-[-15%]",
        )
      : cn(
          "left-1/2 translate-x-[-50%]",
          "md:left-auto md:right-[20%] md:translate-x-0",
          "xl:right-[100px]",
          "2xl:right-[125px]",
          "3xl:right-40",
        );

    const firstCardHorizontalExtra =
      !isSecondCard && isArabic ? cn("xl:right-0", "2xl:right-0") : "";

    const secondCardHorizontalExtra = isSecondCard && isArabic ? "right-0" : "";

    const textAlignment = isArabic
      ? cn("font-[Tajawal,sans-serif] whitespace-nowrap", "md:text-end")
      : "md:text-end";

    const bottomSpacing = cn("top-full");

    return cn(
      baseClasses,
      horizontalPosition,
      firstCardHorizontalExtra,
      secondCardHorizontalExtra,
      textAlignment,
      bottomSpacing,
    );
  };

  return (
    <div
      className={cn(
        "relative h-[clamp(180px,25vh,230px)] w-[clamp(300px,90vw,830px)]",
        "xl:w-[clamp(600px,60vw,830px)]",
      )}
    >
      <img
        className={cn(className, "w-full h-full object-contain")}
        src={image.img}
        alt={image.by}
      />
      <Typography as="p" className={getCaptionClasses()}>
        {image.by}
      </Typography>
    </div>
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
  isSecondCard: PropTypes.bool,
};

export default ImageCard;
