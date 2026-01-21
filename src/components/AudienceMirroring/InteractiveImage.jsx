import PropTypes from "prop-types";
import rawData from "./audience_mirroring.data.json";
import { withBase } from "../../utils/withBase";
import { Container, Flex } from "../UI";

const InteractiveImage = () => {
  return (
    <Container
      style={{
        backgroundImage: `url('${withBase(rawData.images.gradientBg)}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="bg-cover max-w-[1544px] relative mx-auto flex items-center justify-center bg-center"
    >
      <img
        src={withBase(rawData.images.gridBackground)}
        alt="Background"
        className="absolute top-[50%] left-[50%] max-w-[543px] lg:max-w-[1019px] 3xl:max-w-[1209.5px] translate-y-[-50%] translate-x-[-50%] object-contain z-0 rotate-90 lg:rotate-0"
      />

      <img
        src={withBase(rawData.images.matchRate)}
        alt="Match Rate"
        className="absolute z-1 right-0 top-[205px] w-[113px] md:top-[23%] md:right-[12%] lg:right-[20%] lg:top-[-7%] xl:right-[22%] xl:top-[-7%] 2xl:top-[-7%] 2xl:right-[24%] 3xl:right-[29%] 3xl:top-[-10%]"
      />

      <Flex
        direction="flex-col lg:flex-row"
        align="items-center"
        justify="justify-between"
        className="w-full px-4 gap-8 md:gap-4"
      >
        <img
          src={withBase(rawData.images.grayAvatarsLeft)}
          alt="Gray Avatars Left"
          className="w-[150px] md:w-[180px] lg:w-[286px]"
        />

        <div className="relative">
          <img
            src={withBase(rawData.images.purpleAvatar)}
            alt="Orange Vertical Avatar"
            className="w-[190px] md:w-[200px] lg:w-[391px] cursor-pointer grayscale-100 hover:grayscale-0 transition-opacity"
          />
        </div>

        <img
          src={withBase(rawData.images.orangeAvatars)}
          alt="Orange Avatars"
          className="w-[150px] md:w-[180px] lg:w-[286px] md:grayscale-100 hover:grayscale-0 transition-all relative z-30"
        />
      </Flex>
    </Container>
  );
};

InteractiveImage.propTypes = {
  data: PropTypes.shape({
    decorative_btn_label: PropTypes.string,
  }).isRequired,
};

export default InteractiveImage;
