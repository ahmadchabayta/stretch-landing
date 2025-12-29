import PropTypes from "prop-types";

import { withBase } from "../../utils/withBase";

const DecorativeCircle = ({ type, onClick }) => {
  const circles = {
    background: {
      className:
        "pointer-events-none absolute left-[-63px] top-0 w-[539.399px] h-[809px] rotate-90 3xl:left-0 3xl:top-0 3xl:w-[1896px] 3xl:h-[1080px] 3xl:rotate-0 z-[500]",
      style: {
        backgroundImage: `url(${withBase("assets/stretch_user_experience/background_blur.webp")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    },
    blueGradient: {
      className:
        "pointer-events-none hidden 3xl:block absolute left-[41px] top-[364px] w-[554px] h-[554px]",
      children: (
        <div
          className="absolute inset-0 rounded-full bg-linear-to-br from-[#1849EB] to-[#0F2A9A] blur-2xl"
          style={{ opacity: 0.8 }}
        />
      ),
    },
    shadow: {
      className:
        "pointer-events-none hidden 3xl:block absolute left-[70px] top-[637px] w-[347.25px] h-[331.825px] rotate-[355.224deg] skew-x-[0.459deg]",
      children: (
        <div className="h-full w-full rounded-[613.235px] bg-transparent shadow-[11.765px_11.765px_15.882px_-5.882px_rgba(0,0,0,0.25)]" />
      ),
    },
    orange: {
      className:
        "hidden 3xl:flex absolute right-[287.49px] top-[516.75px] w-[56.278px] h-[54.347px] items-center justify-center cursor-pointer hover:scale-110 transition-transform",
      children: <div className="h-[49.234px] w-[49.234px] rounded-full bg-[#FF4200]" />,
      onClick: true,
    },
  };

  const config = circles[type];

  if (!config) return null;

  return (
    <div
      className={config.className}
      style={config.style}
      onClick={config.onClick ? onClick : undefined}
      onKeyDown={
        config.onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick(e);
            }
          : undefined
      }
      role={config.onClick ? "button" : undefined}
      tabIndex={config.onClick ? 0 : undefined}
    >
      {config.children}
    </div>
  );
};

DecorativeCircle.propTypes = {
  type: PropTypes.oneOf(["background", "blueGradient", "shadow", "orange"]).isRequired,
  onClick: PropTypes.func,
};

export default DecorativeCircle;
