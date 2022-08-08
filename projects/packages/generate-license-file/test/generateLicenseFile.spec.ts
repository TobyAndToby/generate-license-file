import { generateLicenseFile } from "../src/generateLicenseFile";
import { getLicenseFileText } from "../src/getLicenseFileText";
import { allLineEndings } from "../src/lineEndings";
import { writeFileAsync } from "../src/utils/file.utils";

jest.mock("../src/getLicenseFileText", () => ({
  getLicenseFileText: jest.fn()
}));

jest.mock("../src/utils/file.utils", () => ({
  writeFileAsync: jest.fn()
}));

const fakeLicenseFileText = "fake license file text";

describe("generateLicenseFile", () => {
  const mockGetLicenseFileText = jest.mocked(getLicenseFileText);
  const mockWriteFileAsync = jest.mocked(writeFileAsync);

  beforeEach(() => {
    jest.resetAllMocks();
    mockGetLicenseFileText.mockResolvedValue(fakeLicenseFileText);
  });

  afterAll(() => {
    jest.restoreAllMocks();
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

  [...allLineEndings, undefined].forEach(lineEnding =>
    it(`should call getLicenseFileText with the given line ending (${lineEnding})`, async () => {
      await generateLicenseFile("path", "outputPath", lineEnding);

      const firstCallSecondArg = mockGetLicenseFileText.mock.calls[0][1];
      expect(firstCallSecondArg).toBe(lineEnding);
    })
  );

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
