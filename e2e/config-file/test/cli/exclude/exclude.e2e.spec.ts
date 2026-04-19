import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { output as outputFileName } from "./config.js";

const execAsync = promisify(exec);

describe("cli", () => {
  it("should match snapshot when content is excluded", async () => {
    const configPath = "./test/cli/exclude/config.js";

    await execAsync(`node ../../packages/generate-license-file/bin/generate-license-file -c ${configPath}`);

    const result = await fs.readFile(outputFileName, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
