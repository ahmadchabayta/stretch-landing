import PropTypes from "prop-types";
import { Typography, List } from "../../components";

const HeroFeatures = ({ data }) => (
  <List
    variant="bulleted"
    className="flex flex-col items-start justify-start xl:justify-between space-y-1 xl:space-y-0 xl:flex-row lg:space-x-16 pl-4 xl:pl-0 mx-auto w-full"
  >
    {data.map((el, i) => (
      <List.Item key={`${el}_${i}`} className="list-disc ml-2 md:ml-4 xl:ml-0">
        <Typography
          as="p"
          variant="hero-feature"
          className="w-full xl:max-w-none ml-1.5 flex items-start justify-between text-left xl:text-center"
        >
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
