import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";

const GridHead = ({ labels, isArabic }) => (
  <div className="mt-4 grid w-full grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
    <Typography
      as="div"
      className={cn(
        "p-3 lg:p-4 rounded-xl font-bold text-center text-sm lg:text-base flex items-center justify-center",
        "border border-black",
        isArabic && "font-[Tajawal,sans-serif]",
      )}
    >
      <Typography.Text>{labels.headers.channels}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "p-3 lg:p-4 rounded-xl font-bold text-center text-sm lg:text-base flex items-center justify-center",
        "bg-primary text-white",
        isArabic && "font-[Tajawal,sans-serif]",
      )}
    >
      <Typography.Text>{labels.headers.banner}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "p-3 lg:p-4 rounded-xl font-bold text-center text-sm lg:text-base flex items-center justify-center",
        "bg-secondary text-white",
        isArabic && "font-[Tajawal,sans-serif]",
      )}
    >
      <Typography.Text>{labels.headers.video}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "p-3 lg:p-4 rounded-xl font-bold text-center text-sm lg:text-base flex items-center justify-center",
        "bg-primary hidden text-white md:flex",
        isArabic && "font-[Tajawal,sans-serif]",
      )}
    >
      <Typography.Text>{labels.headers.banner}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "p-3 lg:p-4 rounded-xl font-bold text-center text-sm lg:text-base flex items-center justify-center",
        "bg-secondary hidden text-white md:flex",
        isArabic && "font-[Tajawal,sans-serif]",
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
