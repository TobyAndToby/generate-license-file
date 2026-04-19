import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { doesFileExist, readFile } from "../../src/lib/utils/file.utils";
import { PackageJson, readPackageJson } from "../../src/lib/utils/packageJson.utils";

vi.mock("../../src/lib/utils/file.utils", () => ({
  doesFileExist: vi.fn(),
  readFile: vi.fn(),
}));

describe("Package.json Utils", () => {
  const mockedDoesFileExist = vi.mocked(doesFileExist);
  const mockedReadFile = vi.mocked(readFile);

  const pathToPackageJson = "./path/to/package.json";

  beforeEach(() => {
    vi.resetAllMocks();

    mockedReadFile.mockResolvedValue(`{ "name": "test-project", "version": "1.2.3" }`);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("readPackageJson", () => {
    it("should throw if the given path doesn't exist", async () => {
      mockedDoesFileExist.mockResolvedValue(false);

      const expectedThrownMessage = `Cannot find the file: '${pathToPackageJson}'`;
      await expect(readPackageJson(pathToPackageJson)).rejects.toThrow(expectedThrownMessage);
    });

    it("should call readFile with the package.json path if the given path does exist", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      await readPackageJson(pathToPackageJson);

      expect(mockedReadFile).toHaveBeenCalledTimes(1);
      expect(mockedReadFile).toHaveBeenCalledWith(pathToPackageJson, {
        encoding: "utf-8",
      });
    });

    it("should return a PackageJson instance", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      const result = await readPackageJson(pathToPackageJson);

      expect(result).toBeInstanceOf(PackageJson);
    });

    it("should return the json parsed result from readFile", async () => {
      mockedDoesFileExist.mockResolvedValue(true);

      const result = await readPackageJson(pathToPackageJson);

      expect(result).toStrictEqual(
        expect.objectContaining({
          name: "test-project",
          version: "1.2.3",
        }),
      );
    });
  });
});
