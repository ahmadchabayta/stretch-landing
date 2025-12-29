import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { HEADER_CELL_BASE, ARABIC_FONT } from "./constants";

const GridHead = ({ labels, isArabic }) => (
  <div className="mt-4 grid w-full grid-cols-3 gap-3 lg:grid-cols-5 lg:gap-4">
    <Typography
      as="div"
      className={cn(HEADER_CELL_BASE, "border border-black", isArabic && ARABIC_FONT)}
    >
      <Typography.Text>{labels.headers.channels}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(HEADER_CELL_BASE, "bg-primary text-white", isArabic && ARABIC_FONT)}
    >
      <Typography.Text>{labels.headers.banner}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(HEADER_CELL_BASE, "bg-secondary text-white", isArabic && ARABIC_FONT)}
    >
      <Typography.Text>{labels.headers.video}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        HEADER_CELL_BASE,
        "bg-primary hidden text-white lg:flex",
        isArabic && ARABIC_FONT,
      )}
    >
      <Typography.Text>{labels.headers.banner}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        HEADER_CELL_BASE,
        "bg-secondary hidden text-white lg:flex",
        isArabic && ARABIC_FONT,
      )}
    >
      <Typography.Text>{labels.headers.video}</Typography.Text>
    </Typography>
  </div>
);

GridHead.propTypes = {
  labels: PropTypes.shape({
    headers: PropTypes.shape({
      channels: PropTypes.string.isRequired,
      banner: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
};

export default GridHead;
