import { mocked } from "ts-jest/utils";
import { generateLicenseFile, LineEnding } from "../src/generateLicenseFile";
import { getLicenseFileText } from "../src/getLicenseFileText";
import { writeFileAsync } from "../src/utils/file.utils";

jest.mock("../src/getLicenseFileText", () => ({
  getLicenseFileText: jest.fn()
}));

jest.mock("../src/utils/file.utils", () => ({
  writeFileAsync: jest.fn()
}));

const fakeLicenseFileText = "fake license file text";

describe("generateLicenseFile", () => {
  const mockGetLicenseFileText = mocked(getLicenseFileText);
  const mockWriteFileAsync = mocked(writeFileAsync);

  beforeEach(() => {
    mockGetLicenseFileText.mockReset();
    mockGetLicenseFileText.mockResolvedValue(fakeLicenseFileText);
    mockWriteFileAsync.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should call getLicenseFileText", async () => {
    await generateLicenseFile("path", "outputPath");

    expect(mockGetLicenseFileText).toHaveBeenCalledTimes(1);
  });

  it("should call getLicenseFileText with the given path", async () => {
    const path = "given path value";

    await generateLicenseFile(path, "outputPath");

    const firstCallFirstArg = mockGetLicenseFileText.mock.calls[0][0];
    expect(firstCallFirstArg).toBe(path);
  });

  (["posix", "windows", undefined] as LineEnding[]).forEach(lineEnding =>
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

  it("should call writeFileAsync with the returned licence file content", async () => {
    await generateLicenseFile("path", "outputPath");

    const firstCallSecondArg = mockWriteFileAsync.mock.calls[0][1];
    expect(firstCallSecondArg).toBe(fakeLicenseFileText);
  });

  it("should call writeFileAsync with the a utf8 encoding", async () => {
    await generateLicenseFile("path", "outputPath");

    const firstCallThirdArg = mockWriteFileAsync.mock.calls[0][2] as any;
    expect(firstCallThirdArg.encoding).toBe("utf-8");
  });
});
