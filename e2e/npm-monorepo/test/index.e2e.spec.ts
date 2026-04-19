import fs from "node:fs/promises";
import { runCli } from "@generate-license-file/e2e-helpers";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("when using an npm monorepo", () => {
  let output = "";

  beforeEach(() => {
    output = `./test-${Math.floor(Math.random() * 1000)}.txt`;
  });

  afterEach(async () => {
    await fs.unlink(output);
  });

  describe("top-level package.json", () => {
    it("should match snapshot", async () => {
      await runCli(["--input", "./package.json", "--output", output, "--overwrite", "--eol", "lf"]);

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });
  });

  describe("nested-a package.json", () => {
    it("should match snapshot", async () => {
      await runCli(["--input", "./packages/nested-a/package.json", "--output", output, "--overwrite", "--eol", "lf"]);

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });
  });

  describe("nested-b package.json", () => {
    it("should match snapshot", async () => {
      await runCli(["--input", "./packages/nested-b/package.json", "--output", output, "--overwrite", "--eol", "lf"]);

      const result = await fs.readFile(output, "utf8");
      expect(result).toMatchSnapshot();
    });
  });
});
