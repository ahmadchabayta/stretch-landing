import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { ARABIC_FONT } from "./constants";

const GridEventHeaders = ({ labels, isArabic, activeTab, setActiveTab, language }) => (
  <div className="mb-6 flex w-full items-center gap-2 md:grid md:grid-cols-5">
    <Typography
      as="div"
      className={cn(
        "text-secondary text-base font-bold lg:text-lg shrink-0 mx-2",
        isArabic ? `text-right ${ARABIC_FONT}` : "text-left",
      )}
    >
      <Typography.Text>{labels.headers.event}</Typography.Text>
    </Typography>

    {/* Mobile buttons */}
    <div className="flex gap-0 md:hidden -ml-2">
      <button
        className={`relative rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-200 -mr-3 ${
          language === "ar" ? "font-[Tajawal,sans-serif]" : ""
        } ${
          activeTab === "impressions"
            ? "bg-primary text-white shadow z-20"
            : "bg-gray-100 text-black z-10"
        }`}
        onClick={() => setActiveTab("impressions")}
      >
        {labels.headers.tracking_impressions}
      </button>
      <button
        className={`relative rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-200 -ml-3 ${
          language === "ar" ? "font-[Tajawal,sans-serif]" : ""
        } ${
          activeTab === "clicks"
            ? "bg-secondary text-white shadow z-20"
            : "bg-gray-100 text-black z-10"
        }`}
        onClick={() => setActiveTab("clicks")}
      >
        {labels.headers.tracking_clicks}
      </button>
    </div>

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
    }).isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default GridEventHeaders;
