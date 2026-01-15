import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import CheckCell from "./CheckCell";
import { getCellCheckedState } from "./utils";

const GridRow = ({ channel, index, isDesktop, activeTab, isArabic }) => {
  const bannerChecked = getCellCheckedState(channel, isDesktop, activeTab, "banner");
  const videoChecked = getCellCheckedState(channel, isDesktop, activeTab, "video");

  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 items-center justify-start text-start md:grid-cols-5 h-12 md:h-14 lg:h-16",
        index > 0 && "border-t border-black",
      )}
    >
      {/* Channel Name */}
      <Typography
        as="div"
        className={cn(
          "px-2 lg:px-3 h-full flex items-center justify-start",
          "text-sm md:text-[18px] lg:text-[20px] 3xl:text-[24px] font-medium",

          isArabic && "font-[Tajawal,sans-serif]",
        )}
      >
        {channel.name}
      </Typography>

      {/* Mobile: Shows impressions or clicks based on tab */}
      <CheckCell isChecked={bannerChecked} />
      <CheckCell isChecked={videoChecked} />

      {/* Desktop: Shows clicks columns */}
      <CheckCell isChecked={channel.clicks_banner_checked} className="hidden md:flex" />
      <CheckCell isChecked={channel.clicks_video_checked} className="hidden md:flex" />
    </div>
  );
};

GridRow.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    impressions_banner_checked: PropTypes.bool,
    impressions_video_checked: PropTypes.bool,
    clicks_banner_checked: PropTypes.bool,
    clicks_video_checked: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  isArabic: PropTypes.bool.isRequired,
};

export default GridRow;
