import { prompt } from "enquirer";
import ora from "ora";
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

const mockOra = {
  start: jest.fn(),
  stop: jest.fn(),
  fail: jest.fn()
};
jest.mock("ora", () => () => mockOra);

describe("cli", () => {
  const spinner = ora();

  const mockedGenerateLicenseFile = mocked(generateLicenseFile);
  const mockedPrompt = mocked(prompt);
  const mockedDoesFileExist = mocked(doesFileExist);
  const mockedStartSpinner = mocked(spinner.start);
  const mockedStopSpinner = mocked(spinner.stop);
  const mockedFailSpinner = mocked(spinner.fail);

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
      mockedDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--output", "any path"]);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({ initial: "./package.json" })
      );
    });

    it("should initially prompt the input with nothing if one doesn't exists", async () => {
      mockedDoesFileExist.mockResolvedValue(false);

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
      mockedDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--input", "any path", "--output", "any path"]);

      expect(mockedPrompt).toHaveBeenCalledWith({
        type: "confirm",
        name: "overwriteOutput",
        message: "The given output file already exists and will be overwritten. Is this OK?"
      });
    });

    it("should not confirm overwriting is OK if the output file is given but does not exist", async () => {
      mockedDoesFileExist.mockResolvedValue(false);

      await cli(["", "", "--input", "any path", "--output", "any path"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(
        expect.objectContaining({
          name: "overwriteOutput"
        })
      );
    });

    it("should not confirm overwriting is OK if the output file is given, exists, and overwriting is true", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      await cli(["", "", "--input", "any path", "--output", "any path", "--overwrite"]);

      expect(mockedPrompt).not.toHaveBeenCalledWith(
        expect.objectContaining({
          name: "overwriteOutput"
        })
      );
    });
  });

  it("should start the spinner", async () => {
    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedStartSpinner).toHaveBeenCalledTimes(1);
  });

  it("should call generateLicenseFile with the given input values", async () => {
    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedGenerateLicenseFile).toHaveBeenCalledWith(
      "any input path",
      "any output path",
      undefined
    );
  });

  it("should stop the spinner if the generateLicenseFile call succeeds", async () => {
    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedStopSpinner).toHaveBeenCalledTimes(1);
  });

  it("should not fail the spinner if the generateLicenseFile call succeeds", async () => {
    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedFailSpinner).toHaveBeenCalledTimes(0);
  });

  it("should fail the spinner if the generateLicenseFile call throws", async () => {
    mockedGenerateLicenseFile.mockReset();
    mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedFailSpinner).toHaveBeenCalledTimes(1);
  });

  it("should fail the spinner with the error message it an error is thrown", async () => {
    mockedGenerateLicenseFile.mockReset();
    mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedFailSpinner).toHaveBeenCalledWith("any error");
  });

  it("should fail the spinner with the thrown object if it's not an error", async () => {
    mockedGenerateLicenseFile.mockReset();
    mockedGenerateLicenseFile.mockRejectedValue("This string is not an error");

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedFailSpinner).toHaveBeenCalledWith("This string is not an error");
  });

  it("should fail the spinner with 'Unknown error' if the value thrown is falsy (undefined)", async () => {
    mockedGenerateLicenseFile.mockReset();
    mockedGenerateLicenseFile.mockRejectedValue(undefined);

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedFailSpinner).toHaveBeenCalledWith("Unknown error");
  });

  it("should not stop the spinner if the generateLicenseFile call throws", async () => {
    mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedStopSpinner).toHaveBeenCalledTimes(0);
  });
});
