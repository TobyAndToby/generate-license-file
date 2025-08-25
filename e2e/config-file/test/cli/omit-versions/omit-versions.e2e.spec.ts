import { exec } from "child_process";
import fs from "fs/promises";
import { promisify } from "util";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

describe("cli", () => {

  it("should omit versions when omitVersions is true in config", async () => {
    const configPath = "./test/cli/omit-versions/config.js";

    await execAsync(`npx generate-license-file -c ${configPath}`);

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
