/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from "fs";
import { mocked } from "ts-jest/utils";
import { doesFileExist, doesFolderExist, writeFileAsync } from "../../src/utils/file.utils";

jest.mock("fs", () => ({
  stat: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  mkdir: jest.fn()
}));

describe("File Utils", () => {
  const mockedFs = mocked(fs);

  beforeEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

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

  describe("writeFileAsync", () => {
    it("should call fs.writeFile with the file path", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => true
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync("path", "file content");

      const firstCallFirstArg = mockedFs.writeFile.mock.calls[0][0];
      expect(firstCallFirstArg).toBe("path");
    });

    it("should call fs.writeFile with the content", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => true
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync("path", "file content");

      const firstCallSecondArg = mockedFs.writeFile.mock.calls[0][1];
      expect(firstCallSecondArg).toBe("file content");
    });

    it("should call fs.writeFileAsync with the utf8 encoding", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => true
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync("path", "file content");

      const firstCallThirdArg = mockedFs.writeFile.mock.calls[0][2] as any;
      expect(firstCallThirdArg.encoding).toBe("utf-8");
    });

    it("should call fs.mkdir if the directory does not exist", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => false
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      mockedFs.mkdir.mockImplementation(((path: any, options: any, callback: any) => {
        callback(null, path);
      }) as any);

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync("path", "file content");

      expect(mockedFs.mkdir).toHaveBeenCalledTimes(1);
    });

    it("should call fs.mkdir with the directory path", async () => {
      const directory = "C:/folder/tree/that/does/not/exist";
      const filePath = directory + "/third-party-licenses.txt";

      const mockFsStatResult: fs.Stats = {
        isDirectory: () => false
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      mockedFs.mkdir.mockImplementation(((path: any, options: any, callback: any) => {
        callback(null, path);
      }) as any);

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync(filePath, "file content");

      const firstCallFirstArg = mockedFs.mkdir.mock.calls[0][0] as any;
      expect(firstCallFirstArg).toBe(directory);
    });

    it("should call fs.mkdir with recursive true", async () => {
      const mockFsStatResult: fs.Stats = {
        isDirectory: () => false
      } as any;

      mockedFs.stat.mockImplementation((path, callback) => {
        // The types are a little off. The callback is the second arg but it thinks it's the third
        (callback as any)(null, mockFsStatResult);
      });

      mockedFs.mkdir.mockImplementation(((path: any, options: any, callback: any) => {
        callback(null, path);
      }) as any);

      // The types are a little off. The callback is the fourth arg but it thinks it's the third
      mockedFs.writeFile.mockImplementation(((
        path: string,
        content: string,
        options: any,
        callback: any
      ) => {
        callback(null);
      }) as any);

      await writeFileAsync("path", "file content");

      const firstCallSecondArg = mockedFs.mkdir.mock.calls[0][1] as any;
      expect(firstCallSecondArg.recursive).toBe(true);
    });
  });
});
