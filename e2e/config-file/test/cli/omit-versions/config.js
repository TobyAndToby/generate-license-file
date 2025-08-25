module.exports = {
  inputs: ["./package.json"],
  output: "omit-versions-config-output.txt",

  // Test that versions are omitted from the output file.
  omitVersions: true,
};