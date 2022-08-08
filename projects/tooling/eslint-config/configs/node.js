module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["**/*.js", "dist", "build"],
  rules: {},
  overrides: [
    {
      files: ["**.spec.ts", "**.spec.tsx"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "@typescript-eslint/no-var-requires": "off",
        "jest/expect-expect": "off",
      },
    },
  ],
};
