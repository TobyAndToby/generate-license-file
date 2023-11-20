const OutputFileNames = require("../../output-filenames");

module.exports = {
  // Test that the input and output config is picked up from config correctly.
  inputs: ["./package.json"],
  output: OutputFileNames.InputsOutputConfig,
};
