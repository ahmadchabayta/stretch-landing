import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { ARABIC_FONT } from "./constants";

const GridEventHeaders = ({ labels, isArabic }) => (
  <div className="mb-6 flex w-full items-end gap-2 md:grid md:grid-cols-5 md:items-end ">
    {/* Event label - desktop only */}
    <Typography
      as="div"
      className={cn(
        "hidden md:block text-secondary text-base font-bold lg:text-lg",
        isArabic ? `text-right ${ARABIC_FONT}` : "text-left",
      )}
    >
      <Typography.Text>{labels.headers.event}</Typography.Text>
    </Typography>

    {/* Desktop headers */}
    <Typography
      as="div"
      className={cn(
        "hidden md:block text-center text-base font-bold md:text-lg md:col-span-2 md:col-start-2",
        isArabic && ARABIC_FONT,
      )}
    >
      <Typography.Text>{labels.headers.tracking_impressions}</Typography.Text>
    </Typography>

    <Typography
      as="div"
      className={cn(
        "hidden md:block text-center text-base font-bold md:text-lg md:col-span-2 md:col-start-4",
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
      tracking_impressions_mobile: PropTypes.string.isRequired,
      tracking_clicks_mobile: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default GridEventHeaders;
