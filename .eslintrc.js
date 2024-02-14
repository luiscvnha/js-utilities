/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  ignorePatterns: [
    "dist/**/*",
    ".eslintrc.js",
    "jest.config.js",
    "webpack.config.js",
  ],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "indent": ["warn", 2, { SwitchCase: 1 }],
    "quotes": ["warn", "double"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/explicit-member-accessibility": "error",
  },
};

module.exports = config;
