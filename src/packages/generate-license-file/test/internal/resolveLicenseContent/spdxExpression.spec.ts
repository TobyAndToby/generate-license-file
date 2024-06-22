import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import logger from "../../../src/lib/utils/console.utils";

jest.mock("../../../src/lib/utils/console.utils");

describe("spdxExpression", () => {
  const mockedWarn = jest.mocked(logger.warn);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if the package.json does not have a license or a licenses field", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {},
      directory: "/some/directory",
    };

    const result = await spdxExpression(inputs);

    expect(result).toBeNull();
  });

  describe("when the license field is a string", () => {
    it("should return null if the license field is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: "",
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it.each(["Apache-2.0", "BSD-2-Clause", "MIT"])(
      "should return the license field if it is not empty",
      async expression => {
        const inputs: ResolutionInputs = {
          packageJson: {
            license: expression,
          },
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(expression);
      },
    );

    it("should warning log if the license field contains ' OR '", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          name: "some-package",
          version: "1.0.0",
          license: "MIT OR Apache-2.0",
        },
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
        packageJson: {
          license: [],
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    describe("when the license field contains a single object", () => {
      it("should return null if the license field contains an object with no type", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ url: "https://some.url" }],
          },
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBeNull();
      });

      it("should return the license type field if it contains an object with a type", async () => {
        const license = "MIT";

        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ type: license, url: "https://some.url" }],
          },
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(license);
      });
    });

    describe("when the license field contains multiple objects", () => {
      it("should warn", () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            name: "some-package",
            version: "1.0.0",
            license: [
              { type: "MIT", url: "https://some.url" },
              { type: "Apache-2.0", url: "https://some.url" },
            ],
          },
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
        packageJson: {
          license: {},
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the license field contains an object with no type", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: { url: "https://some.url" },
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    it("should return the license type field if it contains an object with a type", async () => {
      const license = "MIT";

      const inputs: ResolutionInputs = {
        packageJson: {
          license: { type: license, url: "https://some.url" },
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBe(license);
    });
  });

  describe("when the licenses field is an array", () => {
    it("should return null if the licenses field is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          licenses: [],
        },
        directory: "/some/directory",
      };

      const result = await spdxExpression(inputs);

      expect(result).toBeNull();
    });

    describe("when the licenses field contains a single object", () => {
      it("should return null if the licenses field contains an object with no type", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ url: "https://some.url" }],
          },
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBeNull();
      });

      it("should return the license type field if it contains an object with a type", async () => {
        const license = "MIT";

        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ type: license, url: "https://some.url" }],
          },
          directory: "/some/directory",
        };

        const result = await spdxExpression(inputs);

        expect(result).toBe(license);
      });
    });

    describe("when the licenses field contains multiple objects", () => {
      it("should warn", () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            name: "some-package",
            version: "1.0.0",
            licenses: [
              { type: "MIT", url: "https://some.url" },
              { type: "Apache-2.0", url: "https://some.other.url" },
            ],
          },
          directory: "/some/directory",
        };

        expect(mockedWarn).toHaveBeenCalledTimes(0);

        const _ = spdxExpression(inputs);

        expect(mockedWarn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
