import { when } from "jest-when";
import { join } from "path";
import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { packageJsonLicense } from "../../../src/lib/internal/resolveLicenseContent/packageJsonLicense";
import logger from "../../../src/lib/utils/console.utils";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/utils/console.utils");

describe("packageJsonLicense", () => {
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedReadFile = jest.mocked(readFile);
  const mockedWarn = jest.mocked(logger.warn);

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if the package.json does not have a license or a licenses field", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {},
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();
  });

  it("should return null if the license field is an SPDX expression", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {
        license: "MIT",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();
  });

  it("should return null if the license field is an empty string", async () => {
    const inputs: ResolutionInputs = {
      packageJson: {
        license: "",
      },
      directory: "/some/directory",
    };

    const result = await packageJsonLicense(inputs);

    expect(result).toBeNull();
  });

  it.each(["http://some.url", "www.some.url"])(
    "should return the license URL if the license field is a URL: %s",
    async url => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: url,
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toEqual(url);
    },
  );

  describe("when the license field is a 'see license in' expression", () => {
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
          packageJson: { license: `SEE LICENSE IN ${url}` },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toEqual(`SEE LICENSE IN ${url}`);
      },
    );
  });

  describe("when the license field is an object", () => {
    it("should return the license URL if if it populated", async () => {
      const url = "https://some.url";

      const inputs: ResolutionInputs = {
        packageJson: {
          license: { url },
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toEqual(url);
    });

    it("should return null if the license URL is an empty string", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: { url: "" },
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the license URL is falsy", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: { url: undefined },
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });
  });

  describe("when the license field is an array", () => {
    it("should return null if the license array is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: [],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the license array has a single element that has an empty URL", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: [{ url: "" }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the license array has a single element that has no URL", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          license: [{ url: undefined }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return the license URL if the license array has a single element", async () => {
      const url = "https://some.url";

      const inputs: ResolutionInputs = {
        packageJson: {
          license: [{ url }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toEqual(url);
    });

    describe("when the license array has multiple elements", () => {
      it("should warn", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ url: "https://some.url" }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        expect(mockedWarn).toHaveBeenCalledTimes(0);

        const _ = await packageJsonLicense(inputs);

        expect(mockedWarn).toHaveBeenCalledTimes(1);
      });

      it("should return the URL of the first license", async () => {
        const url = "https://some.url";

        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ url }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toEqual(url);
      });

      it("should return null if the first license has an empty URL", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ url: "" }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toBeNull();
      });

      it("should return null if the first license has no URL", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            license: [{ url: undefined }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toBeNull();
      });
    });
  });

  describe("when the license field is undefined but the licenses field is an array", () => {
    it("should return null if the licenses array is empty", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          licenses: [],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the licenses array has a single element that has an empty URL", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          licenses: [{ url: "" }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return null if the licenses array has a single element that has no URL", async () => {
      const inputs: ResolutionInputs = {
        packageJson: {
          licenses: [{ url: undefined }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toBeNull();
    });

    it("should return the license URL if the licenses array has a single element", async () => {
      const url = "https://some.url";

      const inputs: ResolutionInputs = {
        packageJson: {
          licenses: [{ url }],
        },
        directory: "/some/directory",
      };

      const result = await packageJsonLicense(inputs);

      expect(result).toEqual(url);
    });

    describe("when the licenses array has multiple elements", () => {
      it("should warn", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ url: "https://some.url" }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        expect(mockedWarn).toHaveBeenCalledTimes(0);

        const _ = await packageJsonLicense(inputs);

        expect(mockedWarn).toHaveBeenCalledTimes(1);
      });

      it("should return the URL of the first license", async () => {
        const url = "https://some.url";

        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ url }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toEqual(url);
      });

      it("should return null if the first license has an empty URL", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ url: "" }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toBeNull();
      });

      it("should return null if the first license has no URL", async () => {
        const inputs: ResolutionInputs = {
          packageJson: {
            licenses: [{ url: undefined }, { url: "https://some.other.url" }],
          },
          directory: "/some/directory",
        };

        const result = await packageJsonLicense(inputs);

        expect(result).toBeNull();
      });
    });
  });
});
