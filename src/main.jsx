import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line import/namespace
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
);
