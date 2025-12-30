import PropTypes from "prop-types";
import rawData from "./audience_mirroring.data.json";

const InteractiveImage = ({ data }) => (
  <div
    style={{
      backgroundImage: "url('assets/audience_mirroring/gradient_bg.webp')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    }}
    className="3xl:h-[477px] 3xl:max-w-[1527px] bg-fill relative mx-auto flex h-[868px] min-w-[190px] items-center bg-center "
  >
    {rawData.images.map(({ id, src, alt, className }) => (
      <img key={id} src={src} alt={alt} className={className} />
    ))}
    <div
      className="primary-btn bg-primary absolute top-[48%] left-[50%] flex h-[41px] w-[309px] max-w-none translate-x-[-50%] items-center justify-center rounded-sm p-[8px_24px] text-center font-[Tajawal] text-[16px] font-semibold text-white"
      style={{ borderRadius: "8px" }}
      dir="rtl"
    >
      {data.decorative_btn_label}
    </div>
  </div>
);

InteractiveImage.propTypes = {
  data: PropTypes.shape({
    decorative_btn_label: PropTypes.string,
  }).isRequired,
};

export default InteractiveImage;
