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

  it("should fail the spinner if the initial innput value doesn't exist", async () => {
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
