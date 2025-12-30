import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { ARABIC_FONT } from "./constants";

const GridEventHeaders = ({ labels, isArabic, activeTab, setActiveTab, language }) => (
  <div className="mb-6 flex w-full items-center justify-between lg:grid lg:grid-cols-5">
    <Typography
      as="div"
      className={cn(
        "text-secondary text-base font-bold lg:text-lg",
        isArabic ? `text-right ${ARABIC_FONT}` : "text-left",
      )}
    >
      <Typography.Text>{labels.headers.event}</Typography.Text>
    </Typography>

    {/* Mobile buttons */}
    <div className="flex gap-2 lg:hidden">
      <button
        className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
          language === "ar" ? "font-[Tajawal,sans-serif]" : ""
        } ${activeTab === "impressions" ? "bg-primary text-white shadow" : "bg-gray-100 text-black"}`}
        onClick={() => setActiveTab("impressions")}
      >
        {labels.headers.tracking_impressions}
      </button>
      <button
        className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
          language === "ar" ? "font-[Tajawal,sans-serif]" : ""
        } ${activeTab === "clicks" ? "bg-secondary text-white shadow" : "bg-gray-100 text-black"}`}
        onClick={() => setActiveTab("clicks")}
      >
        {labels.headers.tracking_clicks}
      </button>
    </div>

    {/* Desktop headers */}
    <Typography
      as="div"
      className={cn(
        "col-span-3 text-center text-base font-bold lg:col-span-2 lg:text-lg hidden lg:block",
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
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default GridEventHeaders;
