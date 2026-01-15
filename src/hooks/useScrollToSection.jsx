import { useState } from "react";

const useScrollToSection = () => {
  const [activeLink, setActiveLink] = useState(() =>
    typeof window !== "undefined" ? window.location.hash.slice(1) : "",
  );

  const scrollToSection = (url) => {
    const slug = url.startsWith("/") ? url.slice(1) : url;
    const targetElement = document.getElementById(slug);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.history.pushState(null, "", `#${slug}`);
    setActiveLink(url);
  };

  return { activeLink, scrollToSection };
};

export default useScrollToSection;
