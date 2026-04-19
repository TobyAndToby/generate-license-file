import fs from "node:fs/promises";
import { runCli } from "@generate-license-file/e2e-helpers";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("cli", () => {
  let output = "";

  beforeEach(() => {
    output = `./test-${Math.floor(Math.random() * 1000)}.txt`;
  });

  afterEach(async () => {
    await fs.unlink(output);
  });

  it("should match snapshot", async () => {
    await runCli([
      "--input",
      "./package.json",
      "--input",
      "./../npm-package/package.json",
      "--output",
      output,
    ]);

    const result = await fs.readFile(output, "utf8");
    expect(result).toMatchSnapshot();
  });
});
