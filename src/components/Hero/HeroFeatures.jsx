import PropTypes from "prop-types";
import { Typography, List } from "../../components";

const HeroFeatures = ({ data }) => (
  <List className="flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-x-16">
    {data.map((el, i) => (
      <List.Item
        key={`${el}_${i}`}
        className="3xl:h-[30px] 3xl:gap-[13px] flex items-center justify-center gap-3"
      >
        <span className="3xl:w-6 3xl:h-6">●</span>
        <Typography as="p" variant="hero-feature" className="max-w-[471px]">
          {el}
        </Typography>
      </List.Item>
    ))}
  </List>
);

HeroFeatures.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HeroFeatures;
