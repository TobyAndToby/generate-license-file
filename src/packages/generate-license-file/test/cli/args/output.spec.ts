import { prompt } from "enquirer";
import { Output } from "../../../src/lib/cli/args/output";
import { doesFileExist } from "../../../src/lib/utils/file.utils";
import { CombinedConfig } from "packages/generate-license-file/src/lib/cli/commands/main";

jest.mock("../../../src/lib/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn(),
}));

describe("Output", () => {
  const mockDoesFileExist = jest.mocked(doesFileExist);
  const mockPrompt = jest.mocked(prompt);

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

      const args: CombinedConfig = {
        output: "any output value",
      };

      await output.resolve(args);

      expect(mockPrompt).not.toHaveBeenCalled();
    });

    it("should prompt for a bool if an output is given but it exists", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));

      mockPrompt.mockResolvedValue({ value: true });

      const args: CombinedConfig = {
        output: "any output value",
      };

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(1);
      expect(mockPrompt).toHaveBeenCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should prompt for a string if no output file is given", async () => {
      mockPrompt.mockResolvedValue({ value: "any output value" });

      const args: CombinedConfig = {};

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(1);
      expect(mockPrompt).toHaveBeenCalledWith(expect.objectContaining({ type: "input" }));
    });

    it("should prompt for a bool if no output file is given and the later given output does exist", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));
      mockPrompt.mockResolvedValue({ value: testOutput });

      const args: CombinedConfig = {};

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(2);
      expect(mockPrompt).toHaveBeenCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should prompt for a string/bool pair twice if the user disallows overwriting with no output given", async () => {
      const testOutput = "any output value";
      mockDoesFileExist.mockImplementation(path => Promise.resolve(path === testOutput));
      mockPrompt
        .mockResolvedValueOnce({ value: testOutput })
        .mockResolvedValueOnce({ value: false })
        .mockResolvedValueOnce({ value: testOutput })
        .mockResolvedValueOnce({ value: true });

      const args: CombinedConfig = {};

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(4);

      expect(mockPrompt).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: "input" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: "confirm" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: "input" }));
      expect(mockPrompt).toHaveBeenNthCalledWith(4, expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is given which exists and override is given", async () => {
      mockDoesFileExist.mockResolvedValue(true);
      mockPrompt.mockResolvedValue({ value: true });

      const args: CombinedConfig = {
        output: "any output value",
        overwrite: true,
      };

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(0);
      expect(mockPrompt).not.toHaveBeenCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is given which does not exist and override is given", async () => {
      mockDoesFileExist.mockResolvedValue(false);
      mockPrompt.mockResolvedValue({ value: true });

      const args: CombinedConfig = {
        output: "any output value",
        overwrite: true,
      };

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(0);
      expect(mockPrompt).not.toHaveBeenCalledWith(expect.objectContaining({ type: "confirm" }));
    });

    it("should not prompt for a bool if an output is not given but override is given", async () => {
      mockDoesFileExist.mockResolvedValue(true);
      mockPrompt.mockResolvedValue({ value: "any output value" });

      const args: CombinedConfig = {
        overwrite: true,
      };

      await output.resolve(args);

      expect(mockPrompt).toHaveBeenCalledTimes(1);
      expect(mockPrompt).not.toHaveBeenCalledWith(expect.objectContaining({ type: "confirm" }));
    });
  });

  describe("parse", () => {
    it("should throw if the given output is undefined", async () => {
      const args: CombinedConfig = {
        output: undefined,
      };

      await expect(output.parse(args)).rejects.toThrow("No --output argument given.");
    });

    it("should throw if the given output file exists and overwrite is false", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      const args: CombinedConfig = {
        output: "any output value",
      };

      await expect(output.parse(args)).rejects.toThrow(
        "Given --output file already exists at 'any output value'. Use --overwrite to allow overwriting.",
      );
    });

    it("should return the given output file if it exists but overwrite is true", async () => {
      mockDoesFileExist.mockResolvedValue(true);

      const args: CombinedConfig = {
        output: "any output value",
        overwrite: true,
      };

      const result = await output.parse(args);

      expect(result).toBe("any output value");
    });

    it("should return the given output file if it does not exist", async () => {
      mockDoesFileExist.mockResolvedValue(false);

      const args: CombinedConfig = {
        output: "any output value",
      };

      const result = await output.parse(args);

      expect(result).toBe("any output value");
    });
  });
});
