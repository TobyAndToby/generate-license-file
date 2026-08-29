// The http replacement below is served by a local HTTP server which is started by
// replacement.e2e.spec.ts. Its origin is passed in through the environment so that the
// server can bind an ephemeral port rather than racing for a fixed one. The fallback is
// an unused local port, so a run without the server fails fast instead of hitting the network.
const licenseServerOrigin = process.env.GLF_E2E_LICENSE_SERVER_ORIGIN ?? "http://127.0.0.1:1";

module.exports = {
  inputs: ["./package.json"],
  output: "replacement-config-output.txt",

  // Test that replacements are used in the output file.
  replace: {
    "dep-one": "./name-only-replacement-content.txt",

    "dep-three": "./some-path-that-we-dont-want-to-use.txt",
    "dep-three@1.0.0": "./name-and-version-replacement-content.txt",
    "dep-four": `${licenseServerOrigin}/license.md`,
  },
};
