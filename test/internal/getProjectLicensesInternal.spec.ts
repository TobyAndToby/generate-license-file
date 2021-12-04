import { ModuleInfo } from "license-checker";
import { mocked } from "ts-jest/utils";
import { getProjectLicensesInternal } from "../../src/internal/getProjectLicensesInternal";
import console from "../../src/utils/console.utils";
import { doesFileExist, doesFolderExist, readFileAsync } from "../../src/utils/file.utils";
import { getProject, Project } from "../../src/utils/licence.utils";

jest.mock("../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
  doesFolderExist: jest.fn(),
  readFileAsync: jest.fn()
}));

jest.mock("../../src/utils/console.utils", () => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}));

jest.mock("../../src/utils/licence.utils", () => ({
  getProject: jest.fn()
}));

describe("getProjectLicensesInternal", () => {
  const mockDoesFileExist = mocked(doesFileExist);
  const mockDoesFolderExist = mocked(doesFolderExist);
  const mockReadFileAsync = mocked(readFileAsync);
  const mockConsoleError = mocked(console.error);
  const mockGetProject = mocked(getProject);

  const dependencies: ModuleInfo[] = [
    { licenseFile: "path1", name: "name1" },
    { licenseFile: "path2", name: "name2" },
    { licenseFile: "path3", name: "name3" }
  ];

  const project: Project = {
    name1: dependencies[0],
    name2: dependencies[1],
    name3: dependencies[2]
  };

  const projectPath = "project path";

  beforeEach(() => {
    jest.resetAllMocks();

    mockDoesFolderExist.mockResolvedValue(true);
    mockGetProject.mockResolvedValue(project);
    mockDoesFileExist.mockResolvedValue(true);
    mockReadFileAsync.mockImplementation(path => Promise.resolve(`Content for: ${path}`));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should throw an error when the given path doesn't exist", async () => {
    mockDoesFolderExist.mockResolvedValue(false);

    await expect(getProjectLicensesInternal(projectPath)).rejects.toBeUndefined();
  });

  it("should log an error message when the given path doesn't exist", async () => {
    mockDoesFolderExist.mockResolvedValue(false);

    try {
      await getProjectLicensesInternal(projectPath).catch(() => undefined);
    } catch {
      fail("Test should have thrown");
    }

    expect(mockConsoleError).toBeCalledTimes(1);

    const firstCallFirstArg = mockConsoleError.mock.calls[0][0];
    expect(firstCallFirstArg).toBe("Cannot find directory project path");
  });

  it("should get the project from license-checker", async () => {
    await getProjectLicensesInternal(projectPath);

    expect(mockGetProject).toBeCalledTimes(1);
  });

  it("should use the path to get the project from license-checker", async () => {
    await getProjectLicensesInternal(projectPath);

    const firstCallFirstArg = mockGetProject.mock.calls[0][0];
    expect(firstCallFirstArg.start).toBe(projectPath);
  });

  it("should only ask for production dependencies for the project from license-checker", async () => {
    await getProjectLicensesInternal(projectPath);

    const firstCallFirstArg = mockGetProject.mock.calls[0][0];
    expect(firstCallFirstArg.production).toBeTruthy();
  });

  it("should get the licence file for all returned dependencies", async () => {
    await getProjectLicensesInternal(projectPath);

    expect(mockDoesFileExist).toBeCalledTimes(dependencies.length);
    expect(mockReadFileAsync).toBeCalledTimes(dependencies.length);
  });

  it("should return all licence contents for returned dependencies", async () => {
    const result = await getProjectLicensesInternal(projectPath);

    expect(result.length).toBe(dependencies.length);

    dependencies.forEach((dependency, i) =>
      expect(result[i].content).toBe(`Content for: ${dependency.licenseFile}`)
    );
  });

  it("should group dependencies by their licence values", async () => {
    const dependenciesWhichShareLicences: ModuleInfo[] = [
      { licenseFile: "path1", name: "name1" },
      { licenseFile: "path1", name: "also1" },
      { licenseFile: "path2", name: "name2" }
    ];
    const projectWithSharedLicenses: Project = {
      name1: dependenciesWhichShareLicences[0],
      also1: dependenciesWhichShareLicences[1],
      name2: dependenciesWhichShareLicences[2]
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getProjectLicensesInternal(projectPath);

    expect(result.length).toBe(2);

    expect(result[0].dependencies.length).toBe(2);
    expect(result[0].dependencies[0]).toBe("name1");
    expect(result[0].dependencies[1]).toBe("also1");

    expect(result[1].dependencies.length).toBe(1);
    expect(result[1].dependencies[0]).toBe("name2");
  });

  it("should use a dependency's licence type of the licence file doesn't exist", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: "licence1", name: "name1" }
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getProjectLicensesInternal(projectPath);

    expect(result.length).toBe(1);
    expect(result[0].content).toBe("(licence1)");
  });

  it("should use a dependency's first licence type if it has multiple and the licence file doesn't exist", async () => {
    mockDoesFileExist.mockReset();
    mockDoesFileExist.mockResolvedValue(false);

    const projectWithSharedLicenses: Project = {
      name1: { licenses: ["licence1", "licence2"], name: "name1" }
    };
    mockGetProject.mockReset();
    mockGetProject.mockResolvedValue(projectWithSharedLicenses);

    const result = await getProjectLicensesInternal(projectPath);

    expect(result.length).toBe(1);
    expect(result[0].content).toBe("(licence1)");
  });
});
