import PropTypes from "prop-types";
import { Typography, SectionHeadContainer } from "../../components";

const SectionTitle = ({ data }) => (
  <SectionHeadContainer className="min-w-full">
    <Typography as="h2" variant="section-title" className="w-full">
      {data.title.part1}
      <br />
      <Typography.Text className="3xl:whitespace-pre-line">{data.title.part2}</Typography.Text>
    </Typography>
    <Typography as="h3" variant="section-subtitle" className="w-full text-balance">
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
