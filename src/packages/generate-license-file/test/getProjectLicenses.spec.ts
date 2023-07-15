import { GetProjectLicensesOptions, getProjectLicenses } from "../src/lib/getProjectLicenses";
import { resolveLicenses } from "../src/lib/internal/resolveLicenses";
import { License } from "../src/lib/models/license";

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

  it("should return the response from resolveLicenses", async () => {
    const licenses: License[] = [
      new License("stuff", ["a", "b"]),
      new License("also stuff", ["c", "d"]),
    ];

    mockedResolveLicenses.mockResolvedValue(licenses);

    const result = await getProjectLicenses("path");

    expect(result).toStrictEqual(licenses);
  });
});
