import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ data }) => (
  <SectionHeadContainer>
    <Typography as="h2" variant="section-title">
      {data.title}
    </Typography>
    <Typography
      as="h3"
      variant="section-subtitle"
      className="3xl:[direction:rtl] w-full max-w-[343px] [direction:ltr] md:max-w-[500px] lg:w-auto lg:max-w-[650px] 2xl:max-w-[852px]"
    >
      <Typography.Text>{data.description.part1}</Typography.Text>
      <Typography.Text accent bold className="3xl:whitespace-pre-line">
        {data.description.highlighted1}
      </Typography.Text>
      <Typography.Text>{data.description.part2}</Typography.Text>
      <Typography.Text accent bold>
        {data.description.highlighted2}
      </Typography.Text>
    </Typography>
  </SectionHeadContainer>
);

SectionTitle.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.shape({
      part1: PropTypes.string.isRequired,
      highlighted1: PropTypes.string.isRequired,
      part2: PropTypes.string.isRequired,
      highlighted2: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SectionTitle;
