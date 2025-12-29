import PropTypes from "prop-types";
import { Typography } from "../../components";

const MappedDescription = ({ labels, dir }) => (
  <ul className="mt-8">
    {labels.description.map((item, index) => (
      <Typography
        as="li"
        key={`description-${index}`}
        className="mb-2 text-right font-[Tajawal] text-[26px] leading-[normal] text-black"
        dir={dir}
      >
        <Typography.Text accent className="font-bold">
          {item.highlighted}
        </Typography.Text>{" "}
        <span className="ml-2">{item.description}</span>
      </Typography>
    ))}
  </ul>
);

MappedDescription.propTypes = {
  labels: PropTypes.shape({
    description: PropTypes.arrayOf(
      PropTypes.shape({
        highlighted: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  }).isRequired,
  dir: PropTypes.string,
};

export default MappedDescription;
