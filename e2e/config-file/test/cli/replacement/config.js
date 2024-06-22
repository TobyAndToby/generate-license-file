module.exports = {
  inputs: ["./package.json"],
  output: "replacement-config-output.txt",

  // Test that replacements are used in the output file.
  replace: {
    "dep-one": "./name-only-replacement-content.txt",

    "dep-three": "./some-path-that-we-dont-want-to-use.txt",
    "dep-three@1.0.0": "./name-and-version-replacement-content.txt",
    "dep-four":
      "https://raw.githubusercontent.com/TobyAndToby/generate-license-file/c671e5b374285868866ccdb64b42e74237240c12/e2e/.remote-licenses/license.md",
  },
};
