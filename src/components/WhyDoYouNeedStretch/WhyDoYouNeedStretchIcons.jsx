import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Flex, Typography } from "../UI";
import { withBase } from "../../utils/withBase";
import useMediaQuery from "../../hooks/useMediaQuery";

const containerStyles = `
  relative w-full max-w-[612px] h-[157px] z-50 my-10 mx-auto
  3xl:h-[321px]
`;

const iconStyles = `
  absolute top-[50%] translate-y-[-50%] left-0 w-full h-full object-contain
  xl:w-[615px] xl:h-auto
`;

const detailsStyles = `
  h-full origin-top absolute bottom-0 translate-y-[100%] w-full max-w-[350px] 2xl:max-w-[450px] left-[50%] translate-x-[-50%] text-left 
  lg:translate-y-[100%]
  xl:translate-y-[105%]
  3xl:bottom-20 3xl:translate-y-full 3xl:text-justify 3xl:text-[24px] 3xl:left-0 3xl:translate-x-[25%]
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
    <>
      {items.map((item, index) => (
        <Flex key={index} align="items-center" justify="justify-center" className={containerStyles}>
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
          <Flex align="items-center">
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
    </>
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
