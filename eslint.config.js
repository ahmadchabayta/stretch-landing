import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...prettier.rules,

      // Prettier
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      // Airbnb-style strict rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],

      // React-specific strict rules
      "react/prop-types": 2, // Using TypeScript instead
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "args",
            "position",
            "rotation",
            "rotation-x",
            "rotation-y",
            "rotation-z",
            "scale",
            "intensity",
            "attach",
            "map",
            "transparent",
            "opacity",
            "side",
            "color",
            "castShadow",
            "receiveShadow",
            "roughness",
            "metalness",
            "clearcoat",
            "clearcoatRoughness",
            "linewidth",
            "object",
          ],
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import rules
      "import/prefer-default-export": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-extraneous-dependencies": "off",

      // Accessibility
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["to"],
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
