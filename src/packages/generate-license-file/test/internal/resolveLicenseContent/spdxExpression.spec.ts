import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import logger from "../../../src/lib/utils/console.utils";
import { PackageJson } from "../../../src/lib/utils/packageJson.utils";

jest.mock("../../../src/lib/utils/console.utils");

describe("spdxExpression", () => {
  const mockedWarn = jest.mocked(logger.warn);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if the package.json does not have a license or a licenses field", async () => {
    const inputs: ResolutionInputs = {
      packageJson: new PackageJson(),
      directory: "/some/directory",
    };

    const result = await spdxExpression(inputs);

    expect(result).toBeNull();
  });

  describe("when the license field is a string", () => {
    it("should return null if the license field is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, ""),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it.each(["Apache-2.0", "BSD-2-Clause", "MIT"])(
      "should return the license field if it is not empty",
      async expression => {
        const inputs: ResolutionInputs = {
          packageJson: new PackageJson(undefined, undefined, expression),
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(expression);
      },
    );

    it("should warning log if the license field contains ' OR '", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson("some-package", "1.0.0", "MIT OR Apache-2.0"),
        directory: "/some/directory",
      };

      const _ = await spdxExpression(inputs);

      expect(mockedWarn).toHaveBeenCalledTimes(1);
      expect(mockedWarn).toHaveBeenCalledWith(
        `The license expression for ${inputs.packageJson.name}@${inputs.packageJson.version} contains multiple licenses: "MIT OR Apache-2.0"\n` +
          "We suggest you determine which license applies to your project and replace the license content\n" +
          `for ${inputs.packageJson.name}@${inputs.packageJson.version} using a generate-license-file config file.\n` +
          "See: https://generate-license-file.js.org/docs/cli/config-file for more information.\n",
      );
    });
  });

  describe("when the license field is an array", () => {
    it("should return null if the license field is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, []),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    describe("when the license field contains a single object", () => {
      it("should return null if the license field contains an object with no type", async () => {
        const inputs: ResolutionInputs = {
          packageJson: new PackageJson(undefined, undefined, [{ url: "https://some.url" }]),
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBeNull();
      });

      it("should return the license type field if it contains an object with a type", async () => {
        const license = "MIT";

        const inputs: ResolutionInputs = {
          packageJson: new PackageJson(undefined, undefined, [
            { type: license, url: "https://some.url" },
          ]),
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(license);
      });
    });

    describe("when the license field contains multiple objects", () => {
      it("should warn", () => {
        const inputs: ResolutionInputs = {
          packageJson: new PackageJson("some-package", "1.0.0", [
            { type: "MIT", url: "https://some.url" },
            { type: "Apache-2.0", url: "https://some.url" },
          ]),
          directory: "/some/directory",
        };

        expect(mockedWarn).toHaveBeenCalledTimes(0);

        const _ = spdxExpression(inputs);

        expect(mockedWarn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when the license field is an object", () => {
    it("should return null if the license field contains an empty object", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, {}),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the license field contains an object with no type", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, { url: "https://some.url" }),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it("should return the license type field if it contains an object with a type", async () => {
      const license = "MIT";

      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, {
          type: license,
          url: "https://some.url",
        }),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBe(license);
    });
  });

  describe("when the licenses field is an array", () => {
    it("should return null if the licenses field is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: new PackageJson(undefined, undefined, undefined, []),
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    describe("when the licenses field contains a single object", () => {
      it("should return null if the licenses field contains an object with no type", async () => {
        const inputs: ResolutionInputs = {
          packageJson: new PackageJson(undefined, undefined, undefined, [
            { url: "https://some.url" },
          ]),
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBeNull();
      });

      it("should return the license type field if it contains an object with a type", async () => {
        const license = "MIT";

        const inputs: ResolutionInputs = {
          packageJson: new PackageJson(undefined, undefined, undefined, [
            { type: license, url: "https://some.url" },
          ]),
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(license);
      });
    });

    describe("when the licenses field contains multiple objects", () => {
      it("should warn", () => {
        const inputs: ResolutionInputs = {
          packageJson: new PackageJson("some-package", "1.0.0", undefined, [
            { type: "MIT", url: "https://some.url" },
            { type: "Apache-2.0", url: "https://some.other.url" },
          ]),
          directory: "/some/directory",
        };

        expect(mockedWarn).toHaveBeenCalledTimes(0);

        const _ = spdxExpression(inputs);

        expect(mockedWarn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
