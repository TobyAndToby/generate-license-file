module.exports = {
  inputs: ["./package.json"],
  output: "exclude-config-output.txt",

  // Test that exclusions are not included in the output file.
  exclude: ["dep-five@1.0.0"],
};
