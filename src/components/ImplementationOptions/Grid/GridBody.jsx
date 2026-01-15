import PropTypes from "prop-types";
import GridRow from "./GridRow";

const GridBody = ({ channels, isDesktop, activeTab, isArabic }) => (
  <>
    {channels.map((channel, index) => (
      <GridRow
        key={channel.name}
        channel={channel}
        index={index}
        isDesktop={isDesktop}
        activeTab={activeTab}
        isArabic={isArabic}
      />
    ))}
  </>
);

GridBody.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      impressions_banner_checked: PropTypes.bool,
      impressions_video_checked: PropTypes.bool,
      clicks_banner_checked: PropTypes.bool,
      clicks_video_checked: PropTypes.bool,
    }),
  ).isRequired,
  isDesktop: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  isArabic: PropTypes.bool.isRequired,
};

export default GridBody;
