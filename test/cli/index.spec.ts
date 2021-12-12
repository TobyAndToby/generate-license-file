import { prompt } from "enquirer";
import { mocked } from "ts-jest/utils";
import { cli } from "../../src/cli/index";
import { generateLicenseFile } from "../../src/generateLicenseFile";
import { doesFileExist } from "../../src/utils/file.utils";

jest.mock("../../src/generateLicenseFile", () => ({
  generateLicenseFile: jest.fn()
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

jest.mock("../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn().mockResolvedValue(false)
}));

jest.mock("ora", () => () => ({
  start: jest.fn(),
  stop: jest.fn()
}));

describe("cli", () => {
  const mockedGenerateLicenseFile = mocked(generateLicenseFile);
  const mockedPrompt = mocked(prompt);
  const mockDoesFileExist = mocked(doesFileExist);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedGenerateLicenseFile.mockResolvedValue(undefined);

    mockedPrompt.mockResolvedValue({
      input: "defaultInput",
      output: "defaultOutput",
      overwriteOutput: true
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("input", () => {
    it("should prompt for the input arg if it's not given", async () => {
      await cli(["", "", "--output", "any path"]);

      const firstCallFirstArg = mockedPrompt.mock.calls[0][0] as any;
      expect(firstCallFirstArg.name).toBe("input");
    });

    it("should not prompt for the input arg if it's given", async () => {
      await cli(["", "", "--input", "any path"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(expect.objectContaining({ name: "input" }));
    });

    it("should initially prompt the input with a package json if one exists", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--output", "any path"]);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({ initial: "./package.json" })
      );
    });

    it("should initially prompt the input with nothing if one doesn't exists", async () => {
      mockDoesFileExist.mockResolvedValue(false);

      await cli(["", "", "--output", "any path"]);

      expect(mockedPrompt).toHaveBeenCalledWith(expect.objectContaining({ initial: "" }));
    });
  });

  describe("output", () => {
    it("should prompt for the output arg if it's not given", async () => {
      await cli(["", "", "--input", "any path"]);

      const firstCallFirstArg = mockedPrompt.mock.calls[0][0] as any;
      expect(firstCallFirstArg.name).toBe("output");
    });

    it("should not prompt for the output arg if it's given", async () => {
      await cli(["", "", "--output", "any path"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(expect.objectContaining({ name: "output" }));
    });
  });

  describe("overwriteOutput", () => {
    it("should confirm overwriting is OK if the output file is given and exists", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--input", "any path", "--output", "any path"]);

      expect(mockedPrompt).toHaveBeenCalledWith({
        type: "confirm",
        name: "overwriteOutput",
        message: "The given output file already exists and will be overwritten. Is this OK?"
      });
    });

    it("should not confirm overwriting is OK if the output file is given but does not exist", async () => {
      mockDoesFileExist.mockResolvedValue(false);

      await cli(["", "", "--input", "any path", "--output", "any path"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(
        expect.objectContaining({
          name: "overwriteOutput"
        })
      );
    });

    it("should not confirm overwriting is OK if the output file is given, exists, and overwriting is true", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--input", "any path", "--output", "any path", "--overwrite"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(
        expect.objectContaining({
          name: "overwriteOutput"
        })
      );
    });
  });
});
