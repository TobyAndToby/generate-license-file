import { vi, describe, it, expect, beforeEach, afterAll } from "vitest";
﻿import { when } from "vitest-when";
import { join } from "path";
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
    when(mockedDoesFileExist).calledWith(pnpmLockFile).thenResolve(true);
  };

  const mockPnpmLockFileToNotExist = () => {
    when(mockedDoesFileExist).calledWith(pnpmLockFile).thenResolve(false);
  };
});
