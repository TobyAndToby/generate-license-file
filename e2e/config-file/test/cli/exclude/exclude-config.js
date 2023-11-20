const OutputFileNames = require("../../output-filenames");

module.exports = {
  inputs: ["./package.json"],
  output: OutputFileNames.ExcludeConfig,

  // Test that exclusions are not included in the output file.
  exclude: ["dep-five@1.0.0"],
};
