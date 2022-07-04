import { Result } from "arg";
import { prompt } from "enquirer";
import { Eol } from "../../../src/cli/args/eol";
import { ArgumentsWithAliases } from "../../../src/cli/cli-arguments";
import { allLineEndings } from "../../../src/lineEndings";

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

describe("Eol", () => {
  const mockedPrompt = jest.mocked(prompt);

  let eol: Eol;

  beforeEach(() => {
    eol = new Eol();

    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("resolve", () => {
    it("should return undefined if '--eol' is undefined", async () => {
      const args = {} as Result<ArgumentsWithAliases>;

      const answer = await eol.resolve(args);

      expect(answer).toBeUndefined();
    });

    allLineEndings.forEach(lineEnding =>
      it(`should return '${lineEnding}' if '--eol' is '${lineEnding}'`, async () => {
        const args = {
          "--eol": lineEnding
        } as Result<ArgumentsWithAliases>;

        const answer = await eol.resolve(args);

        expect(answer).toBe(lineEnding);
      })
    );

    it("should prompt the user for a valid answer if an invalid line ending value is provided", async () => {
      mockedPrompt.mockResolvedValue({
        value: "dummy value"
      });

      const args = {
        "--eol": "test"
      } as Result<ArgumentsWithAliases>;

      await eol.resolve(args);

      expect(mockedPrompt).toBeCalledTimes(1);
    });

    it("should prompt the user with a multiple choice prompt if an invalid line ending value is provided", async () => {
      mockedPrompt.mockResolvedValue({
        value: "dummy value"
      });

      const args = {
        "--eol": "test"
      } as Result<ArgumentsWithAliases>;

      await eol.resolve(args);

      expect(mockedPrompt).toBeCalledWith(
        expect.objectContaining({
          type: "select"
        })
      );
    });

    it("should prompt the user with a multiple choice prompt containing valid options if an invalid line ending value is provided", async () => {
      mockedPrompt.mockResolvedValue({
        value: "dummy value"
      });

      const args = {
        "--eol": "test"
      } as Result<ArgumentsWithAliases>;

      await eol.resolve(args);

      expect(mockedPrompt).toBeCalledWith(
        expect.objectContaining({
          choices: ["CRLF", "LF", "System default"]
        })
      );
    });

    it("should prompt the user with a message if an invalid line ending value is provided", async () => {
      mockedPrompt.mockResolvedValue({
        value: "dummy value"
      });

      const args = {
        "--eol": "test"
      } as Result<ArgumentsWithAliases>;

      await eol.resolve(args);

      expect(mockedPrompt).toBeCalledWith(
        expect.objectContaining({
          message: "Invalid line ending given. Please choose a line ending: "
        })
      );
    });

    [
      { key: "CRLF", value: "crlf" },
      { key: "LF", value: "lf" },
      { key: "System default", value: undefined }
    ].forEach(testCase =>
      it(`should return ${testCase.value} if the user selects ${testCase.key} from the multiple choice prompt`, async () => {
        mockedPrompt.mockResolvedValue({
          value: testCase.key
        });

        const args = {
          "--eol": testCase.key
        } as Result<ArgumentsWithAliases>;

        const answer = await eol.resolve(args);

        expect(answer).toBe(testCase.value);
      })
    );
  });

  describe("parse", () => {
    it("should return undefined if '--eol' is undefined", async () => {
      const args = {} as Result<ArgumentsWithAliases>;

      const answer = await eol.parse(args);

      expect(answer).toBeUndefined();
    });

    allLineEndings.forEach(lineEnding =>
      it(`should return '${lineEnding}' if '--eol' is '${lineEnding}'`, async () => {
        const args = {
          "--eol": lineEnding
        } as Result<ArgumentsWithAliases>;

        const answer = await eol.parse(args);

        expect(answer).toBe(lineEnding);
      })
    );

    it("should throw if '--eol' is invalid", async () => {
      const args = {
        "--eol": "this is invalid"
      } as Result<ArgumentsWithAliases>;

      await expect(eol.parse(args)).rejects.toThrow(
        "Invalid line ending given: 'this is invalid'. Possible values are 'crlf' or 'lf'. Omit the --eol flag to use the system default."
      );
    });
  });
});
