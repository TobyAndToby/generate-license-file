const OutputFileNames = require("../../output-filenames");

module.exports = {
  inputs: ["./package.json"],
  output: OutputFileNames.ReplacementConfig,

  // Test that replacements are used in the output file.
  replace: {
    "dep-one@1.0.0": "./replacement-content.txt",
  },
};
