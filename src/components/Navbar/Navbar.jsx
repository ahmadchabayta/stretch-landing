import { useState, useEffect, useRef } from "react";
import Burger from "./Burger/Burger";
import MobileMenu from "./Menu/MobileMenu";
import useMediaQuery from "../../hooks/useMediaQuery";
import useClickOutside from "../../hooks/useClickOutside";
import NavbarControl from "./NavbarControl/NavbarControl";
import Menu from "./Menu/Menu";
import { useLanguage } from "../../context/LanguageContext";
import rawData from "./navbar.data.json";
import { withBase } from "../../utils/withBase";
import { Container } from "../UI";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const data = rawData.languages?.[language] || rawData.languages?.en;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuRef = useRef(null);

  const isDesktopOrUp = useMediaQuery("xl");

  useEffect(() => {
    if (isDesktopOrUp && isMenuOpen) {
      // defer to avoid setState directly in effect body per lint
      queueMicrotask(() => setIsMenuOpen(false));
    }
  }, [isDesktopOrUp, isMenuOpen]);

  useClickOutside({
    ref: menuRef,
    onClickOutside: () => setIsMenuOpen(false),
    enabled: isMenuOpen,
    ignoreSelector: 'button[aria-label="Toggle menu"]',
  });

  return (
    <Container className="bg-white">
      <nav>
        <div className="relative flex h-[94px] items-center justify-between md:h-[170px]">
          <img
            src={withBase(rawData.images.logo)}
            alt="Stretch Logo"
            className="w-[171px] lg:w-[230px]"
            loading="eager"
          />

          <>
            <Burger className="flex xl:hidden" onClick={toggleMenu} isOpen={isMenuOpen} />

            <MobileMenu
              ref={menuRef}
              isOpen={isMenuOpen}
              data={data}
              linkUrls={rawData.link_urls}
            />

            <Menu
              className="hidden min-w-[50%] justify-center xl:flex"
              isOpen={true}
              data={data}
              linkUrls={rawData.link_urls}
            />
          </>

          <NavbarControl className="hidden xl:flex" data={data} />
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
