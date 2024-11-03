import { when } from "jest-when";
import { getLicenseFileText, GetLicenseFileTextOptions } from "../src/lib/getLicenseFileText";
import { ResolvedLicense, resolveLicenses } from "../src/lib/internal/resolveLicenses";
import { readFile } from "../src/lib/utils/file.utils";

jest.mock("../src/lib/internal/resolveLicenses", () => ({
  resolveLicenses: jest.fn(),
}));

jest.mock("../src/lib/utils/file.utils");

describe("getLicenseFileText", () => {
  const mockedResolveLicenses = jest.mocked(resolveLicenses);
  const mockedReadFile = jest.mocked(readFile);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedResolveLicenses.mockResolvedValue([]);
  });

  afterAll(jest.restoreAllMocks);

  describe("when one path is given", () => {
    it("should call resolveLicenses with the given path in an array", async () => {
      const path = "the given path";

      await getLicenseFileText(path);

      expect(mockedResolveLicenses).toHaveBeenCalledWith([path], undefined);
    });
  });

  describe("when an array of paths are given", () => {
    it("should call resolveLicenses with the given paths", async () => {
      const paths = ["the first path", "the second path"];

      await getLicenseFileText(paths);

      expect(mockedResolveLicenses).toHaveBeenCalledWith(paths, undefined);
    });
  });

  it("should pass the options to resolveLicenses", async () => {
    const options: GetLicenseFileTextOptions = {
      lineEnding: "lf",
    };

    await getLicenseFileText("path", options);

    expect(mockedResolveLicenses).toHaveBeenCalledWith(["path"], options);
  });

  it("should use crlf line endings when configured to", async () => {
    const options: GetLicenseFileTextOptions = {
      lineEnding: "crlf",
    };

    const result = await getLicenseFileText("path", options);

    expect(result).toMatch(/\r\n/);
    expect(result).not.toMatch(/[^\r]\n/);
  });

  it("should use lf line endings when configured to", async () => {
    const options: GetLicenseFileTextOptions = {
      lineEnding: "lf",
    };

    const result = await getLicenseFileText("path", options);

    expect(result).toMatch(/\n/);
    expect(result).not.toMatch(/\r\n/);
  });

  it("should sort the licenses by license content", async () => {
    const licenses: ResolvedLicense[] = [
      { licenseContent: "b: license", noticeContent: "notice", dependencies: [] },
      { licenseContent: "c: license", noticeContent: "notice", dependencies: [] },
      { licenseContent: "a: license", noticeContent: "notice", dependencies: [] },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path");

    console.log({ result });

    const indexOfLicense1 = result.indexOf("a: license");
    const indexOfLicense2 = result.indexOf("b: license");
    const indexOfLicense3 = result.indexOf("c: license");

    expect(indexOfLicense1).toBeLessThan(indexOfLicense2);
    expect(indexOfLicense2).toBeLessThan(indexOfLicense3);
  });

  it("should omit versions if the option is set", async () => {
    const licenses: ResolvedLicense[] = [
      {
        licenseContent: "stuff",
        noticeContent: "notice",
        dependencies: [
          { name: "a", version: "1.0.0" },
          { name: "b", version: "2.0.0" },
        ],
      },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", { omitVersions: true });

    expect(result).not.toMatch("1.0.0");
    expect(result).not.toMatch("2.0.0");
  });

  it("should include versions if the omit option is not set", async () => {
    const licenses: ResolvedLicense[] = [
      {
        licenseContent: "stuff",
        noticeContent: "notice",
        dependencies: [
          { name: "a", version: "1.0.0" },
          { name: "b", version: "2.0.0" },
        ],
      },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", { omitVersions: false });

    expect(result).toMatch("1.0.0");
    expect(result).toMatch("2.0.0");
  });

  it("should append the given files", async () => {
    when(mockedReadFile)
      .calledWith("first", { encoding: "utf-8" })
      .mockResolvedValue("first file content");
    when(mockedReadFile)
      .calledWith("second", { encoding: "utf-8" })
      .mockResolvedValue("second file content");

    const result = await getLicenseFileText("path", { append: ["first", "second"] });

    expect(result).toMatch("first file content");
    expect(result).toMatch("second file content");
  });
});
