const OutputFileNames = require("../test/output-filenames");

module.exports = {
  inputs: ["./package.json"],
  output: OutputFileNames.ApppendConfig,

  // Test that appendices are used in the output file.
  append: ["./append-content.txt"],
};
