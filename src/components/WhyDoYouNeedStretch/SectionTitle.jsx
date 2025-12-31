import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";

const SectionTitle = ({ data }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title">
      {data.title}
    </Typography>
    <Typography
      as="h3"
      variant="section-subtitle"
      className="3xl:max-w-[462px] 3xl:text-right max-w-[343px] lg:max-w-[500px] "
    >
      {data.subtitle.description}{" "}
      <Typography.Text accent>{data.subtitle.highlighted_desc_1}</Typography.Text>{" "}
      <Typography.Text bold>{data.subtitle.bold_desc_1}</Typography.Text>{" "}
      <Typography.Text accent bold>
        {data.subtitle.highlighted_desc_2}
      </Typography.Text>
    </Typography>
  </SectionHeadContainer>
);
SectionTitle.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.shape({
      description: PropTypes.string.isRequired,
      highlighted_desc_1: PropTypes.string.isRequired,
      bold_desc_1: PropTypes.string.isRequired,
      highlighted_desc_2: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default SectionTitle;
