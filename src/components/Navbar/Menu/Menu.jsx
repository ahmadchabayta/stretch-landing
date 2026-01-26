import PropTypes from "prop-types";
import { useState } from "react";
import cn from "../../../utils/cn";
import { Flex } from "../..";
import useScrollToSection from "../../../hooks/useScrollToSection";

const Menu = ({ data, menuLinks, className }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollToSection } = useScrollToSection();

  const handleClick = (i, linkId) => {
    setActiveIndex(i);
    scrollToSection(linkId);
  };

  return (
    <Flex className={cn("w-full max-w-[30vw]", className)}>
      {data.menu_items.map((item, i) => {
        const isActive = activeIndex === i;
        const linkId = menuLinks?.[i] || "";
        return (
          <button
            key={`${item}_${i}`}
            type="button"
            onClick={() => handleClick(i, linkId)}
            className="menu_links_typography w-full cursor-pointer px-0 py-1"
          >
            <span className={`${isActive ? "font-black" : "font-semibold"}`}>{item}</span>
          </button>
        );
      })}
    </Flex>
  );
};

Menu.propTypes = {
  data: PropTypes.shape({
    menu_items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  menuLinks: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default Menu;
