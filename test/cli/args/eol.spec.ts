import { Result } from "arg";
import { prompt } from "enquirer";
import { mocked } from "ts-jest/utils";
import { Eol } from "../../../src/cli/args/eol";
import { ArgumentsWithAliases } from "../../../src/cli/cli-arguments";

jest.mock("enquirer", () => ({
  prompt: jest.fn()
}));

describe("Eol", () => {
  const mockedPrompt = mocked(prompt);

  let eol: Eol;

  beforeEach(() => {
    eol = new Eol();
  });

  it("should return undefined if '--eol' is undefined", async () => {
    const args = {} as Result<ArgumentsWithAliases>;

    const answer = await eol.resolve(args);

    expect(answer).toBeUndefined();
  });

  it("should return 'windows' if '--eol' is 'windows'", async () => {
    const args = {
      "--eol": "windows"
    } as Result<ArgumentsWithAliases>;

    const answer = await eol.resolve(args);

    expect(answer).toBe("windows");
  });

  it("should return 'posix' if '--eol' is 'posix'", async () => {
    const args = {
      "--eol": "posix"
    } as Result<ArgumentsWithAliases>;

    const answer = await eol.resolve(args);

    expect(answer).toBe("posix");
  });

  it("should prompt the user for a valid answer if an invalid line ending value is provided", async () => {
    mockedPrompt.mockResolvedValue({
      value: "s"
    });

    const args = {
      "--eol": "test"
    } as Result<ArgumentsWithAliases>;

    await eol.resolve(args);

    expect(mockedPrompt).toBeCalledTimes(1);
  });

  it("should prompt the user with a multiple choice prompt if an invalid line ending value is provided", async () => {
    mockedPrompt.mockResolvedValue({
      value: "s"
    });

    const args = {
      "--eol": "test"
    } as Result<ArgumentsWithAliases>;

    await eol.resolve(args);

    expect(mockedPrompt).toBeCalledWith({
      choices: ["Windows", "POSIX", "System default"],
      message: "Invalid line ending given. Please choose a line ending: ",
      name: "value",
      type: "select"
    });
  });

  [
    { key: "Windows", value: "windows" },
    { key: "POSIX", value: "posix" },
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
