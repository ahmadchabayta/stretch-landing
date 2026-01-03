import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { withBase } from "../../../utils/withBase";

const Image = ({
  src,
  alt = "",
  width,
  height,
  className,
  priority = false,
  objectFit = "cover",
  sizes,
  ...props
}) => (
  <img
    src={withBase(src)}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    decoding={priority ? "sync" : "async"}
    fetchPriority={priority ? "high" : "auto"}
    sizes={sizes}
    className={cn(
      objectFit === "cover" && "object-cover",
      objectFit === "contain" && "object-contain",
      objectFit === "fill" && "object-fill",
      objectFit === "none" && "object-none",
      objectFit === "scale-down" && "object-scale-down",
      className,
    )}
    style={{ objectFit }}
    {...props}
  />
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  priority: PropTypes.bool,
  objectFit: PropTypes.oneOf(["cover", "contain", "fill", "none", "scale-down"]),
  sizes: PropTypes.string,
};

export default Image;
