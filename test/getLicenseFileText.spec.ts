import { getLicenseFileText } from "../src/getLicenseFileText";
import { getLicencesForProjects } from "../src/internal/getLicencesForProjects";
import { allLineEndings, getLineEndingValue } from "../src/lineEndings";
import { License } from "../src/models/license";

jest.mock("../src/internal/getLicencesForProjects", () => ({
  getLicencesForProjects: jest.fn()
}));

describe("getLicenseFileText", () => {
  const mockGetLicencesForProjects = jest.mocked(getLicencesForProjects);

  beforeEach(() => {
    jest.resetAllMocks();

    mockGetLicencesForProjects.mockResolvedValue([]);
  });

  afterAll(() => jest.restoreAllMocks());

  describe("when one path is given", () => {
    it("should call the internal getProjectLicenses with the given path in an array", async () => {
      const path = "the given path";

      await getLicenseFileText(path);

      expect(mockGetLicencesForProjects).toHaveBeenCalledWith([path]);
    });
  });

  describe("when an array of paths are given", () => {
    it("should call the internal getProjectLicenses with the given paths", async () => {
      const paths = ["the first path", "the second path"];

      await getLicenseFileText(paths);

      expect(mockGetLicencesForProjects).toHaveBeenCalledWith(paths);
    });
  });

  it("should format each returned license", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];

    mockGetLicencesForProjects.mockResolvedValue(licenses);

    await getLicenseFileText("path");

    licenses.forEach(license => expect(license.format).toHaveBeenCalledTimes(1));
  });

  [...allLineEndings, undefined].forEach(lineEnding =>
    it(`should format each returned license with the appropriate line ending for ${lineEnding}`, async () => {
      const expectedLineEndingValue = getLineEndingValue(lineEnding);
      const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];

      mockGetLicencesForProjects.mockResolvedValue(licenses);

      await getLicenseFileText("path", lineEnding);

      for (const license of licenses) {
        const firstCallFirstArg = jest.mocked(license.format).mock.calls[0][0];
        expect(firstCallFirstArg).toBe(expectedLineEndingValue);
      }
    })
  );

  it("should return the concatenated formatted licenses", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockGetLicencesForProjects.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path");

    expect(/.*?first.*?second.*?third.*/s.test(result)).toBeTruthy();
  });

  it("should return formatted licenses concatenated by dashes and EOLs", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockGetLicencesForProjects.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", "lf");

    expect(
      /.*?first\n\n-----------\n\nsecond\n\n-----------\n\nthird\n\n-----------\n\n.*/s.test(result)
    ).toBeTruthy();
  });

  it("should return formatted licenses with the footer", async () => {
    const licenses = [getNewMockedLicense(), getNewMockedLicense(), getNewMockedLicense()];
    jest.mocked(licenses[0].format).mockReturnValue("first");
    jest.mocked(licenses[1].format).mockReturnValue("second");
    jest.mocked(licenses[2].format).mockReturnValue("third");

    mockGetLicencesForProjects.mockResolvedValue(licenses);

    const result = await getLicenseFileText("path", "lf");

    expect(
      result.endsWith(
        "\n\nThis file was generated with generate-license-file! https://www.npmjs.com/package/generate-license-file\n"
      )
    ).toBeTruthy();
  });
});

const getNewMockedLicense = () => {
  return {
    format: jest.fn()
  } as unknown as License;
};
