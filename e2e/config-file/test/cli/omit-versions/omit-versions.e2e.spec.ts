import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

describe("cli", () => {
  it("should omit versions when omitVersions is true in config", async () => {
    const configPath = "./test/cli/omit-versions/config.js";

    await execAsync(`npx generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputFileName, "utf8");

    expect(result).not.toMatch(/@\d+\.\d+\.\d+/);
    expect(result).toMatch(/dep-one/);
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
