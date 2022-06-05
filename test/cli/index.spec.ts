import arg, { Result } from "arg";
import { mocked } from "ts-jest/utils";
import { ArgumentsWithAliases, argumentsWithAliases } from "../../src/cli/cli-arguments";
import { main } from "../../src/cli/index";
import { spinner } from "../../src/cli/spinner";
import { generateLicenseFile } from "../../src/generateLicenseFile";
import console from "../../src/utils/console.utils";
import { readPackageJson } from "../../src/utils/packageJson.utils";

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

jest.mock("../../src/utils/console.utils", () => ({
  log: jest.fn(),
  warn: jest.fn()
}));

jest.mock("../../src/utils/packageJson.utils", () => ({
  readPackageJson: jest.fn()
}));

const mockInputParse = jest.fn();
const mockOutputParse = jest.fn();
const mockEolParse = jest.fn();
const mockNoSpinnerParse = jest.fn();

const mockInputResolve = jest.fn();
const mockOutputResolve = jest.fn();
const mockEolResolve = jest.fn();
const mockNoSpinnerResolve = jest.fn();

jest.mock("../../src/cli/args/inputs", () => ({
  Inputs: function () {
    return { parse: mockInputParse, resolve: mockInputResolve };
  }
}));

jest.mock("../../src/cli/args/output", () => ({
  Output: function () {
    return { parse: mockOutputParse, resolve: mockOutputResolve };
  }
}));

jest.mock("../../src/cli/args/eol", () => ({
  Eol: function () {
    return { parse: mockEolParse, resolve: mockEolResolve };
  }
}));

jest.mock("../../src/cli/args/no-spinner", () => ({
  NoSpinner: function () {
    return { parse: mockNoSpinnerParse, resolve: mockNoSpinnerResolve };
  }
}));

describe("cli", () => {
  const mockedArg = mocked(arg);
  const mockedGenerateLicenseFile = mocked(generateLicenseFile);
  const mockedStartSpinner = mocked(spinner.start);
  const mockedStopSpinner = mocked(spinner.stop);
  const mockedFailSpinner = mocked(spinner.fail);
  const mockedConsoleLog = mocked(console.log);
  const mockedReadPackageJson = mocked(readPackageJson);

  beforeEach(() => {
    jest.resetAllMocks();

    mockedGenerateLicenseFile.mockResolvedValue(undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("parseUserInputs", () => {
    it("should pass argumentsWithAliases to the arg library", async () => {
      await main([]);

      const firstCallFirstArg = mockedArg.mock.calls[0][0];
      expect(firstCallFirstArg).toEqual(argumentsWithAliases);
    });

    it("should pass the given user arguments to the arg library", async () => {
      const allArgs = ["", "", "--input", "any input path", "--output", "any output path"];
      const givenUserArgs = allArgs.slice(2);

      await main(allArgs);

      const firstCallSecondArg = mockedArg.mock.calls[0][1];
      const givenRawArgs = firstCallSecondArg?.argv;

      expect(givenRawArgs).toEqual(givenUserArgs);
    });
  });

  describe("when --version is true", () => {
    it("should print the version if the --version flag is provided", async () => {
      mockedReadPackageJson.mockResolvedValue({ name: "test", version: "1.0.3" });

      const parsedArgResponse = {
        "--version": true
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await main(["", "", "--version"]);

      expect(mockedConsoleLog).toHaveBeenCalledWith("v1.0.3");
    });

    it("should parse the package.json for the version if the --version flag is provided", async () => {
      mockedReadPackageJson.mockResolvedValue({ name: "test", version: "1.0.3" });

      const parsedArgResponse = {
        "--version": true
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await main(["", "", "--version"]);

      expect(mockedReadPackageJson).toHaveBeenCalledTimes(1);
    });

    it("should not generate a license file if the --version argument is provided", async () => {
      mockedReadPackageJson.mockResolvedValue({ name: "test", version: "1.0.3" });

      const parsedArgResponse = {
        "--version": true,
        "--input": ["any input value"],
        "--output": "any output value"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await main([
        "",
        "",
        "--input",
        "any input value",
        "--output",
        "any output value",
        "--version"
      ]);

      expect(mockedGenerateLicenseFile).toBeCalledTimes(0);
    });
  });

  describe("when --ci is false", () => {
    let parsedArgResponse: Result<ArgumentsWithAliases>;

    beforeEach(() => {
      parsedArgResponse = {
        "--ci": false
      } as Result<ArgumentsWithAliases>;
    });

    it("should give the parsed user args to the resolve method on the argument classes", async () => {
      mockedArg.mockReturnValue(parsedArgResponse);

      await main([]);

      expect(mockInputResolve).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockOutputResolve).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockEolResolve).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockNoSpinnerResolve).toHaveBeenCalledWith(parsedArgResponse);
    });

    it("should call generateLicenseFile with the values from the resolve method on the argument classes", async () => {
      mockedArg.mockReturnValue(parsedArgResponse);

      mockInputResolve.mockResolvedValue("resolved input value");
      mockOutputResolve.mockResolvedValue("resolved output value");
      mockEolResolve.mockResolvedValue("resolved eol value");

      await main([]);

      const firstCallFirstArg = mockedGenerateLicenseFile.mock.calls[0][0];
      expect(firstCallFirstArg).toBe("resolved input value");

      const firstCallSecondArg = mockedGenerateLicenseFile.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("resolved output value");

      const firstCallThirdArg = mockedGenerateLicenseFile.mock.calls[0][2];
      expect(firstCallThirdArg).toBe("resolved eol value");
    });
  });

  describe("when --ci is true", () => {
    let parsedArgResponse: Result<ArgumentsWithAliases>;

    beforeEach(() => {
      parsedArgResponse = {
        "--ci": true
      } as Result<ArgumentsWithAliases>;
    });

    it("should set no-spinner to true", async () => {
      const mockedArgs = {
        "--ci": true,
        "--no-spinner": undefined
      } as Result<ArgumentsWithAliases>;
      mockedArg.mockReturnValue(mockedArgs);

      await main([]);

      expect(mockedArgs["--no-spinner"]).toBe(true);
    });

    it("should give the parsed user args to the parse method on the argument classes", async () => {
      mockedArg.mockReturnValue(parsedArgResponse);

      await main([]);

      expect(mockInputParse).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockOutputParse).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockEolParse).toHaveBeenCalledWith(parsedArgResponse);
      expect(mockNoSpinnerParse).toHaveBeenCalledWith(parsedArgResponse);
    });

    it("should set an exit code of 1 when the parse method on an argument class throws an error", async () => {
      const mockedArgs = {
        "--ci": true
      } as Result<ArgumentsWithAliases>;
      mockedArg.mockReturnValue(mockedArgs);

      mockInputParse.mockRejectedValueOnce("Some problem");

      await main([]);

      expect(process.exitCode).toBe(1);
    });

    it("should call generateLicenseFile with the values from the parse methods on the argument classes", async () => {
      mockedArg.mockReturnValue(parsedArgResponse);

      mockInputParse.mockResolvedValue("resolved input value");
      mockOutputParse.mockResolvedValue("resolved output value");
      mockEolParse.mockResolvedValue("resolved eol value");

      await main([]);

      const firstCallFirstArg = mockedGenerateLicenseFile.mock.calls[0][0];
      expect(firstCallFirstArg).toBe("resolved input value");

      const firstCallSecondArg = mockedGenerateLicenseFile.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("resolved output value");

      const firstCallThirdArg = mockedGenerateLicenseFile.mock.calls[0][2];
      expect(firstCallThirdArg).toBe("resolved eol value");
    });
  });

  describe("spinner", () => {
    it("should start the spinner if noSpinner is false", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);
      mockNoSpinnerResolve.mockReturnValue(false);

      await main([]);

      expect(mockedStartSpinner).toHaveBeenCalledTimes(1);
    });

    it("should not start the spinner if noSpinner is true", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);
      mockNoSpinnerResolve.mockReturnValue(true);

      await main([]);

      expect(mockedStartSpinner).toHaveBeenCalledTimes(0);
    });

    it("should stop the spinner if the generateLicenseFile call succeeds", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await main([]);

      expect(mockedStopSpinner).toHaveBeenCalledTimes(1);
    });

    it("should not fail the spinner if the generateLicenseFile call succeeds", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);

      await main([]);

      expect(mockedFailSpinner).toHaveBeenCalledTimes(0);
    });

    it("should fail the spinner if the generateLicenseFile call throws", async () => {
      mockedGenerateLicenseFile.mockReset();
      mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

      await main([]);

      expect(mockedFailSpinner).toHaveBeenCalledTimes(1);
    });

    it("should fail the spinner with the error message it an error is thrown", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);
      mockedGenerateLicenseFile.mockReset();
      mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

      await main([]);

      expect(mockedFailSpinner).toHaveBeenCalledWith("any error");
    });

    it("should fail the spinner with the thrown object if it's not an error", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);
      mockedGenerateLicenseFile.mockReset();
      mockedGenerateLicenseFile.mockRejectedValue("This string is not an error");

      await main([]);

      expect(mockedFailSpinner).toHaveBeenCalledWith("This string is not an error");
    });

    it("should fail the spinner with 'Unknown error' if the value thrown is falsy (undefined)", async () => {
      const parsedArgResponse = {
        "--input": ["any input path"],
        "--output": "any output path"
      } as Result<ArgumentsWithAliases>;

      mockedArg.mockReturnValue(parsedArgResponse);
      mockedGenerateLicenseFile.mockReset();
      mockedGenerateLicenseFile.mockRejectedValue(undefined);

      await main([]);

      expect(mockedFailSpinner).toHaveBeenCalledWith("Unknown error");
    });

    it("should not stop the spinner if the generateLicenseFile call throws", async () => {
      mockedGenerateLicenseFile.mockRejectedValue(new Error("any error"));

      await main([]);

      expect(mockedStopSpinner).toHaveBeenCalledTimes(0);
    });
  });
});
