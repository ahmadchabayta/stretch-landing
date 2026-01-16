import PropTypes from "prop-types";
import { List, Typography } from "../../components";

const MappedDescription = ({ labels }) => (
  <List className="mt-[10%]">
    {labels.description.map((item, index) => (
      <List.Item key={`description-${index}`}>
        <Typography as="li" variant="audience-mirroring-list" className="text-black">
          <Typography.Text accent bold>
            {item.highlighted}
          </Typography.Text>{" "}
          <Typography.Text className="ml-2">{item.description}</Typography.Text>
        </Typography>
      </List.Item>
    ))}
  </List>
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
};

export default MappedDescription;
