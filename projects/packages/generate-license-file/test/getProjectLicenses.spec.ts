import { getProjectLicenses } from "../src/getProjectLicenses";
import { getLicencesForProjects } from "../src/internal/getLicencesForProjects";
import { License } from "../src/models/license";

jest.mock("../src/internal/getLicencesForProjects", () => ({
  getLicencesForProjects: jest.fn(),
}));

describe("getProjectLicenses", () => {
  const mockGetLicencesForProjects = jest.mocked(getLicencesForProjects);

  beforeEach(() => {
    jest.resetAllMocks();

    mockGetLicencesForProjects.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should call the internal getProjectLicenses", async () => {
    await getProjectLicenses("path");

    expect(mockGetLicencesForProjects).toHaveBeenCalledTimes(1);
  });

  it("should call the internal getProjectLicenses with the given path", async () => {
    const path = "the given path";

    await getProjectLicenses(path);

    expect(mockGetLicencesForProjects).toHaveBeenCalledWith([path]);
  });

  it("should return the response from the internal getProjectLicenses", async () => {
    const licenses: License[] = [
      new License("stuff", ["a", "b"]),
      new License("also stuff", ["c", "d"]),
    ];

    mockGetLicencesForProjects.mockResolvedValue(licenses);

    const result = await getProjectLicenses("path");

    expect(result).toStrictEqual(licenses);
  });
});
