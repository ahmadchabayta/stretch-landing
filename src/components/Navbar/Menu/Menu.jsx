import PropTypes from "prop-types";
import { useState } from "react";
import cn from "../../../utils/cn";
import { Flex } from "../..";

const Menu = ({ data, className }) => {
  // store a single active index so only one arrow is open at a time
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleIndex = (i) => {
    setActiveIndex(i);
  };
  return (
    <Flex
      flex={true}
      justify="justify-evenly"
      spaceX="space-x-0 xl:space-x-2 3xl:space-x-8"
      className={cn("w-full max-w-[716px]", className)}
    >
      {data.menu_items.map((item, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={`${item}_${i}`}
            type="button"
            onClick={() => toggleIndex(i)}
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
  linkUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default Menu;
