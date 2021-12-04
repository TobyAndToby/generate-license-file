import { mocked } from "ts-jest/utils";
import { getProjectLicenses } from "../src/getProjectLicenses";
import { getProjectLicensesInternal } from "../src/internal/getProjectLicensesInternal";
import { License } from "../src/models/license";

jest.mock("../src/internal/getProjectLicensesInternal", () => ({
  getProjectLicensesInternal: jest.fn()
}));

describe("getProjectLicenses", () => {
  const mockGetProjectLicensesInternal = mocked(getProjectLicensesInternal);

  beforeEach(() => {
    jest.resetAllMocks();

    mockGetProjectLicensesInternal.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should call the internal getProjectLicenses", async () => {
    await getProjectLicenses("path");

    expect(mockGetProjectLicensesInternal).toHaveBeenCalledTimes(1);
  });

  it("should call the internal getProjectLicenses with the given path", async () => {
    const path = "the given path";

    await getProjectLicenses(path);

    expect(mockGetProjectLicensesInternal).toHaveBeenCalledWith(path);
  });

  it("should return the response from the internal getProjectLicenses", async () => {
    const licenses: License[] = [
      new License("stuff", ["a", "b"]),
      new License("also stuff", ["c", "d"])
    ];

    mockGetProjectLicensesInternal.mockResolvedValue(licenses);

    const result = await getProjectLicenses("path");

    expect(result).toStrictEqual(licenses);
  });
});
