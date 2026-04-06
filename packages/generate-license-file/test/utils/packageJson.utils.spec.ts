import { doesFileExist, readFile } from "../../src/lib/utils/file.utils";
import { PackageJson, readPackageJson } from "../../src/lib/utils/packageJson.utils";

jest.mock("../../src/lib/utils/file.utils", () => ({
  doesFileExist: jest.fn(),
  readFile: jest.fn(),
}));

describe("Package.json Utils", () => {
  const mockedDoesFileExist = jest.mocked(doesFileExist);
  const mockedReadFile = jest.mocked(readFile);

  const pathToPackageJson = "./path/to/package.json";

  beforeEach(() => {
    jest.resetAllMocks();

    mockedReadFile.mockResolvedValue(`{ "name": "test-project", "version": "1.2.3" }`);
  });

  afterAll(() => {
    jest.restoreAllMocks();
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
