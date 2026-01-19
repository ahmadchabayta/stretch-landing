import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import { ARABIC_FONT } from "./constants";

const GridHead = ({ labels, isArabic, activeTab, setActiveTab, language }) => (
  <>
    {/* Mobile Event and Buttons Row - above grid */}
    <div className="mb-3 grid md:hidden w-full grid-cols-3 gap-3 items-start">
      <Typography
        as="div"
        className={cn(
          "text-secondary text-base font-bold lg:text-lg text-start mt-7 ml-1",
          isArabic && ARABIC_FONT,
        )}
      >
        <Typography.Text>{labels.headers.event}</Typography.Text>
      </Typography>

      <div className="col-span-2 flex flex-col gap-2 items-center">
        <Typography as="div" className="text-black text-center font-poppins text-sm font-bold">
          <Typography.Text>Tracking Based on</Typography.Text>
        </Typography>

        <div className="flex gap-0 justify-center items-center cursor-pointer">
          <button
            className={`w-32 cursor-pointer relative rounded-xl py-2.5 text-base lg:text-lg font-bold transition-all duration-200 shadow-md backdrop-blur-sm -mr-3 ${
              language === "ar" ? "font-[Tajawal,sans-serif]" : ""
            } ${
              activeTab === "impressions"
                ? "bg-black text-white border-1 border-black z-20"
                : "bg-transparent text-black border-1 border-black z-10 -mr-3 -z-10 opacity-50"
            }`}
            onClick={() => setActiveTab("impressions")}
          >
            {labels.headers.tracking_impressions_mobile}
          </button>
          <button
            className={`w-32 cursor-pointer relative rounded-xl py-2.5 text-base lg:text-lg font-bold transition-all duration-200 -ml-0 shadow-md backdrop-blur-sm ${
              language === "ar" ? "font-[Tajawal,sans-serif]" : ""
            } ${
              activeTab === "clicks"
                ? "bg-black text-white border-1 border-black z-20"
                : "bg-transparent text-black border-1 border-black z-10 -ml-5 -z-10 opacity-50"
            }`}
            onClick={() => setActiveTab("clicks")}
          >
            {labels.headers.tracking_clicks_mobile}
          </button>
        </div>
      </div>
    </div>

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

      <div className="col-span-2 grid grid-cols-2 gap-3 md:gap-4">
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
      </div>

      <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 md:gap-4">
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
      </div>
    </div>
  </>
);

GridHead.propTypes = {
  labels: PropTypes.shape({
    headers: PropTypes.shape({
      channels: PropTypes.string.isRequired,
      banner: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
      tracking_impressions_mobile: PropTypes.string.isRequired,
      tracking_clicks_mobile: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isArabic: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default GridHead;
