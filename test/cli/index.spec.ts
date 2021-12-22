import arg, { Result } from "arg";
import { mocked } from "ts-jest/utils";
import { ArgumentsWithAliases, argumentsWithAliases } from "../../src/cli/cli-arguments";
import { cli } from "../../src/cli/index";
import { spinner } from "../../src/cli/spinner";
import { generateLicenseFile } from "../../src/generateLicenseFile";

jest.mock("../../src/generateLicenseFile", () => ({
  generateLicenseFile: jest.fn()
}));

jest.mock("arg", () => jest.fn());

jest.mock("../../src/cli/spinner", () => ({
  spinner: {
    start: jest.fn(),
    stop: jest.fn(),
    fail: jest.fn()
  }
}));

const mockInputResolve = jest.fn();
const mockOutputResolve = jest.fn();
const mockEolResolve = jest.fn();
const mockNoSpinner = jest.fn();

jest.mock("../../src/cli/args/input.ts", () => ({
  Input: function () {
    return { resolve: mockInputResolve };
  }
}));

jest.mock("../../src/cli/args/output.ts", () => ({
  Output: function () {
    return { resolve: mockOutputResolve };
  }
}));

jest.mock("../../src/cli/args/eol.ts", () => ({
  Eol: function () {
    return { resolve: mockEolResolve };
  }
}));

jest.mock("../../src/cli/args/no-spinner.ts", () => ({
  NoSpinner: function () {
    return { resolve: mockNoSpinner };
  }
}));

describe("cli", () => {
  const mockedArg = mocked(arg);
  const mockedGenerateLicenseFile = mocked(generateLicenseFile);
  const mockedStartSpinner = mocked(spinner.start);
  const mockedStopSpinner = mocked(spinner.stop);
  const mockedFailSpinner = mocked(spinner.fail);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedGenerateLicenseFile.mockResolvedValue(undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("parseUserInputs", () => {
    it("should pass argumentsWithAliases to the arg library", async () => {
      const args = ["", "", "--input", "any input path", "--output", "any output path"];

      await cli(args);

      const firstCallFirstArg = mockedArg.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(argumentsWithAliases);
    });

    it("should pass the given user arguments to the arg library", async () => {
      const allArgs = ["", "", "--input", "any input path", "--output", "any output path"];
      const givenUserArgs = allArgs.slice(2);

      await cli(allArgs);

      const firstCallSecondArg = mockedArg.mock.calls[0][1];
      const givenRawArgs = firstCallSecondArg?.argv;

      expect(givenRawArgs).toEqual(givenUserArgs);
    });
  });

  describe("promptForMissingOptions", () => {
    it("should give the parsed user args to the input resolver", async () => {
      const allArgs = ["", "", "--input", "any input path", "--output", "any output path"];

      const parsedArgResponse = {
        "--input": "any input path",
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await cli(allArgs);

      expect(mockInputResolve).toHaveBeenCalledWith(parsedArgResponse);
    });

    it("should give the parsed user args to the output resolver", async () => {
      const allArgs = ["", "", "--input", "any input path", "--output", "any output path"];

      const parsedArgResponse = {
        "--input": "any input path",
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await cli(allArgs);

      expect(mockOutputResolve).toHaveBeenCalledWith(parsedArgResponse);
    });

    it("should give the parsed user args to the eol resolver", async () => {
      const allArgs = ["", "", "--input", "any input path", "--output", "any output path"];

      const parsedArgResponse = {
        "--input": "any input path",
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await cli(allArgs);

      expect(mockEolResolve).toHaveBeenCalledWith(parsedArgResponse);
    });
  });

  it("should start the spinner if noSpinner is false", async () => {
    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedStartSpinner).toHaveBeenCalledTimes(1);
  });

  it("should not start the spinner if noSpinner is true", async () => {
    mockNoSpinner.mockReturnValue(true);

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    expect(mockedStartSpinner).toHaveBeenCalledTimes(0);
  });

  it("should call generateLicenseFile with value from the input resolver", async () => {
    mockInputResolve.mockResolvedValue("resolved input value");

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    const firstCallFirstArg = mockedGenerateLicenseFile.mock.calls[0][0];
    expect(firstCallFirstArg).toBe("resolved input value");
  });

  it("should call generateLicenseFile with value from the output resolver", async () => {
    mockOutputResolve.mockResolvedValue("resolved output value");

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    const firstCallSecondArg = mockedGenerateLicenseFile.mock.calls[0][1];
    expect(firstCallSecondArg).toBe("resolved output value");
  });

  it("should call generateLicenseFile with value from the eol resolver", async () => {
    mockEolResolve.mockResolvedValue("resolved eol value");

    await cli(["", "", "--input", "any input path", "--output", "any output path"]);

    const firstCallThirdArg = mockedGenerateLicenseFile.mock.calls[0][2];
    expect(firstCallThirdArg).toBe("resolved eol value");
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
