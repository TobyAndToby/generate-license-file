/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file.
 * These are explicitly defined here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */
const overridableDefaults = {
  endOfLine: "lf",
  tabWidth: 2,
  printWidth: 80,
  useTabs: false
};

module.exports = {
  ...overridableDefaults,
  printWidth: 100,
  arrowParens: "avoid",
  singleQuote: false,
  trailingComma: "none"
};
