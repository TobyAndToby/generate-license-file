import { when } from "jest-when";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { replacementFile } from "../../../src/lib/internal/resolveLicenseContent/replacementFile";
import { packageJsonLicense } from "../../../src/lib/internal/resolveLicenseContent/packageJsonLicense";
import { licenseFile } from "../../../src/lib/internal/resolveLicenseContent/licenseFile";
import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

jest.mock("../../../src/lib/internal/resolveLicenseContent/replacementFile");
jest.mock("../../../src/lib/internal/resolveLicenseContent/packageJsonLicense");
jest.mock("../../../src/lib/internal/resolveLicenseContent/licenseFile");
jest.mock("../../../src/lib/internal/resolveLicenseContent/spdxExpression");

describe("resolveLicenseContent", () => {
  const mockedReplacementFile = jest.mocked(replacementFile);

  const mockedPackageJsonLicenseResolution = jest.mocked(packageJsonLicense);
  const mockedLicenseFileResolution = jest.mocked(licenseFile);
  const mockedSpdxExpressionResolution = jest.mocked(spdxExpression);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  describe("when a 'name' replacement is given for a package", () => {
    it("should return the content of the replacement file", async () => {
      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };

      const replacements: Record<string, string> = {
        "some-package": "/some/replacement/path",
      };
      when(mockedReplacementFile)
        .calledWith("/some/replacement/path")
        .mockResolvedValue("the replacement content");

      const result = await resolveLicenseContent("/some/directory", packageJson, replacements);

      expect(result).toBe("the replacement content");
    });
  });

  describe("when a 'name@version' replacement is given for a package", () => {
    it("should return the content of the replacement file", async () => {
      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };

      const replacements: Record<string, string> = {
        "some-package@1.2.3": "/some/replacement/path",
      };
      when(mockedReplacementFile)
        .calledWith("/some/replacement/path")
        .mockResolvedValue("the replacement content");

      const result = await resolveLicenseContent("/some/directory", packageJson, replacements);

      expect(result).toBe("the replacement content");
    });

    it("should should be prioritised over a 'name' replacement", async () => {
      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };

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

      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };

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

      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };

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

        const packageJson: PackageJson = {
          name: "some-package",
          version: "1.2.3",
        };

        const resolutions: Record<string, string> = {};

        const result = await resolveLicenseContent("/some/directory", packageJson, resolutions);

        expect(result).toBe("the license file content");
      });

      it("should not call any other resolvers", async () => {
        mockedPackageJsonLicenseResolution.mockResolvedValue(null);
        mockedLicenseFileResolution.mockResolvedValue("the license file content");
        mockedSpdxExpressionResolution.mockResolvedValue(null);

        const packageJson: PackageJson = {
          name: "some-package",
          version: "1.2.3",
        };

        const resolutions: Record<string, string> = {};

        const _ = await resolveLicenseContent("/some/directory", packageJson, resolutions);

        expect(mockedPackageJsonLicenseResolution).toHaveBeenCalledTimes(1);
        expect(mockedLicenseFileResolution).toHaveBeenCalledTimes(1);
        expect(mockedSpdxExpressionResolution).toHaveBeenCalledTimes(0);
      });
    });
  });
});
