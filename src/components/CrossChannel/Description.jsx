import PropTypes from "prop-types";
import { Typography, Flex } from "../../components";

const Description = ({ labels, className, language }) => (
  <Flex align="items-end" justify="justify-end" className={`${className}`}>
    <Typography
      as="p"
      variant="section-desc"
      className={`w-full ${language === "en" ? "3xl:mr-[121px]" : "3xl:ml-[121px]"}`}
    >
      {labels.description}{" "}
      <Typography.Text accent>{labels.description_highlighted}</Typography.Text>{" "}
      <Typography.Text>{labels.description_2}</Typography.Text>{" "}
      <Typography.Text accent>{labels.description_2_highlighted}</Typography.Text>
    </Typography>
  </Flex>
);

Description.propTypes = {
  labels: PropTypes.shape({
    description: PropTypes.string.isRequired,
    description_highlighted: PropTypes.string.isRequired,
    description_2: PropTypes.string.isRequired,
    description_2_highlighted: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
};

export default Description;
