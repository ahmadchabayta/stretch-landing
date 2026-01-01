import PropTypes from "prop-types";
import { List, Typography } from "../../components";

const MappedDescription = ({ labels, dir }) => (
  <List>
    {labels.description.map((item, index) => (
      <List.Item key={`description-${index}`}>
        <Typography
          as="li"
          variant="audience-mirroring-list"
          className={`text-black ${dir === "rtl" ? "font-[Tajawal]" : "font-poppins"}`}
          dir={dir}
        >
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
  dir: PropTypes.string,
};

export default MappedDescription;
