import { getProjectLicenses } from "../src/getProjectLicenses";
import { getLicensesForProjects } from "../src/internal/getLicensesForProjects";
import { License } from "../src/models/license";

jest.mock("../src/internal/getLicensesForProjects", () => ({
  getLicensesForProjects: jest.fn(),
}));

describe("getProjectLicenses", () => {
  const mockGetLicensesForProjects = jest.mocked(getLicensesForProjects);

  beforeEach(() => {
    jest.resetAllMocks();

    mockGetLicensesForProjects.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should call the internal getProjectLicenses", async () => {
    await getProjectLicenses("path");

    expect(mockGetLicensesForProjects).toHaveBeenCalledTimes(1);
  });

  it("should call the internal getProjectLicenses with the given path", async () => {
    const path = "the given path";

    await getProjectLicenses(path);

    expect(mockGetLicensesForProjects).toHaveBeenCalledWith([path]);
  });

  it("should return the response from the internal getProjectLicenses", async () => {
    const licenses: License[] = [
      new License("stuff", ["a", "b"]),
      new License("also stuff", ["c", "d"]),
    ];

    mockGetLicensesForProjects.mockResolvedValue(licenses);

    const result = await getProjectLicenses("path");

    expect(result).toStrictEqual(licenses);
  });
});
