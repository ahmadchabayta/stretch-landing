import PropTypes from "prop-types";

import { Flex, Typography, Button } from "..";

const FooterCTA = ({ labels, language }) => (
  <Flex
    direction="flex-col"
    align="items-center"
    justify="justify-center"
    spaceY="space-y-8"
    className="mx-auto mt-8 max-w-3xl flex-1 text-center"
  >
    <Typography
      as="p"
      variant="footer-desc"
      className={language === "ar" ? "font-[Tajawal,sans-serif]" : ""}
    >
      {labels.description}
    </Typography>

    <Flex
      direction="flex-col xl:flex-row"
      align="items-center"
      justify="justify-center"
      spaceY="space-y-[29px] xl:space-y-0"
      spaceX="xl:space-x-4 3xl:space-x-[60px]!"
      className="mt-10!"
    >
      <Button variant="demo" className={`${language === "ar" ? "font-[Tajawal,sans-serif]" : ""}`}>
        {labels.button_label.demo_button_label}
      </Button>
      <Button
        variant="footer_contact"
        className={`px-12 ${language === "ar" ? "font-[Tajawal,sans-serif]" : ""}`}
      >
        {labels.button_label.contact_button_label}
      </Button>
    </Flex>
  </Flex>
);

FooterCTA.propTypes = {
  labels: PropTypes.shape({
    description: PropTypes.string.isRequired,
    button_label: PropTypes.shape({
      demo_button_label: PropTypes.string.isRequired,
      contact_button_label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default FooterCTA;
