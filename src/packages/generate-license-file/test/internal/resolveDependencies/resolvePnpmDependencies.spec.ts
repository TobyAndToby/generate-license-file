﻿import { when } from "jest-when";
import { join } from "path";
import { resolveDependenciesForPnpmProject } from "../../../src/lib/internal/resolveDependencies/resolvePnpmDependencies";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { LicenseNoticeKey, ResolvedLicense } from "../../../src/lib/internal/resolveLicenses";
import { resolveNotices } from "../../../src/lib/internal/resolveNoticeContent";
import logger from "../../../src/lib/utils/console.utils";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";
import {
  getPnpmProjectDependencies,
  getPnpmVersion,
  PnpmDependency,
} from "../../../src/lib/utils/pnpmCli.utils";

jest.mock("../../../src/lib/utils/pnpmCli.utils", () => ({
  getPnpmVersion: jest.fn(),
  getPnpmProjectDependencies: jest.fn(),
}));

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/utils/console.utils");

jest.mock("../../../src/lib/internal/resolveLicenseContent", () => ({
  resolveLicenseContent: jest.fn(),
}));

jest.mock("../../../src/lib/internal/resolveNoticeContent", () => ({
  resolveNotices: jest.fn(),
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

  const mockedLogger = jest.mocked(logger);
  const mockedReadFile = jest.mocked(readFile);
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedGetPnpmVersion = jest.mocked(getPnpmVersion);
  const mockedGetPnpmProjectDependencies = jest.mocked(getPnpmProjectDependencies);
  const mockedResolveLicenseContent = jest.mocked(resolveLicenseContent);
  const mockedResolveNotices = jest.mocked(resolveNotices);

  beforeEach(() => {
    jest.resetAllMocks();

    when(mockedResolveLicenseContent)
      .calledWith(dependency1.paths[0], expect.anything(), expect.anything())
      .mockResolvedValue(dependency1LicenseContent);
    setUpPackageJson(dependency1.paths[0], dependency1.name, "1.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency2.paths[0], expect.anything(), expect.anything())
      .mockResolvedValue(dependency2LicenseContent);
    setUpPackageJson(dependency2.paths[0], dependency2.name, "1.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency2.paths[1], expect.anything(), expect.anything())
      .mockResolvedValue(dependency2LicenseContent);
    setUpPackageJson(dependency2.paths[1], dependency2.name, "2.0.0");

    when(mockedResolveLicenseContent)
      .calledWith(dependency3.paths[0], expect.anything(), expect.anything())
      .mockImplementation(() => {
        throw new Error("Cannot find license content");
      });

    mockedResolveNotices.mockResolvedValue([]);

    setUpPackageJson(dependency3.paths[0], dependency3.name, "1.0.0");
  });

  afterAll(() => jest.restoreAllMocks());

  describe("when the pnpm version is less than 7.33.0", () => {
    it("should throw an error", async () => {
      mockedGetPnpmVersion.mockResolvedValue({ major: 7, minor: 32, patch: 999 });

      await expect(resolveDependenciesForPnpmProject).rejects.toThrow(
        "Unsupported pnpm version: 7.32.999.\n" +
          "Generate license file currently only supports pnpm versions >=7.33.0 & >=8.0.0\n" +
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

    it.each([new Error("Something went wrong"), "Something went wrong"])(
      "should warning log if resolveLicenseContent throws an error",
      async error => {
        mockedGetPnpmVersion.mockResolvedValue(pnpmVersion);
        mockedGetPnpmProjectDependencies.mockResolvedValue([dependency1, dependency2, dependency3]);

        when(mockedResolveLicenseContent)
          .calledWith(dependency1.paths[0], expect.anything(), expect.anything())
          .mockRejectedValue(error);

        const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

        await resolveDependenciesForPnpmProject("/some/path/package.json", licensesMap);

        expect(mockedLogger.warn).toHaveBeenCalledWith(
          `Unable to determine license content for ${dependency1.name}@1.0.0 with error:\nSomething went wrong\n`,
        );
      },
    );

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

  const setUpPackageJson = (directory: string, name: string, version: string): void => {
    const fullPackageJsonPath = join(directory, "package.json");
    const packageJsonContent = JSON.stringify({ name, version });

    when(mockedDoesFileExist).calledWith(fullPackageJsonPath).mockResolvedValue(true);
    when(mockedReadFile)
      .calledWith(fullPackageJsonPath, { encoding: "utf-8" })
      .mockResolvedValue(packageJsonContent);
  };
});
