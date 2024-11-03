import { glob } from "glob";
import { when } from "jest-when";
import { resolveNotices } from "../../../src/lib/internal/resolveNoticeContent";
import logger from "../../../src/lib/utils/console.utils";
import { readFile } from "../../../src/lib/utils/file.utils";

jest.mock("glob", () => ({
  glob: jest.fn(),
}));

jest.mock("../../../src/lib/utils/file.utils");
jest.mock("../../../src/lib/utils/console.utils"); // Stops logger.warn from being called

describe("resolveNoticeContent", () => {
  const mockedGlob = jest.mocked(glob);
  const mockedReadFile = jest.mocked(readFile);
  const mockedWarn = jest.mocked(logger.warn);

  const directory = "/some/directory";

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return empty array if no license files are found", async () => {
    mockedGlob.mockResolvedValue([]);

    const result = await resolveNotices(directory);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

  it("should return the contents of the notice file found", async () => {
    const noticeFilePath = `${directory}/notice.txt`;

    mockedGlob.mockResolvedValue([noticeFilePath]);
    when(mockedReadFile)
      .calledWith(noticeFilePath, { encoding: "utf-8" })
      .mockResolvedValue("Notice contents");

    const result = await resolveNotices(directory);

    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledWith(noticeFilePath, { encoding: "utf-8" });
    expect(result).toStrictEqual(["Notice contents"]);
  });

  it("should return a list of notice file contents if multiple files are found", async () => {
    const noticeFilePath1 = `${directory}/notice.txt`;
    const noticeFilePath2 = `${directory}/notice2.txt`;

    mockedGlob.mockResolvedValue([noticeFilePath1, noticeFilePath2]);
    when(mockedReadFile)
      .calledWith(noticeFilePath1, { encoding: "utf-8" })
      .mockResolvedValue("Notice contents 1");
    when(mockedReadFile)
      .calledWith(noticeFilePath2, { encoding: "utf-8" })
      .mockResolvedValue("Notice contents 2");

    const result = await resolveNotices(directory);

    expect(mockedReadFile).toHaveBeenCalledTimes(2);
    expect(mockedReadFile).toHaveBeenCalledWith(noticeFilePath1, { encoding: "utf-8" });
    expect(mockedReadFile).toHaveBeenCalledWith(noticeFilePath2, { encoding: "utf-8" });
    expect(result).toStrictEqual(["Notice contents 1", "Notice contents 2"]);
  });
});
