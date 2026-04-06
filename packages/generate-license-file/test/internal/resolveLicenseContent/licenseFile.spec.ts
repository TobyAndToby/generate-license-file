import { vi, describe, it, expect, beforeEach, afterAll } from "vitest";
import { glob } from "glob";
import { when } from "vitest-when";
import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import {
  extensionDenyList,
  licenseFile,
} from "../../../src/lib/internal/resolveLicenseContent/licenseFile";
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
    when(mockedReadFile)
      .calledWith(licenseFilePath, { encoding: "utf-8" })
      .thenResolve("license contents");

    const result = await licenseFile(resolutionInputs);

    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledWith(licenseFilePath, { encoding: "utf-8" });
    expect(result).toBe("license contents");
  });

  it.each(extensionDenyList)(
    "should return null if all license files are in the extension deny list",
    async extension => {
      mockedGlob.mockResolvedValue([`/some/directory/license${extension}`]);

      const result = await licenseFile(resolutionInputs);

      expect(result).toBeNull();
    },
  );
});
