import Arborist from "@npmcli/arborist";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { when } from "jest-when";
import { Dependency, LicenseContent } from "../../../src/lib/internal/resolveLicenses";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";
import { join } from "path";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";

jest.mock("@npmcli/arborist", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../src/lib/utils/file.utils");

jest.mock("../../../src/lib/internal/resolveLicenseContent", () => ({
  resolveLicenseContent: jest.fn(),
}));

describe("resolveNpmDependencies", () => {
  const mockedReadFile = jest.mocked(readFile);
  const mockedDoesFileExist = jest.mocked(doesFileExist);

  const child1Name = "child1";
  const child1Version = "1.0.0";
  const child1Realpath = "/some/path/child1";
  const child1LicenseContent = "license contents for child1 and child1.2";

  const child1_1Name = "child1.1";
  const child1_1Version = "1.1.0";
  const child1_1Realpath = "/some/path/child1.1";
  const child1_1LicenseContent = "license contents for child1.1";

  const child1_2Name = "child1.2";
  const child1_2Version = "1.2.0";
  const child1_2Realpath = "/some/path/child1.2";
  const child1_2LicenseContent = child1LicenseContent;

  const child2Name = "child2";
  const child2Version = "2.0.0";
  const child2Realpath = "/some/path/child2";
  const child2LicenseContent = "license contents for child2";

  const child2_1Name = "child2.1";
  const child2_1Version = "2.1.0";
  const child2_1Realpath = "/some/path/child2.1";
  const child2_1LicenseContent = "license contents for child2.1";

  const child3Name = "child3";
  const child3Version = "3.0.0";
  const child3Realpath = "/some/path/child3";
  const child3LicenseContent = "license contents for child3";

  const child3_1Name = "child3.1";
  const child3_1Version = "3.1.0";
  const child3_1Realpath = "/some/path/child3.1";
  const child3_1LicenseContent = "license contents for child3.1";

  // A node tree where:
  // - child1 is a 'normal' dependency
  //   - It has two 'normal' dependencies
  // - child2 is a dev dependency
  //   - It has one 'normal' dependency (but it won't show in results because it's parent is a dev dependency)
  // - child3 is a peer dependency
  //   - It has one 'normal' dependency (but it won't show in results because it's parent is a peer dependency)
  const topNode: Arborist.Node = {
    children: new Map([
      [
        child1Name,
        {
          pkgid: `${child1Name}@${child1Version}`,
          realpath: child1Realpath,
          package: { name: child1Name, version: child1Version },
          children: new Map([
            [
              child1_1Name,
              {
                pkgid: `${child1_1Name}@${child1_1Version}`,
                realpath: child1_1Realpath,
                package: { name: child1_1Name, version: child1_1Version },
                children: new Map(),
                dev: false,
                peer: false,
              },
            ],
            [
              child1_2Name,
              {
                pkgid: `${child1_2Name}@${child1_2Version}`,
                realpath: child1_2Realpath,
                package: { name: child1_2Name, version: child1_2Version },
                children: new Map(),
                dev: false,
                peer: false,
              },
            ],
          ]),
          dev: false,
          peer: false,
        },
      ],
      [
        child2Name,
        {
          pkgid: `${child2Name}@${child2Version}`,
          realpath: child2Realpath,
          package: { name: child2Name, version: child2Version },
          children: new Map([
            [
              child2_1Name,
              {
                pkgid: `${child2_1Name}@${child2_1Version}`,
                realpath: child2_1Realpath,
                package: { name: child2_1Name, version: child2_1Version },
                children: new Map(),
                dev: false,
                peer: false,
              },
            ],
          ]),
          dev: true,
          peer: false,
        },
      ],
      [
        child3Name,
        {
          pkgid: `${child3Name}@${child3Version}`,
          realpath: child3Realpath,
          package: { name: child3Name, version: child3Version },
          children: new Map([
            [
              child3_1Name,
              {
                pkgid: `${child3_1Name}@${child3_1Version}`,
                realpath: child3_1Realpath,
                package: { name: child3_1Name, version: child3_1Version },
                children: new Map(),
                dev: false,
                peer: false,
              },
            ],
          ]),
          dev: false,
          peer: true,
        },
      ],
    ]),
  } as Arborist.Node;

  const mockedArborist = jest.mocked(Arborist);
  const mockedResolveLicenseContent = jest.mocked(resolveLicenseContent);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedArborist.mockImplementation(
      () =>
        ({
          loadActual: async () => topNode,
        }) as Arborist,
    );

    when(mockedResolveLicenseContent)
      .calledWith(child1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child1LicenseContent);
    setUpPackageJson(child1Realpath, { name: child1Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child1_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child1_1LicenseContent);
    setUpPackageJson(child1_1Realpath, { name: child1_1Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child1_2Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child1_2LicenseContent);
    setUpPackageJson(child1_2Realpath, { name: child1_2Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child2Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child2LicenseContent);
    setUpPackageJson(child2Realpath, { name: child2Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child2_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child2_1LicenseContent);
    setUpPackageJson(child2_1Realpath, { name: child2_1Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child3Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child3LicenseContent);
    setUpPackageJson(child3Realpath, { name: child3Name, version: "1.0.0" });

    when(mockedResolveLicenseContent)
      .calledWith(child3_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child3_1LicenseContent);
    setUpPackageJson(child3_1Realpath, { name: child3_1Name, version: "1.0.0" });
  });

  afterAll(() => jest.restoreAllMocks());

  it("should call arborist with the correct path", async () => {
    await resolveDependenciesForNpmProject("/some/path/package.json", new Map());

    expect(mockedArborist).toHaveBeenCalledTimes(1);
    expect(mockedArborist).toHaveBeenCalledWith({ path: "/some/path" });
  });

  it("should pass the directory to resolveLicenseContent", async () => {
    const replacements = { "some-package@1.0.0": "/some/path/to/license.txt" };

    await resolveDependenciesForNpmProject("/some/path/package.json", new Map(), {
      replace: replacements,
    });

    const directory1 = mockedResolveLicenseContent.mock.calls[0][0];
    expect(directory1).toBe(child1Realpath);

    const directory2 = mockedResolveLicenseContent.mock.calls[1][0];
    expect(directory2).toBe(child1_1Realpath);

    const directory3 = mockedResolveLicenseContent.mock.calls[2][0];
    expect(directory3).toBe(child1_2Realpath);
  });

  it("should pass the package.json to resolveLicenseContent", async () => {
    const replacements = { "some-package@1.0.0": "/some/path/to/license.txt" };

    await resolveDependenciesForNpmProject("/some/path/package.json", new Map(), {
      replace: replacements,
    });

    const packageJson1 = mockedResolveLicenseContent.mock.calls[0][1];
    expect(packageJson1.name).toBe(child1Name);

    const packageJson2 = mockedResolveLicenseContent.mock.calls[1][1];
    expect(packageJson2.name).toBe(child1_1Name);

    const packageJson3 = mockedResolveLicenseContent.mock.calls[2][1];
    expect(packageJson3.name).toBe(child1_2Name);
  });

  it("should pass the replacements to resolveLicenseContent", async () => {
    const replacements = { "some-package@1.0.0": "/some/path/to/license.txt" };

    await resolveDependenciesForNpmProject("/some/path/package.json", new Map(), {
      replace: replacements,
    });

    const replacements1 = mockedResolveLicenseContent.mock.calls[0][2];
    expect(replacements1).toBe(replacements);

    const replacements2 = mockedResolveLicenseContent.mock.calls[1][2];
    expect(replacements2).toBe(replacements);

    const replacements3 = mockedResolveLicenseContent.mock.calls[2][2];
    expect(replacements3).toBe(replacements);
  });

  describe("when no options are provided", () => {
    it("should include non-dev dependencies in the result", async () => {
      const licensesMap = new Map<LicenseContent, Dependency[]>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child1LicenseContentMap = licensesMap.get(child1LicenseContent);
      expect(child1LicenseContentMap?.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseContent);
      expect(child1_1LicenseContentMap?.find(c => c.name === child1_1Name)).toBeDefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseContent);
      expect(child1_2LicenseContentMap?.find(c => c.name === child1_2Name)).toBeDefined();
    });

    it("should not include dev dependencies in the result", async () => {
      const licensesMap = new Map<LicenseContent, Dependency[]>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child2LicenseContentMap = licensesMap.get(child2LicenseContent);
      expect(child2LicenseContentMap).toBeUndefined();

      const child2_1LicenseContentMap = licensesMap.get(child2_1LicenseContent);
      expect(child2_1LicenseContentMap).toBeUndefined();
    });

    it("should not include peer dependencies in the result", async () => {
      const licensesMap = new Map<LicenseContent, Dependency[]>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child3LicenseContentMap = licensesMap.get(child3LicenseContent);
      expect(child3LicenseContentMap).toBeUndefined();

      const child3_1LicenseContentMap = licensesMap.get(child3_1LicenseContent);
      expect(child3_1LicenseContentMap).toBeUndefined();
    });
  });

  describe("when a dependency is in the exclude list", () => {
    it("should not include the dependency in the result", async () => {
      const licensesMap = new Map<LicenseContent, Dependency[]>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap, {
        exclude: [`${child1_1Name}@${child1_1Version}`],
      });

      const child1LicenseContentMap = licensesMap.get(child1LicenseContent);
      expect(child1LicenseContentMap?.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseContent);
      expect(child1_1LicenseContentMap).toBeUndefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseContent);
      expect(child1_2LicenseContentMap?.find(c => c.name === child1_2Name)).toBeDefined();
    });

    it("should not include the dependency in the result if specified by name only", async () => {
      const licensesMap = new Map<LicenseContent, Dependency[]>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap, {
        exclude: [`${child1_1Name}`],
      });

      const child1LicenseContentMap = licensesMap.get(child1LicenseContent);
      expect(child1LicenseContentMap?.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseContent);
      expect(child1_1LicenseContentMap).toBeUndefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseContent);
      expect(child1_2LicenseContentMap?.find(c => c.name === child1_2Name)).toBeDefined();
    });
  });

  const setUpPackageJson = (directory: string, packageJson: PackageJson): void => {
    const fullPackageJsonPath = join(directory, "package.json");
    const packageJsonContent = JSON.stringify(packageJson);

    when(mockedDoesFileExist).calledWith(fullPackageJsonPath).mockResolvedValue(true);
    when(mockedReadFile)
      .calledWith(fullPackageJsonPath, { encoding: "utf-8" })
      .mockResolvedValue(packageJsonContent);
  };
});
