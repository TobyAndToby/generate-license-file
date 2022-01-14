import { Result } from "arg";
import { prompt } from "enquirer";
import { mocked } from "ts-jest/utils";
import { Output } from "../../../src/cli/args/output";
import { ArgumentsWithAliases } from "../../../src/cli/cli-arguments";
import { doesFileExist } from "../../../src/utils/file.utils";

jest.mock("../../../src/utils/file.utils", () => ({
  doesFileExist: jest.fn()
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

describe("Output", () => {
  const mockDoesFileExist = mocked(doesFileExist);
  const mockPrompt = mocked(prompt);

  let output: Output;

  beforeEach(() => {
    jest.resetAllMocks();

    output = new Output();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("resolve", () => {
    it("should not prompt for anything if an output is given which doesn't exist", async () => {
      mockDoesFileExist.mockResolvedValue(false);

      const args = {
        "--output": "any output value"
      } as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).not.toHaveBeenCalled();
    });

    it("should prompt for a bool if an output is given but it exists", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));

      mockPrompt.mockResolvedValue({ value: true });

      const args = {
        "--output": "any output value"
      } as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(1);
      expect(mockPrompt).toBeCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should prompt for a string if no output file is given", async () => {
      mockPrompt.mockResolvedValue({ value: "any output value" });

      const args = {} as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(1);
      expect(mockPrompt).toBeCalledWith(expect.objectContaining({ type: "input" }));
    });

    it("should prompt for a bool if no output file is given and the later given output does exist", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));
      mockPrompt.mockResolvedValue({ value: testOutput });

      const args = {} as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(2);
      expect(mockPrompt).toBeCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should prompt for a string/bool pair twice if the user disallows overwriting with no output given", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));
      mockPrompt
        .mockResolvedValueOnce({ value: testOutput })
        .mockResolvedValueOnce({ value: false })
        .mockResolvedValueOnce({ value: testOutput })
        .mockResolvedValueOnce({ value: true });

      const args = {} as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(4);

      expect(mockPrompt).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: "input" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: "confirm" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: "input" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(4, expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is given which exists and override is given", async () => {
      mockDoesFileExist.mockResolvedValue(true);
      mockPrompt.mockResolvedValue({ value: true });

      const args = {
        "--output": "any output value",
        "--overwrite": true
      } as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(0);
      expect(mockPrompt).not.toBeCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is given which does not exist and override is given", async () => {
      mockDoesFileExist.mockResolvedValue(false);
      mockPrompt.mockResolvedValue({ value: true });

      const args = {
        "--output": "any output value",
        "--overwrite": true
      } as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(0);
      expect(mockPrompt).not.toBeCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is not given but override is given", async () => {
      mockDoesFileExist.mockResolvedValue(true);
      mockPrompt.mockResolvedValue({ value: true });

      const args = {
        "--overwrite": true
      } as Result<ArgumentsWithAliases>;

      await output.resolve(args);

      expect(mockPrompt).toBeCalledTimes(1);
      expect(mockPrompt).not.toBeCalledWith(expect.objectContaining({ type: "confirm" }));
    });
  });

  describe("parse", () => {
    it("should throw if the given output is undefined", async () => {
      const args = {
        "--output": undefined
      } as Result<ArgumentsWithAliases>;

      await expect(output.parse(args)).rejects.toThrowError("No --output argument given.");
    });

    it("should throw if the given output file exists and overwrite is false", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      const args = {
        "--output": "any output value"
      } as Result<ArgumentsWithAliases>;

      await expect(output.parse(args)).rejects.toThrowError(
        "Given --output file already exists at 'any output value'. Use --overwrite to allow overwriting."
      );
    });

    it("should return the given output file if it exists but overwrite is true", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      const args = {
        "--output": "any output value",
        "--overwrite": true
      } as Result<ArgumentsWithAliases>;

      const result = await output.parse(args);

      expect(result).toEqual("any output value");
    });

    it("should return the given output file if it does not exist", async () => {
      mockDoesFileExist.mockResolvedValue(false);

      const args = {
        "--output": "any output value"
      } as Result<ArgumentsWithAliases>;

      const result = await output.parse(args);

      expect(result).toEqual("any output value");
    });
  });
});
