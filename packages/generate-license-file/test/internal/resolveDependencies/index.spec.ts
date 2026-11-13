import { join, resolve } from "node:path";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { when } from "vitest-when";
import { resolveDependencies } from "../../../src/lib/internal/resolveDependencies";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveDependenciesForPnpmProject } from "../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies";
import { doesFileExist } from "../../../src/lib/utils/file.utils";

vi.mock("../../../src/lib/utils/file.utils", () => ({
  doesFileExist: vi.fn(),
}));

vi.mock("../../../src/lib/internal/resolveDependencies/resolveNpmDependencies", () => ({
  resolveDependenciesForNpmProject: vi.fn(),
}));

vi.mock("../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies", () => ({
  resolveDependenciesForPnpmProject: vi.fn(),
}));

describe("resolveDependencies", () => {
  const mockedDoesFileExist = vi.mocked(doesFileExist);
  const mockedResolveDependenciesForNpmProject = vi.mocked(resolveDependenciesForNpmProject);
  const mockedResolveDependenciesForPnpmProject = vi.mocked(resolveDependenciesForPnpmProject);

  const projectDirectory = "/some/directory";
  const packageJson = join(projectDirectory, "package.json");
  const pnpmLockFile = join(projectDirectory, "pnpm-lock.yaml");

  const dependencies = new Map();
  const options = { exclude: ["some-package"] };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => vi.restoreAllMocks());

  describe("for npm projects", () => {
    beforeEach(() => mockPnpmLockFileToNotExist());

    it("should call resolveDependenciesForNpmProject", async () => {
      await resolveDependencies(packageJson, dependencies, options);

      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledWith(packageJson, dependencies, options);
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
      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledWith(packageJson, dependencies, options);
    });
  });

  describe("for pnpm workspaces", () => {
    const workspacePackageJson = join("/some/directory", "packages/app/package.json");
    const workspacePnpmLockFile = join("/some/directory", "pnpm-lock.yaml");

    beforeEach(() => {
      when(mockedDoesFileExist).calledWith(join("/some/directory", "packages/app/pnpm-lock.yaml")).thenResolve(false);
      when(mockedDoesFileExist).calledWith(workspacePnpmLockFile).thenResolve(true);
    });

    it("should not call resolveDependenciesForNpmProject when the lock file is at the workspace root", async () => {
      await resolveDependencies(workspacePackageJson, dependencies, options);

      expect(mockedResolveDependenciesForNpmProject).not.toHaveBeenCalled();
    });

    it("should call resolveDependenciesForPnpmProject when the lock file is at the workspace root", async () => {
      await resolveDependencies(workspacePackageJson, dependencies, options);

      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledWith(workspacePackageJson, dependencies, options);
    });

    it("should find the lock file at the workspace root for a relative input path", async () => {
      const relativePackageJson = join("packages", "app", "package.json");
      const absoluteAppDirectory = resolve(join("packages", "app"));
      const absolutePackagesDirectory = resolve("packages");

      when(mockedDoesFileExist).calledWith(join(absoluteAppDirectory, "pnpm-lock.yaml")).thenResolve(false);
      when(mockedDoesFileExist).calledWith(join(absolutePackagesDirectory, "pnpm-lock.yaml")).thenResolve(true);

      await resolveDependencies(relativePackageJson, dependencies, options);

      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForPnpmProject).toHaveBeenCalledWith(relativePackageJson, dependencies, options);
    });
  });

  describe("when the input is not named package.json", () => {
    beforeEach(() => mockPnpmLockFileToNotExist());

    const differentlyNamedFile = join(projectDirectory, "package2.json");

    it("should throw an error naming the given file", async () => {
      await expect(resolveDependencies(differentlyNamedFile, dependencies, options)).rejects.toThrow(
        /Expected a path to a file named "package\.json" but was given "package2\.json"/,
      );
    });

    it("should not resolve dependencies for either package manager", async () => {
      await expect(resolveDependencies(differentlyNamedFile, dependencies, options)).rejects.toThrow();

      expect(mockedResolveDependenciesForNpmProject).not.toHaveBeenCalled();
      expect(mockedResolveDependenciesForPnpmProject).not.toHaveBeenCalled();
    });

    it("should throw before looking for a lock file", async () => {
      await expect(resolveDependencies(differentlyNamedFile, dependencies, options)).rejects.toThrow();

      expect(mockedDoesFileExist).not.toHaveBeenCalled();
    });
  });

  const mockPnpmLockFileToExist = () => {
    when(mockedDoesFileExist).calledWith(pnpmLockFile).thenResolve(true);
  };

  const mockPnpmLockFileToNotExist = () => {
    when(mockedDoesFileExist).calledWith(pnpmLockFile).thenResolve(false);
  };
});
