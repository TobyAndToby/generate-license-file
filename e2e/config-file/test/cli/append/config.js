module.exports = {
  inputs: ["./package.json"],
  output: "append-config-output.txt",

  // Test that appendices are used in the output file.
  append: ["./append-content.txt"],
};
