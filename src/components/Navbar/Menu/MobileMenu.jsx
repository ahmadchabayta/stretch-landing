import React from "react";
import PropTypes from "prop-types";
import NavbarControl from "../NavbarControl/NavbarControl";
import ArrowIcon from "../ArrowIcon";
import useScrollToSection from "../../../hooks/useScrollToSection";
import { useLanguage } from "../../../context/LanguageContext";

const MobileMenu = React.forwardRef(({ isOpen, data, linkUrls }, ref) => {
  const { activeLink, scrollToSection } = useScrollToSection();
  const { isRTL } = useLanguage();

  return (
    <div
      className={`absolute top-[70%] z-50 flex h-auto w-[300px] flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-in-out ${
        isRTL ? "left-0" : "right-0"
      } ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
      ref={ref}
    >
      {/* Menu Items */}
      <div className="flex flex-col py-3">
        {data.menu_items.map((item, i) => {
          const url = linkUrls[i];
          const isActive = activeLink === url;
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollToSection(url)}
              className={`menu_links_typography flex w-full cursor-pointer items-center justify-between px-5 py-3.5 transition-all duration-200 ease-in-out hover:bg-gray-50 ${
                isActive ? "bg-gray-50 font-black" : "font-semibold"
              }`}
            >
              <span>{item}</span>
              <ArrowIcon
                className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Controls Section */}
      <div className="flex flex-col border-t border-gray-200 bg-gray-50 px-5 py-4">
        <NavbarControl data={data} />
      </div>
    </div>
  );
});

MobileMenu.displayName = "MobileMenu";

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    menu_items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  linkUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MobileMenu;
