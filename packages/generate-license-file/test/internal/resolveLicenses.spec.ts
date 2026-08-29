import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveDependencies } from "../../src/lib/internal/resolveDependencies";
import { type LicenseNoticeKey, type ResolvedLicense, resolveLicenses } from "../../src/lib/internal/resolveLicenses";
import logger from "../../src/lib/utils/console.utils";

vi.mock("../../src/lib/internal/resolveDependencies", () => ({
  resolveDependencies: vi.fn(),
}));

vi.mock("../../src/lib/utils/console.utils");

describe("resolveLicenses", () => {
  const mockedResolveDependencies = vi.mocked(resolveDependencies);
  const mockedLogger = vi.mocked(logger);

  const packageJsons = ["/some/directory/package.json"];

  const licenseContent = "some license content";
  const licenseNoticeKey: LicenseNoticeKey = `${licenseContent}:`;
  const resolvedLicense: ResolvedLicense = {
    licenseContent,
    notices: [],
    dependencies: [{ name: "some-package", version: "1.0.0" }],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => vi.restoreAllMocks());

  it("should call resolveDependencies for each given package.json", async () => {
    const options = { exclude: ["some-package"] };
    const multiplePackageJsons = ["/one/package.json", "/two/package.json"];

    await resolveLicenses(multiplePackageJsons, options);

    expect(mockedResolveDependencies).toHaveBeenCalledTimes(2);
    expect(mockedResolveDependencies).toHaveBeenCalledWith("/one/package.json", expect.any(Map), options);
    expect(mockedResolveDependencies).toHaveBeenCalledWith("/two/package.json", expect.any(Map), options);
  });

  describe("when dependencies were resolved", () => {
    beforeEach(() => {
      mockedResolveDependencies.mockImplementation(async (_packageJson, licensesMap) => {
        licensesMap.set(licenseNoticeKey, resolvedLicense);
      });
    });

    it("should return the resolved licenses", async () => {
      const result = await resolveLicenses(packageJsons);

      expect(result).toEqual([resolvedLicense]);
    });

    it("should not warn", async () => {
      await resolveLicenses(packageJsons);

      expect(mockedLogger.warn).not.toHaveBeenCalled();
    });
  });

  describe("when no dependencies were resolved", () => {
    it("should return an empty array", async () => {
      const result = await resolveLicenses(packageJsons);

      expect(result).toEqual([]);
    });

    it("should warn that the output will be empty", async () => {
      await resolveLicenses(packageJsons);

      expect(mockedLogger.warn).toHaveBeenCalledTimes(1);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining("No production dependencies were found, so the output will be empty."),
      );
    });

    it("should name each given package.json in the warning", async () => {
      await resolveLicenses(["/one/package.json", "/two/package.json"]);

      expect(mockedLogger.warn).toHaveBeenCalledWith(expect.stringContaining("/one/package.json, /two/package.json"));
    });
  });
});
