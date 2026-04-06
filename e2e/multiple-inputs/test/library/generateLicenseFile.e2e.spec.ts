import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { generateLicenseFile } from "generate-license-file";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("generateLicenseFile", () => {
  let tmpDir: string;

  beforeAll(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "glf-e2e-multi-"));
  });

  afterAll(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it("should match snapshot", async () => {
    const inputPaths = ["./package.json", "./../npm-package/package.json"];
    const outputPath = path.join(tmpDir, "output.txt");

    await generateLicenseFile(inputPaths, outputPath);

    const fileContent = await fs.readFile(outputPath, "utf8");
    expect(fileContent).toMatchSnapshot();
  });
});
