import { when } from "jest-when";
import { resolveLicenseContent } from "../../../src/lib/internal/resolveLicenseContent";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";
import { join } from "path";
import { packageJsonLicense } from "../../../src/lib/internal/resolveLicenseContent/packageJsonLicense";
import { licenseFile } from "../../../src/lib/internal/resolveLicenseContent/licenseFile";
import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/internal/resolveLicenseContent/packageJsonLicense");
jest.mock("../../../src/lib/internal/resolveLicenseContent/licenseFile");
jest.mock("../../../src/lib/internal/resolveLicenseContent/spdxExpression");

describe("resolveLicenseContent", () => {
  const mockedReadFile = jest.mocked(readFile);
  const mockedDoesFileExist = jest.mocked(doesFileExist);

  const mockedPackageJsonLicenseResolution = jest.mocked(packageJsonLicense);
  const mockedLicenseFileResolution = jest.mocked(licenseFile);
  const mockedSpdxExpressionResolution = jest.mocked(spdxExpression);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  describe("when a replacement is given for a package", () => {
    it("should return the content of the replacement file", async () => {
      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };
      setUpPackageJson("/some/directory", packageJson);

      const replacements: Record<string, string> = {
        "some-package@1.2.3": "/some/replacement/path",
      };
      when(mockedReadFile)
        .calledWith("/some/replacement/path", { encoding: "utf-8" })
        .mockResolvedValue("the replacement content");

      const result = await resolveLicenseContent("/some/directory", replacements);

      expect(result).toBe("the replacement content");
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
      setUpPackageJson("/some/directory", packageJson);

      const resolutions: Record<string, string> = {};

      const _ = await resolveLicenseContent("/some/directory", resolutions);

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

    it("should return null if all resolvers return null", async () => {
      mockedPackageJsonLicenseResolution.mockResolvedValue(null);
      mockedLicenseFileResolution.mockResolvedValue(null);
      mockedSpdxExpressionResolution.mockResolvedValue(null);

      const packageJson: PackageJson = {
        name: "some-package",
        version: "1.2.3",
      };
      setUpPackageJson("/some/directory", packageJson);

      const resolutions: Record<string, string> = {};

      const result = await resolveLicenseContent("/some/directory", resolutions);

      expect(result).toBeNull();
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
        setUpPackageJson("/some/directory", packageJson);

        const resolutions: Record<string, string> = {};

        const result = await resolveLicenseContent("/some/directory", resolutions);

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
        setUpPackageJson("/some/directory", packageJson);

        const resolutions: Record<string, string> = {};

        const _ = await resolveLicenseContent("/some/directory", resolutions);

        expect(mockedPackageJsonLicenseResolution).toHaveBeenCalledTimes(1);
        expect(mockedLicenseFileResolution).toHaveBeenCalledTimes(1);
        expect(mockedSpdxExpressionResolution).toHaveBeenCalledTimes(0);
      });
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
