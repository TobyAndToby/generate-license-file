import * as fs from "fs";
import { mocked } from "ts-jest/utils";
import { doesFileExist, doesFolderExist } from "../../src/utils/file.utils";

// tslint:disable: no-null-keyword

jest.mock("fs", () => ({
  stat: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn()
}));

describe("File Utils", () => {
  const mockedFs = mocked(fs);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("doesFileExist", () => {
    it("should return true when the given item exists and is a file", async () => {
      const mockFsStatResult: fs.Stats = {
        isFile: () => true
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeTruthy();
    });

    it("should return false when the given item exists but isn't a file", async () => {
      const mockFsStatResult: fs.Stats = {
        isFile: () => false
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });

    it("should return false if stat throws", async () => {
      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(new Error("some error"), null);
      });

      const result = await doesFileExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });
  });

  describe("doesFolderExist", () => {
    it("should return true when the given item exists and is a directory", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => true
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      const result = await doesFolderExist("/some/path/to/file.txt");

      expect(result).toBeTruthy();
    });

    it("should return false when the given item exists but isn't a directory", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => false
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      const result = await doesFolderExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });

    it("should return false if stat throws", async () => {
      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(new Error("some error"), null);
      });

      const result = await doesFolderExist("/some/path/to/file.txt");

      expect(result).toBeFalsy();
    });
  });
});
