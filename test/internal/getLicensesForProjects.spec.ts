import { InitOpts } from "license-checker";
import { mocked } from "ts-jest/utils";
import { getLicencesForProjects } from "../../src/internal/getLicencesForProjects";
import { License } from "../../src/models/license";
import console from "../../src/utils/console.utils";
import { doesFileExist, readFile } from "../../src/utils/file.utils";
import { Dependency, getProject, Project } from "../../src/utils/license.utils";
import { readPackageJson } from "../../src/utils/packageJson.utils";

jest.mock("../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
  readFile: jest.fn(),
  doesFolderExist: jest.fn()
}));

jest.mock("../../src/utils/console.utils", () => ({
  log: jest.fn(),
  warn: jest.fn()
}));

jest.mock("../../src/utils/license.utils", () => ({
  getProject: jest.fn()
}));

jest.mock("../../src/utils/packageJson.utils", () => ({
  readPackageJson: jest.fn()
}));

describe("getLicencesForProjects", () => {
  const mockDoesFileExist = mocked(doesFileExist);
  const mockReadFile = mocked(readFile);
  const mockConsoleWarn = mocked(console.warn);
  const mockGetProject = mocked(getProject);
  const mockReadPackageJson = mocked(readPackageJson);

  const dep1Name = "dep1";
  const dep2Name = "dep2";
  const dep3Name = "dep3";
  const dep4Name = "dep4";
  const dep5Name = "dep5";

  const dep1LicenseFile = "dep1.license";
  const dep2LicenseFile = "dep2.license";
  const dep3LicenseFile = "dep3.license";
  const dep4LicenseFile = "dep4.license";
  const dep5LicenseFile = "dep5.license";

  let dep1: Dependency;
  let dep2: Dependency;
  let dep3: Dependency;
  let dep4: Dependency;
  let dep5: Dependency;

  // While deps 1 and 4 have licenses in different file locations,
  // Those two files contain the exact same license text.
  const licenceContentForDep1And4 = "licenceContentForDep1And4";
  const licenceContentForDep2 = "licenceContentForDep2";
  const licenceContentForDep3 = "licenceContentForDep3";
  const licenceContentForDep5 = "licenceContentForDep5";

  let project1: Project;
  let project2: Project;

  const project1Location = "path/to/project1/package.json";
  const project2Location = "path/to/project2/package.json";

  beforeEach(() => {
    dep1 = { name: dep1Name, licenseFile: dep1LicenseFile };
    dep2 = { name: dep2Name, licenseFile: dep2LicenseFile };
    dep3 = { name: dep3Name, licenseFile: dep3LicenseFile };
    dep4 = { name: dep4Name, licenseFile: dep4LicenseFile };
    dep5 = { name: dep5Name, licenseFile: dep5LicenseFile };

    // Both projects depend on dep3

    project1 = {
      [dep1Name]: dep1,
      [dep2Name]: dep2,
      [dep3Name]: dep3
    };

    project2 = {
      [dep3Name]: dep3,
      [dep4Name]: dep4,
      [dep5Name]: dep5
    };

    jest.resetAllMocks();

    mockGetProject.mockImplementation(async (project: InitOpts) => {
      if (project.start === "path/to/project1") {
        return project1;
      }

      if (project.start === "path/to/project2") {
        return project2;
      }

      throw new Error("Unexpected project location " + project.start);
    });

    mockReadPackageJson.mockImplementation(async (pathToPackageJson: string) => {
      if (pathToPackageJson === project1Location) {
        return { name: "project1", version: "1.0.0" };
      }

      if (pathToPackageJson === project2Location) {
        return { name: "project2", version: "2.0.0" };
      }

      throw new Error("Unexpected package.json location " + pathToPackageJson);
    });

    mockDoesFileExist.mockResolvedValue(true);

    mockReadFile.mockImplementation(async (pathToLicenseFile: string) => {
      if (pathToLicenseFile === dep1.licenseFile || pathToLicenseFile === dep4.licenseFile) {
        return licenceContentForDep1And4;
      }

      if (pathToLicenseFile === dep2.licenseFile) {
        return licenceContentForDep2;
      }

      if (pathToLicenseFile === dep3.licenseFile) {
        return licenceContentForDep3;
      }

      if (pathToLicenseFile === dep5.licenseFile) {
        return licenceContentForDep5;
      }

      throw new Error("Unexpected license file");
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should get the given projects from the getProject util using their directories", async () => {
    await getLicencesForProjects([project1Location, project2Location]);

    expect(mockGetProject).toBeCalledTimes(2);
    expect(mockGetProject).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ start: "path/to/project1" })
    );
    expect(mockGetProject).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ start: "path/to/project2" })
    );
  });

  it("should only ask for production dependencies for the project from the getProject util", async () => {
    await getLicencesForProjects([project1Location, project2Location]);

    expect(mockGetProject).toBeCalledTimes(2);
    expect(mockGetProject).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ production: true })
    );
    expect(mockGetProject).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ production: true })
    );
  });

  it("should exclude each package.json project from the getProject util by it's name and version", async () => {
    await getLicencesForProjects([project1Location, project2Location]);

    expect(mockGetProject).toBeCalledTimes(2);
    expect(mockGetProject).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ excludePackages: "project1@1.0.0" })
    );
    expect(mockGetProject).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ excludePackages: "project2@2.0.0" })
    );
  });

  it("should throw if a package.json file could not be read", async () => {
    mockReadPackageJson.mockImplementation(async () => {
      throw new Error("Could not read package.json");
    });

    await expect(getLicencesForProjects([project1Location, project2Location])).rejects.toThrow(
      "Could not read package.json"
    );
  });

  it("should throw if a package.json does not contain a name", async () => {
    mockReadPackageJson.mockImplementation(async () => {
      return { version: "1.0.0" };
    });

    await expect(getLicencesForProjects([project1Location, project2Location])).rejects.toThrow(
      'Cannot find the "name" key in the package.json!'
    );
  });

  it("should throw if a package.json does not contain a version", async () => {
    mockReadPackageJson.mockImplementation(async () => {
      return { name: "project" };
    });

    await expect(getLicencesForProjects([project1Location, project2Location])).rejects.toThrow(
      'Cannot find the "version" key in the package.json!'
    );
  });

  it("should read in the license file for every found dependency", async () => {
    await getLicencesForProjects([project1Location, project2Location]);

    // While there are only 5 mock dependencies,
    // both of the mock projects have dep3 as a dependency.
    // This results in 6 total calls.

    expect(mockReadFile).toBeCalledTimes(6);
    expect(mockReadFile).toHaveBeenNthCalledWith(1, dep1LicenseFile);
    expect(mockReadFile).toHaveBeenNthCalledWith(2, dep2LicenseFile);
    expect(mockReadFile).toHaveBeenNthCalledWith(3, dep3LicenseFile);
    expect(mockReadFile).toHaveBeenNthCalledWith(4, dep3LicenseFile);
    expect(mockReadFile).toHaveBeenNthCalledWith(5, dep4LicenseFile);
    expect(mockReadFile).toHaveBeenNthCalledWith(6, dep5LicenseFile);
  });

  it("should throw if a license file could not be read", async () => {
    mockReadFile.mockImplementation(async () => {
      throw new Error("Could not read file");
    });

    await expect(getLicencesForProjects([project1Location, project2Location])).rejects.toThrow(
      "Could not read file"
    );
  });

  it("should return all the licenses for all the projects", async () => {
    const result = await getLicencesForProjects([project1Location, project2Location]);

    // It is important that dep 1 and 4 are both deps for the same Licence object.
    // This is because they have the same license content.

    // It is important that dep 3 only appears once even though it's in both projects.

    const expectedResult: License[] = [
      new License(licenceContentForDep1And4, [dep1Name, dep4Name]),
      new License(licenceContentForDep2, [dep2Name]),
      new License(licenceContentForDep3, [dep3Name]),
      new License(licenceContentForDep5, [dep5Name])
    ];

    expect(result).toEqual(expectedResult);
  });

  describe("when a dependency doesn't have a license file", () => {
    it("should fall back to using the license type if it is a string", async () => {
      dep2.licenseFile = undefined;
      dep2.licenses = "MIT";

      const result = await getLicencesForProjects([project1Location, project2Location]);

      const expectedResult: License[] = [
        expect.anything(),
        new License("(MIT)", [dep2Name]),
        expect.anything(),
        expect.anything()
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should fall back to using the first license type if it is a string array", async () => {
      dep2.licenseFile = undefined;
      dep2.licenses = ["MIT", "Apache-2.0"];

      const result = await getLicencesForProjects([project1Location, project2Location]);

      const expectedResult: License[] = [
        expect.anything(),
        new License("(MIT)", [dep2Name]),
        expect.anything(),
        expect.anything()
      ];

      expect(result).toEqual(expectedResult);
    });

    it("should warn log if a dependency has no license file and no license type", async () => {
      dep2.licenseFile = undefined;
      dep2.licenses = undefined;

      await getLicencesForProjects([project1Location, project2Location]);

      expect(mockConsoleWarn).toBeCalledTimes(1);
      expect(mockConsoleWarn).toHaveBeenNthCalledWith(1, "No license found for dep2!");
    });

    it("should return a default value for a dependencies license if it has no license file or license type", async () => {
      dep2.licenseFile = undefined;
      dep2.licenses = undefined;

      const result = await getLicencesForProjects([project1Location, project2Location]);

      const expectedResult: License[] = [
        expect.anything(),
        new License("Unknown license!", [dep2Name]),
        expect.anything(),
        expect.anything()
      ];

      expect(result).toEqual(expectedResult);
    });
  });
});
