import { when } from "jest-when";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { licenseFile } from "../../../src/lib/internal/resolveLicenseContent/licenseFile";
import { packageJsonLicense } from "../../../src/lib/internal/resolveLicenseContent/packageJsonLicense";
import { replacementFile } from "../../../src/lib/internal/resolveLicenseContent/replacementFile";
import { replacementHttp } from "../../../src/lib/internal/resolveLicenseContent/replacementHttp";
import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

jest.mock("../../../src/lib/internal/resolveLicenseContent/packageJsonLicense");
jest.mock("../../../src/lib/internal/resolveLicenseContent/licenseFile");
jest.mock("../../../src/lib/internal/resolveLicenseContent/spdxExpression");

jest.mock("../../../src/lib/internal/resolveLicenseContent/replacementHttp");
jest.mock("../../../src/lib/internal/resolveLicenseContent/replacementFile");

describe("resolveLicenseContent", () => {
  const mockedPackageJsonLicenseResolution = jest.mocked(packageJsonLicense);
  const mockedLicenseFileResolution = jest.mocked(licenseFile);
  const mockedSpdxExpressionResolution = jest.mocked(spdxExpression);

  const mockedReplacementHttp = jest.mocked(replacementHttp);
  const mockedReplacementFile = jest.mocked(replacementFile);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  describe("when a 'name' replacement is given for a package", () => {
    it("should call all of the replacement resolvers in order if they all return null", async () => {
      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package": "/some/replacement/path",
      };

      when(mockedReplacementHttp).calledWith("/some/replacement/path").mockResolvedValue(null);
      when(mockedReplacementFile).calledWith("/some/replacement/path").mockResolvedValue(null);

      await expect(() =>
        resolveLicenseContent("/some/directory", packageJson, replacements),
      ).rejects.toThrow();

      expect(mockedReplacementHttp).toHaveBeenCalledTimes(1);
      expect(mockedReplacementFile).toHaveBeenCalledTimes(1);
    });

    it("should not call later resolvers if an earlier resolver returns a non-null value", async () => {
      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package": "/some/replacement/path",
      };

      when(mockedReplacementHttp)
        .calledWith("/some/replacement/path")
        .mockResolvedValue("a not null value");
      when(mockedReplacementFile).calledWith("/some/replacement/path").mockResolvedValue(null);

      await resolveLicenseContent("/some/directory", packageJson, replacements);

      expect(mockedReplacementHttp).toHaveBeenCalledTimes(1);
      expect(mockedReplacementFile).toHaveBeenCalledTimes(0);
    });

    it("should return the content of the first resolver that returns a non-null value", async () => {
      const someContent = "some content";

      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package": "/some/replacement/path",
      };

      when(mockedReplacementHttp)
        .calledWith("/some/replacement/path")
        .mockResolvedValue(someContent);
      when(mockedReplacementFile).calledWith("/some/replacement/path").mockResolvedValue(null);

      const result = await resolveLicenseContent("/some/directory", packageJson, replacements);

      expect(result).toBe(someContent);
    });

    it("should throw if all replacement resolvers return null", async () => {
      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package": "/some/replacement/path",
      };

      when(mockedReplacementHttp).calledWith("/some/replacement/path").mockResolvedValue(null);
      when(mockedReplacementFile).calledWith("/some/replacement/path").mockResolvedValue(null);

      await expect(() =>
        resolveLicenseContent("/some/directory", packageJson, replacements),
      ).rejects.toThrow(
        "Could not find replacement content at /some/replacement/path for some-package@1.2.3",
      );
    });
  });

  describe("when a 'name@version' replacement is given for a package", () => {
    it("should return the content of the replacement file", async () => {
      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package@1.2.3": "/some/replacement/path",
      };

      when(mockedReplacementHttp).calledWith("/some/replacement/path").mockResolvedValue(null);
      when(mockedReplacementFile).calledWith("/some/replacement/path").mockResolvedValue(null);

      await expect(() =>
        resolveLicenseContent("/some/directory", packageJson, replacements),
      ).rejects.toThrow();

      expect(mockedReplacementFile).toHaveBeenCalledTimes(1);
      expect(mockedReplacementHttp).toHaveBeenCalledTimes(1);
    });

    it("should should be prioritised over a 'name' replacement", async () => {
      const packageJson = new PackageJson("some-package", "1.2.3");

      const replacements: Record<string, string> = {
        "some-package": "/some/less/specific/replacement/path",
        "some-package@1.2.3": "/some/more/specific/replacement/path",
      };
      when(mockedReplacementFile)
        .calledWith("/some/less/specific/replacement/path")
        .mockResolvedValue("the less specific replacement content");
      when(mockedReplacementFile)
        .calledWith("/some/more/specific/replacement/path")
        .mockResolvedValue("the more specific replacement content");

      const result = await resolveLicenseContent("/some/directory", packageJson, replacements);

      expect(result).toBe("the more specific replacement content");
    });
  });

  describe("when no replacement is given for a package", () => {
    it("should call every resolver in order if they all return null", async () => {
      mockedPackageJsonLicenseResolution.mockResolvedValue(null);
      mockedLicenseFileResolution.mockResolvedValue(null);
      mockedSpdxExpressionResolution.mockResolvedValue(null);

      const packageJson = new PackageJson("some-package", "1.2.3");

      const resolutions: Record<string, string> = {};

      await expect(() =>
        resolveLicenseContent("/some/directory", packageJson, resolutions),
      ).rejects.toThrow();

      expect(mockedPackageJsonLicenseResolution).toHaveBeenCalledTimes(1);
      expect(mockedPackageJsonLicenseResolution).toHaveBeenCalledWith({
        directory: "/some/directory",
        packageJson,
      });

      expect(mockedLicenseFileResolution).toHaveBeenCalledTimes(1);
      expect(mockedLicenseFileResolution).toHaveBeenCalledWith({
        directory: "/some/directory",
        packageJson,
      });

      expect(mockedSpdxExpressionResolution).toHaveBeenCalledTimes(1);
      expect(mockedSpdxExpressionResolution).toHaveBeenCalledWith({
        directory: "/some/directory",
        packageJson,
      });
    });

    it("should throw if all resolvers return null", async () => {
      mockedPackageJsonLicenseResolution.mockResolvedValue(null);
      mockedLicenseFileResolution.mockResolvedValue(null);
      mockedSpdxExpressionResolution.mockResolvedValue(null);

      const packageJson = new PackageJson("some-package", "1.2.3");

      const resolutions: Record<string, string> = {};

      await expect(() =>
        resolveLicenseContent("/some/directory", packageJson, resolutions),
      ).rejects.toThrow("Could not find license content for some-package@1.2.3");
    });

    describe("when a resolver returns a non-null value", () => {
      it("should return the value retuned from that resolver", async () => {
        mockedPackageJsonLicenseResolution.mockResolvedValue(null);
        mockedLicenseFileResolution.mockResolvedValue("the license file content");
        mockedSpdxExpressionResolution.mockResolvedValue(null);

        const packageJson = new PackageJson("some-package", "1.2.3");

        const resolutions: Record<string, string> = {};

        const result = await resolveLicenseContent("/some/directory", packageJson, resolutions);

        expect(result).toBe("the license file content");
      });

      it("should not call any other resolvers", async () => {
        mockedPackageJsonLicenseResolution.mockResolvedValue(null);
        mockedLicenseFileResolution.mockResolvedValue("the license file content");
        mockedSpdxExpressionResolution.mockResolvedValue(null);

        const packageJson = new PackageJson("some-package", "1.2.3");

        const resolutions: Record<string, string> = {};

        const _ = await resolveLicenseContent("/some/directory", packageJson, resolutions);

        expect(mockedPackageJsonLicenseResolution).toHaveBeenCalledTimes(1);
        expect(mockedLicenseFileResolution).toHaveBeenCalledTimes(1);
        expect(mockedSpdxExpressionResolution).toHaveBeenCalledTimes(0);
      });
    });
  });
});
