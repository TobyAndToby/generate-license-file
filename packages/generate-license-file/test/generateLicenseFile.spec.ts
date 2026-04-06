import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { generateLicenseFile } from "../src/lib/generateLicenseFile";
import { getLicenseFileText } from "../src/lib/getLicenseFileText";
import { lineEndings } from "../src/lib/lineEndings";
import { writeFileAsync } from "../src/lib/utils/file.utils";

vi.mock("../src/lib/getLicenseFileText", () => ({
  getLicenseFileText: vi.fn(),
}));

vi.mock("../src/lib/utils/file.utils", () => ({
  writeFileAsync: vi.fn(),
}));

const fakeLicenseFileText = "fake license file text";

describe("generateLicenseFile", () => {
  const mockGetLicenseFileText = vi.mocked(getLicenseFileText);
  const mockWriteFileAsync = vi.mocked(writeFileAsync);

  beforeEach(() => {
    vi.resetAllMocks();
    mockGetLicenseFileText.mockResolvedValue(fakeLicenseFileText);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("when one path is given", () => {
    it("should call getLicenseFileText with the given path in an array", async () => {
      const path = "given path value";

      await generateLicenseFile(path, "outputPath");

      const firstCallFirstArg = mockGetLicenseFileText.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual([path]);
    });
  });

  describe("when an array of paths are given", () => {
    it("should call getLicenseFileText with the given array of paths", async () => {
      const paths = ["the first path", "the second path"];

      await generateLicenseFile(paths, "outputPath");

      const firstCallFirstArg = mockGetLicenseFileText.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(paths);
    });
  });

  it.each([...lineEndings, undefined])("should call getLicenseFileText with the line ending %s", async (lineEnding) => {
    await generateLicenseFile("path", "outputPath", { lineEnding });

    const firstCallSecondArg = mockGetLicenseFileText.mock.calls[0][1];
    expect(firstCallSecondArg?.lineEnding).toBe(lineEnding);
  });

  it("should call writeFileAsync", async () => {
    await generateLicenseFile("path", "outputPath");

    expect(mockWriteFileAsync).toHaveBeenCalledTimes(1);
  });

  it("should call writeFileAsync with the given output path", async () => {
    const outputPath = "given output path value";

    await generateLicenseFile("path", outputPath);

    const firstCallFirstArg = mockWriteFileAsync.mock.calls[0][0];
    expect(firstCallFirstArg).toBe(outputPath);
  });

  it("should call writeFileAsync with the returned license file content", async () => {
    await generateLicenseFile("path", "outputPath");

    const firstCallSecondArg = mockWriteFileAsync.mock.calls[0][1];
    expect(firstCallSecondArg).toBe(fakeLicenseFileText);
  });
});
