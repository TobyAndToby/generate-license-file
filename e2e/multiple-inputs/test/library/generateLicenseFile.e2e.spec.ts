import fs from "node:fs/promises";
import { generateLicenseFile } from "generate-license-file";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", async importOriginal => ({
  ...(await importOriginal()),
  writeFile: vi.fn(),
  mkdir: vi.fn(),
}));

describe("generateLicenseFile", () => {
  const mockedWriteFile = vi.mocked(fs.writeFile);

  beforeEach(() => vi.resetAllMocks());
  afterAll(() => vi.restoreAllMocks());

  it("should match snapshot", async () => {
    const inputPaths = ["./package.json", "./../npm-package/package.json"];
    const outputPath = "/output/path.txt";

    await generateLicenseFile(inputPaths, outputPath);

    const fileContent = mockedWriteFile.mock.calls[0][1];
    expect(fileContent).toMatchSnapshot();
  });
});
