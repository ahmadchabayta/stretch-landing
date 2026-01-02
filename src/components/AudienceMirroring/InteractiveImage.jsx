import PropTypes from "prop-types";
import rawData from "./audience_mirroring.data.json";

const InteractiveImage = () => {
  const absoluteImages = ["grid-background", "background", "match-rate"];

  return (
    <div
      style={{
        backgroundImage: "url('assets/audience_mirroring/gradient_bg.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="3xl:max-w-[1527px] bg-fill relative mx-auto flex min-w-[190px] items-center justify-center bg-center "
    >
      {rawData.images.map(({ id, src, alt, className }) => {
        const shouldBeAbsolute = absoluteImages.includes(id);
        if (shouldBeAbsolute) {
          return <img key={id} src={src} alt={alt} className={className} />;
        }
        return null;
      })}

      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 gap-8 md:gap-4">
        {rawData.images.map(({ id, alt, className }) => {
          if (id === "gray-avatars") {
            const cleanClassName = className
              .replace(
                /absolute|top-\[[\d%\]]+|left-\[[\d%\]]+|right-\[[\d%\]]+|bottom-\[[\d%\]]+|translate-[xy]-\[[\d\-%\]]+/g,
                "",
              )
              .replace(/md:w-\[286px\]/, "md:w-[180px] lg:w-[286px]")
              .trim();
            return (
              <img
                key={id}
                src="./assets/audience_mirroring/gray_avatars_left.webp"
                alt={alt}
                className={cleanClassName}
              />
            );
          }
          return null;
        })}

        <div className="relative ">
          <img
            src="./assets/audience_mirroring/orange_vertical_avatar.webp"
            alt="Orange Vertical Avatar"
            className="w-[190px] md:w-[200px] lg:w-[391px] cursor-pointer hover:opacity-0 transition-opacity"
          />
          {rawData.images.map(({ id, src, alt, className }) => {
            if (id === "purple-avatar") {
              const cleanClassName = className
                .replace(
                  /absolute|top-\[[\d%\]]+|left-\[[\d%\]]+|right-\[[\d%\]]+|bottom-\[[\d%\]]+|translate-[xy]-\[[\d\-%\]]+/g,
                  "",
                )
                .trim();
              return (
                <img
                  key={id}
                  src={src}
                  alt={alt}
                  className={`${cleanClassName} absolute top-0 left-0`}
                />
              );
            }
            return null;
          })}
        </div>

        {rawData.images.map(({ id, src, alt, className }) => {
          if (id === "orange-avatars") {
            const cleanClassName = className
              .replace(
                /absolute|top-\[[\d%\]]+|left-\[[\d%\]]+|right-\[[\d%\]]+|bottom-\[[\d%\]]+|translate-[xy]-\[[\d\-%\]]+/g,
                "",
              )
              .replace(/md:w-\[286px\]/, "md:w-[180px] lg:w-[286px]")
              .trim();
            return <img key={id} src={src} alt={alt} className={cleanClassName} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

InteractiveImage.propTypes = {
  data: PropTypes.shape({
    decorative_btn_label: PropTypes.string,
  }).isRequired,
};

export default InteractiveImage;
