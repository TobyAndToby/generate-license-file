import { Compilation, Compiler } from "webpack";
import { asyncProcessAssetTapFactory } from "../src/lib/asyncProcessAssetTapFactory";
import { CompilationTap, compilationTapFactory } from "../src/lib/compilationTapFactory";
import { Options } from "../src/lib/options";

jest.mock("../src/lib/asyncProcessAssetTapFactory", () => {
  return {
    asyncProcessAssetTapFactory: jest.fn(),
  };
});

describe("compilationTapFactory", () => {
  let options: Options;
  let compiler: Compiler;

  beforeEach(() => {
    options = {
      outputFileName: "output file name",
    } as Options;

    compiler = {} as Compiler;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return a compilation tap function", () => {
    const result = compilationTapFactory(options, compiler);
    expect(typeof result).toBe("function");
  });

  describe("the compilation tap function", () => {
    const mockAsyncProcessAssetTapFactory = jest.mocked(asyncProcessAssetTapFactory);
    const mockTapAsync = jest.fn();
    let compilationTap: CompilationTap;

    let compilation: Compilation;

    beforeEach(() => {
      mockAsyncProcessAssetTapFactory.mockReset();
      mockTapAsync.mockReset();
      compilationTap = compilationTapFactory(options, compiler);

      compilation = {
        hooks: {
          processAssets: {
            tapAsync: mockTapAsync,
          },
        },
      } as unknown as Compilation;
    });

    it("should call the asyncProcessAssetTapFactory", () => {
      compilationTap(compilation);

      expect(mockAsyncProcessAssetTapFactory).toHaveBeenCalledTimes(1);
    });

    it("should call the asyncProcessAssetTapFactory with the given options", () => {
      compilationTap(compilation);

      const firstCallFirstArg = mockAsyncProcessAssetTapFactory.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(options);
    });

    it("should call the asyncProcessAssetTapFactory with the given compiler", () => {
      compilationTap(compilation);

      const firstCallSecondArg = mockAsyncProcessAssetTapFactory.mock.calls[0][1];
      expect(firstCallSecondArg).toEqual(compiler);
    });

    it("should call the asyncProcessAssetTapFactory with the given compilation", () => {
      compilationTap(compilation);

      const firstCallThirdArg = mockAsyncProcessAssetTapFactory.mock.calls[0][2];
      expect(firstCallThirdArg).toEqual(compilation);
    });

    it("should tap async into the compilation asset processing", () => {
      compilationTap(compilation);

      expect(mockTapAsync).toHaveBeenCalledTimes(1);
    });

    it("should tap async into the compilation asset processing with the plugin name", () => {
      compilationTap(compilation);

      const firstCallFirstArg = mockTapAsync.mock.calls[0][0];
      expect(firstCallFirstArg.name).toBe("LicenseFilePlugin");
    });

    it("should tap async into the compilation asset processing with the PROCESS_ASSETS_STAGE_ADDITIONAL stage", () => {
      compilationTap(compilation);

      const firstCallFirstArg = mockTapAsync.mock.calls[0][0];
      expect(firstCallFirstArg.stage).toBe(Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL);
    });

    it("should tap async into the compilation asset processing with the returned processAssetTapAsync", () => {
      const processAssetsTapAsync = () => undefined;
      mockAsyncProcessAssetTapFactory.mockReturnValue(processAssetsTapAsync);

      compilationTap(compilation);

      const firstCallSecondArg = mockTapAsync.mock.calls[0][1];
      expect(firstCallSecondArg).toBe(processAssetsTapAsync);
    });
  });
});
