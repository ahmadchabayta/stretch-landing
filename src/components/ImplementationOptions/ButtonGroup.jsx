import PropTypes from "prop-types";
import { Flex } from "..";

const ButtonGroup = ({ activeTab, setActiveTab, labels, language }) => (
  <Flex flex="flex lg:hidden" justify="justify-center" className="mt-2 mb-4 gap-2">
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
  </Flex>
);

ButtonGroup.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    headers: PropTypes.shape({
      tracking_impressions: PropTypes.string.isRequired,
      tracking_clicks: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default ButtonGroup;
