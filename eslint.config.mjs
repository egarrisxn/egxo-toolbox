import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
// import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
// import depend from "eslint-plugin-depend";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // {
  //   settings: {
  //     react: {
  //       version: "detect",
  //     },
  //   },
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  // },
  // {
  //   ...reactYouMightNotNeedAnEffect.configs.recommended,
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  // },
  // {
  //   plugins: { depend },
  //   extends: ["depend/flat/recommended"],
  //   rules: {},
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  // },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "off",
      // "react-hooks/set-state-in-effect": "off",
      // "react-hooks/exhaustive-deps": "off",
      // "react-you-might-not-need-an-effect/no-initialize-state": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  prettier,
]);

export default eslintConfig;
