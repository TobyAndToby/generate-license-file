import { Result } from "arg";
import { prompt } from "enquirer";
import { mocked } from "ts-jest/utils";
import { Input } from "../../../src/cli/args/input";
import { ArgumentsWithAliases } from "../../../src/cli/cli-arguments";
import { spinner } from "../../../src/cli/spinner";
import { doesFileExist } from "../../../src/utils/file.utils";

jest.mock("../../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn()
}));

jest.mock("../../../src/cli/spinner.ts", () => ({
  spinner: {
    start: jest.fn(),
    stop: jest.fn(),
    fail: jest.fn()
  }
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

describe("Input", () => {
  const mockedPrompt = mocked(prompt);
  const mockedDoesFileExist = mocked(doesFileExist);
  const mockedFailSpinner = mocked(spinner.fail);

  let input: Input;

  beforeEach(() => {
    input = new Input();

    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("resolve", () => {
    it("should return the inputted file name if the '--input' value is valid and exists", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      const inputFile = "./package.json";
      const args = {
        "--input": inputFile
      } as Result<ArgumentsWithAliases>;

      const answer = await input.resolve(args);

      expect(answer).toBe(inputFile);
    });

    it("should prompt for an input value if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toBeCalledTimes(1);
    });

    it("should prompt for an input value with a message if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Package.json location: "
        })
      );
    });

    it("should prompt for an input value with an initial value of './package.json' if the input is undefined and a package.json was found", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: "./package.json"
        })
      );
    });

    it("should prompt for an input value with an empty initial value if the input is undefined and a package.json was not found", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: ""
        })
      );
    });

    it("should prompt for a string value if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "input"
        })
      );
    });

    it("should not fail the spinner if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockImplementation((path: string) => {
        return Promise.resolve(path === "./exists.json");
      });

      mockedPrompt.mockResolvedValueOnce({ value: "./exists.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedFailSpinner).toBeCalledTimes(0);
    });

    it("should fail the spinner if the initial input value doesn't exist", async () => {
      mockedDoesFileExist.mockImplementation((path: string) => {
        return Promise.resolve(path === "./exists.json");
      });

      mockedPrompt.mockResolvedValueOnce({ value: "./exists.json" });

      const args = {
        "--input": "./not-exists.json"
      } as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedFailSpinner).toBeCalledTimes(1);
    });

    it("should continue prompting for a value if the value doesn't exist", async () => {
      mockedDoesFileExist.mockImplementation((path: string) => {
        return Promise.resolve(path === "./exists.json");
      });

      mockedPrompt
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./exists.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedPrompt).toBeCalledTimes(4);
    });

    it("should continue failing the spinner if the value doesn't exist", async () => {
      mockedDoesFileExist.mockImplementation((path: string) => {
        return Promise.resolve(path === "./exists.json");
      });

      mockedPrompt
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./not-exists.json" })
        .mockResolvedValueOnce({ value: "./exists.json" });

      const args = {
        "--input": "./not-exists.json"
      } as Result<ArgumentsWithAliases>;

      await input.resolve(args);

      expect(mockedFailSpinner).toBeCalledTimes(4);
    });
  });

  describe("parse", () => {
    it("should throw if the given input is undefined", async () => {
      const args = {
        "--input": undefined
      } as Result<ArgumentsWithAliases>;

      await expect(input.parse(args)).rejects.toThrow("No --input argument given.");
    });

    it("should throw if the given input does not exist", () => {
      mockedDoesFileExist.mockResolvedValueOnce(false);

      const args = {
        "--input": "./package.json"
      } as Result<ArgumentsWithAliases>;

      return expect(input.parse(args)).rejects.toThrow(
        "Given --input file not found. Cannot find './package.json'."
      );
    });

    it("should return the given input if it exists", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true);

      const args = {
        "--input": "./package.json"
      } as Result<ArgumentsWithAliases>;

      const result = await input.parse(args);

      expect(result).toEqual("./package.json");
    });
  });
});
