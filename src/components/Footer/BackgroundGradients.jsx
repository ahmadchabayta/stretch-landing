import PropTypes from "prop-types";
import cn from "../../utils/cn";

const BackgroundGradients = ({
  showLeft = true,
  showRight = true,
  showTop = true,
  showBottom = true,
  showOverlay = true,
  leftColor = "white",
  rightColor = "white",
  topColor = "rgba(255, 255, 255, 1)",
  bottomColor = "rgba(255, 255, 255, 1)",
  overlayColor = "rgba(217, 217, 217, 0.08)",
  sideWidth = "w-[15%] sm:w-[18%] md:w-[20%]",
  sideSolidStop = "40%",
  topFadeStop = "22%",
  bottomFadeStop = "35%",
  overlayFadeStop = "55%",
  zIndex = {
    sides: "z-10",
    top: "z-9",
    bottom: "z-9",
    overlay: "z-8",
  },
  className,
}) => {
  return (
    <>
      {/* Left gradient */}
      {showLeft && (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0",
            zIndex.sides,
            sideWidth,
            className,
          )}
          style={{
            backgroundImage: `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${sideSolidStop}, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Right gradient */}
      {showRight && (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0",
            zIndex.sides,
            sideWidth,
            className,
          )}
          style={{
            backgroundImage: `linear-gradient(to left, ${rightColor} 0%, ${rightColor} ${sideSolidStop}, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top gradient */}
      {showTop && (
        <div
          className={cn("pointer-events-none absolute inset-0", zIndex.top, className)}
          style={{
            backgroundImage: `linear-gradient(180deg, ${topColor} 0%, rgba(255, 255, 255, 0) ${topFadeStop})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />
      )}

      {/* Bottom gradient */}
      {showBottom && (
        <div
          className={cn("pointer-events-none absolute inset-0", zIndex.bottom, className)}
          style={{
            backgroundImage: `linear-gradient(0deg, ${bottomColor} 0%, rgba(255, 255, 255, 0) ${bottomFadeStop})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />
      )}

      {/* Overlay gradient */}
      {showOverlay && (
        <div
          className={cn("pointer-events-none absolute inset-0", zIndex.overlay, className)}
          style={{
            backgroundImage: `linear-gradient(180deg, ${overlayColor} 0%, rgba(255, 255, 255, 0) ${overlayFadeStop})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

BackgroundGradients.propTypes = {
  showLeft: PropTypes.bool,
  showRight: PropTypes.bool,
  showTop: PropTypes.bool,
  showBottom: PropTypes.bool,
  showOverlay: PropTypes.bool,
  leftColor: PropTypes.string,
  rightColor: PropTypes.string,
  topColor: PropTypes.string,
  bottomColor: PropTypes.string,
  overlayColor: PropTypes.string,
  sideWidth: PropTypes.string,
  sideSolidStop: PropTypes.string,
  topFadeStop: PropTypes.string,
  bottomFadeStop: PropTypes.string,
  overlayFadeStop: PropTypes.string,
  zIndex: PropTypes.shape({
    sides: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
    overlay: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default BackgroundGradients;
