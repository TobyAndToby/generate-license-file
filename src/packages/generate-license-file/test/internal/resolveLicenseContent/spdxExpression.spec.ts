import { spdxExpression } from "../../../src/lib/internal/resolveLicenseContent/spdxExpression";
import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import logger from "../../../src/lib/utils/console.utils";

jest.mock("../../../src/lib/utils/console.utils"); // Stops logger.warn from being called

describe("spdxExpression", () => {
  const mockedWarn = jest.mocked(logger.warn);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if the package.json does not have a license field", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {},
      directory: "/some/directory",
    };

    const result = await spdxExpression(inputs);

    expect(result).toBeNull();
  });

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
