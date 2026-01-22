import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Flex, Typography } from "../UI";
import { withBase } from "../../utils/withBase";
import useMediaQuery from "../../hooks/useMediaQuery";

const containerStyles = `
  relative w-full max-w-[612px] min-h-[157px] z-50 mx-auto h-[331px] flex flex-col
`;

const iconStyles = `
w-full h-full object-contain xl:w-[615px] xl:h-auto
`;

const detailsStyles = `
  h-full w-full max-w-[350px] 2xl:max-w-[450px] text-left 3xl:text-justify 3xl:text-[24px] 
`;

const WhyDoYouNeedStretchIcons = ({ data }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const items = [data.funnel, data.duplicated, data.guessed, data.audience].map((item) => ({
    ...item,
    icon: withBase(item.icon),
  }));

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Flex
      flex="flex lg:grid lg:grid-cols-2"
      direction="flex-col"
      align="items-center place-items-start"
      justify="justify-center"
      gap="lg:gap-y-8"
      className="w-full "
    >
      {items.map((item, index) => (
        <Flex
          key={index}
          align="items-start"
          justify="justify-start"
          direction="flex-col"
          className={containerStyles}
        >
          <div className="w-full flex items-start justify-start">
            {isDesktop ? (
              <img className={iconStyles} src={item.icon} alt={item.issue} />
            ) : (
              <motion.img
                className={iconStyles}
                src={item.icon}
                alt={item.issue}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              />
            )}
          </div>
          <Flex align="items-start justify-center self-start" className="w-full">
            <Typography as="p" variant="section-desc" className={detailsStyles}>
              {typeof item.details === "string" ? (
                item.details
              ) : (
                <>
                  {item.details.part1}{" "}
                  {item.details.bold_part && (
                    <Typography.Text bold>{item.details.bold_part}</Typography.Text>
                  )}
                </>
              )}
            </Typography>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

const detailShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    part1: PropTypes.string.isRequired,
    bold_part: PropTypes.string,
  }),
]);

WhyDoYouNeedStretchIcons.propTypes = {
  data: PropTypes.shape({
    funnel: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      details: detailShape.isRequired,
    }).isRequired,
    duplicated: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      details: detailShape.isRequired,
    }).isRequired,
    guessed: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      details: detailShape.isRequired,
    }).isRequired,
    audience: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      issue: PropTypes.string.isRequired,
      details: detailShape.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WhyDoYouNeedStretchIcons;
