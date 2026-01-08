import PropTypes from "prop-types";
import { SectionHeadContainer, Typography } from "../../components";
import StepIndicator from "./StepIndicator";

const SectionTitle = ({ currentStep, data }) => {
  const stepData = data.steps[currentStep - 1] || data.steps[0];

  return (
    <SectionHeadContainer className="w-full relative z-20">
      <Typography as="h2" variant="section-title">
        {data.title.part1}
        <br />
        <Typography.Text className="3xl:whitespace-pre-line">{data.title.part2}</Typography.Text>
      </Typography>
      <StepIndicator
        currentStep={currentStep}
        subtitle={stepData.subtitle}
        subtitleBold={stepData.subtitle_bold}
      />
    </SectionHeadContainer>
  );
};
SectionTitle.propTypes = {
  currentStep: PropTypes.number.isRequired,
  data: PropTypes.shape({
    title: PropTypes.shape({
      title: PropTypes.string.isRequired,
      title_2: PropTypes.string.isRequired,
    }).isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        subtitle: PropTypes.string.isRequired,
        subtitle_bold: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
export default SectionTitle;
