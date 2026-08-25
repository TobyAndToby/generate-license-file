import { glob } from "glob";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { when } from "vitest-when";
import type { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { extensionDenyList, licenseFile } from "../../../src/lib/internal/resolveLicenseContent/licenseFile";
import { readFile } from "../../../src/lib/utils/file.utils";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

vi.mock("glob", () => ({
  glob: vi.fn(),
}));

vi.mock("../../../src/lib/utils/file.utils");
vi.mock("../../../src/lib/utils/console.utils"); // Stops logger.warn from being called

describe("licenseFile", () => {
  const mockedGlob = vi.mocked(glob);
  const mockedReadFile = vi.mocked(readFile);

  const resolutionInputs: ResolutionInputs = {
    directory: "/some/directory",
    packageJson: new PackageJson("some-package", "1.0.0"),
  };

  beforeEach(() => {
    vi.resetModules();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return null if no license files are found", async () => {
    mockedGlob.mockResolvedValue([]);

    const result = await licenseFile(resolutionInputs);

    expect(result).toBeNull();
  });

  it("should return the contents of the first license file found", async () => {
    const licenseFilePath = "/some/directory/license.txt";

    mockedGlob.mockResolvedValue([licenseFilePath, "/some/other/file.txt"]);
    when(mockedReadFile).calledWith(licenseFilePath, { encoding: "utf-8" }).thenResolve("license contents");

    const result = await licenseFile(resolutionInputs);

    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledWith(licenseFilePath, { encoding: "utf-8" });
    expect(result).toBe("license contents");
  });

  it("should pick the base license file over decorated variants regardless of glob's order or casing", async () => {
    // glob({ nocase: true }) returns matches using the pattern's case on
    // case-insensitive filesystems (macOS yields "license") but the on-disk
    // case elsewhere (Linux yields "LICENSE"), in filesystem order either way.
    // The real license must win over a decorated variant like
    // "LICENSE-3rdparty.csv" on both, so the output is identical cross-platform.
    const upperLicense = "/some/directory/LICENSE";
    const lowerLicense = "/some/directory/license";
    const thirdParty = "/some/directory/LICENSE-3rdparty.csv";

    when(mockedReadFile).calledWith(upperLicense, { encoding: "utf-8" }).thenResolve("license contents");
    when(mockedReadFile).calledWith(lowerLicense, { encoding: "utf-8" }).thenResolve("license contents");
    when(mockedReadFile).calledWith(thirdParty, { encoding: "utf-8" }).thenResolve("third party contents");

    // Case-sensitive filesystem (e.g. Linux): glob yields the on-disk "LICENSE"
    mockedGlob.mockResolvedValueOnce([thirdParty, upperLicense]);
    const caseSensitive = await licenseFile(resolutionInputs);

    // Case-insensitive filesystem (e.g. macOS): glob yields the pattern's "license"
    mockedGlob.mockResolvedValueOnce([thirdParty, lowerLicense]);
    const caseInsensitive = await licenseFile(resolutionInputs);

    expect(caseSensitive).toBe("license contents");
    expect(caseInsensitive).toBe("license contents");
  });

  it.each(
    extensionDenyList,
  )("should return null if all license files are in the extension deny list", async extension => {
    mockedGlob.mockResolvedValue([`/some/directory/license${extension}`]);

    const result = await licenseFile(resolutionInputs);

    expect(result).toBeNull();
  });
});
