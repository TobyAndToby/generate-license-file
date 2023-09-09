import { GetLicenseFileTextOptions, getLicenseFileText } from "../src/lib/getLicenseFileText";
import { resolveLicenses } from "../src/lib/internal/resolveLicenses";
import { lineEndings, getLineEndingCharacters } from "../src/lib/lineEndings";
import { License } from "../src/lib/models/license";
import { readFile } from "../src/lib/utils/file.utils";
import { when } from "jest-when";

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

  it("should format each returned license", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];

    mockedResolveLicenses.mockResolvedValue(licenses);

    await getLicenseFileText("path");

    licenses.forEach(license => expect(license.format).toHaveBeenCalledTimes(1));
  });

  it.each([...lineEndings, undefined])(
    `should format each returned license with the appropriate line ending for %s`,
    async lineEnding => {
      const expectedLineEndingValue = getLineEndingCharacters(lineEnding);
      const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];

      mockedResolveLicenses.mockResolvedValue(licenses);

      await getLicenseFileText("path", { lineEnding });

      for (const license of licenses) {
        const firstCallFirstArg = jest.mocked(license.format).mock.calls[0][0];
        expect(firstCallFirstArg).toBe(expectedLineEndingValue);
      }
    },
  );

  it("should return the concatenated formatted licenses", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path");

    expect(/.*?first.*?second.*?third.*/s.test(result)).toBeTruthy();
  });

  it("should return formatted licenses concatenated by dashes and EOLs", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", { lineEnding: "lf" });

    expect(
      /.*?first\n\n-----------\n\nsecond\n\n-----------\n\nthird\n\n-----------\n\n.*/s.test(
        result,
      ),
    ).toBeTruthy();
  });

  it("should return formatted licenses with the credit before and after", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", { lineEnding: "lf" });

    expect(
      result.startsWith(
        "This file was generated with the generate-license-file npm package!\nhttps://www.npmjs.com/package/generate-license-file\n\n",
      ),
    ).toBeTruthy();

    expect(
      result.endsWith(
        "\n\nThis file was generated with the generate-license-file npm package!\nhttps://www.npmjs.com/package/generate-license-file\n",
      ),
    ).toBeTruthy();
  });

  it("should append the given files", async () => {
    when(mockedReadFile)
      .calledWith("first", { encoding: "utf-8" })
      .mockResolvedValue("first file content");
    when(mockedReadFile)
      .calledWith("second", { encoding: "utf-8" })
      .mockResolvedValue("second file content");

    const result = await getLicenseFileText("path", { append: ["first", "second"] });

    expect(result).toContain("first file content");
    expect(result).toContain("second file content");
  });
});

const getNewMockedLicense = () => {
  return {
    content: "content",
    format: jest.fn(),
  } as unknown as License;
};
