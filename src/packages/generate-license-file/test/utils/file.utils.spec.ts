import { Stats } from "fs";
import * as fs from "fs/promises";
import {
  doesFileExist,
  doesFolderExist,
  readFile,
  writeFileAsync,
} from "../../src/lib/utils/file.utils";

jest.mock("fs/promises", () => ({
  stat: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  mkdir: jest.fn(),
}));

describe("File Utils", () => {
  const mockedFs = jest.mocked(fs);

  beforeEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  describe("doesFileExist", () => {
    it("should return true when the given item exists and is a file", async () => {
      mockedFs.stat.mockResolvedValue({
        isFile: () => true,
      } as Stats);

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeTruthy();
    });

    it("should return false when the given item exists but isn't a file", async () => {
      mockedFs.stat.mockResolvedValue({
        isFile: () => false,
      } as Stats);

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });

    it("should return false if stat throws", async () => {
      mockedFs.stat.mockRejectedValue("anything");

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });
  });

  describe("doesFolderExist", () => {
    it("should return true when the given item exists and is a directory", async () => {
      mockedFs.stat.mockResolvedValue({
        isDirectory: () => true,
      } as Stats);

      const result = await doesFolderExist("/some/path/to/a/directory");

      expect(result).toBeTruthy();
    });

    it("should return false when the given item exists but isn't a directory", async () => {
      mockedFs.stat.mockResolvedValue({
        isDirectory: () => false,
      } as Stats);

      const result = await doesFolderExist("/some/path/to/a/directory");

      expect(result).toBeFalsy();
    });

    it("should return false if stat throws", async () => {
      mockedFs.stat.mockRejectedValue("anything");

      const result = await doesFolderExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });
  });

  describe("writeFileAsync", () => {
    it("should call fs.writeFile with the file path", async () => {
      const filePath = "/some/path/to/file.txt";

      mockedFs.stat.mockResolvedValue({
        isDirectory: () => true,
      } as Stats);

      await writeFileAsync(filePath, "any file content");

      expect(mockedFs.writeFile).toHaveBeenCalledTimes(1);
      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        filePath,
        expect.anything(),
        expect.anything(),
      );
    });

    it("should call fs.writeFile with the content", async () => {
      const fileContent = "any file content";

      mockedFs.stat.mockResolvedValue({
        isDirectory: () => true,
      } as Stats);

      await writeFileAsync("path", fileContent);

      expect(mockedFs.writeFile).toHaveBeenCalledTimes(1);
      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.anything(),
        fileContent,
        expect.anything(),
      );
    });

    it("should call fs.writeFileAsync with the utf8 encoding", async () => {
      mockedFs.stat.mockResolvedValue({
        isDirectory: () => true,
      } as Stats);

      await writeFileAsync("path", "file content");

      expect(mockedFs.writeFile).toHaveBeenCalledTimes(1);
      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ encoding: "utf-8" }),
      );
    });

    it("should call fs.mkdir if the directory does not exist", async () => {
      mockedFs.stat.mockRejectedValue("anything");

      await writeFileAsync("path", "file content");

      expect(mockedFs.mkdir).toHaveBeenCalledTimes(1);
    });

    it("should call fs.mkdir with the directory path if the directory does not exist", async () => {
      const directory = "/directory/that/does/not/exist";
      const filePath = directory + "/third-party-licenses.txt";

      mockedFs.stat.mockRejectedValue("anything");

      await writeFileAsync(filePath, "any file content");

      expect(mockedFs.mkdir).toHaveBeenCalledTimes(1);
      expect(mockedFs.mkdir).toHaveBeenCalledWith(directory, expect.anything());
    });

    it("should call fs.mkdir with recursive true if the directory does not exist", async () => {
      const directory = "/directory/that/does/not/exist";
      const filePath = directory + "/third-party-licenses.txt";

      mockedFs.stat.mockRejectedValue("anything");

      await writeFileAsync(filePath, "any file content");

      expect(mockedFs.mkdir).toHaveBeenCalledTimes(1);
      expect(mockedFs.mkdir).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ recursive: true }),
      );
    });
  });

  describe("readFile", () => {
    it("should return fs.readFile", () => {
      expect(readFile).toBe(mockedFs.readFile);
    });
  });
});
