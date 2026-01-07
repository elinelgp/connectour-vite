// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
// add Prettier support
import prettierConfig from "eslint-plugin-prettier/recommended";
import { globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettierConfig, // extend ESLint with Prettier config
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // add Prettier rules
      "prettier/prettier": [
        "off",
        {
          singleQuote: false,
          printWidth: 100,
          tabWidth: 2,
          semi: true,
          trailingComma: "es5",
          bracketSpacing: true,
          endOfLine: "lf",
        },
      ],
    },
  },
]);
