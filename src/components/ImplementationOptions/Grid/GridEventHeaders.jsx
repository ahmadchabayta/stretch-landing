import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { ARABIC_FONT } from "./constants";

const GridEventHeaders = ({ labels, isArabic }) => (
  <div className="mb-6 grid w-full grid-cols-5 items-center">
    <Typography
      as="div"
      className={cn(
        "text-secondary text-base font-bold lg:text-lg",
        isArabic ? `text-right ${ARABIC_FONT}` : "text-left",
      )}
    >
      <Typography.Text>{labels.headers.event}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "col-span-3 text-center text-base font-bold lg:col-span-2 lg:text-lg",
        isArabic && ARABIC_FONT,
      )}
    >
      <Typography.Text>{labels.headers.tracking_impressions}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "hidden text-center text-base font-bold lg:block lg:text-lg",
        isArabic && ARABIC_FONT,
      )}
    >
      <Typography.Text>{labels.headers.tracking_clicks}</Typography.Text>
    </Typography>
  </div>
);

GridEventHeaders.propTypes = {
  labels: PropTypes.shape({
    headers: PropTypes.shape({
      event: PropTypes.string.isRequired,
      tracking_impressions: PropTypes.string.isRequired,
      tracking_clicks: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
};

export default GridEventHeaders;
