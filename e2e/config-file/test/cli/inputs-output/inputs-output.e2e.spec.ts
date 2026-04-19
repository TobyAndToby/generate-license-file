import fs from "node:fs/promises";
import { runCli } from "@generate-license-file/e2e-helpers";
import { describe, expect, it } from "vitest";
import { output as outputFileName } from "./config.js";

describe("cli", () => {
  it("should match snapshot when inputs and outputs are provided via config file", async () => {
    const configPath = "./test/cli/inputs-output/config.js";

    await runCli(["-c", configPath]);

    const result = await fs.readFile(outputFileName, "utf8");
    expect(result).toMatchSnapshot();

    await fs.unlink(outputFileName);
  });
});
