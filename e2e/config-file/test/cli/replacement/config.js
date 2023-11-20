module.exports = {
  inputs: ["./package.json"],
  output: "replacement-config-output.txt",

  // Test that replacements are used in the output file.
  replace: {
    "dep-one@1.0.0": "./replacement-content.txt",
  },
};
