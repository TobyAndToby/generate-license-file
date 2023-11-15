import { doesFileExist } from "../../../src/lib/utils/file.utils";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveDependenciesForPnpmProject } from "../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies";
import { when } from "jest-when";
import { resolveDependencies } from "../../../src/lib/internal/resolveDependencies";
import { join } from "path";

jest.mock("../../../src/lib/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
}));

jest.mock("../../../src/lib/internal/resolveDependencies/resolveNpmDependencies", () => ({
  resolveDependenciesForNpmProject: jest.fn(),
}));

jest.mock("../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies", () => ({
  resolveDependenciesForPnpmProject: jest.fn(),
}));

describe("resolveDependencies", () => {
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedResolveDependenciesForNpmProject = jest.mocked(resolveDependenciesForNpmProject);
  const mockedResolveDependenciesForPnpmProject = jest.mocked(resolveDependenciesForPnpmProject);

  const projectDirectory = "/some/directory";
  const packageJson = join(projectDirectory, "package.json");
  const pnpmLockFile = join(projectDirectory, "pnpm-lock.yaml");

  const dependencies = new Map();
  const options = { exclude: ["some-package"] };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  describe("for npm projects", () => {
    beforeEach(() => mockPnpmLockFileToNotExist());

    it("should call resolveDependenciesForNpmProject", async () => {
      await resolveDependencies(packageJson, dependencies, options);

      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledWith(
        packageJson,
        dependencies,
        options,
      );
    });

    it("should not call resolveDependenciesForPnpmProject", async () => {
      await resolveDependencies(packageJson, dependencies, options);

      expect(mockedResolveDependenciesForPnpmProject).not.toHaveBeenCalled();
    });
  });

  describe("for pnpm projects", () => {
    beforeEach(() => mockPnpmLockFileToExist());

    it("should not call resolveDependenciesForNpmProject", async () => {
      await resolveDependencies(packageJson, dependencies, options);

      expect(mockedResolveDependenciesForNpmProject).not.toHaveBeenCalled();
    });

    it("should call resolveDependenciesForPnpmProject", async () => {
      await resolveDependencies(packageJson, dependencies, options);

      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledWith(
        packageJson,
        dependencies,
        options,
      );
    });
  });

  const mockPnpmLockFileToExist = () => {
    when(mockedDoesFileExist).calledWith(pnpmLockFile).mockResolvedValue(true);
  };

  const mockPnpmLockFileToNotExist = () => {
    when(mockedDoesFileExist).calledWith(pnpmLockFile).mockResolvedValue(false);
  };
});
