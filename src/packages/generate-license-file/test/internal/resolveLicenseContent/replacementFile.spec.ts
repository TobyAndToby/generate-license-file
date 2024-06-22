import { replacementFile } from "../../../src/lib/internal/resolveLicenseContent/replacementFile";
import { doesFileExist, readFile } from "../../../src/lib/utils/file.utils";

jest.mock("../../../src/lib/utils/file.utils");

describe("replacementFile", () => {
  const mockDoesFileExist = jest.mocked(doesFileExist);
  const mockReadFile = jest.mocked(readFile);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  it("should not read the file if it does not exist", async () => {
    mockDoesFileExist.mockResolvedValue(false);

    await replacementFile("anything");

    expect(mockReadFile).not.toHaveBeenCalled();
  });

  it("should return null if the file does not exist", async () => {
    mockDoesFileExist.mockResolvedValue(false);

    const result = await replacementFile("anything");

    expect(result).toBeNull();
  });

  it("should read in the file if it does exist", async () => {
    const filePath = "anything";
    const fileContent = "file content";

    mockDoesFileExist.mockResolvedValue(true);
    mockReadFile.mockResolvedValue(fileContent);

    await replacementFile(filePath);

    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockReadFile).toHaveBeenCalledWith(filePath, expect.anything());
  });

  it("should return the file content if it does exist", async () => {
    const filePath = "anything";
    const fileContent = "file content";

    mockDoesFileExist.mockResolvedValue(true);
    mockReadFile.mockResolvedValue(fileContent);

    const result = await replacementFile(filePath);

    expect(result).toBe(fileContent);
  });
});
