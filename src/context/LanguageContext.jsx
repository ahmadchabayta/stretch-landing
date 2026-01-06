import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LanguageContext = createContext(undefined);

const LANGUAGES = {
  en: { code: "en", label: "English", flag: "gb.webp", dir: "ltr" },
  ar: { code: "ar", label: "العربية", flag: "sa.webp", dir: "rtl" },
};

const STORAGE_KEY = "stretch_language";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Initialize from localStorage or default to English
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && LANGUAGES[stored] ? stored : "en";
  });

  useEffect(() => {
    // Persist language preference
    localStorage.setItem(STORAGE_KEY, language);

    // Update document direction and lang attribute
    const dir = LANGUAGES[language].dir;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Keyboard shortcuts: Ctrl+1 for English, Ctrl+2 for Arabic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "1") {
        setLanguage("en");
      } else if (e.ctrlKey && e.key === "2") {
        setLanguage("ar");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const changeLanguage = (code) => {
    if (LANGUAGES[code]) {
      setLanguage(code);
    }
  };

  const value = {
    language,
    changeLanguage,
    currentLanguage: LANGUAGES[language],
    languages: Object.values(LANGUAGES),
    isRTL: LANGUAGES[language].dir === "rtl",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
