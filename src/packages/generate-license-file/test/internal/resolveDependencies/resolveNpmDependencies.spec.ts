import Arborist from "@npmcli/arborist";
import { resolveDependenciesForNpmProject } from "../../../src/lib/internal/resolveDependencies/resolveNpmDependencies";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { when } from "jest-when";

jest.mock("@npmcli/arborist", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../src/lib/internal/resolveLicenseContent", () => ({
  resolveLicenseContent: jest.fn(),
}));

describe("resolveNpmDependencies", () => {
  const child1Pkgid = "child1";
  const child1Realpath = "/some/path/child1";
  const child1LicenseContent = "license contents for child1 and child1.2";

  const child1_1Pkgid = "child1.1";
  const child1_1Realpath = "/some/path/child1.1";
  const child1_1LicenseContent = "license contents for child1.1";

  const child1_2Pkgid = "child1.2";
  const child1_2Realpath = "/some/path/child1.2";
  const child1_2LicenseContent = child1LicenseContent;

  const child2Pkgid = "child2";
  const child2Realpath = "/some/path/child2";
  const child2LicenseContent = "license contents for child2";

  const child2_1Pkgid = "child2.1";
  const child2_1Realpath = "/some/path/child2.1";
  const child2_1LicenseContent = "license contents for child2.1";

  const child3Pkgid = "child3";
  const child3Realpath = "/some/path/child3";
  const child3LicenseContent = "license contents for child3";

  const child3_1Pkgid = "child3.1";
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
        "child1",
        {
          pkgid: child1Pkgid,
          realpath: child1Realpath,
          children: new Map([
            [
              "child1.1",
              {
                pkgid: child1_1Pkgid,
                realpath: child1_1Realpath,
                children: new Map(),
                dev: false,
                peer: false,
              },
            ],
            [
              "child1.2",
              {
                pkgid: child1_2Pkgid,
                realpath: child1_2Realpath,
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
        "child2",
        {
          pkgid: child2Pkgid,
          realpath: child2Realpath,
          children: new Map([
            [
              "child2.1",
              {
                pkgid: child2_1Pkgid,
                realpath: child2_1Realpath,
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
        "child3",
        {
          pkgid: child3Pkgid,
          realpath: child3Realpath,
          children: new Map([
            [
              "child3.1",
              {
                pkgid: child3_1Pkgid,
                realpath: child3_1Realpath,
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
      .calledWith(child1Realpath, expect.anything())
      .mockResolvedValue(child1LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child1_1Realpath, expect.anything())
      .mockResolvedValue(child1_1LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child1_2Realpath, expect.anything())
      .mockResolvedValue(child1_2LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child2Realpath, expect.anything())
      .mockResolvedValue(child2LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child2_1Realpath, expect.anything())
      .mockResolvedValue(child2_1LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child3Realpath, expect.anything())
      .mockResolvedValue(child3LicenseContent);

    when(mockedResolveLicenseContent)
      .calledWith(child3_1Realpath, expect.anything())
      .mockResolvedValue(child3_1LicenseContent);
  });

  afterAll(() => jest.restoreAllMocks());

  it("should call arborist with the correct path", async () => {
    await resolveDependenciesForNpmProject("/some/path/package.json", new Map());

    expect(mockedArborist).toHaveBeenCalledTimes(1);
    expect(mockedArborist).toHaveBeenCalledWith({ path: "/some/path" });
  });

  it("should pass replacements to resolveLicenseContent", async () => {
    const replacements = { "some-package@1.0.0": "/some/path/to/license.txt" };

    await resolveDependenciesForNpmProject("/some/path/package.json", new Map(), {
      replace: replacements,
    });

    expect(mockedResolveLicenseContent).toHaveBeenCalledWith(child1Realpath, replacements);
    expect(mockedResolveLicenseContent).toHaveBeenCalledWith(child1_1Realpath, replacements);
    expect(mockedResolveLicenseContent).toHaveBeenCalledWith(child1_2Realpath, replacements);
  });

  describe("when no options are provided", () => {
    it("should include non-dev dependencies in the result", async () => {
      const licensesMap = new Map<string, Set<string>>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child1LicenseContentMap = licensesMap.get(child1LicenseContent);
      expect(child1LicenseContentMap?.has(child1Pkgid)).toBe(true);

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseContent);
      expect(child1_1LicenseContentMap?.has(child1_1Pkgid)).toBe(true);

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseContent);
      expect(child1_2LicenseContentMap?.has(child1_2Pkgid)).toBe(true);
    });

    it("should not include dev dependencies in the result", async () => {
      const licensesMap = new Map<string, Set<string>>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child2LicenseContentMap = licensesMap.get(child2LicenseContent);
      expect(child2LicenseContentMap).toBeUndefined();

      const child2_1LicenseContentMap = licensesMap.get(child2_1LicenseContent);
      expect(child2_1LicenseContentMap).toBeUndefined();
    });

    it("should not include peer dependencies in the result", async () => {
      const licensesMap = new Map<string, Set<string>>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap);

      const child3LicenseContentMap = licensesMap.get(child3LicenseContent);
      expect(child3LicenseContentMap).toBeUndefined();

      const child3_1LicenseContentMap = licensesMap.get(child3_1LicenseContent);
      expect(child3_1LicenseContentMap).toBeUndefined();
    });
  });

  describe("when a dependency is in the exclude list", () => {
    it("should not include the dependency in the result", async () => {
      const licensesMap = new Map<string, Set<string>>();

      await resolveDependenciesForNpmProject("/some/path/package.json", licensesMap, {
        exclude: [child1_1Pkgid],
      });

      const child1LicenseContentMap = licensesMap.get(child1LicenseContent);
      expect(child1LicenseContentMap?.has(child1Pkgid)).toBe(true);

      const child1_1LicenseContentMap = licensesMap.get(child1_1LicenseContent);
      expect(child1_1LicenseContentMap).toBeUndefined();

      const child1_2LicenseContentMap = licensesMap.get(child1_2LicenseContent);
      expect(child1_2LicenseContentMap?.has(child1_2Pkgid)).toBe(true);
    });
  });
});
