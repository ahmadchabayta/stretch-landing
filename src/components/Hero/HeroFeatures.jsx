import PropTypes from "prop-types";
import { Typography, List } from "../../components";

const HeroFeatures = ({ data }) => (
  <List
    variant="bulleted"
    className="flex flex-col items-start justify-start xl:justify-between space-y-2 xl:flex-row lg:space-x-16 list-disc pl-4 xl:pl-0 w-fit! mx-auto"
  >
    {data.map((el, i) => (
      <List.Item key={`${el}_${i}`} className="list-item ml-4 xl:ml-0">
        <Typography
          as="p"
          variant="hero-feature"
          className="max-w-[471px] ml-6 flex items-center justify-center"
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
