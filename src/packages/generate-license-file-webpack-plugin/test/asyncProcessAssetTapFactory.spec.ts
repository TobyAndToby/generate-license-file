import { getLicenseFileText, LineEnding } from "generate-license-file";
import { Compilation, Compiler } from "webpack";
import { asyncProcessAssetTapFactory } from "../src/lib/asyncProcessAssetTapFactory";
import { devImplementation } from "../src/lib/devImplementation";
import { Options } from "../src/lib/options";
import { waitForNextEventLoop } from "./utils/waitForNextEventLoop";

class MockRawSource {
  constructor(public readonly content: string) {}
}

jest.mock("generate-license-file", () => {
  return {
    getLicenseFileText: jest.fn(),
  };
});

jest.mock("../src/lib/devImplementation", () => {
  return {
    devImplementation: jest.fn(),
  };
});

describe("asyncProcessAssetTapFactory", () => {
  const mockGetLicenseFileText = jest.mocked(getLicenseFileText);
  const mockDevImplementation = jest.mocked(devImplementation);
  const mockEmitAsset = jest.fn();

  let options: Options;
  let compiler: Compiler;
  let compilation: Compilation;

  beforeEach(() => {
    mockGetLicenseFileText.mockReset();
    mockDevImplementation.mockReset();
    mockEmitAsset.mockReset();

    options = {
      outputFolder: "output folder",
      outputFileName: "output file name",
    } as Options;

    compiler = {
      webpack: {
        sources: {
          RawSource: MockRawSource as any,
        },
      },
    } as Compiler;

    compilation = {
      errors: [],
      emitAsset: mockEmitAsset,
    } as any as Compilation;

    mockGetLicenseFileText.mockResolvedValue("");
    mockDevImplementation.mockResolvedValue("");
  });

  it("should return an async asset processing tap function", () => {
    const result = asyncProcessAssetTapFactory(options, compiler, compilation);
    expect(typeof result).toBe("function");
  });

  describe("async asset processing tap function", () => {
    it("should call the generate-license-file implementation when isDev is false", () => {
      options.isDev = false;

      const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
      assetProcessingAsyncTap(undefined, () => undefined);

      expect(mockGetLicenseFileText).toHaveBeenCalledTimes(1);
    });

    it("should not call the generate-license-file implementation when isDev is true", () => {
      options.isDev = true;

      const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
      assetProcessingAsyncTap(undefined, () => undefined);

      expect(mockGetLicenseFileText).toHaveBeenCalledTimes(0);
    });

    it("should call the dev implementation when isDev is true", () => {
      options.isDev = true;

      const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
      assetProcessingAsyncTap(undefined, () => undefined);

      expect(mockDevImplementation).toHaveBeenCalledTimes(1);
    });

    it("should not call the dev implementation when isDev is false", () => {
      options.isDev = false;

      const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
      assetProcessingAsyncTap(undefined, () => undefined);

      expect(mockDevImplementation).toHaveBeenCalledTimes(0);
    });

    it("should call generate-license-file with the path to the package.json", () => {
      options.pathToPackageJson = "./package.json";

      const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
      assetProcessingAsyncTap(undefined, () => undefined);

      const firstCallFirstArg = mockGetLicenseFileText.mock.calls[0][0];
      expect(firstCallFirstArg).toBe(options.pathToPackageJson);
    });

    (["lf", "crlf"] as LineEnding[]).forEach(lineEnding =>
      it(`should call generate-license-file with the ${lineEnding} line ending `, () => {
        options.lineEnding = lineEnding;

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        const firstCallSecondArg = mockGetLicenseFileText.mock.calls[0][1];
        expect(firstCallSecondArg).toBe(lineEnding);
      }),
    );

    describe("on success", () => {
      it("should emit a new asset", async () => {
        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        expect(mockEmitAsset).toHaveBeenCalledTimes(1);
      });

      it("should emit a new asset with the combined output path", async () => {
        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        const firstCallFirstArg = mockEmitAsset.mock.calls[0][0];
        expect(firstCallFirstArg).toBe(options.outputFolder + "/" + options.outputFileName);
      });

      it("should emit a new asset of type RawSource", async () => {
        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        const firstCallSecondArg = mockEmitAsset.mock.calls[0][1];
        expect(firstCallSecondArg).toBeInstanceOf(MockRawSource);
      });

      it("should emit a new asset with the correct content", async () => {
        const fileContent = "file content";
        mockGetLicenseFileText.mockResolvedValue(fileContent);

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        const firstCallSecondArg = mockEmitAsset.mock.calls[0][1];
        expect(firstCallSecondArg.content).toBe(fileContent);
      });

      it("should call the resolve function", async () => {
        const resolveFunction = jest.fn();

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, resolveFunction);

        await waitForNextEventLoop();

        expect(resolveFunction).toHaveBeenCalledTimes(1);
      });

      it("should call the resolve function with no arguments", async () => {
        const resolveFunction = jest.fn();

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, resolveFunction);

        await waitForNextEventLoop();

        expect(resolveFunction).toHaveBeenCalledWith();
      });
    });

    describe("on error", () => {
      const errorMessage = "error message";

      beforeEach(() => {
        mockGetLicenseFileText.mockRejectedValue(errorMessage);
      });

      it("should push a new WebpackError to the compilation", async () => {
        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        expect(compilation.errors).toHaveLength(1);
      });

      it("should prefix the new WebpackError with the plugin name", async () => {
        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, () => undefined);

        await waitForNextEventLoop();

        const firstError = compilation.errors[0];
        expect(firstError.message).toBe(`LicenseFilePlugin: ${errorMessage}`);
      });

      [null, undefined].forEach(falsyValue =>
        it(`should use the unknown error message if the given error is falsy (${falsyValue})`, async () => {
          mockGetLicenseFileText.mockRejectedValue(falsyValue);

          const assetProcessingAsyncTap = asyncProcessAssetTapFactory(
            options,
            compiler,
            compilation,
          );
          assetProcessingAsyncTap(undefined, () => undefined);

          await waitForNextEventLoop();

          const firstError = compilation.errors[0];
          expect(firstError.message).toBe(
            `LicenseFilePlugin: Unknown Error! Check for error output above.`,
          );
        }),
      );

      it("should call the resolve function", async () => {
        const resolveFunction = jest.fn();

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, resolveFunction);

        await waitForNextEventLoop();

        expect(resolveFunction).toHaveBeenCalledTimes(1);
      });

      it("should call the resolve function with the webpackError", async () => {
        const resolveFunction = jest.fn();

        const assetProcessingAsyncTap = asyncProcessAssetTapFactory(options, compiler, compilation);
        assetProcessingAsyncTap(undefined, resolveFunction);

        await waitForNextEventLoop();

        const firstError = compilation.errors[0];
        expect(resolveFunction).toHaveBeenCalledWith(firstError);
      });
    });
  });
});
