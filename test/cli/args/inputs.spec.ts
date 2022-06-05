import { Result } from "arg";
import { prompt } from "enquirer";
import { mocked } from "ts-jest/utils";
import { Inputs } from "../../../src/cli/args/inputs";
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
    fail: jest.fn(),
    warn: jest.fn()
  }
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

describe("Input", () => {
  const mockedPrompt = mocked(prompt);
  const mockedDoesFileExist = mocked(doesFileExist);
  const mockedFailSpinner = mocked(spinner.fail);
  const mockedWarnSpinner = mocked(spinner.warn);

  let inputs: Inputs;

  beforeEach(() => {
    inputs = new Inputs();

    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("resolve", () => {
    it("should prompt for one input value if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await inputs.resolve(args);

      expect(mockedPrompt).toBeCalledTimes(1);
    });

    it("should prompt for one input value with a message if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await inputs.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Package.json location: "
        })
      );
    });

    it("should prompt for one input value with an initial value of './package.json' if the input is undefined and a package.json was found", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await inputs.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: "./package.json"
        })
      );
    });

    it("should prompt for one input value with an empty initial value if the input is undefined and a package.json was not found", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await inputs.resolve(args);

      expect(mockedPrompt).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: ""
        })
      );
    });

    it("should prompt for value of type string (input) if the '--input' value is undefined", async () => {
      mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      mockedPrompt.mockResolvedValue({ value: "./package.json" });

      const args = {} as Result<ArgumentsWithAliases>;

      await inputs.resolve(args);

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

      await inputs.resolve(args);

      expect(mockedFailSpinner).not.toHaveBeenCalled();
    });

    describe("when a single input value is given", () => {
      it("should return the inputted value if the '--input' value is valid and exists", async () => {
        mockedDoesFileExist.mockResolvedValue(true);

        const inputFile = "./package.json";
        const args = {
          "--input": [inputFile]
        } as Result<ArgumentsWithAliases>;

        const answer = await inputs.resolve(args);

        expect(answer).toEqual([inputFile]);
      });

      it("should fail the spinner if the input value is given and it doesn't exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        mockedPrompt.mockResolvedValueOnce({ value: "./exists.json" });

        const args = {
          "--input": ["./not-exists.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedFailSpinner).toBeCalledTimes(1);
      });

      it("should continue prompting for a value while the value doesn't exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        mockedPrompt
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./exists.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toBeCalledTimes(4);
      });

      it("should continue failing the spinner while the value doesn't exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        mockedPrompt
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./not-exists.json" })
          .mockResolvedValueOnce({ value: "./exists.json" });

        const args = {
          "--input": ["./not-exists.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedFailSpinner).toBeCalledTimes(4);
      });
    });

    describe("when multiple input values are given", () => {
      it("should warn the spinner once if one of the values doesn't exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        mockedPrompt.mockResolvedValueOnce({ value: true });

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedWarnSpinner).toBeCalledTimes(1);
        expect(mockedWarnSpinner).toBeCalledWith("./package2.json could not be found.");
      });

      it("should warn the spinner twice if two of the values don't exist", async () => {
        mockedDoesFileExist
          .mockResolvedValueOnce(false)
          .mockResolvedValueOnce(true)
          .mockResolvedValueOnce(false);

        mockedPrompt.mockResolvedValueOnce({ value: true });

        const args = {
          "--input": ["./package1.json", "./package2.json", "./package3.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedWarnSpinner).toBeCalledTimes(2);
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(1, "./package1.json could not be found.");
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(2, "./package3.json could not be found.");
      });

      it("should throw if at least one package doesn't exist and the prompt returns false", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        mockedPrompt.mockResolvedValueOnce({ value: false });

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.resolve(args)).rejects.toThrow("Process terminated by user");
      });

      it("should not throw if at least one package doesn't exist but the prompt returns true", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        mockedPrompt.mockResolvedValueOnce({ value: true });

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.resolve(args)).resolves.toBeDefined();
      });

      it("should only return the given values that exist if at least one value does not exist and the prompt returns true", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        mockedPrompt.mockResolvedValueOnce({ value: true });

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args).then(result => {
          expect(result).toEqual(["./package1.json"]);
        });
      });

      it("should return all given values if all of them exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

        mockedPrompt.mockResolvedValueOnce({ value: true });

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args).then(result => {
          expect(result).toEqual(["./package1.json", "./package2.json"]);
        });
      });

      it("should not prompt the user if all of the given values exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).not.toBeCalled();
      });
    });
  });

  describe("parse", () => {
    describe("when one input value is given", () => {
      it("should throw if the given input is undefined", async () => {
        const args = {
          "--input": undefined
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.parse(args)).rejects.toThrow("No --input argument given.");
      });

      it("should throw if the given input does not exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package.json"]
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.parse(args)).rejects.toThrow(
          "One or more package.jsons could not be found."
        );
      });

      it("should warn if the given input does not exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package.json"]
        } as Result<ArgumentsWithAliases>;

        try {
          await inputs.parse(args);
        } catch {
          // empty
        }

        expect(mockedWarnSpinner).toBeCalledTimes(1);
        expect(mockedWarnSpinner).toHaveBeenCalledWith("./package.json could not be found.");
      });

      it("should return the given input if it exists", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true);

        const args = {
          "--input": ["./package.json"]
        } as Result<ArgumentsWithAliases>;

        const result = await inputs.parse(args);

        expect(result).toEqual(["./package.json"]);
      });
    });

    describe("when multiple input values are given", () => {
      it("should throw if at least one of the given input values does not exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.parse(args)).rejects.toThrow(
          "One or more package.jsons could not be found."
        );
      });

      it("should warn once if one of the given input values does not exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        try {
          await inputs.parse(args);
        } catch {
          // empty
        }

        expect(mockedWarnSpinner).toBeCalledTimes(1);
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(1, "./package2.json could not be found.");
      });

      it("should warn twice if two of the given input values do not exist", async () => {
        mockedDoesFileExist
          .mockResolvedValueOnce(false)
          .mockResolvedValueOnce(true)
          .mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package1.json", "./package2.json", "./package3.json"]
        } as Result<ArgumentsWithAliases>;

        try {
          await inputs.parse(args);
        } catch {
          // empty
        }

        expect(mockedWarnSpinner).toBeCalledTimes(2);
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(1, "./package1.json could not be found.");
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(2, "./package3.json could not be found.");
      });

      it("should return the given input values if all of them exist", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

        const args = {
          "--input": ["./package1.json", "./package2.json"]
        } as Result<ArgumentsWithAliases>;

        const result = await inputs.parse(args);

        expect(result).toEqual(["./package1.json", "./package2.json"]);
      });
    });
  });
});
