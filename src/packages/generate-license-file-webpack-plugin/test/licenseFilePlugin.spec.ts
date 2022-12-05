import { Compiler } from "webpack";
import { compilationTapFactory } from "../src/lib/compilationTapFactory";
import { defaultOptions } from "../src/lib/defaultOptions";
import { LicenseFilePlugin } from "../src/lib/licenseFilePlugin";
import { Options } from "../src/lib/options";

jest.mock("../src/lib/compilationTapFactory", () => {
  return {
    compilationTapFactory: jest.fn(),
  };
});

describe("LicenseFilePlugin", () => {
  const mockCompilationTapFactory = jest.mocked(compilationTapFactory);
  const mockTap = jest.fn();

  let compiler: Compiler;

  beforeEach(() => {
    mockCompilationTapFactory.mockReset();
    mockTap.mockReset();

    compiler = {
      hooks: {
        thisCompilation: {
          tap: mockTap,
        },
      },
    } as unknown as Compiler;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("apply", () => {
    it("should call the compilationTapFactory", () => {
      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      expect(mockCompilationTapFactory).toHaveBeenCalledTimes(1);
    });

    it("should call the compilationTapFactory with the default options when nothing is given", () => {
      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(defaultOptions);
    });

    it("should call the compilationTapFactory with the default options when undefined is given", () => {
      const licenseFilePlugin = new LicenseFilePlugin(undefined);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(defaultOptions);
    });

    it("should call the compilationTapFactory with the default options when an empty object is given", () => {
      const licenseFilePlugin = new LicenseFilePlugin({});

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(defaultOptions);
    });

    it("should call the compilationTapFactory with the given outputFileName", () => {
      const options: Partial<Options> = {
        outputFileName: "output file name",
      };

      const licenseFilePlugin = new LicenseFilePlugin(options);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg.outputFileName).toEqual(options.outputFileName);
    });

    it("should call the compilationTapFactory with the given outputFolder", () => {
      const options: Partial<Options> = {
        outputFolder: "output folder",
      };

      const licenseFilePlugin = new LicenseFilePlugin(options);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg.outputFolder).toEqual(options.outputFolder);
    });

    it("should call the compilationTapFactory with the given pathToPackageJson", () => {
      const options: Partial<Options> = {
        pathToPackageJson: "./package.json",
      };

      const licenseFilePlugin = new LicenseFilePlugin(options);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg.pathToPackageJson).toEqual(options.pathToPackageJson);
    });

    it("should call the compilationTapFactory with the given isDev", () => {
      const options: Partial<Options> = {
        isDev: true,
      };

      const licenseFilePlugin = new LicenseFilePlugin(options);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg.isDev).toEqual(options.isDev);
    });

    it("should call the compilationTapFactory with the given lineEnding", () => {
      const options: Partial<Options> = {
        lineEnding: "crlf",
      };

      const licenseFilePlugin = new LicenseFilePlugin(options);

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockCompilationTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg.lineEnding).toEqual(options.lineEnding);
    });

    it("should call the compilationTapFactory with the given compiler", () => {
      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      const firstCallSecondArg = mockCompilationTapFactory.mock.calls[0][1];
      expect(firstCallSecondArg).toEqual(compiler);
    });

    it("should tap the compilation", () => {
      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      expect(mockTap).toHaveBeenCalledTimes(1);
    });

    it("should tap the compilation with the plugin name", () => {
      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      const firstCallFirstArg = mockTap.mock.calls[0][0];
      expect(firstCallFirstArg).toBe("LicenseFilePlugin");
    });

    it("should tap the compilation with the given compilation tap", () => {
      const compilationTap = () => undefined;
      mockCompilationTapFactory.mockReturnValue(compilationTap);

      const licenseFilePlugin = new LicenseFilePlugin();

      licenseFilePlugin.apply(compiler);

      const firstCallSecondArg = mockTap.mock.calls[0][1];
      expect(firstCallSecondArg).toBe(compilationTap);
    });
  });
});
