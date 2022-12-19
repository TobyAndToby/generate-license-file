import { Result } from "arg";
import { prompt } from "enquirer";
import { Inputs } from "../../../src/lib/cli/args/inputs";
import { ArgumentsWithAliases } from "../../../src/lib/cli/cli-arguments";
import { spinner } from "../../../src/lib/cli/spinner";
import { doesFileExist } from "../../../src/lib/utils/file.utils";

jest.mock("../../../src/lib/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
}));

jest.mock("../../../src/lib/cli/spinner.ts", () => ({
  spinner: {
    start: jest.fn(),
    stop: jest.fn(),
    warn: jest.fn(),
    fail: jest.fn(),
  },
}));

jest.mock("enquirer", () => ({
  prompt: jest.fn(),
}));

describe("Inputs", () => {
  const mockedPrompt = jest.mocked(prompt);
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedFailSpinner = jest.mocked(spinner.fail);
  const mockedWarnSpinner = jest.mocked(spinner.warn);

  let inputs: Inputs;

  beforeEach(() => {
    inputs = new Inputs();

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
        "--input": [inputFile],
      } as Result<ArgumentsWithAliases>;

      const answer = await inputs.resolve(args);

      expect(answer).toStrictEqual([inputFile]);
    });

    it("should remove instances of unescaped double quotes", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      mockedPrompt.mockResolvedValueOnce({ value: '"./package."json"' });

      const args = {} as Result<ArgumentsWithAliases>;
      const answer = await inputs.resolve(args);

      expect(answer).toStrictEqual(["./package.json"]);
    });

    it("should unescape escaped double quotes", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      mockedPrompt.mockResolvedValueOnce({ value: '\\"./package.\\"json\\"' });

      const args = {} as Result<ArgumentsWithAliases>;
      const answer = await inputs.resolve(args);

      expect(answer).toStrictEqual(['"./package."json"']);
    });

    describe("When the '--input' value is undefined", () => {
      it("should prompt for an input value", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
        mockedPrompt.mockResolvedValue({ value: "./package.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledTimes(1);
      });

      it("should prompt for an input value with a message", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
        mockedPrompt.mockResolvedValue({ value: "./package.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Package.json location: ",
          }),
        );
      });

      it("should prompt for an input value with an initial value of './package.json' if one is found", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
        mockedPrompt.mockResolvedValue({ value: "./package.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledWith(
          expect.objectContaining({
            initial: "./package.json",
          }),
        );
      });

      it("should prompt for an input value with an empty initial value if one was not found", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
        mockedPrompt.mockResolvedValue({ value: "./package.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledWith(
          expect.objectContaining({
            initial: "",
          }),
        );
      });

      it("should prompt for a string value", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
        mockedPrompt.mockResolvedValue({ value: "./package.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledWith(
          expect.objectContaining({
            type: "input",
          }),
        );
      });

      it("should not fail the spinner", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        mockedPrompt.mockResolvedValueOnce({ value: "./exists.json" });

        const args = {} as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedFailSpinner).toHaveBeenCalledTimes(0);
      });
    });

    describe("when the '--input' value doesn't exist", () => {
      it("should fail the spinner if the initial input value doesn't exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        mockedPrompt.mockResolvedValueOnce({ value: "./exists.json" });

        const args = {
          "--input": ["./not-exists.json"],
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedFailSpinner).toHaveBeenCalledTimes(1);
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

        await inputs.resolve(args);

        expect(mockedPrompt).toHaveBeenCalledTimes(4);
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
          "--input": ["./not-exists.json"],
        } as Result<ArgumentsWithAliases>;

        await inputs.resolve(args);

        expect(mockedFailSpinner).toHaveBeenCalledTimes(4);
      });
    });

    describe("when multiple '--input' values are given", () => {
      describe("when the '--input' values are all valid and exist", () => {
        it("should return inputted file names if ", async () => {
          mockedDoesFileExist.mockResolvedValue(true);

          const inputFile1 = "./package.json";
          const inputFile2 = "./second-package.json";
          const args = {
            "--input": [inputFile1, inputFile2],
          } as Result<ArgumentsWithAliases>;

          const answer = await inputs.resolve(args);

          expect(answer).toStrictEqual([inputFile1, inputFile2]);
        });
      });

      describe("when some of the '--input' values do not exist", () => {
        it("should warn the spinner for each value that does not exist", async () => {
          mockedDoesFileExist.mockImplementation((path: string) => {
            return Promise.resolve(path === "./exists.json");
          });

          mockedPrompt.mockResolvedValueOnce({ value: false });

          const args = {
            "--input": ["./does-not-exist.json", "./exists.json", "./also-does-not-exist.json"],
          } as Result<ArgumentsWithAliases>;

          try {
            await inputs.resolve(args);
          } catch {
            // empty
          }

          expect(mockedWarnSpinner).toHaveBeenCalledTimes(2);
          expect(mockedWarnSpinner).toHaveBeenNthCalledWith(
            1,
            "./does-not-exist.json could not be found.",
          );
          expect(mockedWarnSpinner).toHaveBeenNthCalledWith(
            2,
            "./also-does-not-exist.json could not be found.",
          );
        });

        it("should prompt the user if they want to cancel", async () => {
          mockedDoesFileExist.mockImplementation((path: string) => {
            return Promise.resolve(path === "./exists.json");
          });

          mockedPrompt.mockResolvedValueOnce({ value: false });

          const args = {
            "--input": ["./does-not-exist.json", "./exists.json"],
          } as Result<ArgumentsWithAliases>;

          try {
            await inputs.resolve(args);
          } catch {
            // empty
          }

          expect(mockedPrompt).toHaveBeenCalledTimes(1);
          expect(mockedPrompt).toHaveBeenCalledWith({
            message: "One or more given --input files not found. Do you want to continue?",
            name: "value",
            type: "confirm",
          });
        });

        it("should throw if the user wants to cancel", async () => {
          mockedDoesFileExist.mockImplementation((path: string) => {
            return Promise.resolve(path === "./exists.json");
          });

          mockedPrompt.mockResolvedValueOnce({ value: false });

          const args = {
            "--input": ["./does-not-exist.json", "./exists.json"],
          } as Result<ArgumentsWithAliases>;

          await expect(inputs.resolve(args)).rejects.toThrowError("Process terminated by user");
        });

        it("should not throw if the user does not want to cancel", async () => {
          mockedDoesFileExist.mockImplementation((path: string) => {
            return Promise.resolve(path === "./exists.json");
          });

          mockedPrompt.mockResolvedValueOnce({ value: true });

          const args = {
            "--input": ["./does-not-exist.json", "./exists.json"],
          } as Result<ArgumentsWithAliases>;

          await expect(inputs.resolve(args)).resolves.not.toThrowError();
        });
      });
    });
  });

  describe("parse", () => {
    describe("when one '--input' value is given", () => {
      it("should throw if the given input is undefined", async () => {
        const args = {
          "--input": undefined,
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.parse(args)).rejects.toThrow("No --input argument given.");
      });

      it("should throw if the given input does not exist", () => {
        mockedDoesFileExist.mockResolvedValueOnce(false);

        const args = {
          "--input": ["./package.json"],
        } as Result<ArgumentsWithAliases>;

        return expect(inputs.parse(args)).rejects.toThrow("Given --input file not found");
      });

      it("should return the given input if it exists", async () => {
        mockedDoesFileExist.mockResolvedValueOnce(true);

        const args = {
          "--input": ["./package.json"],
        } as Result<ArgumentsWithAliases>;

        const result = await inputs.parse(args);

        expect(result).toStrictEqual(["./package.json"]);
      });
    });

    describe("when multiple '--input' values are given", () => {
      it("should warn for each of the values that don't exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        const args = {
          "--input": ["./does-not-exist", "./exists.json", "./also-does-not-exist.json"],
        } as Result<ArgumentsWithAliases>;

        try {
          await inputs.parse(args);
        } catch {
          // empty
        }

        expect(mockedWarnSpinner).toHaveBeenCalledTimes(2);
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(
          1,
          "./does-not-exist could not be found.",
        );
        expect(mockedWarnSpinner).toHaveBeenNthCalledWith(
          2,
          "./also-does-not-exist.json could not be found.",
        );
      });

      it("should throw if any given file does not exist", async () => {
        mockedDoesFileExist.mockImplementation((path: string) => {
          return Promise.resolve(path === "./exists.json");
        });

        const args = {
          "--input": ["./does-not-exist", "./exists.json"],
        } as Result<ArgumentsWithAliases>;

        await expect(inputs.parse(args)).rejects.toThrowError(
          "One or more given --input files not found",
        );
      });
    });
  });
});
