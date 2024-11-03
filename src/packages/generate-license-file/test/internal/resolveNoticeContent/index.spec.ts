import { glob } from "glob";
import { when } from "jest-when";
import { ResolutionInputs } from "../../../src/lib/internal/resolveLicenseContent";
import { resolveNoticeContent } from "../../../src/lib/internal/resolveNoticeContent";
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

  const resolutionInputs: ResolutionInputs = {
    directory: "/some/directory",
    packageJson: {
      name: "some-package",
      version: "1.0.0",
    },
  };

  beforeEach(jest.resetAllMocks);
  afterAll(jest.restoreAllMocks);

  it("should return null if no license files are found", async () => {
    mockedGlob.mockResolvedValue([]);

    const result = await resolveNoticeContent(resolutionInputs);

    expect(result).toBeNull();
  });

  it("should return the contents of the first notice file found", async () => {
    const noticeFilePath = `${resolutionInputs.directory}/notice.txt`;

    mockedGlob.mockResolvedValue([noticeFilePath, "some/other/file.txt"]);
    when(mockedReadFile)
      .calledWith(noticeFilePath, { encoding: "utf-8" })
      .mockResolvedValue("Notice contents");

    const result = await resolveNoticeContent(resolutionInputs);

    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledWith(noticeFilePath, { encoding: "utf-8" });
    expect(result).toBe("Notice contents");
  });

  it("should warning log if multiple files are found", async () => {
    const noticeFilePath = `${resolutionInputs.directory}/notice.txt`;

    mockedGlob.mockResolvedValue([noticeFilePath, "some/other/file.txt"]);
    when(mockedReadFile)
      .calledWith(noticeFilePath, { encoding: "utf-8" })
      .mockResolvedValue("Notice contents");

    expect(mockedWarn).toHaveBeenCalledTimes(0);

    await resolveNoticeContent(resolutionInputs);

    expect(mockedWarn).toHaveBeenCalledTimes(1);
  });
});
