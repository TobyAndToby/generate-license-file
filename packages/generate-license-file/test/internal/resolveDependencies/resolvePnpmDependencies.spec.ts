import { join } from "node:path";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { when } from "vitest-when";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveDependenciesForPnpmProject } from "../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import type { LicenseNoticeKey, ResolvedLicense } from "../../../src/lib/internal/resolveLicenses";
import { resolveNotices } from "../../../src/lib/internal/resolveNoticeContent";
import logger from "../../../src/lib/utils/console.utils";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";
import {
  getPnpmNodeLinker,
  getPnpmProjectDependencies,
  getPnpmVersion,
  type PnpmDependency,
} from "../../../src/lib/utils/pnpmCli.utils";

vi.mock("../../../src/lib/utils/pnpmCli.utils", () => ({
  getPnpmVersion: vi.fn(),
  getPnpmNodeLinker: vi.fn(),
  getPnpmProjectDependencies: vi.fn(),
}));

vi.mock("../../../src/lib/internal/resolveDependencies/resolveNpmDependencies", () => ({
  resolveDependenciesForNpmProject: vi.fn(),
}));

vi.mock("../../../src/lib/utils/file.utils");
vi.mock("../../../src/lib/utils/console.utils");

vi.mock("../../../src/lib/internal/resolveLicenseContent", () => ({
  resolveLicenseContent: vi.fn(),
}));

vi.mock("../../../src/lib/internal/resolveNoticeContent", () => ({
  resolveNotices: vi.fn(),
}));

describe("resolveDependenciesForPnpmProject", () => {
  const dependency1: PnpmDependency = {
    name: "dependency1",
    paths: ["/some/path/dependency1"],
  };
  const dependency1LicenseContent = "license content 1";
  const dependency1LicenseNoticePair: LicenseNoticeKey = `${dependency1LicenseContent}:`;

  const dependency2: PnpmDependency = {
    name: "dependency2",
    paths: ["/some/path/dependency2", "/some/other/path/dependency2"],
  };
  const dependency2LicenseContent = "license content 2";
  const dependency2LicenseNoticePair: LicenseNoticeKey = `${dependency2LicenseContent}:`;

  const dependency3: PnpmDependency = {
    name: "dependency3",
    paths: ["/some/path/dependency3"],
  };

  const mockedLogger = vi.mocked(logger);
  const mockedReadFile = vi.mocked(readFile);
  const mockedDoesFileExist = vi.mocked(doesFileExist);
  const mockedGetPnpmVersion = vi.mocked(getPnpmVersion);
  const mockedGetPnpmNodeLinker = vi.mocked(getPnpmNodeLinker);
  const mockedResolveDependenciesForNpmProject = vi.mocked(resolveDependenciesForNpmProject);
  const mockedGetPnpmProjectDependencies = vi.mocked(getPnpmProjectDependencies);
  const mockedResolveLicenseContent = vi.mocked(resolveLicenseContent);
  const mockedResolveNotices = vi.mocked(resolveNotices);

  beforeEach(() => {
    vi.resetAllMocks();

    mockedGetPnpmNodeLinker.mockResolvedValue("isolated");

    when(mockedResolveLicenseContent)
      .calledWith(dependency1.paths[0], expect.anything(), expect.anything())
      .thenResolve(dependency1LicenseContent);
    setUpPackageJson(dependency1.paths[0], dependency1.name, "1.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency2.paths[0], expect.anything(), expect.anything())
      .thenResolve(dependency2LicenseContent);
    setUpPackageJson(dependency2.paths[0], dependency2.name, "1.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency2.paths[1], expect.anything(), expect.anything())
      .thenResolve(dependency2LicenseContent);
    setUpPackageJson(dependency2.paths[1], dependency2.name, "2.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency3.paths[0], expect.anything(), expect.anything())
      .thenThrow(new Error("Cannot find license content"));

    mockedResolveNotices.mockResolvedValue([]);

    setUpPackageJson(dependency3.paths[0], dependency3.name, "1.0.0");
  });

  afterAll(() => vi.restoreAllMocks());

  describe("when the pnpm version is less than 7.33.0", () => {
    it("should throw an error", async () => {
      mockedGetPnpmVersion.mockResolvedValue({ major: 7, minor: 32, patch: 999 });

      await expect(resolveDependenciesForPnpmProject).rejects.toThrow(
        "Unsupported pnpm version: 7.32.999.\n" +
          "Generate license file currently only supports pnpm versions >=7.33.0\n" +
          "Please either switch to a supported version of pnpm or raise an issue on the generate-license-file repository for us to support your version of pnpm:\n" +
          "https://github.com/TobyAndToby/generate-license-file",
      );
    });

    it("should not call getPnpmProjectDependencies", async () => {
      mockedGetPnpmVersion.mockResolvedValue({ major: 7, minor: 6, patch: 5 });

      await expect(resolveDependenciesForPnpmProject).rejects.toThrow(expect.anything());

      expect(mockedGetPnpmProjectDependencies).not.toHaveBeenCalled();
    });
  });

  describe.each([
    { major: 7, minor: 33, patch: 0 },
    { major: 8, minor: 0, patch: 0 },
    { major: 9, minor: 0, patch: 0 },
    { major: 10, minor: 0, patch: 0 },
    { major: 11, minor: 0, patch: 0 },
    { major: 12, minor: 0, patch: 0 },
  ])("when the pnpm version is a supported version (%p)", pnpmVersion => {
    it("should call getPnpmProjectDependencies", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([]);

      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map());

      expect(mockedGetPnpmProjectDependencies).toHaveBeenCalledTimes(1);
      expect(mockedGetPnpmProjectDependencies).toHaveBeenCalledWith("/some/path");
    });

    it("should pass the directory to resolveLicenseContent", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1]);

      const replace = { "some-package@1.0.0": "/some/path/to/license.txt" };

      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map(), { replace });

      expect(mockedResolveLicenseContent).toHaveBeenCalledTimes(1);

      const directoryActual = mockedResolveLicenseContent.mock.calls[0][0];
      expect(directoryActual).toBe(dependency1.paths[0]);
    });

    it("should pass the package.json to resolveLicenseContent", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1]);

      const replace = { "some-package@1.0.0": "/some/path/to/license.txt" };

      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map(), { replace });

      expect(mockedResolveLicenseContent).toHaveBeenCalledTimes(1);

      const packageJsonActual = mockedResolveLicenseContent.mock.calls[0][1];
      expect(packageJsonActual).toEqual({ name: dependency1.name, version: "1.0.0" });
    });

    it("should pass the replace option to resolveLicenseContent", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1]);

      const replace = { "some-package@1.0.0": "/some/path/to/license.txt" };

      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map(), { replace });

      expect(mockedResolveLicenseContent).toHaveBeenCalledTimes(1);

      const replaceActual = mockedResolveLicenseContent.mock.calls[0][2];
      expect(replaceActual).toEqual(replace);
    });

    it("should call resolveLicenseContent for each dependency", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1, dependency2, dependency3]);

      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map());

      expect(mockedResolveLicenseContent).toHaveBeenCalledTimes(4);
      expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
        dependency1.paths[0],
        expect.anything(),
        expect.anything(),
      );
      expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
        dependency2.paths[0],
        expect.anything(),
        expect.anything(),
      );
      expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
        dependency2.paths[1],
        expect.anything(),
        expect.anything(),
      );
      expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
        dependency3.paths[0],
        expect.anything(),
        expect.anything(),
      );
    });

    it("should add the license content to the licensesMap if it is not null", async () => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1, dependency2, dependency3]);

      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForPnpmProject("/some/path/package.json", licensesMap);

      expect(licensesMap.size).toBe(2);
      expect(
        licensesMap
          .get(dependency1LicenseNoticePair)
          ?.dependencies?.find(d => d.name === "dependency1" && d.version === "1.0.0"),
      ).toBeDefined();
      expect(
        licensesMap
          .get(dependency2LicenseNoticePair)
          ?.dependencies?.find(d => d.name === "dependency2" && d.version === "2.0.0"),
      ).toBeDefined();
    });

    it.each([
      new Error("Something went wrong"),
      "Something went wrong",
    ])("should warning log if resolveLicenseContent throws an error", async error => {
      mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1, dependency2, dependency3]);

      when(mockedResolveLicenseContent)
        .calledWith(dependency1.paths[0], expect.anything(), expect.anything())
        .thenReject(error);

      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForPnpmProject("/some/path/package.json", licensesMap);

      expect(mockedLogger.warn).toHaveBeenCalledWith(
        `Unable to determine license content for ${dependency1.name}@1.0.0 with error:\nSomething went wrong\n`,
      );
    });

    describe("when the dependency is in the exclude list", () => {
      it("should not call resolveLicenseContent", async () => {
        mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
        mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1, dependency2, dependency3]);

        await resolveDependenciesForPnpmProject("/some/path/package.json", new Map(), {
          exclude: ["dependency2@2.0.0"],
        });

        expect(mockedResolveLicenseContent).toHaveBeenCalledTimes(3);
        expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
          dependency1.paths[0],
          expect.anything(),
          expect.anything(),
        );
        expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
          dependency2.paths[0],
          expect.anything(),
          expect.anything(),
        );
        expect(mockedResolveLicenseContent).not.toHaveBeenCalledWith(
          dependency2.paths[1],
          expect.anything(),
          expect.anything(),
        );
        expect(mockedResolveLicenseContent).toHaveBeenCalledWith(
          dependency3.paths[0],
          expect.anything(),
          expect.anything(),
        );
      });
    });
  });

  describe("when the node linker is hoisted", () => {
    // A hoisted install leaves the .pnpm virtual store empty, so the paths pnpm reports point at
    // nothing. The resulting node_modules is npm shaped, so the npm resolver reads it instead.
    beforeEach(() => {
      mockedGetPnpmVersion.mockResolvedValue({ major: 11, minor: 0, patch: 0 });
      mockedGetPnpmNodeLinker.mockResolvedValue("hoisted");
    });

    it("should ask for the node linker of the project directory", async () => {
      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map());

      expect(mockedGetPnpmNodeLinker).toHaveBeenCalledTimes(1);
      expect(mockedGetPnpmNodeLinker).toHaveBeenCalledWith("/some/path");
    });

    it("should hand the project to the npm resolver", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();
      const options = { exclude: ["dependency2@2.0.0"] };

      await resolveDependenciesForPnpmProject("/some/path/package.json", licensesMap, options);

      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledTimes(1);
      expect(mockedResolveDependenciesForNpmProject).toHaveBeenCalledWith(
        "/some/path/package.json",
        licensesMap,
        options,
      );
    });

    it("should not call getPnpmProjectDependencies", async () => {
      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map());

      expect(mockedGetPnpmProjectDependencies).not.toHaveBeenCalled();
    });
  });

  describe.each(["isolated", "pnp"] as const)("when the node linker is %s", nodeLinker => {
    beforeEach(() => {
      mockedGetPnpmVersion.mockResolvedValue({ major: 11, minor: 0, patch: 0 });
      mockedGetPnpmNodeLinker.mockResolvedValue(nodeLinker);
      mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1]);
    });

    it("should not hand the project to the npm resolver", async () => {
      await resolveDependenciesForPnpmProject("/some/path/package.json", new Map());

      expect(mockedResolveDependenciesForNpmProject).not.toHaveBeenCalled();
      expect(mockedGetPnpmProjectDependencies).toHaveBeenCalledTimes(1);
    });
  });

  const setUpPackageJson = (directory: string, name: string, version: string): void => {
    const fullPackageJsonPath = join(directory, "package.json");
    const packageJsonContent = JSON.stringify({ name, version });

    when(mockedDoesFileExist).calledWith(fullPackageJsonPath).thenResolve(true);
    when(mockedReadFile).calledWith(fullPackageJsonPath, { encoding: "utf-8" }).thenResolve(packageJsonContent);
  };
});
