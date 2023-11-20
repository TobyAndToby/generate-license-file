import { join } from "path";
import { packageJsonLicense } from "../../../src/lib/internal/resolveLicenseContent/packageJsonLicense";
import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";
import { when } from "jest-when";

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/utils/console.utils"); // Stops logger.warn from being called

describe("packageJsonLicense", () => {
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedReadFile = jest.mocked(readFile);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if the package.json does not have a license field", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {},
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();
  });

  it("should return null if the license field does not start with 'see license in '", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {
        license: "MIT",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();
  });

  it("should try to read the license file from the directory specified in the inputs", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {
        license: "SEE LICENSE IN license.txt",
      },
      directory: "/some/directory",
    };

    const _ = await packageJsonLicense(inputs);

    const expectedPath = join("/some/directory", "license.txt");
    expect(mockedDoesFileExist).toHaveBeenCalledWith(expectedPath);
  });

  it("should return null if the license file does not exist", async () => {
    const expectedPath = join("/some/directory", "license.txt");

    when(mockedDoesFileExist).calledWith(expectedPath).mockResolvedValue(false);

    const inputs: ResolutionInputs = {
      packageJson: {
        license: "SEE LICENSE IN license.txt",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();

    expect(mockedDoesFileExist).toHaveBeenCalledWith(expectedPath);
  });

  it("should return null if the license file cannot be read", async () => {
    const expectedPath = join("/some/directory", "license.txt");

    when(mockedDoesFileExist).calledWith(expectedPath).mockResolvedValue(true);
    when(mockedReadFile)
      .calledWith(expectedPath, { encoding: "utf-8" })
      .mockRejectedValue(new Error("Could not read file"));

    const inputs: ResolutionInputs = {
      packageJson: {
        license: "SEE LICENSE IN license.txt",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(mockedReadFile).toHaveBeenCalledWith(expectedPath, {
      encoding: "utf-8",
    });
    expect(result).toBeNull();
  });

  it("should return the license file contents if the license file exists and can be read", async () => {
    const expectedPath = join("/some/directory", "license.txt");

    when(mockedDoesFileExist).calledWith(expectedPath).mockResolvedValue(true);
    when(mockedReadFile)
      .calledWith(expectedPath, { encoding: "utf-8" })
      .mockResolvedValue("license contents");

    const inputs: ResolutionInputs = {
      packageJson: {
        license: "SEE LICENSE IN license.txt",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(mockedReadFile).toHaveBeenCalledWith(expectedPath, {
      encoding: "utf-8",
    });
    expect(result).toEqual("license contents");
  });

  it.each([
    "SEE LICENSE IN 'license.txt'",
    'SEE LICENSE IN "license.txt"',
    "SEE LICENSE IN <license.txt>",
  ])("should ignore punctuation wrapping the license file path", async licenseFile => {
    const expectedPath = join("/some/directory", "license.txt");

    when(mockedDoesFileExist).calledWith(expectedPath).mockResolvedValue(true);
    when(mockedReadFile)
      .calledWith(expectedPath, { encoding: "utf-8" })
      .mockResolvedValue("license contents");

    const inputs: ResolutionInputs = {
      packageJson: {
        license: licenseFile,
      },
      directory: "/some/directory",
    };

    const _ = await packageJsonLicense(inputs);

    expect(mockedDoesFileExist).toHaveBeenCalledWith(expectedPath);
    expect(mockedReadFile).toHaveBeenCalledWith(expectedPath, {
      encoding: "utf-8",
    });
  });

  it.each(["http://some.url", "www.some.url"])(
    "should return the packages.json SPDX expression if the license file is a URL",
    async url => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: `SEE LICENSE IN ${url}`,
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toEqual(`SEE LICENSE IN ${url}`);
    },
  );
});
