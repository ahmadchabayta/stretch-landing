import PropTypes from "prop-types";
import useMediaQuery from "../../hooks/useMediaQuery";
import GridEventHeaders from "./Grid/GridEventHeaders";
import GridHead from "./Grid/GridHead";
import GridBody from "./Grid/GridBody";

const Grid = ({ labels, activeTab, language }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isArabic = language === "ar";

  return (
    <>
      <GridEventHeaders labels={labels} isArabic={isArabic} />
      <GridHead labels={labels} isArabic={isArabic} />
      <GridBody
        channels={labels.channels}
        isDesktop={isDesktop}
        activeTab={activeTab}
        isArabic={isArabic}
      />
    </>
  );
};

Grid.propTypes = {
  labels: PropTypes.shape({
    headers: PropTypes.shape({
      event: PropTypes.string.isRequired,
      tracking_impressions: PropTypes.string.isRequired,
      tracking_clicks: PropTypes.string.isRequired,
      channels: PropTypes.string,
      banner: PropTypes.string,
      video: PropTypes.string,
    }).isRequired,
    channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Grid;
