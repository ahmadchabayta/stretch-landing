import PropTypes from "prop-types";
import cn from "../../../utils/cn";
import { Typography } from "../../../components";
import CheckCell from "./CheckCell";
import { CELL_BASE_CLASSES, ARABIC_FONT } from "./constants";
import { getCellCheckedState } from "./utils";

const GridRow = ({ channel, index, isDesktop, activeTab, isArabic }) => {
  const bannerChecked = getCellCheckedState(channel, isDesktop, activeTab, "banner");
  const videoChecked = getCellCheckedState(channel, isDesktop, activeTab, "video");

  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 items-center text-center lg:grid-cols-5",
        index > 0 && "border-t border-black",
      )}
    >
      {/* Channel Name */}
      <Typography
        as="div"
        className={cn(
          CELL_BASE_CLASSES,
          "text-sm font-medium lg:text-base",
          isArabic && ARABIC_FONT,
        )}
      >
        <Typography.Text>{channel.name}</Typography.Text>
      </Typography>

      {/* Mobile: Shows impressions or clicks based on tab */}
      <CheckCell isChecked={bannerChecked} />
      <CheckCell isChecked={videoChecked} />

      {/* Desktop: Shows clicks columns */}
      <CheckCell isChecked={channel.clicks_banner_checked} className="hidden lg:flex" />
      <CheckCell isChecked={channel.clicks_video_checked} className="hidden lg:flex" />
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
