import PropTypes from "prop-types";
import { Wrapper, Typography } from "../../components";
import GlassCircle from "../UI/GlassCircle";

const CapabilityCard = ({ card, isActive, onClick }) => (
  <Wrapper
    className={
      "relative h-[185px] w-40 lg:w-[285px] lg:h-[336px] xl:w-[259px] xl:h-[353px] 3xl:w-[308px] 3xl:h-[353px] shrink-0 cursor-pointer p-4 transition-all duration-300 ease-in-out  "
    }
    onClick={onClick}
  >
    <div
      className={`relative flex h-full w-full flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-300 ease-in-out lg:rounded-3xl lg:border-2 lg:border-black ${
        isActive ? "bg-secondary border-none" : "border border-black bg-transparent"
      }`}
    >
      <card.icon className={card.sizeClassName} isActive={isActive} />
      <Typography
        as="p"
        className={`flex h-auto w-full items-center justify-center text-center text-[14px] font-bold transition-colors duration-300 ease-in-out select-none lg:text-[22px] ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {card.title}
      </Typography>
    </div>
    <GlassCircle
      className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[85px] w-[85px] -translate-x-1/2 -translate-y-1/2 lg:h-[163px] lg:w-[163px]"
      blur={15}
      noiseIntensity={0.1}
      distortionScale={8}
      reflectionIntensity={10}
      glassColor="rgba(150, 150, 150, 0.2)"
      borderColor="rgba(0, 0, 0, 0.1)"
      borderWidth={1}
    />
  </Wrapper>
);

CapabilityCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    sizeClassName: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CapabilityCard;
