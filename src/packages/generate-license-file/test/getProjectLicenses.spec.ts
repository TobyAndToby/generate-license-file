import { getProjectLicenses, GetProjectLicensesOptions } from "../src/lib/getProjectLicenses";
import { ResolvedLicense, resolveLicenses } from "../src/lib/internal/resolveLicenses";

jest.mock("../src/lib/internal/resolveLicenses", () => ({
  resolveLicenses: jest.fn(),
}));

describe("getProjectLicenses", () => {
  const mockedResolveLicenses = jest.mocked(resolveLicenses);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedResolveLicenses.mockResolvedValue([]);
  });

  afterAll(jest.restoreAllMocks);

  it("should call resolveLicenses", async () => {
    const _ = await getProjectLicenses("path");

    expect(mockedResolveLicenses).toHaveBeenCalledTimes(1);
  });

  it("should call resolveLicenses with the given path", async () => {
    const path = "the given path";

    const _ = await getProjectLicenses(path);

    expect(mockedResolveLicenses).toHaveBeenCalledWith([path], undefined);
  });

  it("should pass the options to resolveLicenses", async () => {
    const options: GetProjectLicensesOptions = {
      replace: {
        a: "b",
      },
      exclude: ["c"],
    };

    const _ = await getProjectLicenses("path", options);

    expect(mockedResolveLicenses).toHaveBeenCalledWith(["path"], options);
  });

  it("should return a license for each result", async () => {
    const licenses: ResolvedLicense[] = [
      {
        licenseContent: "stuff",
        notices: [],
        dependencies: [
          { name: "a", version: "1.0.0" },
          { name: "b", version: "2.0.0" },
        ],
      },
      {
        licenseContent: "also stuff",
        notices: [],
        dependencies: [
          { name: "c", version: "3.0.0" },
          { name: "d", version: "4.0.0" },
        ],
      },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getProjectLicenses("path");

    for (let i = 0; i < licenses.length; i++) {
      expect(result[i]).toEqual({
        content: licenses[i].licenseContent,
        notices: licenses[i].notices,
        dependencies: expect.anything(),
      });
    }
  });

  it("should omit versions if the option is set", async () => {
    const licenses: ResolvedLicense[] = [
      {
        licenseContent: "stuff",
        notices: [],
        dependencies: [
          { name: "a", version: "1.0.0" },
          { name: "b", version: "2.0.0" },
        ],
      },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const options: GetProjectLicensesOptions = {
      omitVersions: true,
    };

    const result = await getProjectLicenses("path", options);

    expect(result[0].dependencies).toEqual(["a", "b"]);
  });

  it("should include versions if the omit option is not set", async () => {
    const licenses: ResolvedLicense[] = [
      {
        licenseContent: "stuff",
        notices: [],
        dependencies: [
          { name: "a", version: "1.0.0" },
          { name: "b", version: "2.0.0" },
        ],
      },
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const options: GetProjectLicensesOptions = {
      omitVersions: false,
    };

    const result = await getProjectLicenses("path", options);

    expect(result[0].dependencies).toEqual(["a@1.0.0", "b@2.0.0"]);
  });
});
