import { ModuleInfo } from "license-checker";
import { getLicencesForProjects } from "../../src/internal/getLicencesForProjects";
import console from "../../src/utils/console.utils";
import { doesFileExist, readFile } from "../../src/utils/file.utils";
import { getProject, Project } from "../../src/utils/license.utils";
import { readPackageJson } from "../../src/utils/packageJson.utils";

jest.mock("../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
  readFile: jest.fn(),
  doesFolderExist: jest.fn(),
}));

jest.mock("../../src/utils/console.utils", () => ({
  log: jest.fn(),
  warn: jest.fn(),
}));

jest.mock("../../src/utils/license.utils", () => ({
  getProject: jest.fn(),
}));

jest.mock("../../src/utils/packageJson.utils", () => ({
  readPackageJson: jest.fn(),
}));

describe("getLicencesForProjects", () => {
  const mockDoesFileExist = jest.mocked(doesFileExist);
  const mockReadFile = jest.mocked(readFile);
  const mockConsoleWarn = jest.mocked(console.warn);
  const mockGetProject = jest.mocked(getProject);
  const mockReadPackageJson = jest.mocked(readPackageJson);

  const dependencies: ModuleInfo[] = [
    { licenseFile: "path1", name: "name1" },
    { licenseFile: "path2", name: "name2" },
    { licenseFile: "path3", name: "name3" },
  ];

  const project: Project = {
    name1: dependencies[0],
    name2: dependencies[1],
    name3: dependencies[2],
  };

  const packageJsonPath = "./path/to/package.json";

  beforeEach(() => {
    jest.resetAllMocks();

    mockGetProject.mockResolvedValue(project);
    mockDoesFileExist.mockResolvedValue(true);
    mockReadFile.mockImplementation(path => Promise.resolve(`Content for: ${path}`));
    mockReadPackageJson.mockResolvedValue({
      name: "test-project",
      version: "1.2.3",
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should get the project from license-checker", async () => {
    await getLicencesForProjects([packageJsonPath]);

    expect(mockGetProject).toHaveBeenCalledTimes(1);
  });

  it("should use the directory of the path to get the project from license-checker", async () => {
    await getLicencesForProjects([packageJsonPath]);

    const firstCallFirstArg = mockGetProject.mock.calls[0][0];
    expect(firstCallFirstArg.start).toBe("./path/to");
  });

  it("should only ask for production dependencies for the project from license-checker", async () => {
    await getLicencesForProjects([packageJsonPath]);

    const firstCallFirstArg = mockGetProject.mock.calls[0][0];
    expect(firstCallFirstArg.production).toBeTruthy();
  });

  it("should exclude the current package.json project from license-checker", async () => {
    await getLicencesForProjects([packageJsonPath]);

    const firstCallFirstArg = mockGetProject.mock.calls[0][0];
    expect(firstCallFirstArg.excludePackages).toBe("test-project@1.2.3");
  });

  it("should get the license file for all returned dependencies", async () => {
    await getLicencesForProjects([packageJsonPath]);

    expect(mockDoesFileExist).toHaveBeenCalledTimes(dependencies.length);
    expect(mockReadFile).toHaveBeenCalledTimes(dependencies.length);
  });

  it("should return all license contents for returned dependencies", async () => {
    const result = await getLicencesForProjects([packageJsonPath]);

    expect(result).toHaveLength(dependencies.length);

    dependencies.forEach((dependency, i) =>
      expect(result[i].content).toBe(`Content for: ${dependency.licenseFile}`),
    );
  });

  it("should group dependencies by their license values", async () => {
    const dependenciesWhichShareLicenses: ModuleInfo[] = [
      { licenseFile: "path1", name: "name1" },
      { licenseFile: "path1", name: "also1" },
      { licenseFile: "path2", name: "name2" },
    ];
    const projectWithSharedLicenses: Project = {
      name1: dependenciesWhichShareLicenses[0],
      also1: dependenciesWhichShareLicenses[1],
      name2: dependenciesWhichShareLicenses[2],
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getLicencesForProjects([packageJsonPath]);

    expect(result).toHaveLength(2);

    expect(result[0].dependencies).toHaveLength(2);
    expect(result[0].dependencies[0]).toBe("name1");
    expect(result[0].dependencies[1]).toBe("also1");

    expect(result[1].dependencies).toHaveLength(1);
    expect(result[1].dependencies[0]).toBe("name2");
  });

  it("should use a dependency's license type of the license file doesn't exist", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: "license1", name: "name1" },
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getLicencesForProjects([packageJsonPath]);

    expect(result).toHaveLength(1);
    expect(result[0].content).toBe("(license1)");
  });

  it("should use a dependency's first license type if it has multiple and the license file doesn't exist", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: ["license1", "license2"], name: "name1" },
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getLicencesForProjects([packageJsonPath]);

    expect(result).toHaveLength(1);
    expect(result[0].content).toBe("(license1)");
  });

  it("should warn log if a dependency has no license file or license type", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: [], name: "name1" },
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    await getLicencesForProjects([packageJsonPath]);

    expect(mockConsoleWarn).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockConsoleWarn.mock.calls[0][0];
    expect(firstCallFirstArg).toBe("No license found for name1!");
  });

  it("should return a default value for a dependency has no license file or license type", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: [], name: "name1" },
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getLicencesForProjects([packageJsonPath]);

    expect(result[0].content).toBe("Unknown license!");
  });

  it("should throw if there's no name key in the given package.json", async () => {
    mockReadPackageJson.mockReset();
    mockReadPackageJson.mockResolvedValue({
      version: "1.2.3",
    });

    await expect(getLicencesForProjects([packageJsonPath])).rejects.toThrow(
      'Cannot find the "name" key in the package.json!',
    );
  });

  it("should throw if there's no version key in the given package.json", async () => {
    mockReadPackageJson.mockReset();
    mockReadPackageJson.mockResolvedValue({
      name: "test-project",
    });

    await expect(getLicencesForProjects([packageJsonPath])).rejects.toThrow(
      'Cannot find the "version" key in the package.json!',
    );
  });
});
