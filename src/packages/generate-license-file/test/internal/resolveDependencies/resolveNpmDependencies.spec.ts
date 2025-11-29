import Arborist, { Edge } from "@npmcli/arborist";
import { when } from "jest-when";
import { join } from "path";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { LicenseNoticeKey, ResolvedLicense } from "../../../src/lib/internal/resolveLicenses";
import logger from "../../../src/lib/utils/console.utils";
import { doesFileExist, doesFolderExist, readFile } from "../../../src/lib/utils/file.utils";

jest.mock("@npmcli/arborist", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/utils/console.utils");

jest.mock("../../../src/lib/internal/resolveLicenseContent", () => ({
  resolveLicenseContent: jest.fn(),
}));

describe("resolveNpmDependencies", () => {
  const mockedLogger = jest.mocked(logger);
  const mockedReadFile = jest.mocked(readFile);
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedDoesFolderExist = jest.mocked(doesFolderExist);

  const child1Name = "child1";
  const child1Version = "1.0.0";
  const child1Realpath = "/some/path/child1";
  const child1LicenseContent = "license contents for child1 and child1.2";
  const child1LicenseNoticePair: LicenseNoticeKey = `${child1LicenseContent}:`;

  const child1_1Name = "child1.1";
  const child1_1Version = "1.1.0";
  const child1_1Realpath = "/some/path/child1.1";
  const child1_1LicenseContent = "license contents for child1.1";
  const child1_1LicenseNoticePair: LicenseNoticeKey = `${child1_1LicenseContent}:`;

  const child1_2Name = "child1.2";
  const child1_2Version = "1.2.0";
  const child1_2Realpath = "/some/path/child1.2";
  const child1_2LicenseContent = child1LicenseContent;
  const child1_2LicenseNoticePair: LicenseNoticeKey = `${child1_2LicenseContent}:`;

  const child2Name = "child2";
  const child2Version = "2.0.0";
  const child2Realpath = "/some/path/child2";
  const child2LicenseContent = "license contents for child2";
  const child2LicenseNoticePair: LicenseNoticeKey = `${child2LicenseContent}:`;

  const child2_1Name = "child2.1";
  const child2_1Version = "2.1.0";
  const child2_1Realpath = "/some/path/child2.1";
  const child2_1LicenseContent = "license contents for child2.1";
  const child2_1LicenseNoticePair: LicenseNoticeKey = `${child2_1LicenseContent}:`;

  const child3Name = "child3";
  const child3Version = "3.0.0";
  const child3Realpath = "/some/path/child3";
  const child3LicenseContent = "license contents for child3";
  const child3LicenseNoticePair: LicenseNoticeKey = `${child3LicenseContent}:`;

  const child3_1Name = "child3.1";
  const child3_1Version = "3.1.0";
  const child3_1Realpath = "/some/path/child3.1";
  const child3_1LicenseContent = "license contents for child3.1";
  const child3_1LicenseNoticePair: LicenseNoticeKey = `${child3_1LicenseContent}:`;

  // We create a node tree where:
  // - child1 is a 'normal' dependency
  //   - It has two 'normal' dependencies
  // - child2 is a dev dependency
  //   - It has one 'normal' dependency (but it won't show in results because it's parent is a dev dependency)
  // - child3 is a peer dependency
  //   - It has one 'normal' dependency (but it won't show in results because it's parent is a peer dependency)

  const createMockNode = (
    name: string,
    version: string,
    realpath: string,
    dev: boolean,
    peer: boolean,
    optional = false,
  ) => {
    return {
      pkgid: `${name}@${version}`,
      realpath,
      package: { name, version },
      name,
      children: new Map(),
      dev,
      peer,
      optional,
      edgesIn: new Set(),
      edgesOut: new Map(),
    } as unknown as Arborist.Node;
  };

  // Directory of the project package.json used to determine top-level dependencies
  const projectPackageJsonDir = "/some/path";

  const addEdge = (from: Arborist.Node, to: Arborist.Node) => {
    from.edgesOut.set(to.name, { to } as Edge);
    to.edgesIn.add({ from } as Edge);
  };

  const addRootEdge = (to: Arborist.Node) => {
    // Mark incoming edge from the project root directory so isTopLevelDependency() returns true
    to.edgesIn.add({ from: { path: projectPackageJsonDir } } as Edge);
  };

  const child1Node = createMockNode(child1Name, child1Version, child1Realpath, false, false);
  const child1_1Node = createMockNode(
    child1_1Name,
    child1_1Version,
    child1_1Realpath,
    false,
    false,
  );
  const child1_2Node = createMockNode(
    child1_2Name,
    child1_2Version,
    child1_2Realpath,
    false,
    false,
  );

  const child2Node = createMockNode(child2Name, child2Version, child2Realpath, true, false);
  const child2_1Node = createMockNode(
    child2_1Name,
    child2_1Version,
    child2_1Realpath,
    false,
    false,
  );

  const child3Node = createMockNode(child3Name, child3Version, child3Realpath, false, true);
  const child3_1Node = createMockNode(
    child3_1Name,
    child3_1Version,
    child3_1Realpath,
    false,
    false,
  );

  // child1 is a top level dependency (from root)
  addRootEdge(child1Node);

  // child1 has dependencies child1.1 and child1.2
  addEdge(child1Node, child1_1Node);
  addEdge(child1Node, child1_2Node);

  // child2 is a top level dev dependency
  addRootEdge(child2Node);

  // child2 has dependency child2.1
  addEdge(child2Node, child2_1Node);

  // child3 is a top level peer dependency
  addRootEdge(child3Node);

  // child3 has dependency child3.1
  addEdge(child3Node, child3_1Node);

  const topNode: Arborist.Node = {
    children: new Map([
      [child1Name, child1Node],
      [child2Name, child2Node],
      [child3Name, child3Node],
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
    setUpPackageJson(child1Realpath, child1Name, child1Version);

    when(mockedResolveLicenseContent)
      .calledWith(child1_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child1_1LicenseContent);
    setUpPackageJson(child1_1Realpath, child1_1Name, child1_1Version);

    when(mockedResolveLicenseContent)
      .calledWith(child1_2Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child1_2LicenseContent);
    setUpPackageJson(child1_2Realpath, child1_2Name, child1_2Version);

    when(mockedResolveLicenseContent)
      .calledWith(child2Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child2LicenseContent);
    setUpPackageJson(child2Realpath, child2Name, child2Version);

    when(mockedResolveLicenseContent)
      .calledWith(child2_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child2_1LicenseContent);
    setUpPackageJson(child2_1Realpath, child2_1Name, child2_1Version);

    when(mockedResolveLicenseContent)
      .calledWith(child3Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child3LicenseContent);
    setUpPackageJson(child3Realpath, child3Name, child3Version);

    when(mockedResolveLicenseContent)
      .calledWith(child3_1Realpath, expect.anything(), expect.anything())
      .mockResolvedValue(child3_1LicenseContent);
    setUpPackageJson(child3_1Realpath, child3_1Name, child3_1Version);

    when(mockedDoesFolderExist)
      .calledWith(expect.stringContaining("node_modules"))
      .mockResolvedValue(true);
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

  it.each([new Error("Something went wrong"), "Something went wrong"])(
    "should warning log if resolveLicenseContent throws an error",
    async error => {
      when(mockedResolveLicenseContent)
        .calledWith(child1Realpath, expect.anything(), expect.anything())
        .mockRejectedValue(error);

      await resolveDependenciesForNpmProject("/some/path/package.json", new Map());

      expect(mockedLogger.warn).toHaveBeenCalledTimes(1);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        `Unable to determine license content for ${child1Name}@${child1Version} with error:\nSomething went wrong\n`,
      );
    },
  );

  describe("when no options are provided", () => {
    it("should include non-dev dependencies in the result", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child1LicenseContentMap = licensesMap.get(child1LicenseNoticePair);
      expect(child1LicenseContentMap?.dependencies.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseNoticePair);
      expect(
        child1_1LicenseContentMap?.dependencies.find(c => c.name === child1_1Name),
      ).toBeDefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseNoticePair);
      expect(
        child1_2LicenseContentMap?.dependencies.find(c => c.name === child1_2Name),
      ).toBeDefined();
    });

    it("should not include dev dependencies in the result", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child2LicenseContentMap = licensesMap.get(child2LicenseNoticePair);
      expect(child2LicenseContentMap).toBeUndefined();

      const child2_1LicenseContentMap = licensesMap.get(child2_1LicenseNoticePair);
      expect(child2_1LicenseContentMap).toBeUndefined();
    });

    it("should not include peer dependencies in the result", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child3LicenseContentMap = licensesMap.get(child3LicenseNoticePair);
      expect(child3LicenseContentMap).toBeUndefined();

      const child3_1LicenseContentMap = licensesMap.get(child3_1LicenseNoticePair);
      expect(child3_1LicenseContentMap).toBeUndefined();
    });
  });

  describe("when an optional dependency is missing on disk", () => {
    const optionalName = "child-optional";
    const optionalVersion = "4.0.0";
    const optionalRealpath = "/some/path/child-optional";

    it("should skip it without throwing and not include it in the results", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      const optionalNode = createMockNode(
        optionalName,
        optionalVersion,
        optionalRealpath,
        false,
        false,
        true,
      );
      addRootEdge(optionalNode);

      const topNodeWithOptional: Arborist.Node = {
        children: new Map([
          ...Array.from(topNode.children.entries()),
          [optionalName, optionalNode],
        ]),
      } as Arborist.Node;

      // Ensure the package.json for the optional node appears missing
      when(mockedDoesFileExist)
        .calledWith(join(optionalRealpath, "package.json"))
        .mockResolvedValue(false);

      mockedArborist.mockImplementationOnce(
        () => ({ loadActual: async () => topNodeWithOptional }) as Arborist,
      );

      await expect(
        resolveDependenciesForNpmProject("/some/path/package.json", licensesMap),
      ).resolves.toBeUndefined();

      // It should not have produced any license entries for the optional node
      const keys = Array.from(licensesMap.keys());
      expect(keys.some(k => k.includes(optionalName))).toBe(false);
      // And no warning should be logged for this case
      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });

    it("should throw if a non-optional dependency is missing package.json", async () => {
      const missingName = "child-missing";
      const missingVersion = "5.0.0";
      const missingRealpath = "/some/path/child-missing";

      const missingNode = createMockNode(
        missingName,
        missingVersion,
        missingRealpath,
        false,
        false,
        false,
      );
      addRootEdge(missingNode);

      const topNodeWithMissing: Arborist.Node = {
        children: new Map([
          ...Array.from(topNode.children.entries()),
          [missingName, missingNode as unknown as Arborist.Node],
        ]),
      } as Arborist.Node;

      when(mockedDoesFileExist)
        .calledWith(join(missingRealpath, "package.json"))
        .mockResolvedValue(false);

      mockedArborist.mockImplementationOnce(
        () => ({ loadActual: async () => topNodeWithMissing }) as Arborist,
      );

      await expect(
        resolveDependenciesForNpmProject("/some/path/package.json", new Map()),
      ).rejects.toThrow(`Missing package.json for required package (${missingRealpath})`);
    });
  });

  describe("when a dependency is in the exclude list", () => {
    it("should not include the dependency in the result", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap, {
        exclude: [`${child1_1Name}@${child1_1Version}`],
      });

      const child1LicenseContentMap = licensesMap.get(child1LicenseNoticePair);
      expect(child1LicenseContentMap?.dependencies.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseNoticePair);
      expect(child1_1LicenseContentMap).toBeUndefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseNoticePair);
      expect(
        child1_2LicenseContentMap?.dependencies.find(c => c.name === child1_2Name),
      ).toBeDefined();
    });

    it("should not include the dependency in the result if specified by name only", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap, {
        exclude: [`${child1_1Name}`],
      });

      const child1LicenseContentMap = licensesMap.get(child1LicenseNoticePair);
      expect(child1LicenseContentMap?.dependencies.find(c => c.name === child1Name)).toBeDefined();

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseNoticePair);
      expect(child1_1LicenseContentMap).toBeUndefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseNoticePair);
      expect(
        child1_2LicenseContentMap?.dependencies.find(c => c.name === child1_2Name),
      ).toBeDefined();
    });
  });

  describe("when a directory inside node_modules starts with '.'", () => {
    const dotDirName = ".dotdir";
    const dotDirVersion = "0.0.0";
    const dotDirRealpath = "/some/path/.dotdir";

    it("should skip it without attempting to read its package.json", async () => {
      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

      const dotDirNode = createMockNode(
        dotDirName,
        dotDirVersion,
        dotDirRealpath,
        false,
        false,
        true,
      );
      addRootEdge(dotDirNode);

      const topNodeWithDotName: Arborist.Node = {
        children: new Map([
          ...Array.from(topNode.children.entries()),
          [dotDirName, dotDirNode as unknown as Arborist.Node],
        ]),
      } as Arborist.Node;

      mockedArborist.mockImplementationOnce(
        () => ({ loadActual: async () => topNodeWithDotName }) as Arborist,
      );

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const keys = Array.from(licensesMap.keys());
      expect(keys.some(k => k.includes(dotDirName))).toBe(false);
      expect(
        mockedDoesFileExist.mock.calls.some(call => (call[0] as string).includes(dotDirRealpath)),
      ).toBe(false);
      expect(
        mockedReadFile.mock.calls.some(call => (call[0] as string).includes(dotDirRealpath)),
      ).toBe(false);
      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });
  });

  describe("when the node_modules directory is in a parent directory", () => {
    it("should search parent folders and call Arborist with parent path", async () => {
      mockedDoesFolderExist.mockImplementation(async p => {
        if (p === "/some/path/node_modules") return false;
        if (p === "/some/node_modules") return true;
        return false;
      });

      await resolveDependenciesForNpmProject("/some/path/package.json", new Map());

      expect(mockedArborist).toHaveBeenCalledWith({ path: "/some" });
    });

    it("should only include dependencies whose incoming edge path matches the package.json directory", async () => {
      mockedDoesFolderExist.mockImplementation(async p => {
        if (p === "/some/path/node_modules") return false;
        if (p === "/some/node_modules") return true;
        return false;
      });

      const tChild1 = createMockNode(child1Name, child1Version, child1Realpath, false, false);
      const tChild1_1 = createMockNode(
        child1_1Name,
        child1_1Version,
        child1_1Realpath,
        false,
        false,
      );
      const tChild1_2 = createMockNode(
        child1_2Name,
        child1_2Version,
        child1_2Realpath,
        false,
        false,
      );

      // Mark tChild1 as top-level for the target project path
      tChild1.edgesIn = new Set([{ from: { path: "/some/path" } } as Edge]);
      // Children are connected via edges from tChild1
      addEdge(tChild1 as unknown as Arborist.Node, tChild1_1 as unknown as Arborist.Node);
      addEdge(tChild1 as unknown as Arborist.Node, tChild1_2 as unknown as Arborist.Node);

      // Another top-level dependency originating from a different project path
      const otherName = "other";
      const otherVersion = "9.0.0";
      const otherRealpath = "/some/path/other";
      const otherNode = createMockNode(otherName, otherVersion, otherRealpath, false, false);
      otherNode.edgesIn = new Set([{ from: { path: "/different/root" } } as Edge]);

      const topNodeWithOther: Arborist.Node = {
        children: new Map([
          [child1Name, tChild1 as unknown as Arborist.Node],
          [child1_1Name, tChild1_1 as unknown as Arborist.Node],
          [child1_2Name, tChild1_2 as unknown as Arborist.Node],
          [otherName, otherNode as unknown as Arborist.Node],
        ]),
      } as Arborist.Node;

      mockedArborist.mockImplementationOnce(
        () => ({ loadActual: async () => topNodeWithOther }) as Arborist,
      );

      when(mockedResolveLicenseContent)
        .calledWith(otherRealpath, expect.anything(), expect.anything())
        .mockResolvedValue("license contents for other");
      setUpPackageJson(otherRealpath, otherName, otherVersion);

      const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();
      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      // Expect child1 and its children included
      const child1Entry = licensesMap.get(child1LicenseNoticePair);
      expect(child1Entry?.dependencies.find(d => d.name === child1Name)).toBeDefined();
      const child1_1Entry = licensesMap.get(child1_1LicenseNoticePair);
      expect(child1_1Entry?.dependencies.find(d => d.name === child1_1Name)).toBeDefined();
      const child1_2Entry = licensesMap.get(child1_2LicenseNoticePair);
      expect(child1_2Entry?.dependencies.find(d => d.name === child1_2Name)).toBeDefined();

      // Expect 'other' NOT included because its incoming edge path doesn't match projectPackageJsonDir
      const keys = Array.from(licensesMap.keys());
      expect(keys.some(k => k.includes(otherName))).toBe(false);
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
