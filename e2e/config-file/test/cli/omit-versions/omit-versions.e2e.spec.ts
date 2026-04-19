import fs from "node:fs/promises";
import { runCli } from "@generate-license-file/e2e-helpers";
import { describe, expect, it } from "vitest";
import { output as outputFileName } from "./config.js";

describe("cli", () => {
  it("should omit versions when omitVersions is true in config", async () => {
    const configPath = "./test/cli/omit-versions/config.js";

    await runCli(["-c", configPath]);

    const result = await fs.readFile(outputFileName, "utf8");

    // Check that the output doesn't contain version numbers
    // Should not contain patterns like "@1.0.0" or "dep-one@1.0.0"
    expect(result).not.toMatch(/@\d+\.\d+\.\d+/);

    // Should contain package names without versions
    expect(result).toMatch(/dep-one/);
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
